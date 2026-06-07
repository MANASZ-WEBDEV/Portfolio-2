"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 158;

function getFramePath(index: number): string {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/sequence/ezgif-frame-${frameNumber}.png`;
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Draw frame to canvas with object-fit: cover logic
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];

    if (!canvas || !ctx || !img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // object-fit: cover calculation
    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

    if (canvasAspect > imgAspect) {
      // Canvas is wider — fit width, crop height
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Canvas is taller — fit height, crop width
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Resize canvas to match display size (retina-aware)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    // Redraw current frame after resize
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload all images
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));

        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
          // Draw first frame
          requestAnimationFrame(() => {
            resizeCanvas();
            drawFrame(0);
          });
        }
      };

      img.onerror = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
      };

      images[i] = img;
    }

    imagesRef.current = images;
  }, [drawFrame, resizeCanvas]);

  // Handle resize
  useEffect(() => {
    if (!isLoaded) return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isLoaded, resizeCanvas]);

  // Listen for frame changes
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.min(Math.round(latest), TOTAL_FRAMES - 1);
    if (index === currentFrameRef.current) return;

    currentFrameRef.current = index;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      drawFrame(index);
    });
  });

  return (
    <div
      ref={containerRef}
      id="hero-scroll"
      className="relative"
      style={{ height: "500vh" }}
    >
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-brand-bg">
            <div className="relative mb-6">
              {/* Pulsing ring */}
              <div className="w-20 h-20 rounded-full border-2 border-brand-orange/20 animate-ping absolute inset-0" />
              <div className="w-20 h-20 rounded-full border-2 border-brand-orange/40 flex items-center justify-center">
                <span className="text-brand-orange font-mono text-sm font-bold">
                  {loadProgress}%
                </span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${loadProgress}%`,
                  background: "linear-gradient(90deg, #e8722a, #f59e4b)",
                }}
              />
            </div>
            <p className="text-brand-text-muted text-xs mt-3 font-mono tracking-wider uppercase">
              Loading experience
            </p>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className={`w-full h-full transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ display: "block" }}
        />

        {/* Subtle vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(10, 14, 26, 0.4) 100%)",
          }}
        />
      </div>
    </div>
  );
}

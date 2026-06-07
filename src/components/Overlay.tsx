"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1: Hero intro (0% - 20%)
  const s1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.22], [0, 1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.22], [60, 0, 0, -80]);
  const s1Scale = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.22], [0.9, 1, 1, 0.95]);

  // Section 2: Tagline left (25% - 45%)
  const s2Opacity = useTransform(scrollYProgress, [0.23, 0.3, 0.4, 0.48], [0, 1, 1, 0]);
  const s2X = useTransform(scrollYProgress, [0.23, 0.3, 0.4, 0.48], [-30, 0, 0, -20]);
  const s2Y = useTransform(scrollYProgress, [0.23, 0.48], [20, -40]);

  // Section 3: Tagline right (50% - 70%)
  const s3Opacity = useTransform(scrollYProgress, [0.48, 0.55, 0.65, 0.73], [0, 1, 1, 0]);
  const s3X = useTransform(scrollYProgress, [0.48, 0.55, 0.65, 0.73], [30, 0, 0, 20]);
  const s3Y = useTransform(scrollYProgress, [0.48, 0.73], [20, -40]);

  // Section 4: Final CTA (75% - 95%)
  const s4Opacity = useTransform(scrollYProgress, [0.75, 0.82, 0.9, 0.98], [0, 1, 1, 0]);
  const s4Y = useTransform(scrollYProgress, [0.75, 0.82, 0.9, 0.98], [60, 0, 0, -40]);
  const s4Scale = useTransform(scrollYProgress, [0.75, 0.82], [0.95, 1]);

  // Scroll indicator opacity (fades out as user starts scrolling)
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-screen w-full">
        {/* ——— Section 1: Hero Name ——— */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: s1Opacity, y: s1Y, scale: s1Scale }}
        >
          <p className="text-brand-orange-light text-xs md:text-sm font-syncopate font-bold tracking-[0.45em] uppercase mb-4">
            Hello, I&apos;m
          </p>
          <h1 className="text-display-xl font-bold text-white mb-5">
            <span className="text-gradient-orange">MANAS</span>
          </h1>
          <div className="flex items-center gap-4 justify-center">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
            <p className="text-xl md:text-3xl text-white font-cormorant italic tracking-[0.12em]">
              Creative Developer
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </motion.div>

        {/* ——— Section 2: Left-aligned tagline ——— */}
        <motion.div
          className="absolute inset-y-0 left-0 w-full md:w-[32%] lg:w-[28%] flex flex-col justify-center px-4 md:px-8 lg:px-12 items-center text-center md:items-start md:text-left"
          style={{ opacity: s2Opacity, x: s2X, y: s2Y }}
        >
          <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "linear-gradient(135deg, #e8722a, #f59e4b)" }}
            />
            <span className="text-brand-orange text-xs font-mono tracking-[0.2em] uppercase">
              What I Do
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            I build <span className="text-gradient-blue">digital experiences</span>
            <br />
            that captivate.
          </h2>
          <p className="text-white/70 text-body-lg max-w-lg leading-relaxed">
            Crafting immersive web applications where performance
            meets pixel-perfect aesthetics.
          </p>
        </motion.div>

        {/* ——— Section 3: Right-aligned tagline ——— */}
        <motion.div
          className="absolute inset-y-0 right-0 w-full md:w-[32%] lg:w-[28%] flex flex-col justify-center items-center text-center md:items-end md:text-right px-4 md:px-8 lg:px-12"
          style={{ opacity: s3Opacity, x: s3X, y: s3Y }}
        >
          <div className="flex items-center gap-3 justify-center md:justify-end mb-4">
            <span className="text-brand-blue text-xs font-mono tracking-[0.2em] uppercase">
              My Approach
            </span>
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "linear-gradient(135deg, #4a6cf7, #7c3aed)" }}
            />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Bridging <span className="text-gradient-mixed">design</span>
            <br />
            and engineering.
          </h2>
          <p className="text-white/70 text-body-lg max-w-lg leading-relaxed">
            From concept to deployment — turning ambitious visions
            into performant, accessible realities.
          </p>
        </motion.div>

        {/* ——— Section 4: Transition ——— */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: s4Opacity, y: s4Y, scale: s4Scale }}
        >
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/25" />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "linear-gradient(135deg, #e8722a, #f59e4b)" }}
            />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/25" />
          </div>

          <p className="text-white/70 text-sm font-semibold tracking-[0.4em] uppercase mb-5">
            Beyond the pixels
          </p>
          <h2 className="text-display-lg font-bold text-white mb-4">
            Where <span className="text-gradient-orange">vision</span> meets
            <br />
            <span className="text-gradient-blue">craftsmanship</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-md mx-auto leading-relaxed mb-6">
            Every project is a story — scroll down to explore the chapters.
          </p>

          <motion.div
            className="flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(232,114,42,0.7)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ——— Scroll Indicator (initial) ——— */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-white/70 text-sm font-semibold tracking-[0.25em] uppercase">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-white/40 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 rounded-full bg-brand-orange"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

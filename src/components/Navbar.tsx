"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#hero-scroll" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const navBg = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["rgba(10, 14, 26, 0)", "rgba(10, 14, 26, 0.85)"]
  );
  const navBorder = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
        style={{
          backgroundColor: navBg,
          borderBottom: navBorder.get() ? `1px solid ${navBorder.get()}` : undefined,
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero-scroll"
            onClick={(e) => handleNavClick(e, "#hero-scroll")}
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-xl font-bold tracking-tight text-white">
              M<span className="text-gradient-orange">.</span>
            </span>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-sm text-brand-text-muted hover:text-white transition-colors duration-300 font-medium tracking-wide cursor-pointer"
                whileHover={{ y: -1 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-orange transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}

            {/* CTA Button */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="relative px-5 py-2 text-sm font-medium rounded-full overflow-hidden cursor-pointer group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 text-white">Let&apos;s Talk</span>
              <div
                className="absolute inset-0 rounded-full opacity-90 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, #e8722a, #f59e4b)",
                }}
              />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-px bg-white origin-center"
              animate={isMobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 h-px bg-white"
              animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-white origin-center"
              animate={isMobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        initial={false}
        animate={isMobileOpen ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-0 bg-brand-bg/95 backdrop-blur-xl"
          onClick={() => setIsMobileOpen(false)}
        />
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-3xl font-bold text-white hover:text-brand-orange transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={isMobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}

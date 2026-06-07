"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-10 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left - Copyright */}
        <div className="flex items-center gap-2 text-sm text-brand-text-dim">
          <span>©</span>
          <span>{currentYear}</span>
          <span className="text-brand-text-muted">Manas</span>
          <span className="text-brand-text-dim">•</span>
          <span>All rights reserved</span>
        </div>

        {/* Right - Built with */}
        <div className="flex items-center gap-2 text-xs text-brand-text-dim font-mono">
          <span>Built with</span>
          <span className="text-brand-orange">Next.js</span>
          <span>&</span>
          <span className="text-brand-blue">Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}

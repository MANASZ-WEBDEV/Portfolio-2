import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      {/* Fixed Navbar */}
      <Navbar />

      {/* ——— Hero: Scroll-linked canvas + Parallax overlay ——— */}
      <div className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>

      {/* Gradient transition from hero to content */}
      <div className="relative h-32 -mt-32 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-bg" />
      </div>

      {/* ——— Content Sections ——— */}
      <div className="relative z-10 bg-brand-bg">
        {/* Divider */}
        <div className="divider-gradient max-w-md mx-auto" />

        {/* Projects Grid */}
        <Projects />

        {/* Contact CTA */}
        <Contact />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}

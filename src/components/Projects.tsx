"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  accent: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Nebula Dashboard",
    description:
      "Real-time analytics platform with interactive data visualizations, predictive insights, and a cinematic dark UI.",
    tech: ["React", "D3.js", "Node.js", "PostgreSQL"],
    image: "/projects/nebula.png",
    accent: "#4a6cf7",
    link: "#",
  },
  {
    title: "Pulse",
    description:
      "Multiplayer collaboration workspace with live cursors, real-time document editing, and presence awareness.",
    tech: ["Next.js", "WebSocket", "Redis", "Prisma"],
    image: "/projects/pulse.png",
    accent: "#e8722a",
    link: "#",
  },
  {
    title: "Meridian",
    description:
      "Premium e-commerce experience featuring immersive product stories, smooth micro-interactions, and personalized shopping.",
    tech: ["TypeScript", "Stripe", "Prisma", "Tailwind"],
    image: "/projects/meridian.png",
    accent: "#f59e4b",
    link: "#",
  },
  {
    title: "Aurora",
    description:
      "AI-powered design tool that generates creative assets, style variations, and layout suggestions using neural networks.",
    tech: ["Python", "TensorFlow", "React", "FastAPI"],
    image: "/projects/aurora.png",
    accent: "#7c3aed",
    link: "#",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 px-6 md:px-12 lg:px-24"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "linear-gradient(135deg, #e8722a, #f59e4b)" }}
            />
            <span className="text-brand-orange text-xs font-mono tracking-[0.2em] uppercase">
              Portfolio
            </span>
          </div>
          <h2 className="text-display-lg font-bold text-white mb-4">
            Selected <span className="text-gradient-orange">Works</span>
          </h2>
          <p className="text-brand-text-muted text-body-lg max-w-lg">
            A curated collection of projects that showcase my craft in design,
            development, and creative problem-solving.
          </p>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.link}
      className="group glass-card overflow-hidden cursor-pointer block"
      variants={cardVariants}
      whileHover={{ y: -6 }}
      style={{
        // Dynamic glow on hover
        ["--glow-color" as string]: project.accent,
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/20 to-transparent" />

        {/* Hover glow border effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `inset 0 0 40px ${project.accent}15`,
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-gradient-orange transition-colors duration-300">
            {project.title}
          </h3>
          {/* Arrow */}
          <motion.div
            className="text-brand-text-dim group-hover:text-brand-orange transition-colors mt-1"
            whileHover={{ x: 3, y: -3 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </motion.div>
        </div>

        <p className="text-brand-text-muted text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="tech-pill"
              style={{
                background: `${project.accent}10`,
                color: project.accent,
                borderColor: `${project.accent}30`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        }}
      />
    </motion.a>
  );
}

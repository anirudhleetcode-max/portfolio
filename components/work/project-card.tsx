"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { LiveDemoButton, Pill, accentBorder, accentText } from "@/components/ui/primitives";
import { REPO_URL, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const GLOW = {
  electric: "rgba(108,92,255,0.22)",
  cyan: "rgba(61,219,217,0.18)",
  amber: "rgba(255,181,71,0.18)",
} as const;

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = React.useState(false);

  return (
    <motion.article
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.75, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white-warm/10 bg-panel"
    >
      {/* Accent wash on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 50% 0%, ${GLOW[project.accent]}, transparent 60%)` }}
      />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-white-warm/10 bg-void">
        <motion.img
          src={project.image}
          alt={`Generated cover artwork for ${project.name}`}
          loading="lazy"
          decoding="async"
          width={1600}
          height={1100}
          className="h-full w-full object-cover"
          animate={{ scale: hover && !reduce ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className={cn(
              "mono rounded-full border bg-void/80 px-2.5 py-1 text-[0.625rem] tracking-widest uppercase backdrop-blur",
              accentBorder(project.accent),
              accentText(project.accent),
            )}
          >
            {project.year}
          </span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl">
            <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {project.name}
            </Link>
          </h3>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-fog transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white-warm"
          />
        </div>
        <p className={cn("mt-1 text-sm", accentText(project.accent))}>{project.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-fog">{project.summary}</p>

        <ul className="mt-5 space-y-2">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2.5 text-sm text-fog">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white-warm/40" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <Pill key={tech}>{tech}</Pill>
          ))}
          {project.stack.length > 5 && <Pill>+{project.stack.length - 5}</Pill>}
        </div>

        {/* The card itself links to the case study; these controls sit above its
            overlay so they stay independently clickable. */}
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-2.5 border-t border-white-warm/10 pt-5">
          <LiveDemoButton href={project.liveUrl} />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white-warm/20 px-4 py-2 text-sm text-white-warm transition-colors hover:border-white-warm/50"
          >
            <Github size={15} />
            Source
          </a>
        </div>
        <p className="mono relative z-10 mt-3 text-[0.6875rem] break-all text-fog/70">{project.repoPath}</p>
      </div>
    </motion.article>
  );
}

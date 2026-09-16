"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Magnetic, SplitLines } from "@/components/motion/reveal";
import { HeroCanvas } from "@/components/three/hero-canvas";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: "5", label: "Full applications in this portfolio" },
  { value: "3", label: "With accounts, roles and admin dashboards" },
  { value: "1", label: "Razorpay integration, test mode only" },
] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce ? { duration: 0 } : { duration: 0.9, delay, ease: EASE };

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pt-[var(--nav-h)]">
      {/* Animated background: a fine grid, two slow colour fields, and the 3D scene. */}
      <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-[0.55]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(108,92,255,0.18),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(61,219,217,0.12),transparent_50%)]"
      />
      <motion.div
        aria-hidden="true"
        className="absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-electric/15 blur-[120px]"
        animate={reduce ? undefined : { x: [0, 70, 0], y: [0, 50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-cyan/10 blur-[120px]"
        animate={reduce ? undefined : { x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* On a phone the scene is an ambient object in the bottom corner: centring
          it would put the lattice straight behind the paragraph. From `lg` it
          moves to the right of the copy, where it has room to be the subject. */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-[-20%] bottom-[-4%] h-[74vw] w-[74vw] opacity-45 sm:right-[-10%] sm:opacity-55 lg:top-1/2 lg:right-[-4%] lg:bottom-auto lg:h-[min(80vw,40rem)] lg:w-[min(80vw,40rem)] lg:-translate-y-1/2 lg:opacity-100">
          <HeroCanvas />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-transparent via-void/45 to-void/75 lg:hidden"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-var(--nav-h))] w-full max-w-[1320px] flex-col justify-center px-5 py-20 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fade(0.1)}
          className="eyebrow flex items-center gap-3 text-fog"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-70" />
          </span>
          Full-stack developer · Available for work
        </motion.p>

        <SplitLines
          as="h1"
          delay={0.2}
          className="display-hero mt-6 max-w-[16ch] text-balance"
          lines={[
            { text: "Building digital experiences" },
            { text: "that feel alive.", className: "accent-text" },
          ]}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fade(0.7)}
          className="mt-8 max-w-xl text-base leading-relaxed text-fog sm:text-lg"
        >
          I design and build full-stack web applications — React and Next.js on the front,
          typed APIs and real data models behind them — and I work with AI/ML where retrieval,
          search or classification actually improves the product.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fade(0.84)}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-white-warm px-6 py-3.5 text-sm font-medium text-void transition-colors hover:bg-white"
            >
              View the work
              <ArrowDown size={16} />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white-warm/20 px-6 py-3.5 text-sm text-white-warm transition-colors hover:border-white-warm/50"
            >
              Start a project
              <ArrowUpRight size={16} />
            </Link>
          </Magnetic>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={fade(1)}
          className="mt-16 grid max-w-2xl grid-cols-1 gap-6 border-t border-white-warm/10 pt-8 sm:grid-cols-3"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="mono block text-3xl text-white-warm">{stat.value}</span>
                <span className="mt-1 block text-xs leading-relaxed text-fog">{stat.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fade(1.2)}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.span
          className="mono block text-[0.625rem] tracking-[0.2em] text-fog uppercase"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}

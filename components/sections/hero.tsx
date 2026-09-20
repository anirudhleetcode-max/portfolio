"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The first screen introduces the person, not the technology. Name, a plain
 * sentence about what he does, two ways in, and the photograph as a full
 * editorial plate rather than an avatar. Everything is legible with animation
 * switched off — the motion only softens the arrival.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? { initial: undefined, animate: undefined, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section className="relative pt-[var(--nav-h)]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="grid items-end gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
          {/* ---------------- words ---------------- */}
          <div className="order-2 lg:order-1">
            <motion.p {...rise(0.05)} className="serif text-[1.375rem] text-muted sm:text-[1.5rem]">
              Hello, I&rsquo;m
            </motion.p>

            <motion.h1 {...rise(0.12)} className="display-hero mt-2 text-ink">
              Anirudh
            </motion.h1>

            <motion.p {...rise(0.2)} className="lede mt-7 max-w-[46ch]">
              I build machine-learning systems end to end &mdash; the model, the API in front of
              it, the data model underneath, the interface, and the awkward edge cases most demos
              quietly skip.
            </motion.p>

            <motion.div {...rise(0.28)} className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="#work"
                className="bg-ink px-6 py-3 text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:bg-accent"
              >
                View my work
              </Link>
              <Link
                href="#contact"
                className="border border-rule px-6 py-3 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:border-ink"
              >
                Get in touch
              </Link>
            </motion.div>

            <motion.ul
              {...rise(0.36)}
              className="mono mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[0.75rem] text-muted"
            >
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-[5px] w-[5px] rounded-full bg-accent" />
                Available for internships
              </li>
              <li>Based in India</li>
              <li>Computer science, 2024&ndash;28</li>
            </motion.ul>
          </div>

          {/* ---------------- photograph ---------------- */}
          <motion.figure
            {...rise(0.16)}
            className="order-1 m-0 lg:order-2 lg:justify-self-end"
          >
            {/* Square source, framed as a circle: the whole portrait sits inside
                the crop rather than being cut off at the shoulders. */}
            <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-full border border-rule bg-surface sm:max-w-[320px] lg:max-w-[360px]">
              <Image
                src="/img/anirudh.jpg"
                alt="Anirudh Malladi"
                width={1000}
                height={1000}
                priority
                sizes="(max-width: 639px) 280px, (max-width: 1023px) 320px, 360px"
                className="block h-full w-full object-cover"
              />
            </div>
            <figcaption className="mono mt-4 text-[0.6875rem] text-muted">
              Malladi Anirudh &middot; Bhimavaram, Andhra Pradesh
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

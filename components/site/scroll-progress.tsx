"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Reading-progress bar pinned under the navigation. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed top-0 left-0 z-[60] h-[2px] w-full origin-left bg-[linear-gradient(90deg,var(--color-electric),var(--color-cyan),var(--color-amber))]"
    />
  );
}

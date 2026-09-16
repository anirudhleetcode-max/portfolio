"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import * as React from "react";

/**
 * Cross-route entrance. Keyed on the pathname so each navigation replays it.
 *
 * Only the transition depends on `useReducedMotion()` — the markup and the
 * `initial` state are identical either way, so the server and client trees
 * always agree on hydration.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

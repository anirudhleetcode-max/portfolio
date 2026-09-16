"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * IMPORTANT — reduced motion must never change the rendered markup.
 * `useReducedMotion()` returns null during SSR and the real value after mount,
 * so branching the DOM (or `initial`) on it makes the server and client trees
 * disagree, which React reports as a hydration mismatch (error #418). Every
 * component here renders the same elements and the same `initial` state either
 * way, and expresses reduced motion purely through the transition — which is
 * never serialised into the HTML.
 */
const instant = { duration: 0 } as const;

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={reduce ? instant : { duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0.04,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : gap,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: reduce ? instant : { duration: 0.7, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

/**
 * Word-by-word headline reveal behind a mask. The full string stays in
 * `aria-label` so a screen reader hears one sentence, not a pile of spans.
 *
 * IMPORTANT — the viewport trigger lives on the heading, never on the words.
 * Each word starts translated 110% down inside an `overflow-hidden` parent, so
 * it is fully clipped; an IntersectionObserver on the word itself therefore
 * reports it as out of view and `whileInView` never fires, leaving the heading
 * permanently invisible. Observing the heading and driving the words through
 * variants breaks that deadlock.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as: Tag = "h1",
  inView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Play on scroll-into-view instead of on mount. */
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Heading = MOTION_TAGS[Tag];

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delay,
      },
    },
  };

  const word: Variants = {
    hidden: { y: "110%", opacity: 0 },
    show: { y: "0%", opacity: 1, transition: reduce ? instant : { duration: 0.9, ease: EASE } },
  };

  return (
    <Heading
      className={className}
      aria-label={text}
      variants={container}
      initial="hidden"
      {...(inView
        ? ({ whileInView: "show", viewport: { once: true, margin: "-70px" } } as const)
        : ({ animate: "show" } as const))}
    >
      {words.map((value, i) => (
        <span key={`${value}-${i}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
          <motion.span className="inline-block" variants={word}>
            {value}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Heading>
  );
}

/**
 * The same masked reveal across several lines, rendered inside a single
 * heading. The hero headline runs to two visual lines with different styling,
 * and splitting it into an <h1> plus a stray <span> would leave the page's
 * actual heading as half a sentence — so the lines are block spans inside one
 * element and `aria-label` carries the whole sentence.
 */
export function SplitLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.06,
  as: Tag = "h1",
}: {
  lines: { text: string; className?: string }[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "p";
}) {
  const reduce = useReducedMotion();
  let word = 0;

  return (
    <Tag className={className} aria-label={lines.map((line) => line.text).join(" ")}>
      {lines.map((line) => (
        <span key={line.text} aria-hidden="true" className={cn("block", lineClassName, line.className)}>
          {line.text.split(" ").map((text, i) => {
            const index = word;
            word += 1;
            return (
              <span key={`${text}-${i}`} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={
                    reduce ? instant : { duration: 0.9, delay: delay + index * stagger, ease: EASE }
                  }
                >
                  {text}
                  {"\u00A0"}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Desktop-only magnetic pull for primary CTAs. Ignored on touch and when motion is reduced. */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    setOffset({
      x: (event.clientX - (rect.left + rect.width / 2)) * strength,
      y: (event.clientY - (rect.top + rect.height / 2)) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 240, damping: 18, mass: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Section shell. Each section opens with a hairline rule carrying a small
 * number and label, which is what gives the page its editorial rhythm — the
 * numbering is real (sections run in order), not decoration.
 */
export function Section({
  id,
  eyebrow,
  index,
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  index?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-[calc(var(--nav-h)+16px)] py-20 sm:py-28", className)}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        {eyebrow && (
          <div className="section-rule mb-12 flex items-baseline gap-4 pt-4">
            {index && <span className="mono text-[0.75rem] text-accent">{index}</span>}
            <span className="mono text-[0.75rem] text-muted">{eyebrow}</span>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "mono inline-flex items-center border border-rule px-2.5 py-1 text-[0.75rem] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** The single phrase used wherever a project's deployment status is shown. */
export const statusLabel = (href: string | null) =>
  href ? "Live" : "Local demo · deployment pending";

/**
 * The live-demo control. Every project in this portfolio now has a verified
 * production URL, but the null branch is kept: if a deployment is ever taken
 * down and its variable cleared, the UI says so rather than linking nowhere.
 */
export function LiveDemoButton({ href, className }: { href: string | null; className?: string }) {
  if (!href) {
    return (
      <span
        className={cn(
          "mono inline-flex cursor-not-allowed items-center gap-2 border border-dashed border-rule px-4 py-2 text-[0.8125rem] text-muted",
          className,
        )}
        title="Not deployed — run it locally from the repository"
      >
        Local demo · deployment pending
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-[0.875rem] font-medium text-paper transition-colors duration-200 hover:bg-accent",
        className,
      )}
    >
      View project
      <span aria-hidden="true">&#8599;</span>
    </a>
  );
}

/**
 * Projects keep a per-project accent for small marks only. In this palette they
 * all resolve to the one editorial accent: a portfolio reads as one voice, and
 * three competing hues was the previous design's tell.
 */
const ACCENT_TEXT = {
  electric: "text-accent",
  cyan: "text-accent",
  amber: "text-accent",
} as const;

const ACCENT_BORDER = {
  electric: "border-rule",
  cyan: "border-rule",
  amber: "border-rule",
} as const;

const ACCENT_DOT = {
  electric: "bg-accent",
  cyan: "bg-accent",
  amber: "bg-accent",
} as const;

const ACCENT_GLOW = {
  electric: "from-transparent",
  cyan: "from-transparent",
  amber: "from-transparent",
} as const;

export type Accent = keyof typeof ACCENT_TEXT;
export const accentText = (a: Accent) => ACCENT_TEXT[a];
export const accentBorder = (a: Accent) => ACCENT_BORDER[a];
export const accentGlow = (a: Accent) => ACCENT_GLOW[a];
/** Tailwind cannot see a class built by interpolation, so accents map to literals. */
export const accentDot = (a: Accent) => ACCENT_DOT[a];

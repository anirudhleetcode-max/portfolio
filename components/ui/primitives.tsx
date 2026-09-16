import * as React from "react";
import { cn } from "@/lib/utils";

/** Section shell: consistent rhythm, an id for the nav anchors, and a label. */
export function Section({
  id,
  eyebrow,
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-[calc(var(--nav-h)+16px)] py-24 sm:py-32", className)}
    >
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        {eyebrow && (
          <p className="eyebrow mb-10 flex items-center gap-3 text-fog">
            <span className="h-px w-8 bg-white-warm/25" />
            {eyebrow}
          </p>
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
        "inline-flex items-center rounded-full border border-white-warm/12 bg-white-warm/[0.04] px-3 py-1 text-xs text-fog",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** The single phrase used wherever a project's deployment status is shown. */
export const statusLabel = (href: string | null) =>
  href ? "Live · deployed" : "Local demo · deployment pending";

/**
 * The live-demo control. `liveUrl` is null for every project in this portfolio
 * because none of them is deployed, so this renders a disabled "Local demo"
 * state rather than a link that goes nowhere. It only becomes a real anchor if
 * an actual URL is ever added to `lib/projects.ts`.
 */
export function LiveDemoButton({ href, className }: { href: string | null; className?: string }) {
  if (!href) {
    return (
      <span
        className={cn(
          "inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-white-warm/20 px-4 py-2 text-sm text-fog/80",
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
        "inline-flex items-center gap-2 rounded-full bg-white-warm px-4 py-2 text-sm font-medium text-void transition-transform hover:scale-[1.03]",
        className,
      )}
    >
      Live demo
    </a>
  );
}

const ACCENT_TEXT = {
  electric: "text-electric",
  cyan: "text-cyan",
  amber: "text-amber",
} as const;

const ACCENT_BORDER = {
  electric: "border-electric/40",
  cyan: "border-cyan/40",
  amber: "border-amber/40",
} as const;

const ACCENT_DOT = {
  electric: "bg-electric",
  cyan: "bg-cyan",
  amber: "bg-amber",
} as const;

const ACCENT_GLOW = {
  electric: "from-electric/25",
  cyan: "from-cyan/25",
  amber: "from-amber/25",
} as const;

export type Accent = keyof typeof ACCENT_TEXT;
export const accentText = (a: Accent) => ACCENT_TEXT[a];
export const accentBorder = (a: Accent) => ACCENT_BORDER[a];
export const accentGlow = (a: Accent) => ACCENT_GLOW[a];
/** Tailwind cannot see a class built by interpolation, so accents map to literals. */
export const accentDot = (a: Accent) => ACCENT_DOT[a];

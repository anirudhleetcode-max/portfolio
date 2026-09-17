"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
] as const;

/**
 * A name on the left, four words on the right, and a hairline that appears once
 * the page has moved. No pill, no blur panel, no badge — the navigation is
 * meant to be found, not noticed.
 */
export function SiteNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [solid, setSolid] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    return scrollY.on("change", (y) => setSolid(y > 24));
  }, [scrollY]);

  // A route change should never leave the sheet open behind the new page.
  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-paper transition-colors duration-300",
        solid ? "border-b border-rule" : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[var(--nav-h)] w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8"
      >
        <Link
          href="/"
          className="font-display text-[1rem] tracking-tight text-ink"
          aria-label="Anirudh — home"
        >
          Anirudh
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="link-underline text-[0.9375rem] text-muted transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center border border-rule text-ink md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-rule bg-paper md:hidden"
          >
            <ul className="mx-auto w-full max-w-[1200px] px-5 py-2 sm:px-8">
              {LINKS.map((link) => (
                <li key={link.href} className="border-b border-rule last:border-0">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-[1.5rem] tracking-tight text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

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
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  const [solid, setSolid] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    return scrollY.on("change", (y) => {
      const previous = scrollY.getPrevious() ?? 0;
      setSolid(y > 24);
      // Only hide once the header is well clear of the top, and never while the
      // mobile sheet is open.
      setHidden(!open && y > 220 && y > previous);
    });
  }, [scrollY, open]);

  // A route change should never leave the sheet open behind the new page.
  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={reduce ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "border-b border-white-warm/10 bg-void/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[var(--nav-h)] w-full max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8"
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label="ANIRUDH — home">
          <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-md border border-white-warm/15">
            <span className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-electric),var(--color-cyan))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative font-display text-sm">A</span>
          </span>
          <span className="font-display text-[0.95rem] tracking-[0.18em] uppercase">Anirudh</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative block rounded-full px-4 py-2 text-sm text-fog transition-colors duration-200 hover:text-white-warm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden rounded-full bg-white-warm px-5 py-2.5 text-sm font-medium text-void transition-transform duration-200 hover:scale-[1.03] sm:block"
          >
            Start a project
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-white-warm/15 text-white-warm md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white-warm/10 bg-void/95 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto w-full max-w-[1320px] px-5 py-4 sm:px-8">
              {LINKS.map((link) => (
                <li key={link.href} className="border-b border-white-warm/5 last:border-0">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-2xl tracking-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

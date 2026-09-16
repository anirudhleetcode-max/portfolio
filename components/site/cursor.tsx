"use client";

import { useReducedMotion } from "framer-motion";
import * as React from "react";

/**
 * Desktop cursor: a small dot that tracks exactly, plus a ring that lags
 * behind it and swells over interactive elements.
 *
 * It is opt-in per device, not per render: the ring only mounts once a
 * `(pointer: fine)` match is confirmed in an effect, and the `cursor-host`
 * class — which hides the native cursor — is added at the same moment. A touch
 * user therefore never loses their pointer, and the server markup is identical
 * for everyone.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState(false);
  const dot = React.useRef<HTMLDivElement>(null);
  const ring = React.useRef<HTMLDivElement>(null);
  const hovering = React.useRef(false);

  React.useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    setActive(true);
    document.documentElement.classList.add("cursor-host");
    return () => document.documentElement.classList.remove("cursor-host");
  }, [reduce]);

  React.useEffect(() => {
    if (!active) return;
    let raf = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...target };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const el = event.target as Element | null;
      hovering.current = Boolean(el?.closest?.("a, button, [role='button'], input, textarea, select"));
      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      eased.x += (target.x - eased.x) * 0.16;
      eased.y += (target.y - eased.y) * 0.16;
      if (ring.current) {
        const scale = hovering.current ? 1.9 : 1;
        ring.current.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ring.current.style.opacity = hovering.current ? "1" : "0.55";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
      <div
        ref={ring}
        className="absolute top-0 left-0 h-9 w-9 rounded-full border border-cyan/70 transition-[opacity] duration-200 will-change-transform"
      />
      <div
        ref={dot}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-white-warm will-change-transform"
      />
    </div>
  );
}

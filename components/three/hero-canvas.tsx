"use client";

import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import * as React from "react";

/** Heavy 3D is code-split and only mounted when it is worth the cost. */
const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

/**
 * The static stand-in. It is also what every visitor sees who prefers reduced
 * motion, has no WebGL, or has scrolled the hero out of view — so it has to
 * look deliberate rather than broken.
 */
function HeroFallback() {
  return (
    <div aria-hidden="true" className="relative h-full w-full overflow-hidden">
      <div className="absolute top-1/2 left-1/2 h-[68%] w-[68%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric/30" />
      <div className="absolute top-1/2 left-1/2 h-[48%] w-[48%] max-w-[380px] -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-full border border-cyan/25" />
      <div className="absolute top-1/2 left-1/2 h-[30%] w-[30%] max-w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(108,92,255,0.55),rgba(7,7,10,0)_70%)]" />
      <div className="absolute top-1/2 left-1/2 h-[82%] w-[82%] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(61,219,217,0.1),transparent_65%)] blur-2xl" />
    </div>
  );
}

/**
 * Any failure inside the WebGL scene (context loss, driver quirk, asset error)
 * must never take the page down — it falls back to the static stage instead.
 */
class SceneBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("[hero] 3D scene disabled after an error", error);
  }

  render() {
    return this.state.failed ? <HeroFallback /> : this.props.children;
  }
}

/**
 * Decides whether to run the 3D scene at all:
 *   - never when the user prefers reduced motion
 *   - low quality on small screens / low core counts
 *   - only while the hero is actually on screen
 */
export function HeroCanvas() {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  const [quality, setQuality] = React.useState<"high" | "low" | "off">("high");

  React.useEffect(() => {
    const smallScreen = window.matchMedia("(max-width: 640px)").matches;
    const weakDevice = (navigator.hardwareConcurrency ?? 8) <= 4;
    const noWebgl = (() => {
      try {
        const canvas = document.createElement("canvas");
        return !canvas.getContext("webgl2") && !canvas.getContext("webgl");
      } catch {
        return true;
      }
    })();
    if (noWebgl) setQuality("off");
    else if (smallScreen || weakDevice) setQuality("low");
  }, []);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry && setInView(entry.isIntersecting),
      { rootMargin: "160px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const shouldRender = !reduceMotion && quality !== "off" && inView;

  return (
    <div ref={ref} className="h-full w-full">
      {shouldRender ? (
        <SceneBoundary>
          <HeroScene quality={quality} />
        </SceneBoundary>
      ) : (
        <HeroFallback />
      )}
    </div>
  );
}

import { useEffect } from "react";
import type Lenis from "lenis";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;

export function scrollToTarget(target: string | number) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : null;
  if (lenis) {
    lenis.scrollTo(typeof target === "number" ? target : (el ?? 0), { offset: 0, duration: 1.2 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target });
  else el?.scrollIntoView();
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/** Mounts Lenis smooth scrolling (skipped with prefers-reduced-motion). */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    let cancelled = false;
    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      lenis = new LenisCtor({ lerp: 0.1, smoothWheel: true });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}

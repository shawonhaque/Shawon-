import { useEffect, useState, type RefObject } from "react";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True once (or while) the element intersects the viewport. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.2, rootMargin = "0px", once = true } = {},
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin, once]);
  return inView;
}

/**
 * Calls onProgress(0..1) as the element scrolls through the viewport.
 * 0 = element top reaches `start` of viewport height, 1 = element bottom reaches `end`.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onProgress: (p: number) => void,
  { start = 0.75, end = 0.5 } = {},
) {
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh * (start - end);
      const p = (vh * start - r.top) / total;
      onProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, onProgress, start, end]);
}

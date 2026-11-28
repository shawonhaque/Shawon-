import { useEffect } from "react";
import { App } from "./App";
import { scrollToTarget } from "@/lib/scroll";

/**
 * Renders the one-page portfolio and scrolls to a section.
 *
 * The site is a single document, so every section is also reachable at its own
 * path (/work, /about, …) for links that get shared. Retries because Lenis takes
 * over smooth scrolling once its chunk has loaded.
 */
export function SectionPage({ section }: { section: string }) {
  useEffect(() => {
    const timers = [150, 700, 1500].map((delay) =>
      window.setTimeout(() => scrollToTarget(`#${section}`), delay),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [section]);

  return <App />;
}

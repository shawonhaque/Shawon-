import { useEffect } from "react";
import { SmoothScroll } from "@/lib/scroll";
import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { About } from "./About";
import { Skills } from "./Skills";
import { Work } from "./Work";
import { Experience } from "./Experience";
import { Contact } from "./Contact";

/** Adds .is-in to every .rv / .rv-mask once it enters the viewport. */
function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    document.querySelectorAll(".rv, .rv-mask").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

export function App() {
  return (
    <>
      <SmoothScroll />
      <RevealObserver />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Contact />
      </main>
    </>
  );
}

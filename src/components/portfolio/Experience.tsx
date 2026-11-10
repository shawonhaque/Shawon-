import { useCallback, useRef, useState } from "react";
import { EXPERIENCE, PROFILE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import { scrollToTarget } from "@/lib/scroll";
import { SectionHead } from "./SectionHead";

export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const stopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lit, setLit] = useState<number>(-1);

  const onProgress = useCallback((p: number) => {
    if (spineRef.current) spineRef.current.style.transform = `scaleY(${p})`;
    const host = lineRef.current;
    if (!host) return;
    const reach = host.offsetHeight * p;
    let n = -1;
    stopRefs.current.forEach((el, i) => {
      if (el && el.offsetTop + 36 <= reach + 1) n = i;
    });
    setLit(n);
  }, []);
  useScrollProgress(lineRef, onProgress, { start: 0.7, end: 0.55 });

  const stops = [...EXPERIENCE];

  return (
    <section id="experience" className="section" aria-labelledby="exp-title">
      <div className="wrap">
        <SectionHead
          id="exp-title"
          index="04"
          label="Experience"
          title="The path"
          accent="so far."
        />
        <div ref={lineRef} className="timeline">
          <div className="timeline-track" aria-hidden />
          <div ref={spineRef} className="timeline-spine" aria-hidden />
          {stops.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => {
                stopRefs.current[i] = el;
              }}
              className={`stop ${lit >= i ? "is-lit" : ""}`}
            >
              <span className="stop-dot" aria-hidden />
              <p className="mono pt-1 text-[13px] text-mute">{s.period}</p>
              <div>
                <h3 className="text-[clamp(22px,2.4vw,32px)] font-bold leading-tight tracking-[-0.035em]">
                  {s.title}
                </h3>
                <p className="mt-1 text-ink-2">{s.place}</p>
                <ul className="mt-4 space-y-1.5 text-[15px] text-ink-2">
                  {s.detail.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="text-faint">—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div
            ref={(el) => {
              stopRefs.current[stops.length] = el;
            }}
            className={`stop ${lit >= stops.length ? "is-lit" : ""}`}
          >
            <span className="stop-dot" aria-hidden />
            <p className="mono pt-1 text-[13px] text-mute">Next</p>
            <div className="next-card">
              <h3 className="text-[clamp(22px,2.4vw,32px)] font-bold tracking-[-0.035em]">
                Your team<span className="accent">?</span>
              </h3>
              <p className="mt-2 text-ink-2">{PROFILE.availability}</p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("#contact");
                }}
                className="btn btn-ghost mt-5"
              >
                Let's talk →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

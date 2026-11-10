import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/hero/portrait-bust.webp.asset.json";
import { PROFILE, PROJECTS } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";

// Deterministic barcode widths from the name
const BARS = Array.from(PROFILE.name.replace(/\s/g, "") + "FSD")
  .flatMap((c) => [(c.charCodeAt(0) % 3) + 1, ((c.charCodeAt(0) >> 2) % 2) + 1])
  .slice(0, 34);

function IdCard() {
  const swingRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const lastPointer = useRef<string>("mouse");

  // Damped pendulum driven by pointer velocity + idle sway.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let angle = 0;
    let vel = 0;
    let lastX: number | null = null;
    let lastT = performance.now();
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (lastX !== null) {
        const dt = Math.max(16, now - lastT);
        const vx = (e.clientX - lastX) / dt;
        vel += Math.max(-1.2, Math.min(1.2, vx)) * 0.9;
      }
      lastX = e.clientX;
      lastT = now;
    };
    const loop = (t: number) => {
      const idle = Math.sin(t / 1400) * 1.2;
      const acc = -0.045 * (angle - idle) - 0.075 * vel;
      vel += acc;
      angle += vel;
      angle = Math.max(-24, Math.min(24, angle));
      if (swingRef.current)
        swingRef.current.style.transform = `rotate(${angle.toFixed(3)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={swingRef} className="lanyard">
      <div className="lanyard-strap" aria-hidden>
        <span className="lanyard-strap-text">
          {`${PROFILE.name} · ${PROFILE.role} · `.repeat(6)}
        </span>
      </div>
      <div className="lanyard-clip" aria-hidden />
      <div
        className={`idcard ${flipped ? "is-flipped" : ""}`}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`Developer ID card for ${PROFILE.name}. Press to flip.`}
        onPointerDown={(e) => (lastPointer.current = e.pointerType)}
        onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
        onClick={() => lastPointer.current !== "mouse" && setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
      >
        <div className="idcard-inner">
          <div className="idcard-face">
            <div className="idcard-band">
              <span>DEVELOPER ID</span>
              <span className="idcard-hole" aria-hidden />
            </div>
            <div className="idcard-photo">
              <div className="idcard-photo-clip">
                <img
                  src={portrait.url}
                  alt={`Portrait of ${PROFILE.name}`}
                  width={480}
                  height={600}
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-[19px] font-bold tracking-tight">
                {PROFILE.name}
              </p>
              <p className="text-[12px] text-mute">{PROFILE.role}</p>
            </div>
            <div className="idcard-rows">
              <div className="idcard-row">
                <span>Stack</span>
                <span>React · Next.js · Node.js</span>
              </div>
              <div className="idcard-row">
                <span>Status</span>
                <span>Open to work</span>
              </div>
            </div>
            <div className="idcard-foot">
              <div className="barcode" aria-hidden>
                {BARS.map((w, i) => (
                  <i
                    key={i}
                    style={{ width: w, opacity: i % 5 === 0 ? 0.5 : 1 }}
                  />
                ))}
              </div>
              <div className="holo" aria-hidden />
            </div>
          </div>

          <div className="idcard-face idcard-back">
            <p className="tag">
              <b>What I am</b>
            </p>
            <ul className="mt-4 space-y-3 text-[13.5px] leading-snug text-ink-2">
              <li>
                — {PROFILE.role}, React.js &amp; Next.js on the frontend,
                Node.js on the server.
              </li>
              <li>
                — Builder of{" "}
                {PROJECTS.map((p) => p.title)
                  .join(", ")
                  .replace(/, ([^,]*)$/, " & $1")}
                .
              </li>
              <li>
                — PostgreSQL schemas with Row Level Security on every table.
              </li>
              <li>— Performance, accessibility and security by default.</li>
              <li>— {PROFILE.availability}</li>
            </ul>
            <div className="mt-auto">
              <p className="accent text-[30px] leading-none text-ink">
                {PROFILE.name}
              </p>
              <div className="mt-1 h-px bg-line" />
              <p className="mono mt-2 text-[10px] text-mute">
                If found, say hello · {PROFILE.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div className="flex flex-col">
          <p className="tag rv">
            <b>01</b> — About
          </p>
          <h2 id="about-title" className="h-section mt-5">
            <span className="rv-mask">
              <span>
                Hi, I'm <span className="accent">Shawon.</span>
              </span>
            </span>
          </h2>
          <p
            className="lede rv mt-8"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {PROFILE.resumeSummary}
          </p>
          <p
            className="rv mt-5 text-ink"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {PROFILE.availability}
          </p>
          <div
            className="rv mt-8 flex flex-wrap gap-2"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <a
              href={PROFILE.resume}
              download={PROFILE.resumeFile}
              className="btn btn-primary"
            >
              Résumé ↓
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              GitHub ↗
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="about-center">
          <IdCard />
        </div>

        <div className="flex flex-col">
          <p className="tag rv">Quick facts</p>
          <dl className="mt-4">
            {[
              ["Role", PROFILE.role],
              ["Currently", PROFILE.currentRole],
              ["Email", PROFILE.email],
              ["Phone", PROFILE.phone],
              ["Website", PROFILE.websiteLabel],
            ].map(([k, v], i) => (
              <div
                key={k}
                className="facts-row rv"
                style={{ "--i": i } as React.CSSProperties}
              >
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <blockquote className="rv mt-auto pt-10">
            <p className="accent text-[clamp(26px,2.4vw,36px)] leading-[1.1] text-ink">
              “{PROFILE.quote}”
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

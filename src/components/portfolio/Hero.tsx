import { useEffect, useRef, useState } from "react";
import heroMp4 from "@/assets/hero/hero.mp4.asset.json";
import heroWebm from "@/assets/hero/hero.webm.asset.json";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const wantSound = useRef(true); // visitor hasn't muted yet
  const visible = useRef(true);

  // Try autoplay with sound, fall back to muted; unlock on first interaction.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const sync = () => setSoundOn(!v.muted && !v.paused);
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);
    v.addEventListener("volumechange", sync);

    v.muted = false;
    v.play()
      .then(() => setBlocked(false))
      .catch(() => {
        v.muted = true;
        setBlocked(true);
        v.play().catch(() => {});
      });

    const unlock = (e: Event) => {
      if (
        btnRef.current &&
        e.target instanceof Node &&
        btnRef.current.contains(e.target)
      )
        return;
      if (!wantSound.current) return cleanup();
      v.muted = false;
      if (visible.current) v.play().catch(() => {});
      setBlocked(false);
      cleanup();
    };
    const evs = ["pointerdown", "keydown", "touchend"] as const;
    const cleanup = () =>
      evs.forEach((ev) => window.removeEventListener(ev, unlock));
    evs.forEach((ev) => window.addEventListener(ev, unlock, { passive: true }));

    return () => {
      cleanup();
      v.removeEventListener("play", sync);
      v.removeEventListener("pause", sync);
      v.removeEventListener("volumechange", sync);
    };
  }, []);

  // Pause (and silence the voice) once less than 35% of the hero is visible.
  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.intersectionRatio >= 0.35;
        if (visible.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: [0, 0.35, 0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    if (soundOn) {
      v.muted = true;
      wantSound.current = false;
    } else {
      wantSound.current = true;
      v.muted = false;
      v.play().catch(() => {});
      setBlocked(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero"
      aria-labelledby="hero-title"
    >
      <div className="hero-ghost" aria-hidden>
        {PROFILE.firstName.toUpperCase()}
      </div>

      <div className="hero-stage">
        <video
          ref={videoRef}
          className="hero-video"
          muted
          loop
          playsInline
          preload="auto"
          aria-label={`${PROFILE.name} introducing himself: "Hi, I'm Shawon Haque. I'm a full-stack developer. I build responsive web applications, interactive websites, and AI-powered platforms."`}
        >
          <source src={heroWebm.url} type="video/webm" />
          <source src={heroMp4.url} type="video/mp4" />
        </video>
      </div>

      <div className="wrap hero-copy">
        <div className="hero-left">
          <p
            className="tag hero-anim"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <b>Hi, I'm {PROFILE.name}</b>
          </p>
          <h1
            id="hero-title"
            className="h-display mt-4 hero-anim"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Full Stack <span className="accent">Developer.</span>
          </h1>
        </div>
        <div
          className="hero-right hero-anim"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <div className="hero-ctas">
            <a
              href="#work"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#work");
              }}
            >
              Explore work
            </a>
            <a
              href="#contact"
              className="btn btn-ghost"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#contact");
              }}
            >
              Let's talk
            </a>
            <a
              href={PROFILE.resume}
              download={PROFILE.resumeFile}
              className="btn btn-ghost"
            >
              Résumé ↓
            </a>
          </div>
          <button
            ref={btnRef}
            type="button"
            onClick={toggleSound}
            className={`sound-btn ${blocked ? "is-blocked" : ""}`}
            aria-label={soundOn ? "Mute intro voice" : "Play intro with sound"}
            aria-pressed={soundOn}
          >
            {soundOn ? (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <rect
                  x="2"
                  y="1"
                  width="3.2"
                  height="12"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="8.8"
                  y="1"
                  width="3.2"
                  height="12"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path
                  d="M3 1.5v11a.6.6 0 0 0 .9.5l9-5.5a.6.6 0 0 0 0-1L3.9 1a.6.6 0 0 0-.9.5Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

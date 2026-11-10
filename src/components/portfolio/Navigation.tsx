import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { lockScroll, scrollToTarget } from "@/lib/scroll";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, w: 0 });
  const progressRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // scrolled state + progress bar
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // active section
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...NAV.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useIso(() => {
    const el = linkRefs.current[active];
    if (el) setIndicator({ x: el.offsetLeft, w: el.offsetWidth });
    else setIndicator((s) => ({ ...s, w: 0 }));
  }, [active]);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    lockScroll(false);
    scrollToTarget(id === "top" ? 0 : `#${id}`);
  };

  return (
    <>
      <nav
        className={`nav ${scrolled ? "is-scrolled" : ""}`}
        aria-label="Primary"
      >
        <div ref={progressRef} className="nav-progress" aria-hidden />
        <div className="wrap nav-bar">
          <a
            href="#top"
            className="nav-brand"
            onClick={(e) => go(e, "top")}
            aria-label={`${PROFILE.name} — back to top`}
          >
            <span className="nav-mark">{PROFILE.initials}</span>
            <span className="nav-name hidden sm:inline">{PROFILE.name}</span>
          </a>
          <div className="nav-pill hidden md:flex">
            <span
              className="nav-indicator"
              aria-hidden
              style={{
                width: indicator.w,
                transform: `translateX(${indicator.x}px)`,
                opacity: indicator.w ? 1 : 0,
              }}
            />
            {NAV.map((n) => (
              <a
                key={n.id}
                ref={(el) => {
                  linkRefs.current[n.id] = el;
                }}
                href={`#${n.id}`}
                onClick={(e) => go(e, n.id)}
                className={`nav-link ${active === n.id ? "is-active" : ""}`}
                aria-current={active === n.id ? "true" : undefined}
              >
                {n.label}
              </a>
            ))}
          </div>
          <button
            className="nav-menu-btn md:hidden"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`nav-overlay ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between">
          <span className="nav-mark bg-ink text-paper">{PROFILE.initials}</span>
          <button
            className="nav-menu-btn"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            Close
          </button>
        </div>
        <div className="mt-auto mb-auto flex flex-col gap-2">
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => go(e, n.id)}
              className="nav-overlay-link"
              style={{ "--i": i } as React.CSSProperties}
              tabIndex={open ? 0 : -1}
            >
              <span className="mono text-sm text-mute">0{i + 1}</span>
              {n.label}
            </a>
          ))}
        </div>
        <p className="tag">{PROFILE.email}</p>
      </div>
    </>
  );
}

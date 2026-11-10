import { useEffect, useRef, useState } from "react";
import { FAMILIES, SKILLS, SKILL_PROJECTS, type Family } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import { TechLogo, brandHex, isBrand } from "@/components/ui/TechLogo";
import { SectionHead } from "./SectionHead";

function useCols() {
  const [cols, setCols] = useState(8);
  useEffect(() => {
    const calc = () =>
      setCols(window.innerWidth <= 640 ? 4 : window.innerWidth <= 1020 ? 6 : 8);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return cols;
}

export function Skills() {
  const tableRef = useRef<HTMLDivElement>(null);
  const inView = useInView(tableRef, { threshold: 0.15 });
  const [filter, setFilter] = useState<Family | "All">("All");
  const [activeId, setActiveId] = useState(SKILLS[0].id);
  const cols = useCols();
  const active = SKILLS.find((s) => s.id === activeId)!;
  const projects = SKILL_PROJECTS[active.id] ?? [];
  const hex = brandHex(active.logo);

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead
          id="skills-title"
          index="02"
          label="Skills"
          title="The periodic table of"
          accent="my stack."
        />

        <div
          className="rv mb-6 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter skills by family"
        >
          {(["All", ...FAMILIES] as const).map((f) => (
            <button
              key={f}
              type="button"
              className={`filter-chip ${filter === f ? "is-on" : ""}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="skills-layout">
          <div ref={tableRef} className={`ptable ${inView ? "is-in" : ""}`}>
            {SKILLS.map((s, i) => {
              const row = Math.floor(i / cols);
              const col = i % cols;
              const dim = filter !== "All" && s.family !== filter;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`tile ${dim ? "is-dim" : ""} ${activeId === s.id ? "is-active" : ""}`}
                  style={
                    { "--d": `${(row + col) * 40}ms` } as React.CSSProperties
                  }
                  onMouseEnter={() => setActiveId(s.id)}
                  onFocus={() => setActiveId(s.id)}
                  onClick={() => setActiveId(s.id)}
                  aria-label={`${s.name}, ${s.family}`}
                >
                  <span className="tile-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="tile-sym">{s.symbol}</span>
                  <span>
                    <span className="tile-name block">{s.name}</span>
                    <span className="tile-fam block">{s.family}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <aside
            className="card inspector"
            aria-live="polite"
            aria-label="Skill details"
          >
            <div className="inspector-logo">
              {hex && (
                <span
                  className="glow"
                  style={{ background: hex }}
                  aria-hidden
                />
              )}
              <span
                key={active.id}
                className={isBrand(active.logo) ? "" : "text-ink"}
              >
                <TechLogo
                  name={active.logo}
                  size={isBrand(active.logo) ? 110 : 120}
                  title={active.name}
                />
              </span>
            </div>
            <p className="tag mt-6">
              <b>{String(SKILLS.indexOf(active) + 1).padStart(2, "0")}</b> —{" "}
              {active.family}
            </p>
            <p className="mt-2 text-[28px] font-bold leading-none tracking-tight">
              {active.name}
            </p>
            <div className="mt-auto pt-6">
              <p className="tag">Used in</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {projects.length ? (
                  projects.map((p) => (
                    <span key={p} className="chip">
                      {p}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-mute">
                    Part of the everyday toolkit.
                  </span>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

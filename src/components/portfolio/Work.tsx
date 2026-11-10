import { useState } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";
import { SectionHead } from "./SectionHead";

function NexoraUI() {
  const tabs = ["News", "Books", "Study", "Writing"];
  return (
    <div className="flex h-full flex-col gap-3 p-5 pt-12">
      <div className="card flex h-10 items-center gap-2 px-4 text-[13px] text-mute">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        Search everything…
      </div>
      <div className="flex gap-1.5">
        {tabs.map((t, i) => (
          <span
            key={t}
            className={`rounded-full px-3 py-1 text-[11px] ${i === 0 ? "bg-ink text-paper" : "card"}`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="card flex flex-col gap-2 p-3">
            <div className="ui-shimmer h-14 rounded-xl" />
            <div className="ui-bar w-4/5" />
            <div className="ui-bar w-1/2" />
          </div>
        ))}
      </div>
      <div className="card flex items-center justify-between px-4 py-2.5 text-[11px]">
        <span className="mono text-mute">posts · RLS</span>
        <span className="rounded-full bg-ink px-2 py-0.5 text-paper">
          enabled ✓
        </span>
      </div>
    </div>
  );
}

function PortfolioUI() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 pt-12">
      <div className="card flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <i className="h-2 w-2 rounded-full bg-faint" />
          <i className="h-2 w-2 rounded-full bg-faint" />
          <i className="h-2 w-2 rounded-full bg-faint" />
          <span className="mono ml-2 text-[10px] text-mute">index.html</span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <div className="ui-bar w-16" />
            <span className="flex h-5 w-9 items-center rounded-full bg-ink p-0.5">
              <i className="ml-auto h-4 w-4 rounded-full bg-paper" />
            </span>
          </div>
          <div className="ui-bar h-4 w-3/4 bg-ink" />
          <div className="ui-bar w-full" />
          <div className="ui-bar w-2/3" />
          <span className="mt-1 w-fit rounded-full px-3 py-1 text-[11px] outline-2 outline-offset-2 outline-ink outline">
            Focus visible
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
        {["Tab ⇥", "prefers-reduced-motion", "404"].map((k) => (
          <span key={k} className="card mono truncate px-2 py-2 text-ink-2">
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

function TalkingVideoUI() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 pt-12">
      <div className="card flex flex-1 flex-col items-center justify-center p-4 text-center">
        <div className="relative mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-md">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="absolute -inset-1 animate-ping rounded-full border border-ink opacity-25" />
        </div>
        <span className="mono text-[12px] font-semibold text-ink">
          3D AVATAR HERO
        </span>
        <span className="text-[11px] text-mute mt-1">
          Audio-Synced AI Character
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
        <span className="card mono px-2 py-2 text-ink-2">
          Physics Lanyard ID
        </span>
        <span className="card mono px-2 py-2 text-ink-2">
          Periodic Tech Stack
        </span>
      </div>
    </div>
  );
}

const UIS: Record<string, () => React.ReactElement> = {
  nexora: NexoraUI,
  portfolio: PortfolioUI,
  "shawon-3d": TalkingVideoUI,
};

function Panel({
  p,
  open,
  onOpen,
}: {
  p: Project;
  open: boolean;
  onOpen: () => void;
}) {
  const UI = UIS[p.id];
  return (
    <article
      className={`panel ${open ? "is-open" : ""}`}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onClick={onOpen}
      aria-labelledby={`proj-${p.id}`}
    >
      <div className="panel-spine" aria-hidden={open}>
        <span className="mono text-[12px] text-mute">{p.index}</span>
        <span className="panel-spine-title">{p.title}</span>
        <button
          type="button"
          className="plus"
          aria-label={`Open ${p.title}`}
          tabIndex={open ? -1 : 0}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <div className="panel-body">
        <div className="flex min-w-0 flex-col">
          <p className="tag">
            <b>{p.index}</b> — {p.kicker}
          </p>
          <h3
            id={`proj-${p.id}`}
            className="mt-3 text-[clamp(32px,3.4vw,52px)] font-bold leading-none tracking-[-0.045em]"
          >
            {p.title}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
            {p.description}
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-x-5 gap-y-2 text-[13.5px] sm:grid-cols-2">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-faint">—</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {p.tech.map((t) => (
              <span key={t.name} className="chip">
                <TechLogo name={t.logo} size={14} />
                {t.name}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {p.link && (
              <a
                href={p.link.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary w-fit"
              >
                {p.link.label} ↗
              </a>
            )}
            {p.github && (
              <a
                href={p.github.href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost flex items-center gap-1.5 w-fit"
              >
                <TechLogo name="github" size={14} />
                {p.github.label} ↗
              </a>
            )}
          </div>
        </div>
        <div
          className="panel-ui"
          aria-label={`Illustrative interface sketch for ${p.title}`}
          role="img"
        >
          <span className="ui-label">Illustrative UI</span>
          {UI && <UI />}
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const [open, setOpen] = useState(0);
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHead
          id="work-title"
          index="03"
          label="Selected work"
          title="Things I've"
          accent="built."
        />
        <div className="gallery rv">
          {PROJECTS.map((p, i) => (
            <Panel
              key={p.id}
              p={p}
              open={open === i}
              onOpen={() => setOpen(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

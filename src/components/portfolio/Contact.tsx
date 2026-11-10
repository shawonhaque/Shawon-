import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { TechLogo } from "@/components/ui/TechLogo";

function HopLine({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`block ${className}`} aria-hidden>
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          " "
        ) : (
          <span
            key={i}
            className="hop-letter"
            onMouseEnter={(e) => e.currentTarget.classList.add("is-hop")}
            onAnimationEnd={(e) => e.currentTarget.classList.remove("is-hop")}
          >
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const links = [
    {
      label: "Phone",
      value: PROFILE.phone,
      href: PROFILE.phoneHref,
      logo: null,
    },
    {
      label: "GitHub",
      value: PROFILE.githubLabel,
      href: PROFILE.github,
      logo: "github",
    },
    {
      label: "LinkedIn",
      value: PROFILE.linkedinLabel,
      href: PROFILE.linkedin,
      logo: null,
    },
    {
      label: "Website",
      value: PROFILE.websiteLabel,
      href: PROFILE.website,
      logo: null,
    },
  ];

  return (
    <>
      <section id="contact" className="section" aria-labelledby="contact-title">
        <div className="wrap">
          <p className="tag rv">
            <b>05</b> — Contact
          </p>
          <h2
            id="contact-title"
            className="h-display mt-6 text-[clamp(44px,9vw,148px)]"
          >
            <span className="sr-only">Let's build something together.</span>
            <HopLine text="Let's build" />
            <HopLine text="something together." className="accent" />
          </h2>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <a href={`mailto:${PROFILE.email}`} className="email-link">
                  {PROFILE.email}
                </a>
                <button
                  type="button"
                  className="chip hover:bg-ink hover:text-paper"
                  onClick={copy}
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
                <span className="sr-only" aria-live="polite">
                  {copied ? "Email copied to clipboard" : ""}
                </span>
              </div>
              <div className="mt-12 flex items-center gap-6">
                <svg
                  className="badge-spin"
                  width="128"
                  height="128"
                  viewBox="0 0 128 128"
                  aria-hidden
                >
                  <defs>
                    <path
                      id="badge-circle"
                      d="M64,64 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0"
                    />
                  </defs>
                  <text
                    className="mono"
                    fontSize="11.5"
                    letterSpacing="3.2"
                    fill="currentColor"
                  >
                    <textPath href="#badge-circle">
                      SAY HELLO · SAY HELLO · SAY HELLO ·
                    </textPath>
                  </text>
                </svg>
                <p className="max-w-[28ch] text-ink-2">
                  {PROFILE.availability}
                </p>
              </div>
            </div>
            <ul>
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="contact-link"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="mono w-20 shrink-0 text-[11px] uppercase tracking-wider text-mute">
                        {l.label}
                      </span>
                      {l.logo && <TechLogo name={l.logo} size={16} />}
                      <span className="truncate">{l.value}</span>
                    </span>
                    <span className="arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <footer className="wrap flex flex-wrap items-center justify-between gap-4 border-t border-line py-8 text-[13px] text-mute">
        <span>
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <span>Built with React &amp; TanStack Start</span>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget(0);
          }}
          className="text-ink hover:underline"
        >
          Back to top ↑
        </a>
      </footer>
    </>
  );
}

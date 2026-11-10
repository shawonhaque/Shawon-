import * as React from "react";
import {
  siJavascript,
  siTypescript,
  siHtml5,
  siCss,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siVite,
  siNodedotjs,
  siPostgresql,
  siSupabase,
  siGit,
  siGithub,
  siGithubactions,
  siLinux,
} from "simple-icons";
import {
  Layout,
  Eye,
  Search,
  Server,
  ShieldCheck,
  Code2,
  LucideProps,
} from "lucide-react";

interface BrandDef {
  title: string;
  hex: string;
  path: string;
}

const BRAND_MAP: Record<string, BrandDef> = {
  javascript: { title: "JavaScript", hex: "F7DF1E", path: siJavascript.path },
  typescript: { title: "TypeScript", hex: "3178C6", path: siTypescript.path },
  html: { title: "HTML5", hex: "E34F26", path: siHtml5.path },
  css: { title: "CSS3", hex: "1572B6", path: siCss.path },
  react: { title: "React", hex: "61DAFB", path: siReact.path },
  next: { title: "Next.js", hex: "000000", path: siNextdotjs.path },
  tailwind: { title: "Tailwind CSS", hex: "06B6D4", path: siTailwindcss.path },
  vite: { title: "Vite", hex: "646CFF", path: siVite.path },
  node: { title: "Node.js", hex: "5FA04E", path: siNodedotjs.path },
  postgres: { title: "PostgreSQL", hex: "4169E1", path: siPostgresql.path },
  supabase: { title: "Supabase", hex: "3ECF8E", path: siSupabase.path },
  git: { title: "Git", hex: "F05032", path: siGit.path },
  github: { title: "GitHub", hex: "181717", path: siGithub.path },
  actions: {
    title: "GitHub Actions",
    hex: "2088FF",
    path: siGithubactions.path,
  },
  linux: { title: "Linux", hex: "FCC624", path: siLinux.path },
  vscode: {
    title: "Visual Studio Code",
    hex: "007ACC",
    path: "M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z",
  },
};

const CONCEPT_MAP: Record<string, React.ComponentType<LucideProps>> = {
  responsive: Layout,
  a11y: Eye,
  seo: Search,
  rest: Server,
  rls: ShieldCheck,
};

export function isBrand(name: string): boolean {
  return Boolean(BRAND_MAP[name.toLowerCase()]);
}

export function brandHex(name: string): string | null {
  const brand = BRAND_MAP[name.toLowerCase()];
  return brand ? `#${brand.hex}` : null;
}

export interface TechLogoProps {
  name: string;
  size?: number;
  title?: string;
  className?: string;
}

export function TechLogo({
  name,
  size = 16,
  title,
  className = "",
}: TechLogoProps) {
  const key = name.toLowerCase();
  const brand = BRAND_MAP[key];

  if (brand) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        fill={`#${brand.hex}`}
        aria-label={title || brand.title}
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <title>{title || brand.title}</title>
        <path d={brand.path} />
      </svg>
    );
  }

  const ConceptIcon = CONCEPT_MAP[key] || Code2;
  return (
    <ConceptIcon
      size={size}
      className={className}
      aria-label={title || name}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  );
}

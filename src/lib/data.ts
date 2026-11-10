// Every string here comes from Shawon-Haque-Resume.pdf. Components only read from this file.
import resumeAsset from "@/assets/Shawon-Haque-Resume.pdf.asset.json";

export type Family =
  "Languages" | "Frontend" | "Backend" | "Databases" | "Tools";

export interface Skill {
  id: string;
  symbol: string;
  name: string;
  family: Family;
  /** Key into the TechLogo BRAND or CONCEPT map */
  logo: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: { name: string; logo: string }[];
  link?: { label: string; href: string };
  github?: { label: string; href: string };
}

export interface Stop {
  period: string;
  title: string;
  place: string;
  detail: string[];
}

export const PROFILE = {
  name: "Shawon Haque",
  firstName: "Shawon",
  initials: "SH",
  role: "Full Stack Developer",
  email: "shawonhaque141@outlook.com",
  phone: "+880 1318-123867",
  phoneHref: "tel:+8801318123867",
  github: "https://github.com/shawonhaque",
  githubLabel: "github.com/shawonhaque",
  linkedin: "https://bd.linkedin.com/in/shawon-haque",
  linkedinLabel: "linkedin.com/in/shawon-haque",
  website: "https://shawonhaque.github.io/",
  websiteLabel: "shawonhaque.github.io",
  resume: resumeAsset.url,
  resumeFile: "Shawon-Haque-Resume.pdf",
  resumeSummary:
    "Full Stack Developer working across the modern JavaScript ecosystem, with a focus on React.js and Next.js on the frontend and Node.js on the server. Builds reusable, accessible interfaces on top of clean, maintainable architecture, and treats performance, accessibility and security as defaults rather than additions.",
  availability: "Open to full-time roles, freelance work and collaboration.",
  currentRole:
    "Input Man — Store Department, Jinnat Knitwears Ltd. (DBL Group)",
  quote:
    "Performance, accessibility and security are defaults — not additions.",
};

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export const FAMILIES: Family[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "Tools",
];

export const SKILLS: Skill[] = [
  {
    id: "javascript",
    symbol: "Js",
    name: "JavaScript",
    family: "Languages",
    logo: "javascript",
  },
  {
    id: "typescript",
    symbol: "Ts",
    name: "TypeScript",
    family: "Languages",
    logo: "typescript",
  },
  { id: "html", symbol: "Ht", name: "HTML", family: "Languages", logo: "html" },
  { id: "css", symbol: "Cs", name: "CSS", family: "Languages", logo: "css" },
  {
    id: "react",
    symbol: "Re",
    name: "React.js",
    family: "Frontend",
    logo: "react",
  },
  {
    id: "next",
    symbol: "Nx",
    name: "Next.js",
    family: "Frontend",
    logo: "next",
  },
  {
    id: "tailwind",
    symbol: "Tw",
    name: "Tailwind CSS",
    family: "Frontend",
    logo: "tailwind",
  },
  { id: "vite", symbol: "Vi", name: "Vite", family: "Frontend", logo: "vite" },
  {
    id: "responsive",
    symbol: "Rl",
    name: "Responsive layout",
    family: "Frontend",
    logo: "responsive",
  },
  {
    id: "a11y",
    symbol: "Ax",
    name: "Web accessibility",
    family: "Frontend",
    logo: "a11y",
  },
  { id: "seo", symbol: "Se", name: "SEO", family: "Frontend", logo: "seo" },
  {
    id: "node",
    symbol: "No",
    name: "Node.js",
    family: "Backend",
    logo: "node",
  },
  {
    id: "rest",
    symbol: "Ra",
    name: "REST APIs",
    family: "Backend",
    logo: "rest",
  },
  {
    id: "postgres",
    symbol: "Pg",
    name: "PostgreSQL",
    family: "Databases",
    logo: "postgres",
  },
  {
    id: "supabase",
    symbol: "Sb",
    name: "Supabase",
    family: "Databases",
    logo: "supabase",
  },
  {
    id: "rls",
    symbol: "Rs",
    name: "Row Level Security",
    family: "Databases",
    logo: "rls",
  },
  { id: "git", symbol: "Gi", name: "Git", family: "Tools", logo: "git" },
  {
    id: "github",
    symbol: "Gh",
    name: "GitHub",
    family: "Tools",
    logo: "github",
  },
  {
    id: "actions",
    symbol: "Ga",
    name: "GitHub Actions",
    family: "Tools",
    logo: "actions",
  },
  {
    id: "vscode",
    symbol: "Vs",
    name: "VS Code",
    family: "Tools",
    logo: "vscode",
  },
  { id: "linux", symbol: "Lx", name: "Linux", family: "Tools", logo: "linux" },
];

export const PROJECTS: Project[] = [
  {
    id: "nexora",
    index: "01",
    title: "NEXORA",
    kicker: "Full Stack Knowledge Platform",
    description:
      "A content platform for news, books, study resources and writing, with twenty page modules across thirty-three routes, including full-text search and light/dark theming.",
    features: [
      "Seventeen-table PostgreSQL schema",
      "Row Level Security on every table",
      "Admin area with role-based access",
      "Deploys to GitHub Pages via GitHub Actions",
      "Live publisher feeds aggregated at build time",
      "Full-text search and light/dark theming",
    ],
    tech: [
      { name: "React 18", logo: "react" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Vite", logo: "vite" },
      { name: "Tailwind CSS", logo: "tailwind" },
      { name: "Supabase", logo: "supabase" },
      { name: "PostgreSQL", logo: "postgres" },
    ],
    link: {
      label: "Live Demo",
      href: "https://shawonhaque.github.io/Nexora/",
    },
    github: {
      label: "GitHub Repo",
      href: "https://github.com/shawonhaque/Nexora",
    },
  },
  {
    id: "portfolio",
    index: "02",
    title: "Personal Portfolio",
    kicker: "Responsive, accessible single-page site",
    description:
      "A responsive, accessible single-page site with case studies, no framework overhead and no build step. Deployed directly on GitHub Pages.",
    features: [
      "Light and dark themes with system detection",
      "Keyboard navigation and visible focus states",
      "Reduced-motion support",
      "Complete SEO and social metadata",
      "Structured data and a sitemap",
      "A custom 404 page & GitHub Pages deployment",
    ],
    tech: [
      { name: "HTML", logo: "html" },
      { name: "CSS", logo: "css" },
      { name: "JavaScript", logo: "javascript" },
      { name: "SEO", logo: "seo" },
      { name: "Accessibility", logo: "a11y" },
    ],
    link: {
      label: "Live Demo",
      href: "https://shawonhaque.github.io/",
    },
    github: {
      label: "GitHub Repo",
      href: "https://github.com/shawonhaque/shawonhaque.github.io",
    },
  },
  {
    id: "shawon-3d",
    index: "03",
    title: "Talking-Video Portfolio",
    kicker: "Interactive 3D Avatar & Modern SSR Portfolio",
    description:
      "Next-generation developer portfolio featuring an AI-crafted talking 3D video avatar intro with synced voice, interactive physics lanyard ID card, periodic table tech inspector, and TanStack Start SSR architecture.",
    features: [
      "Seamless talking 3D video avatar hero loop",
      "Audio-synced autoplay with visitor unlock controls",
      "Damped pendulum physics lanyard developer badge",
      "Periodic table skill stack inspector with brand glows",
      "Accordion project gallery & timeline view",
      "TanStack Start SSR + Tailwind CSS v4",
    ],
    tech: [
      { name: "React 19", logo: "react" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Tailwind CSS", logo: "tailwind" },
      { name: "Node.js", logo: "node" },
      { name: "GitHub Actions", logo: "actions" },
    ],
    link: {
      label: "Live Site",
      href: "https://shawonhaque.github.io/Shawon-/",
    },
    github: {
      label: "GitHub Repo",
      href: "https://github.com/shawonhaque/Shawon-",
    },
  },
];

/** Which projects use a given skill, derived from the résumé project write-ups. */
export const SKILL_PROJECTS: Record<string, string[]> = {
  react: ["NEXORA", "Talking-Video Portfolio"],
  typescript: ["NEXORA", "Talking-Video Portfolio"],
  vite: ["NEXORA"],
  tailwind: ["NEXORA", "Talking-Video Portfolio"],
  supabase: ["NEXORA"],
  postgres: ["NEXORA"],
  rls: ["NEXORA"],
  actions: ["NEXORA", "Talking-Video Portfolio"],
  github: ["NEXORA", "Personal Portfolio", "Talking-Video Portfolio"],
  html: ["Personal Portfolio"],
  css: ["Personal Portfolio", "Talking-Video Portfolio"],
  javascript: ["Personal Portfolio"],
  seo: ["Personal Portfolio", "Talking-Video Portfolio"],
  a11y: ["Personal Portfolio", "Talking-Video Portfolio"],
  responsive: ["Personal Portfolio", "Talking-Video Portfolio"],
  node: ["Talking-Video Portfolio"],
};

export const EXPERIENCE: Stop[] = [
  {
    period: "Jan 2025 — Present",
    title: "Input Man — Store Department",
    place: "Jinnat Knitwears Ltd. (DBL Group) · JKL Embroidery Unit",
    detail: [
      "Data entry and record keeping in the Oracle system.",
      "Processing delivery challans and related store documents.",
      "Preparing MIS reports for the store department.",
    ],
  },
];

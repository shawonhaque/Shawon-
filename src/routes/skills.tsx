import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/portfolio/SectionPage";
import { sectionHead } from "@/lib/section-meta";

export const Route = createFileRoute("/skills")({
  head: () =>
    sectionHead(
      "Skills — Shawon Haque",
      "The languages, frameworks, databases and tools Shawon Haque works with, and which projects use each.",
    ),
  component: () => <SectionPage section="skills" />,
});

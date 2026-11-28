import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/portfolio/SectionPage";
import { sectionHead } from "@/lib/section-meta";

export const Route = createFileRoute("/experience")({
  head: () =>
    sectionHead(
      "Experience — Shawon Haque",
      "Professional record and independent development work of Shawon Haque.",
    ),
  component: () => <SectionPage section="experience" />,
});

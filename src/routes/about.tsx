import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/portfolio/SectionPage";
import { sectionHead } from "@/lib/section-meta";

export const Route = createFileRoute("/about")({
  head: () =>
    sectionHead(
      "About — Shawon Haque",
      "Shawon Haque, Full Stack Developer: React.js, Next.js and Node.js, building accessible, performant web applications.",
    ),
  component: () => <SectionPage section="about" />,
});

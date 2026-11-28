import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/portfolio/SectionPage";
import { sectionHead } from "@/lib/section-meta";

export const Route = createFileRoute("/work")({
  head: () =>
    sectionHead(
      "Work — Shawon Haque",
      "Selected projects Shawon Haque has built and shipped, with source code and live demos.",
    ),
  component: () => <SectionPage section="work" />,
});

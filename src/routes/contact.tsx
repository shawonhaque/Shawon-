import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/portfolio/SectionPage";
import { sectionHead } from "@/lib/section-meta";

export const Route = createFileRoute("/contact")({
  head: () =>
    sectionHead(
      "Contact — Shawon Haque",
      "Get in touch with Shawon Haque for web development work.",
    ),
  component: () => <SectionPage section="contact" />,
});

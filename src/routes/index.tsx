import { createFileRoute } from "@tanstack/react-router";
import { App } from "@/components/portfolio/App";

const title = "Shawon Haque — Full Stack Developer";
const description =
  "Portfolio of Shawon Haque, a Full Stack Developer building accessible, performant React.js, Next.js and Node.js applications.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});

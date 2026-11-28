const SITE = "https://shawonhaque.github.io/Shawon-/";

/**
 * Head tags for a section path.
 *
 * Every section renders the same document, so the canonical stays on the root
 * and the section URLs never compete with it in search results.
 */
export function sectionHead(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE }],
  };
}

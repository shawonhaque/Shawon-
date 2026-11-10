// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// BASE_PATH lets the same code run at "/" locally and at "/Shawon-/" on GitHub Pages.
const basePath = process.env["BASE_PATH"];
const base = basePath || "/";

export default defineConfig({
  vite: { base },
  // GitHub Pages is static hosting: emit plain prerendered HTML instead of a Worker bundle.
  ...(basePath ? { nitro: false as const } : {}),
  tanstackStart: {
    router: { basepath: base },
    prerender: { enabled: true, crawlLinks: false },
    pages: [{ path: "/" }],
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

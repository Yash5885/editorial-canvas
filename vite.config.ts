import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/editorial-canvas/",
  },

  tanstackStart: {
    prerender: {
      enabled: true,
      crawlLinks: true,
      autoSubfolderIndex: true,
    },

    server: {
      entry: "server",
    },
  },
});

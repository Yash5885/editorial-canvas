import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/editorial-canvas/",
  },

  tanstackStart: {
    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
      retryCount: 0,
    },

    server: {
      entry: "server",
    },
  },

  nitro: {
    preset: "node-server",
  },
});

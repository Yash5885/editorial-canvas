import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/editorial-canvas/",

    environments: {
      ssr: {
        build: {
          rollupOptions: {
            input: "./src/server.ts",
          },
        },
      },

      nitro: {
        build: {
          rollupOptions: {
            input: "./src/server.ts",
          },
        },
      },
    },
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
    preset: "github_pages",
  },
});

// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "./bottomSheet.js"),
      name: "BottomSheet",
      fileName: (format) => `bottomsheet.${format}.js`,
      formats: ["umd", "es"],
    },
    rollupOptions: {
      external: ["animejs/lib/anime.es.js"],
      output: {
        globals: {
          "animejs/lib/anime.es.js": "anime",
        },
      },
    },
  },
});

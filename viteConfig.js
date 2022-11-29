// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // optimizeDeps: {
  //   include: ["animejs/lib/anime.es.js", "use-gesture/vanilla"],
  //   exclude: ["scroll-snap-slider"],
  // },
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "./bottomSheet.js"),
      name: "BottomSheet",
      fileName: (format) => `bottomsheet.${format}.js`,
      exports: "named",
    },
    // rollupOptions: {
    //   external: ["animejs/lib/anime.es"],
    //   output: {
    //     globals: {
    //       "animejs/lib/anime.es": "anime",
    //     },
    //   },
    // },
    // commonjsOptions: {
    //   include: ["animejs/lib/anime.es.js", "use-gesture/vanilla"],
    // },
  },
});

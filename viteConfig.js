import { resolve } from "path";
import { defineConfig } from "vite";
import replace from "@rollup/plugin-replace";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
    ],
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
  };
});

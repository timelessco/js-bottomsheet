// vite.config.js
import { resolve } from "path";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig(() => {
  return {
    root: resolve(__dirname, "src"),
    build: {
      target: browserslistToEsbuild(),
      outDir: resolve(__dirname, "dist"),
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.html"),
          shows: resolve(__dirname, "src/shows.html"),
        },
      },
    },
    plugins: [topLevelAwait()],
  };
});

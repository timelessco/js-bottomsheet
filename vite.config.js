// vite.config.js
import { resolve } from "path";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig(() => {
  return {
    root: resolve(__dirname, "website"),
    build: {
      target: browserslistToEsbuild(),
      outDir: resolve(__dirname, "dist"),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, "website/index.html"),
          maps: resolve(__dirname, "website/shows.html"),
          umd: resolve(__dirname, "website/umd.html"),
          es: resolve(__dirname, "website/es.html"),
        },
      },
    },
    plugins: [topLevelAwait()],
  };
});

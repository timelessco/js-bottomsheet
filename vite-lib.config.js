import path from "path";
import { defineConfig } from "vite";

const getPackageName = () => {
  return "bottomSheet";
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, char => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

const fileName = {
  es: `${getPackageName()}.es.js`,
  umd: `${getPackageName()}.umd.js`,
};

export default defineConfig(mode => {
  return {
    define: {
      "process.env.NODE_ENV": `'${mode}'`,
    },
    base: "./",
    build: {
      cssCodeSplit: true,
      outDir: path.resolve(__dirname, "lib"),
      lib: {
        entry: path.resolve(__dirname, "src/index.js"),
        name: getPackageNameCamelCase(),
        formats: ["es", "umd"],
        fileName: format => fileName[format],
      },
      rollupOptions: {
        external: ["animejs/lib/anime.es"],
        output: {
          globals: {
            "animejs/lib/anime.es": "anime",
          },
        },
      },
    },
  };
});

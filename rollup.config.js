import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";
import filesize from "rollup-plugin-filesize";

import { defineConfig } from "rollup";

const kebabToPascalCase = (string = "") =>
  string.replace(/(^\w|-\w)/g, (replaceString) =>
    replaceString.replace(/-/, "").toUpperCase()
  );

const CONFIG_BABEL = {
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  exclude: "node_modules/**",
  babelHelpers: "bundled",
};

const CONFIG_REPLACE = {
  preventAssignment: true,
  "process.env.NODE_ENV": JSON.stringify("production"),
};

const CONFIG_TERSER = {
  output: {
    comments: false,
  },
};

const CONFIG_FILESIZE = {
  showBrotliSize: true,
};

const CONFIG_RESOLVE = {
  extensions: [".js", ".jsx", ".ts", ".tsx"],
};

const CONFIG_COMMONJS = {
  include: "node_modules/**",
};

const CONFIG_EXTERNAL = ["animejs/lib/anime.es.js"];

const CONFIG_GLOBALS = {
  globals: {
    "animejs/lib/anime.es.js": "anime",
  },
};

export default defineConfig([
  {
    input: "bottomSheet.js",
    output: [
      {
        file: `lib/bottomsheet.cjs.js`,
        format: "cjs",
        strict: true,
        sourcemap: true,
        exports: "auto",
        ...CONFIG_GLOBALS,
      },
      {
        file: `lib/bottomsheet.esm.js`,
        format: "esm",
        strict: true,
        sourcemap: true,
        ...CONFIG_GLOBALS,
      },
      {
        file: `lib/bottomsheet.umd.js`,
        format: "umd",
        strict: true,
        sourcemap: false,
        name: "BottomSheet",
        plugins: [terser(CONFIG_TERSER)],
        ...CONFIG_GLOBALS,
      },
    ],
    external: CONFIG_EXTERNAL,
    plugins: [
      replace(CONFIG_REPLACE),
      resolve(CONFIG_RESOLVE),
      babel(CONFIG_BABEL),
      commonjs(CONFIG_COMMONJS),
      filesize(CONFIG_FILESIZE),
    ],
  },
]);

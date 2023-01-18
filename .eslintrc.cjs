/** @type {import('eslint').Linter.Config} */
const config = {
  env: {
    browser: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      presets: ["@babel/preset-env"],
    },
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  plugins: ["import"],
  rules: {
    "no-console": "off",
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.config.js"] },
    ],
    "import/prefer-default-export": "off",
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
};

module.exports = config;

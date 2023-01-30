/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  env: {
    es2022: true,
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
  extends: ["eslint:recommended", "airbnb-base", "plugin:prettier/recommended"],
  plugins: ["import"],
  rules: {
    // eslint core
    // Allow console.log in development
    "no-console": "off",
    // Explicitly allow unused variables starting with _ (e.g. _req, _res) to
    // indicate that they are unused on purpose
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "func-names": "off",
    // Allow reassigning props in react
    "no-param-reassign": ["error", { props: false }],
    // Use function hoisting to improve code readability
    "no-use-before-define": "off",
    // This is a personal preference doesn't affect code readability or performance
    "no-underscore-dangle": "off",

    // import rules
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
  },
};

module.exports = config;

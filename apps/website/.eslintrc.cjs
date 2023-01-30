module.exports = {
  root: true,
  extends: ["../../.eslintrc.base.cjs"],
  ignorePatterns: ["dist"],
  overrides: [
    {
      files: ["./*.{js,cjs}"],
      env: {
        node: true,
      },
    },
    {
      files: ["./src/**/*.js"],
      env: {
        browser: true,
      },
    },
  ],
};

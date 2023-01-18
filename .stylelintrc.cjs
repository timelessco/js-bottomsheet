module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  rules: {
    // Suppress the following rules as they are already handled by Prettier
    "value-list-comma-newline-after": null,
    "declaration-colon-newline-after": null,
    "max-line-length": 100,

    // Add your own rules here
    // Need vendor prefix for the browser support
    "property-no-vendor-prefix": null,
    "value-no-vendor-prefix": null,
    "import-notation": null,
  },
};

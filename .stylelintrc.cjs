module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-clean-order"],
  rules: {
    // Add your own rules here
    // Need vendor prefix for the browser support
    "property-no-vendor-prefix": null,
    "value-no-vendor-prefix": null,
    "import-notation": null,
  },
};

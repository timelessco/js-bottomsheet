module.exports = {
  // max 80 characters per line
  printWidth: 80,
  // use 2 spaces for indentation
  tabWidth: 2,
  // use spaces instead of indentations
  useTabs: false,
  // semicolon at the end of the line
  semi: true,
  // use single quotes
  singleQuote: false,
  // object's key is quoted only when necessary
  quoteProps: "as-needed",
  // use double quotes instead of single quotes in jsx
  jsxSingleQuote: false,
  // no comma at the end
  trailingComma: "all",
  // spaces are required at the beginning and end of the braces
  bracketSpacing: true,
  // brackets are not required for arrow function parameter, when there is only one parameter
  arrowParens: "avoid",
  // format the entire contents of the file
  rangeStart: 0,
  rangeEnd: Infinity,
  // no need to write the beginning @prettier of the file
  requirePragma: false,
  // No need to automatically insert @prettier at the beginning of the file
  insertPragma: false,
  // use default break criteria
  proseWrap: "always",
  // decide whether to break the html according to the display style
  htmlWhitespaceSensitivity: "css",
  // vue files script and style tags indentation
  vueIndentScriptAndStyle: false,
  // lf for newline
  endOfLine: "lf",
  // formats quoted code embedded
  embeddedLanguageFormatting: "auto",

  // Plugins
  plugins: ["prettier-plugin-pkg", "@ianvs/prettier-plugin-sort-imports"],

  // @ianvs/prettier-plugin-sort-imports
  importOrder: [
    // Packages.
    // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
    "^@?\\w",
    "",
    // Absolute imports and other imports such as Vue-style `@/foo`.
    // Anything that does not start with a dot.
    "^../",
    "",
    "^./",
    "",

    // Relative imports.
    // Anything that starts with two dots.

    // Style imports.
    "^.+\\.s?css$",
  ],
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};

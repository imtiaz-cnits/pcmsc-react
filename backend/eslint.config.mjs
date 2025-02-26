// import globals from "globals";
// import pluginJs from "@eslint/js";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
// ];

// new
import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 12, // ECMAScript version 12
      globals: {
        ...globals.browser, // Use browser global variables
        commonjs: true, // Enable CommonJS global variables
        node: true, // Enable Node.js global variables
      },
    },
  },
  pluginJs.configs.recommended,
  {
    languageOptions: {
      globals: {
        commonjs: true, // Allow CommonJS environment variables
        node: true, // Allow Node.js environment variables
      },
    },
    rules: {
      "no-console": 0, // Allow console statements
      indent: 0, // No specific indentation rules
      "prettier/prettier": [
        "error",
        {
          trailingComma: "es5", // Trailing commas for ES5
          singleQuote: true, // Use single quotes
          printWidth: 100, // Print width of 100 characters
          tabWidth: 4, // Tab width of 4 spaces
          semi: true, // Use semicolons
        },
      ],
    },
    plugins: ["prettier"], // Use Prettier plugin
  },
];

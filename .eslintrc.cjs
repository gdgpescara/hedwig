module.exports = {
  // ...
  extends: [
    "eslint:recommended",
    "plugin:astro/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
  },
  env: {
    browser: true,
    node: true,
  },
  globals: {
    window: true,
    module: true,
    google: true,
  },
  // ...
  overrides: [
    {
      // Define the configuration for React files.
      files: ["*.tsx"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
      ],
      rules: {
        // override/add rules settings here, such as:
        // "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },

    // ...
  ],
};

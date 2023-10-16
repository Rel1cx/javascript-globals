/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  env: {
    browser: false,
    es2024: true,
    node: true,
  },
  plugins: ["filenames-simple"],
  extends: ["with-tsconfig", "plugin:perfectionist/recommended-natural", "plugin:filenames-simple/recommended"],
  rules: {
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
    "array-callback-return": "off",
    "eslint-plugin/require-meta-docs-url": "off",
    "filenames-simple/named-export": "off",
    "import-access/jsdoc": ["error"],
    "max-len": "off",
    "newline-before-return": "warn",
    "no-console": "off",
    "perfectionist/sort-exports": "off",
    "perfectionist/sort-imports": "off",
    "perfectionist/sort-named-imports": "off",
    "perfectionist/sort-object-types": "off",
    "perfectionist/sort-objects": [
      "warn",
      {
        type: "natural",
        "always-on-top": ["window", "self", "document", "name"],
        order: "asc",
      },
    ],
    "perfectionist/sort-union-types": [
      "warn",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "prefer-object-has-own": "error",
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
      },
    ],
    "regexp/no-unused-capturing-group": "off",
    "regexp/prefer-named-capture-group": "off",
    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": "warn",
    "unicorn/new-for-builtins": "off",
    "unicorn/no-array-method-this-argument": "off",
    "unicorn/template-indent": [
      "warn",
      {
        indent: 4,
      },
    ],
  },
  overrides: [
    {
      files: ["./scripts/**/*.ts"],
      rules: {
        "@typescript-eslint/no-floating-promises": "off",
        "no-await-in-loop": "off",
      },
    },
  ],
};

module.exports = config;

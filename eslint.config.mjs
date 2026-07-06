import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import noInlineJsxPlugin from "./custom_lint_rules/no-inline-jsx.mjs";
import singleComponentPlugin from "./custom_lint_rules/single_component_plugin.mjs";
import noComplexInlineJsxPlugin from "./custom_lint_rules/no-complex-inline-jsx.mjs";
import imageSrcSnakeCasePlugin from "./custom_lint_rules/image-src-snake-case.mjs";

export default [
  {
    ignores: [
      "node_modules/**",
      "out/**",
      ".next/**",
      ".history/**",
      "next-env.d.ts",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "custom-jsx": noInlineJsxPlugin,
      "single-component": singleComponentPlugin,
      "no-complex-jsx": noComplexInlineJsxPlugin,
      "image-src": imageSrcSnakeCasePlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      camelcase: ["error", { properties: "never" }],
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "custom-jsx/no-inline-jsx-decl": "error",
      "single-component/one-component-per-file": "error",
      "no-complex-jsx/no-complex-inline-jsx": "error",
      "image-src/image-src-snake-case": "error",
      "react/forbid-dom-props": ["error", { forbid: ["style"] }],
      "react/forbid-component-props": ["error", { forbid: ["style"] }],
    },
  },
  {
    // Cloudflare Workers types (Response, Headers, ReadableStream) are incompatible
    // with the standard web types — assertions are required to bridge them.
    files: ["functions/**/*.ts"],
    rules: {
      "@typescript-eslint/consistent-type-assertions": "off",
    },
  },
];

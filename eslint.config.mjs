import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import noInlineJsxPlugin from "./custom_lint_rules/no-inline-jsx.mjs";
import singleComponentPlugin from "./custom_lint_rules/single_component_plugin.mjs";
import noComplexInlineJsxPlugin from "./custom_lint_rules/no-complex-inline-jsx.mjs";

export default [
  {
    ignores: ["supabase/**", "node_modules/**", "out/**", ".next/**"],
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
      camelcase: "error",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "custom-jsx/no-inline-jsx-decl": "error",
      "single-component/one-component-per-file": "error",
      "no-complex-jsx/no-complex-inline-jsx": "error",
      "react/forbid-dom-props": ["error", { forbid: ["style"] }],
      "react/forbid-component-props": ["error", { forbid: ["style"] }],
    },
  },
];

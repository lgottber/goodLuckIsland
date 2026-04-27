/** @type {import('eslint').Rule.RuleModule} */
const noInlineJsxDecl = {
  create(context) {
    return {
      VariableDeclarator(node) {
        const init = node.init;
        if (init?.type === "JSXElement" || init?.type === "JSXFragment") {
          context.report({
            node: init,
            message:
              "Inline JSX declarations are disallowed. Return JSX directly or use a component function.",
          });
        }
      },
    };
  },
};

export default {
  name: "custom-jsx-rules",
  rules: {
    "no-inline-jsx-decl": noInlineJsxDecl,
  },
};

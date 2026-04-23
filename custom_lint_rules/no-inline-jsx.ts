// no-inline-jsx.ts
const plugin: Deno.lint.Plugin = {
  name: "custom-jsx-rules",
  rules: {
    "no-inline-jsx-decl": {
      create(context) {
        return {
          // Triggered for variable declarations: const x = <div />
          VariableDeclarator(node) {
            const init = node.init;
            if (
              init?.type === "JSXElement" || 
              init?.type === "JSXFragment"
            ) {
              context.report({
                node: init,
                message: "Inline JSX declarations are disallowed. Return JSX directly or use a component function.",
              });
            }
          },
        };
      },
    },
  },
};

export default plugin;


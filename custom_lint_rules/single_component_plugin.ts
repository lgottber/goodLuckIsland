export const SingleComponentPlugin: Deno.lint.Plugin = {
  name: "single-component-plugin",
  rules: {
    "one-component-per-file": {
      create(context) {
        const fnStack: Array<{ node: unknown; hasJSX: boolean }> = [];
        let componentCount = 0;

        function enterFn(node: unknown) {
          fnStack.push({ node, hasJSX: false });
        }

        function exitFn() {
          const fn = fnStack.pop();
          if (fn?.hasJSX && fnStack.length === 0) {
            componentCount++;
            if (componentCount > 1) {
              context.report({
                // deno-lint-ignore no-explicit-any
                node: fn.node as any,
                message: "Only one component declaration allowed per file.",
              });
            }
          }
        }

        function markJSX() {
          if (fnStack.length > 0) {
            fnStack[fnStack.length - 1].hasJSX = true;
          }
        }

        return {
          FunctionDeclaration: enterFn,
          "FunctionDeclaration:exit": exitFn,
          FunctionExpression: enterFn,
          "FunctionExpression:exit": exitFn,
          ArrowFunctionExpression: enterFn,
          "ArrowFunctionExpression:exit": exitFn,
          JSXElement: markJSX,
          JSXFragment: markJSX,
        };
      },
    },
  },
};

export default SingleComponentPlugin;

/** @type {import('eslint').Rule.RuleModule} */
const oneComponentPerFile = {
  create(context) {
    const fnStack = [];
    let componentCount = 0;

    function enterFn(node) {
      fnStack.push({ node, hasJSX: false });
    }

    function exitFn() {
      const fn = fnStack.pop();
      if (fn?.hasJSX && fnStack.length === 0) {
        componentCount++;
        if (componentCount > 1) {
          context.report({
            node: fn.node,
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
};

export default {
  name: "single-component-plugin",
  rules: {
    "one-component-per-file": oneComponentPerFile,
  },
};

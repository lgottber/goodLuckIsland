// deno-lint-ignore-file no-explicit-any
const ARRAY_METHODS = new Set(["map", "flatMap"]);

function jsxDepth(node: any): number {
  const children: any[] = node.children ?? [];
  let max = 0;
  for (const child of children) {
    if (child.type === "JSXElement" || child.type === "JSXFragment") {
      max = Math.max(max, jsxDepth(child));
    }
  }
  return 1 + max;
}

function getCallbackJSX(callback: any): any[] {
  const body = callback?.body;
  if (!body) return [];
  if (body.type === "JSXElement" || body.type === "JSXFragment") {
    return [body];
  }
  if (body.type === "BlockStatement") {
    const results: any[] = [];
    for (const stmt of body.body ?? []) {
      if (
        stmt.type === "ReturnStatement" &&
        (stmt.argument?.type === "JSXElement" ||
          stmt.argument?.type === "JSXFragment")
      ) {
        results.push(stmt.argument);
      }
    }
    return results;
  }
  return [];
}

function getConditionalJSX(expr: any): any[] {
  const results: any[] = [];
  if (expr.type === "LogicalExpression") {
    const right = expr.right;
    if (right.type === "JSXElement" || right.type === "JSXFragment") {
      results.push(right);
    }
  }
  if (expr.type === "ConditionalExpression") {
    for (const branch of [expr.consequent, expr.alternate]) {
      if (branch.type === "JSXElement" || branch.type === "JSXFragment") {
        results.push(branch);
      }
    }
  }
  return results;
}

const plugin: Deno.lint.Plugin = {
  name: "no-complex-inline-jsx",
  rules: {
    "no-complex-inline-jsx": {
      create(context) {
        return {
          JSXExpressionContainer(node: any) {
            const expr = node.expression;
            if (!expr) return;

            const jsxNodes: any[] = [];

            if (
              expr.type === "CallExpression" &&
              expr.callee?.type === "MemberExpression" &&
              ARRAY_METHODS.has(expr.callee.property?.name)
            ) {
              jsxNodes.push(...getCallbackJSX(expr.arguments?.[0]));
            }

            if (
              expr.type === "LogicalExpression" ||
              expr.type === "ConditionalExpression"
            ) {
              jsxNodes.push(...getConditionalJSX(expr));
            }

            for (const jsx of jsxNodes) {
              if (jsxDepth(jsx) > 1) {
                context.report({
                  node: jsx,
                  message:
                    "Complex JSX inside a loop or conditional must be extracted into its own component.",
                });
              }
            }
          },
        };
      },
    },
  },
};

export default plugin;

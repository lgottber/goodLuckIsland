/** @type {import('eslint').Rule.RuleModule} */
const imageSrcSnakeCase = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      notSnakeCase:
        'Image filename "{{filename}}" must be snake_case (lowercase letters, numbers, and underscores only).',
    },
  },
  create(context) {
    const imageExtensions = /\.(png|jpg|jpeg|gif|svg|webp|avif|bmp|ico)$/i;
    const snakeCasePattern = /^[a-z0-9_]+$/;

    function checkImagePath(node, value) {
      if (typeof value !== "string") return;
      if (!imageExtensions.test(value)) return;

      const basename = value.split("/").pop() ?? "";
      const filename = basename.replace(imageExtensions, "");

      if (!snakeCasePattern.test(filename)) {
        context.report({
          node,
          messageId: "notSnakeCase",
          data: { filename },
        });
      }
    }

    return {
      JSXAttribute(node) {
        const value = node.value;
        if (!value || value.type !== "Literal") return;
        checkImagePath(value, value.value);
      },
    };
  },
};

export default {
  name: "image-src-snake-case-rules",
  rules: {
    "image-src-snake-case": imageSrcSnakeCase,
  },
};

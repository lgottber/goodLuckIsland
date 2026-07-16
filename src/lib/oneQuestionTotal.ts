// Bounds the "total question count" query param used to size the answers
// array in api/one-question/answers/route.ts. Without this, a crafted
// `?total=` value would be passed straight to `Array(total)`, letting an
// authenticated caller force a huge allocation on the edge runtime.
export const MAX_ONE_QUESTION_TOTAL = 200;

export function parseAnswerTotal(param: string | null): number {
  const n = param ? parseInt(param, 10) : 0;
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, MAX_ONE_QUESTION_TOTAL);
}

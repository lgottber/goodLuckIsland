export function resolveTagLabels(tagIds: number[], labelMap: Map<number, string>): string[] {
  return tagIds.map((id) => labelMap.get(id)).filter((label): label is string => label !== undefined);
}

// Decodes the `tags` field off a content_viewed event's JSON properties
// blob (Analytics Engine's SQL dialect has no JSON functions, so every AE
// query decodes blob2 in JS -- see getTopTagsForUser in
// analyticsQuery.server.ts). Rejects non-number values outright rather
// than coercing with Number(), since Number(null) === 0 would otherwise
// smuggle a bogus tag id 0 in.
export function parseContentViewedTagIds(properties: unknown): number[] {
  let parsed: { tags?: unknown };
  try {
    parsed = JSON.parse(String(properties));
  } catch {
    return [];
  }
  if (!Array.isArray(parsed.tags)) return [];
  const tagIds = parsed.tags.filter((v): v is number => typeof v === "number" && Number.isInteger(v));
  return [...new Set(tagIds)];
}

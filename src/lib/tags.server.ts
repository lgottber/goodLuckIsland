import { getDb } from "./db.server";

export interface TagRow {
  id: number;
  label: string;
}

// The tag catalog is small (admin-curated), so content routes fetch the
// whole thing once per request rather than filtering by the ids actually
// referenced -- simpler than collecting distinct ids across a result set.
export async function fetchTagLabelMap(): Promise<Map<number, string>> {
  const db = getDb();
  const { results } = await db.prepare("SELECT id, label FROM tags").all<TagRow>();
  return new Map((results ?? []).map((t) => [t.id, t.label]));
}

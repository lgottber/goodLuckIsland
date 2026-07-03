import { NextRequest, NextResponse } from "next/server";
import { getDb, parseJson } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const { results } = await db
    .prepare(
      "SELECT id, taken_at, scores FROM pinwirl_results WHERE user_id = ? ORDER BY taken_at DESC",
    )
    .bind(member.sub)
    .all<{ id: string; taken_at: string; scores: string }>();

  // scores is stored as JSON-encoded text in D1 (was jsonb in Postgres) --
  // parse back to an object so the wire shape matches what
  // pinwirlHistoryApi.ts's jsonToScores() expects.
  const rows = (results ?? []).map((r) => ({
    id: r.id,
    taken_at: r.taken_at,
    scores: parseJson<Record<string, unknown>>(r.scores, {}),
  }));

  return NextResponse.json(rows);
}

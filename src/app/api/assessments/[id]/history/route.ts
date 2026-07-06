import { NextRequest, NextResponse } from "next/server";
import { getDb, parseJson } from "../../../../../lib/db.server";
import { verifyMember } from "../../../../../lib/auth.server";

export const runtime = "edge";

// Mirrors src/app/api/pinwirl/history/route.ts, scoped to one assessment.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const db = getDb();
  const { results } = await db
    .prepare(
      "SELECT id, taken_at, scores FROM assessment_results WHERE assessment_id = ? AND user_id = ? ORDER BY taken_at DESC",
    )
    .bind(id, member.sub)
    .all<{ id: string; taken_at: string; scores: string }>();

  const rows = (results ?? []).map((r) => ({
    id: r.id,
    taken_at: r.taken_at,
    scores: parseJson<Record<string, number>>(r.scores, {}),
  }));

  return NextResponse.json(rows);
}

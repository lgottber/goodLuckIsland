import { NextRequest, NextResponse } from "next/server";
import { getDb, newId, toJson, nowIso } from "../../../../../lib/db.server";
import { verifyMember } from "../../../../../lib/auth.server";

export const runtime = "edge";

interface AnswerRow {
  questionId: string;
  answer: string;
}

// Scoring is computed client-side (same pattern as pinwirl/answers,
// public non-sensitive question/dimension data + a pure scoring
// function) -- but unlike Pinwirl's fixed rubric, the scoring RULES here
// are admin-authored data a client could otherwise spoof, so submitted
// scores are clamped to [0,100] and any dimension key not actually
// configured for this assessment is dropped, rather than trusted as-is.
function sanitizeScores(
  scores: Record<string, unknown>,
  validDimensions: Set<string>,
): Record<string, number> {
  const clean: Record<string, number> = {};
  for (const [dimension, value] of Object.entries(scores)) {
    if (!validDimensions.has(dimension.trim().toLowerCase())) continue;
    const num = Number(value);
    if (!Number.isFinite(num)) continue;
    clean[dimension] = Math.min(100, Math.max(0, num));
  }
  return clean;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const payload: { rows?: AnswerRow[]; scores?: Record<string, unknown> } = await request.json();
  const { rows, scores } = payload;
  if (!Array.isArray(rows) || !scores) {
    return NextResponse.json({ error: "rows and scores are required" }, { status: 400 });
  }

  const db = getDb();
  const { results: dimensionRows } = await db
    .prepare("SELECT name FROM assessment_dimensions WHERE assessment_id = ?")
    .bind(id)
    .all<{ name: string }>();
  const validDimensions = new Set(
    (dimensionRows ?? []).map((d) => d.name.trim().toLowerCase()),
  );

  const now = nowIso();
  const resultId = newId();
  const statements = rows.map((r) =>
    db
      .prepare(
        "INSERT INTO assessment_answers (id, user_id, question_id, result_id, answer, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
      )
      .bind(newId(), member.sub, r.questionId, resultId, r.answer, now, now),
  );
  statements.push(
    db
      .prepare(
        "INSERT INTO assessment_results (id, assessment_id, user_id, taken_at, scores) VALUES (?, ?, ?, ?, ?)",
      )
      .bind(resultId, id, member.sub, now, toJson(sanitizeScores(scores, validDimensions))),
  );
  statements.push(
    db
      .prepare(
        `UPDATE assessment_assignments SET status = 'completed', updated_at = ?
         WHERE assessment_id = ? AND user_id = ? AND unassigned_at IS NULL`,
      )
      .bind(now, id, member.sub),
  );
  await db.batch(statements);

  return new NextResponse(null, { status: 204 });
}

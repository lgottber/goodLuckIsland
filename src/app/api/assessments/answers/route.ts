import { NextRequest, NextResponse } from "next/server";
import { getDb, newId, nowIso } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

interface AnswerRow {
  questionId: string;
  answer: string;
}

export async function POST(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload: { assessmentId?: string; rows?: AnswerRow[] } = await request.json();
  const { assessmentId, rows } = payload;
  if (!assessmentId || !Array.isArray(rows)) {
    return NextResponse.json(
      { error: "assessmentId and rows are required" },
      { status: 400 },
    );
  }

  const db = getDb();
  const now = nowIso();
  const statements = rows.map((r) =>
    db
      .prepare(
        `INSERT INTO assessment_answers (id, user_id, assessment_id, question_id, answer, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT (user_id, question_id) DO UPDATE SET answer = excluded.answer, updated_at = excluded.updated_at`,
      )
      .bind(newId(), member.sub, assessmentId, r.questionId, r.answer, now, now),
  );
  statements.push(
    db
      .prepare(
        `INSERT INTO assessment_completions (id, assessment_id, user_id, status, created_at, updated_at)
         VALUES (?, ?, ?, 'completed', ?, ?)
         ON CONFLICT (assessment_id, user_id) DO UPDATE SET status = 'completed', updated_at = excluded.updated_at`,
      )
      .bind(newId(), assessmentId, member.sub, now, now),
  );
  await db.batch(statements);

  return new NextResponse(null, { status: 204 });
}

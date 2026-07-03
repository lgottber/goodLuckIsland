import { NextRequest, NextResponse } from "next/server";
import { getDb, newId, nowIso } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const { results } = await db
    .prepare(
      "SELECT question_key, answer FROM past_person_answers WHERE user_id = ?",
    )
    .bind(member.sub)
    .all<{ question_key: string; answer: string }>();

  const map: Record<string, string> = {};
  for (const row of results ?? []) {
    map[row.question_key] = row.answer;
  }
  return NextResponse.json(map);
}

export async function POST(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload: { questionKey?: string; answer?: string } =
    await request.json();
  const { questionKey, answer } = payload;
  if (!questionKey || typeof answer !== "string") {
    return NextResponse.json(
      { error: "questionKey and answer are required" },
      { status: 400 },
    );
  }

  const db = getDb();
  await db
    .prepare(
      `INSERT INTO past_person_answers (id, user_id, question_key, answer, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(user_id, question_key) DO UPDATE SET answer = excluded.answer, updated_at = excluded.updated_at`,
    )
    .bind(newId(), member.sub, questionKey, answer, nowIso())
    .run();

  return new NextResponse(null, { status: 204 });
}

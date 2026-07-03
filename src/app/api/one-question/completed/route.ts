import { NextRequest, NextResponse } from "next/server";
import { getDb, toBool } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const row = await db
    .prepare(
      "SELECT one_question_challenge FROM users_seven_step_process WHERE user_id = ?",
    )
    .bind(member.sub)
    .first<{ one_question_challenge: number }>();

  return NextResponse.json(toBool(row?.one_question_challenge));
}

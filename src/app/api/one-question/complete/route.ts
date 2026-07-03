import { NextRequest, NextResponse } from "next/server";
import { getDb, fromBool } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  await db
    .prepare(
      `INSERT INTO users_seven_step_process (user_id, one_question_challenge)
       VALUES (?, ?)
       ON CONFLICT(user_id) DO UPDATE SET one_question_challenge = excluded.one_question_challenge`,
    )
    .bind(member.sub, fromBool(true))
    .run();

  return new NextResponse(null, { status: 204 });
}

import { NextRequest, NextResponse } from "next/server";
import { getDb, nowIso } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload: { id?: string } = await request.json();
  const { id } = payload;
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const db = getDb();
  await db
    .prepare(
      "UPDATE notifications SET hidden_at = ? WHERE id = ? AND user_id = ?",
    )
    .bind(nowIso(), id, member.sub)
    .run();

  return new NextResponse(null, { status: 204 });
}

import { NextRequest, NextResponse } from "next/server";
import { getDb, fromBool } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

export async function PATCH(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload: { emailEnabled?: boolean } = await request.json();
  const { emailEnabled } = payload;
  if (typeof emailEnabled !== "boolean") {
    return NextResponse.json(
      { error: "emailEnabled must be a boolean" },
      { status: 400 },
    );
  }

  const db = getDb();
  await db
    .prepare("UPDATE users SET notifications_email = ? WHERE id = ?")
    .bind(fromBool(emailEnabled), member.sub)
    .run();

  return new NextResponse(null, { status: 204 });
}

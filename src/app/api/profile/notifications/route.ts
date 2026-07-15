import { NextRequest, NextResponse } from "next/server";
import { getDb, fromBool } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

export async function PATCH(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload: { emailEnabled?: boolean; inAppEnabled?: boolean } = await request.json();
  const { emailEnabled, inAppEnabled } = payload;
  if (emailEnabled === undefined && inAppEnabled === undefined) {
    return NextResponse.json(
      { error: "emailEnabled or inAppEnabled must be provided" },
      { status: 400 },
    );
  }
  if (emailEnabled !== undefined && typeof emailEnabled !== "boolean") {
    return NextResponse.json(
      { error: "emailEnabled must be a boolean" },
      { status: 400 },
    );
  }
  if (inAppEnabled !== undefined && typeof inAppEnabled !== "boolean") {
    return NextResponse.json(
      { error: "inAppEnabled must be a boolean" },
      { status: 400 },
    );
  }

  const sets: string[] = [];
  const values: number[] = [];
  if (emailEnabled !== undefined) {
    sets.push("notifications_email = ?");
    values.push(fromBool(emailEnabled));
  }
  if (inAppEnabled !== undefined) {
    sets.push("notifications_in_app = ?");
    values.push(fromBool(inAppEnabled));
  }

  const db = getDb();
  await db
    .prepare(`UPDATE users SET ${sets.join(", ")} WHERE id = ?`)
    .bind(...values, member.sub)
    .run();

  return new NextResponse(null, { status: 204 });
}

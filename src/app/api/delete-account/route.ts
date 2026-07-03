import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../lib/db.server";
import { verifyMember } from "../../../lib/auth.server";

export const runtime = "edge";

// Soft delete only -- flips is_deleted to 1 for the verified member's own
// row. The account isn't actually removed until the nightly purge cron
// (goodLuckAdmin's custom-worker.ts -> lib/memberDeletion.server.ts)
// runs; logging back in before then resets is_deleted via GET /api/profile.
export async function POST(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  await db
    .prepare("UPDATE users SET is_deleted = 1 WHERE id = ?")
    .bind(member.sub)
    .run();

  return new NextResponse(null, { status: 204 });
}

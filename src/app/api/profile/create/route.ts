import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

// Called once after signup. Ignores any client-supplied id -- the row is
// always created for the verified member's own subject, matching how
// middleware.ts in the admin app never trusts a client-supplied identity
// header either.
export async function POST(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload: { email?: string } = await request.json();
  const { email } = payload;
  if (!email)
    return NextResponse.json({ error: "email is required" }, { status: 400 });

  const db = getDb();
  // INSERT ... ON CONFLICT DO NOTHING mirrors the original "ignore
  // unique_violation, row already exists" behavior.
  await db
    .prepare(
      "INSERT INTO users (id, email) VALUES (?, ?) ON CONFLICT(id) DO NOTHING",
    )
    .bind(member.sub, email)
    .run();

  return new NextResponse(null, { status: 204 });
}

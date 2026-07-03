import { NextRequest, NextResponse } from "next/server";
import { getDb, newId, nowIso } from "../../../lib/db.server";
import { verifyMember } from "../../../lib/auth.server";

export const runtime = "edge";

interface JournalEntryRow {
  id: string;
  step_slug: string;
  body: string;
  updated_at: string;
}

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stepSlug = request.nextUrl.searchParams.get("stepSlug");
  if (!stepSlug)
    return NextResponse.json(
      { error: "stepSlug is required" },
      { status: 400 },
    );

  const db = getDb();
  const row = await db
    .prepare(
      "SELECT id, step_slug, body, updated_at FROM journal_entries WHERE user_id = ? AND step_slug = ?",
    )
    .bind(member.sub, stepSlug)
    .first<JournalEntryRow>();
  return NextResponse.json(row ?? null);
}

export async function POST(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload: { stepSlug?: string; body?: string } = await request.json();
  const { stepSlug, body } = payload;
  if (!stepSlug || typeof body !== "string") {
    return NextResponse.json(
      { error: "stepSlug and body are required" },
      { status: 400 },
    );
  }

  const db = getDb();
  await db
    .prepare(
      `INSERT INTO journal_entries (id, user_id, step_slug, body, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(user_id, step_slug) DO UPDATE SET body = excluded.body, updated_at = excluded.updated_at`,
    )
    .bind(newId(), member.sub, stepSlug, body, nowIso())
    .run();

  return new NextResponse(null, { status: 204 });
}

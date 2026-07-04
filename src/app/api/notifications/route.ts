import { NextRequest, NextResponse } from "next/server";
import { getDb, toBool } from "../../../lib/db.server";
import { verifyMember } from "../../../lib/auth.server";

export const runtime = "edge";

interface NotificationRow {
  id: string;
  type: string;
  title: string;
  body: string;
  read: number;
  created_at: string;
}

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const now = new Date().toISOString();
  const { results } = await db
    .prepare(
      `SELECT id, type, title, body, read, created_at FROM notifications
       WHERE user_id = ? AND hidden_at IS NULL AND (expires_at IS NULL OR expires_at > ?)
       ORDER BY created_at DESC LIMIT 30`,
    )
    .bind(member.sub, now)
    .all<NotificationRow>();

  return NextResponse.json(
    (results ?? []).map((n) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      body: n.body,
      read: toBool(n.read),
      created_at: n.created_at,
    })),
  );
}

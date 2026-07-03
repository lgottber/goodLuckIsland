import { NextRequest, NextResponse } from "next/server";
import { getDb, newId } from "../../../../lib/db.server";
import { verifyMember } from "../../../../lib/auth.server";

export const runtime = "edge";

const ITEM_TYPES = new Set(["article", "episode"]);

export async function POST(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload: { itemType?: string; itemId?: number } = await request.json();
  const { itemType, itemId } = payload;
  if (!itemType || !ITEM_TYPES.has(itemType) || typeof itemId !== "number") {
    return NextResponse.json(
      { error: "Invalid itemType or itemId" },
      { status: 400 },
    );
  }

  const db = getDb();
  const existing = await db
    .prepare(
      "SELECT id FROM saved_items WHERE user_id = ? AND item_type = ? AND item_id = ?",
    )
    .bind(member.sub, itemType, itemId)
    .first<{ id: string }>();

  if (existing) {
    await db
      .prepare("DELETE FROM saved_items WHERE id = ?")
      .bind(existing.id)
      .run();
    return NextResponse.json(false);
  }

  await db
    .prepare(
      "INSERT INTO saved_items (id, user_id, item_type, item_id) VALUES (?, ?, ?, ?)",
    )
    .bind(newId(), member.sub, itemType, itemId)
    .run();
  return NextResponse.json(true);
}

import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db.server";

export const runtime = "edge";

// Public content -- no auth check needed, matching no-RLS today.
export async function GET() {
  const db = getDb();
  const { results } = await db
    .prepare(
      "SELECT dimension, band, body FROM pinwirl_recommendations ORDER BY sort_order",
    )
    .all<{ dimension: string; band: string; body: string }>();
  return NextResponse.json(results ?? []);
}

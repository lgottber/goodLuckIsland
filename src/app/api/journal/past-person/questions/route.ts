import { NextResponse } from "next/server";
import { getDb, publicCacheHeaders } from "../../../../../lib/db.server";

export const runtime = "edge";

// Public, static question list -- no auth check needed, matching the
// "using (true)" RLS policy this table had.
export async function GET() {
  const db = getDb();
  const { results } = await db
    .prepare(
      "SELECT key, text, placeholder, sort_order FROM past_person_questions ORDER BY sort_order",
    )
    .all();
  return NextResponse.json(results ?? [], {
    headers: publicCacheHeaders(300, 3600),
  });
}

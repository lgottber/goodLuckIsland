import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../lib/db.server";

export const runtime = "edge";

// Public, fully static reflection prompts -- no auth check needed,
// matching the "using (true)" RLS policy this table had.
export async function GET(request: NextRequest) {
  const stepSlug = request.nextUrl.searchParams.get("stepSlug");
  if (!stepSlug)
    return NextResponse.json(
      { error: "stepSlug is required" },
      { status: 400 },
    );

  const db = getDb();
  const { results } = await db
    .prepare(
      "SELECT body FROM reflections WHERE step_slug = ? ORDER BY sort_order",
    )
    .bind(stepSlug)
    .all<{ body: string }>();
  return NextResponse.json((results ?? []).map((r) => r.body));
}

import { NextRequest, NextResponse } from "next/server";
import { getDb, publicCacheHeaders } from "../../../../lib/db.server";

export const runtime = "edge";

interface StepLinkRow {
  id: string;
  step_key: string;
  order_index: number;
  link_type: "internal" | "external";
  external_url: string | null;
  internal_content_type: "assessment" | "video" | "episode" | "playlist" | null;
  internal_content_id: string | null;
  label: string;
  label_when_complete: string | null;
  use_score: number;
}

function mapLink(row: StepLinkRow) {
  return {
    id: row.id,
    linkType: row.link_type,
    externalUrl: row.external_url,
    internalContentType: row.internal_content_type,
    internalContentId: row.internal_content_id,
    label: row.label,
    labelWhenComplete: row.label_when_complete,
  };
}

// Public CMS content -- admin-managed step links, no auth check needed,
// matching backpack/route.ts's precedent for the same kind of content.
export async function GET(request: NextRequest) {
  const db = getDb();
  const stepKey = request.nextUrl.searchParams.get("stepKey");
  if (!stepKey) {
    return NextResponse.json({ error: "stepKey is required" }, { status: 400 });
  }

  const { results } = await db
    .prepare(
      "SELECT * FROM seven_shield_step_links WHERE step_key = ? ORDER BY order_index ASC",
    )
    .bind(stepKey)
    .all<StepLinkRow>();

  return NextResponse.json((results ?? []).map(mapLink), {
    headers: publicCacheHeaders(300, 3600),
  });
}

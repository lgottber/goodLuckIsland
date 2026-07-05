import { NextRequest, NextResponse } from "next/server";
import { getDb, publicCacheHeaders } from "../../../lib/db.server";

export const runtime = "edge";

interface BackpackSectionRow {
  slug: string;
  label: string;
  emoji: string;
  color: string;
  tagline: string;
  description: string;
  type: string;
}

function mapSection(s: BackpackSectionRow) {
  return {
    id: s.slug,
    label: s.label,
    emoji: s.emoji,
    color: s.color,
    tagline: s.tagline,
    description: s.description,
    type: s.type,
  };
}

// Public CMS content -- no auth check needed, matching no-RLS today.
export async function GET(request: NextRequest) {
  const db = getDb();
  const slug = request.nextUrl.searchParams.get("slug");

  if (slug) {
    const row = await db
      .prepare("SELECT * FROM backpack_sections WHERE slug = ?")
      .bind(slug)
      .first<BackpackSectionRow>();
    return NextResponse.json(row ? mapSection(row) : null, {
      headers: publicCacheHeaders(300, 3600),
    });
  }

  const { results } = await db
    .prepare("SELECT * FROM backpack_sections ORDER BY sort_order ASC")
    .all<BackpackSectionRow>();
  return NextResponse.json((results ?? []).map(mapSection), {
    headers: publicCacheHeaders(300, 3600),
  });
}

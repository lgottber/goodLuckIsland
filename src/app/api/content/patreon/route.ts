import { NextResponse } from "next/server";
import { getDb, publicCacheHeaders } from "../../../../lib/db.server";

export const runtime = "edge";

interface PatreonSettingsRow {
  sdk_key: string;
}

// Public CMS content -- no auth check needed, matching no-RLS today. The
// SDK key isn't a secret (see goodLuckAdmin/migrations/0019_patreon_settings.sql)
// -- it's the creator's public Patreon vanity slug, read straight off the
// shared DB binding and turned into a link URL here.
export async function GET() {
  const db = getDb();
  const row = await db
    .prepare("SELECT sdk_key FROM patreon_settings WHERE id = 1")
    .first<PatreonSettingsRow>();
  return NextResponse.json(
    { url: row ? `https://www.patreon.com/${row.sdk_key}` : null },
    { headers: publicCacheHeaders(300, 3600) },
  );
}

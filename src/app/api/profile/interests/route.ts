import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifyMember } from "../../../../lib/auth.server";
import { getTopTagsForUser } from "../../../../lib/analyticsQuery.server";
import { fetchTagLabelMap } from "../../../../lib/tags.server";
import { resolveTagLabels } from "../../../../lib/tags";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { env } = getRequestContext<CloudflareEnv>();
  const [topTagIds, tagLabelMap] = await Promise.all([
    getTopTagsForUser(env, member.sub),
    fetchTagLabelMap(),
  ]);

  return NextResponse.json({ interests: resolveTagLabels(topTagIds, tagLabelMap) });
}

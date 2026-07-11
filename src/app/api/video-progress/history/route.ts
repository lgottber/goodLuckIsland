import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifyMember } from "../../../../lib/auth.server";
import { getVideoWatchHistory } from "../../../../lib/analyticsQuery.server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const member = await verifyMember(request);
  if (!member)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { env } = getRequestContext<CloudflareEnv>();
  const history = await getVideoWatchHistory(env, member.sub);
  return NextResponse.json(history);
}

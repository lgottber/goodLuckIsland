import { parseContentViewedTagIds } from "./tags";

interface AERow {
  [key: string]: string | number;
}

interface AEResult {
  data: AERow[];
}

export interface VideoWatchHistoryEntry {
  videoId: number;
  percent: number;
  updatedAt: string;
}

// Analytics Engine's SQL API takes a raw SQL string with no parameter
// binding -- this is the only user-controlled value ever interpolated
// into a query here (an Auth0 `sub`, verified server-side, but escaped
// defensively anyway since it's still going into a raw SQL string).
function escapeSqlLiteral(value: string): string {
  return value.replace(/'/g, "''");
}

async function queryAnalytics(env: CloudflareEnv, sql: string): Promise<AEResult> {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/analytics_engine/sql`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.CF_AE_API_TOKEN}`,
        "Content-Type": "text/plain",
      },
      body: sql,
    },
  );

  if (!res.ok) {
    throw new Error(`Analytics Engine query failed (${res.status})`);
  }

  return res.json();
}

// Reduces a member's last 90 days of "video_progress" events (written by
// TrackedYouTubeEmbed via trackEvent, see src/lib/videoProgressApi.ts) to
// one entry per video: the highest completion percent ever reached and
// the most recent time it was watched. Powers the Backpack "Watch
// History" tab. Mirrors goodLuckAdmin's getContentViewCounts pattern
// (lib/analytics.server.ts) -- Analytics Engine's SQL dialect has no
// JSON functions, so the {contentType, contentId, percent} blob is
// decoded in JS rather than queried directly.
export async function getVideoWatchHistory(
  env: CloudflareEnv,
  userSub: string,
): Promise<VideoWatchHistoryEntry[]> {
  const result = await queryAnalytics(
    env,
    `SELECT blob2 AS properties, timestamp
     FROM good_luck_island_events
     WHERE timestamp > NOW() - INTERVAL '90' DAY
       AND blob1 = 'video_progress'
       AND blob3 = '${escapeSqlLiteral(userSub)}'
     ORDER BY timestamp DESC`,
  );

  const lastWatchedAt = new Map<number, string>();
  const maxPercent = new Map<number, number>();

  for (const row of result.data) {
    let parsed: { contentType?: unknown; contentId?: unknown; percent?: unknown };
    try {
      parsed = JSON.parse(String(row.properties));
    } catch {
      continue;
    }
    if (parsed.contentType !== "video") continue;

    const videoId = Number(parsed.contentId);
    const percent = Number(parsed.percent);
    if (!Number.isFinite(videoId) || !Number.isFinite(percent)) continue;

    if (!lastWatchedAt.has(videoId)) lastWatchedAt.set(videoId, String(row.timestamp));
    maxPercent.set(videoId, Math.max(maxPercent.get(videoId) ?? 0, percent));
  }

  return [...lastWatchedAt.entries()]
    .sort((a, b) => new Date(b[1]).getTime() - new Date(a[1]).getTime())
    .slice(0, 10)
    .map(([videoId, updatedAt]) => ({
      videoId,
      percent: maxPercent.get(videoId) ?? 0,
      updatedAt,
    }));
}

// Powers the dashboard "Interests" section (#110): the member's top 5 most-
// viewed tags, derived from content_viewed events rather than manually
// entered. An item tagged with N tags credits all N tags in full for that
// view, not a 1/N split -- same convention as goodLuckAdmin's
// getTagViewCounts (lib/analytics.server.ts).
export async function getTopTagsForUser(env: CloudflareEnv, userSub: string): Promise<number[]> {
  const result = await queryAnalytics(
    env,
    `SELECT blob2 AS properties, SUM(_sample_interval) AS count
     FROM good_luck_island_events
     WHERE timestamp > NOW() - INTERVAL '90' DAY
       AND blob1 = 'content_viewed'
       AND blob3 = '${escapeSqlLiteral(userSub)}'
     GROUP BY properties`,
  );

  const counts = new Map<number, number>();
  for (const row of result.data) {
    const rowCount = Number(row.count);
    for (const tagId of parseContentViewedTagIds(row.properties)) {
      counts.set(tagId, (counts.get(tagId) ?? 0) + rowCount);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tagId]) => tagId);
}

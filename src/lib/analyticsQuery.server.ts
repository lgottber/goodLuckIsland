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

export interface ContentViewCounts {
  articlesRead: number;
  podcastsListened: number;
}

// Powers the profile dashboard's "Articles Read"/"Podcasts" stats. Mirrors
// goodLuckAdmin's getContentViewCounts pattern (lib/analytics.server.ts),
// scoped to one member via blob3 and using SUM(_sample_interval) rather
// than a raw row count since Analytics Engine samples events.
export async function getContentViewCounts(
  env: CloudflareEnv,
  userSub: string,
): Promise<ContentViewCounts> {
  const result = await queryAnalytics(
    env,
    `SELECT blob2 AS properties, SUM(_sample_interval) AS count
     FROM good_luck_island_events
     WHERE timestamp > NOW() - INTERVAL '90' DAY
       AND blob1 = 'content_viewed'
       AND blob3 = '${escapeSqlLiteral(userSub)}'
     GROUP BY properties`,
  );

  let articlesRead = 0;
  let podcastsListened = 0;
  for (const row of result.data) {
    let parsed: { contentType?: unknown };
    try {
      parsed = JSON.parse(String(row.properties));
    } catch {
      continue;
    }
    if (parsed.contentType === "article") articlesRead += Number(row.count);
    else if (parsed.contentType === "episode") podcastsListened += Number(row.count);
  }

  return { articlesRead, podcastsListened };
}

// Walks a descending list of "YYYY-MM-DD" day strings and counts the
// consecutive-day streak ending at today (or yesterday, so a user who was
// active yesterday but hasn't opened the app yet today doesn't see their
// streak drop to zero).
function computeStreak(sortedDaysDesc: string[]): number {
  if (sortedDaysDesc.length === 0) return 0;

  const oneDayMs = 86_400_000;
  const todayStr = new Date().toISOString().slice(0, 10);
  const yesterdayStr = new Date(Date.now() - oneDayMs).toISOString().slice(0, 10);
  const mostRecent = sortedDaysDesc[0].slice(0, 10);
  if (mostRecent !== todayStr && mostRecent !== yesterdayStr) return 0;

  let streak = 1;
  for (let i = 1; i < sortedDaysDesc.length; i++) {
    const prev = new Date(`${sortedDaysDesc[i - 1].slice(0, 10)}T00:00:00Z`).getTime();
    const cur = new Date(`${sortedDaysDesc[i].slice(0, 10)}T00:00:00Z`).getTime();
    if (prev - cur === oneDayMs) streak++;
    else break;
  }
  return streak;
}

// Powers the profile dashboard's "Days Active" stat: the member's current
// consecutive-day activity streak, from any event type (blob3 = member sub).
export async function getActiveDayStreak(env: CloudflareEnv, userSub: string): Promise<number> {
  const result = await queryAnalytics(
    env,
    `SELECT toDate(timestamp) AS day, SUM(_sample_interval) AS count
     FROM good_luck_island_events
     WHERE timestamp > NOW() - INTERVAL '90' DAY
       AND blob3 = '${escapeSqlLiteral(userSub)}'
     GROUP BY day
     ORDER BY day DESC`,
  );

  return computeStreak(result.data.map((row) => String(row.day)));
}

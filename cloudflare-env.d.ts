interface CloudflareEnv extends Record<string, unknown> {
  AnalyticsEngineDataset: import("@cloudflare/workers-types").AnalyticsEngineDataset;
  DB: import("@cloudflare/workers-types").D1Database;
  API_RATE_LIMITER: import("@cloudflare/workers-types").RateLimit;
  ANON_RATE_LIMITER: import("@cloudflare/workers-types").RateLimit;
}

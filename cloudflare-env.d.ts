interface CloudflareEnv extends Record<string, unknown> {
  AnalyticsEngineDataset: import("@cloudflare/workers-types").AnalyticsEngineDataset;
  DB: import("@cloudflare/workers-types").D1Database;
  RATE_LIMIT_KV: import("@cloudflare/workers-types").KVNamespace;
}

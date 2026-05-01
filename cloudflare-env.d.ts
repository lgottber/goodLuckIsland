interface CloudflareEnv extends Record<string, unknown> {
  ANALYTICS: import("@cloudflare/workers-types").AnalyticsEngineDataset;
}

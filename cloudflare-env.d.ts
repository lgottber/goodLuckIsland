interface CloudflareEnv extends Record<string, unknown> {
  AnalyticsEngineDataset: import("@cloudflare/workers-types").AnalyticsEngineDataset;
  DB: import("@cloudflare/workers-types").D1Database;
  RATE_LIMIT_KV: import("@cloudflare/workers-types").KVNamespace;
  // Analytics Engine SQL query API credentials -- read-only use in
  // lib/analyticsQuery.server.ts. Must be set with `wrangler pages secret
  // put` (or the Cloudflare dashboard's Pages project settings), never as
  // a NEXT_PUBLIC_ build-time var or a GitHub Actions `build:cf` step env
  // -- those get baked into the static client bundle, and this token
  // must never leave the Pages Functions runtime.
  CF_ACCOUNT_ID: string;
  CF_AE_API_TOKEN: string;
  // Secrets Store binding for the iCal calendar URL set via the admin panel.
  // Only available in the Pages Functions runtime (API routes), not in the
  // static client bundle — never reference via NEXT_PUBLIC_.
  ICAL_URL: { get(): Promise<string | null> };
}

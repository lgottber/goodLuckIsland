import { getRequestContext } from "@cloudflare/next-on-pages";

// Fixed-window counter in KV (Pages doesn't support the Workers-only
// [[ratelimits]] binding). Two concurrent requests can both read the same
// count before either writes, letting the true count exceed `limit` by a
// request or two -- acceptable slop for an anti-spam net, not a hard cap.
export async function checkRateLimit(
  key: string,
  limit: number,
  periodSeconds: number,
): Promise<{ success: boolean }> {
  const { env } = getRequestContext<CloudflareEnv>();
  const count = parseInt((await env.RATE_LIMIT_KV.get(key)) ?? "0", 10);
  if (count >= limit) {
    return { success: false };
  }
  await env.RATE_LIMIT_KV.put(key, String(count + 1), {
    expirationTtl: periodSeconds,
  });
  return { success: true };
}

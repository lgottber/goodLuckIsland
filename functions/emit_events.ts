import type { EventContext, PagesFunction } from '@cloudflare/workers-types';

interface Env {
  ANALYTICS: AnalyticsEngineDataset;
}

async function emit(context: EventContext<Env, string, Record<string, unknown>>) {
  const url = new URL(context.request.url);

  context.env.ANALYTICS?.writeDataPoint({
    indexes: [],
    blobs: [url.hostname, url.pathname],
    doubles: [],
  });

  return new Response("Logged analytic") as unknown as Awaited<ReturnType<typeof context.next>>;
}

export const onRequest: PagesFunction<Env> = emit

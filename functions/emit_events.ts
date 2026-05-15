import { EventContext, Response,  PagesFunction } from '@cloudflare/workers-types';

interface Env {
  ANALYTICS: AnalyticsEngineDataset;
}

async function emit (context: EventContext<Env, any, Record<any, unknown>>) {
  const url = new URL(context.request.url);

  context.env.ANALYTICS.writeDataPoint({
    indexes: [],
    blobs: [url.hostname, url.pathname],
    doubles: [],
  });

  return new Response("Logged analytic");
}

export const onRequest: PagesFunction<Env> = emit

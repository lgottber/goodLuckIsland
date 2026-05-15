import { Response, Headers, PagesFunction } from '@cloudflare/workers-types';

interface Env {
  ANALYTICS: AnalyticsEngineDataset;
}

const SESSION_COOKIE_NAME = 'gli_session';
const SESSION_DURATION_SECONDS = 24 * 60 * 60;

async function generateSessionId(ip: string, country: string, date: string): Promise<string> {
  const data = `${ip}:${country}:${date}`;
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
  const hash = Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return `${hash}-${crypto.randomUUID()}`;
}

function parseSessionCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  for (const cookie of cookieHeader.split(';')) {
    const [name, value] = cookie.trim().split('=');
    if (name.trim() === SESSION_COOKIE_NAME) return value?.trim() ?? null;
  }
  return null;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const response = await context.next();

  if (parseSessionCookie(context.request.headers.get('Cookie'))) {
    return response;
  }

  const ip = context.request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const country = context.request.headers.get('CF-IPCountry') ?? 'unknown';
  const date = new Date().toISOString().split('T')[0];

  const sessionId = await generateSessionId(ip, country, date);

  context.env.ANALYTICS.writeDataPoint({
    indexes: [sessionId],
    blobs: [date],
    doubles: [1],
  });

  const newHeaders = new Headers(response.headers);
  newHeaders.append(
    'Set-Cookie',
    `${SESSION_COOKIE_NAME}=${sessionId}; Max-Age=${SESSION_DURATION_SECONDS}; Path=/; SameSite=Lax; Secure; HttpOnly`,
  );

  const body = await response.arrayBuffer();

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
};

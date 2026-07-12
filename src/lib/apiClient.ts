let getToken: () => Promise<string | null> = () => Promise.resolve(null);

// AuthTokenSync doesn't install the real getter until Auth0 has finished its
// initial session check. Without this gate, any apiFetch that fires during
// that window (page load, a fast client-side nav) races ahead of it and goes
// out with the no-op getter above, silently unauthenticated.
let resolveReady: (() => void) | null = null;
const ready = new Promise<void>((resolve) => {
  resolveReady = resolve;
});
// Safety net so a stuck/failed Auth0 init doesn't hang every request forever.
const readyOrTimeout = Promise.race([
  ready,
  new Promise<void>((resolve) => setTimeout(resolve, 5000)),
]);

export function setAuthTokenGetter(fn: () => Promise<string | null>) {
  getToken = fn;
  resolveReady?.();
  resolveReady = null;
  // A new getter means the auth state just changed (login, logout, or a
  // fresh silent-refresh cycle) -- allow the next expired-token 401 to
  // trigger a redirect again.
  unauthorizedTriggered = false;
}

// AuthTokenSync registers this so a 401 caused by an expired/invalid token
// can send the user back through login, not just surface as a failed request.
let onUnauthorized: (() => void) | null = null;
let unauthorizedTriggered = false;

export function setUnauthorizedHandler(fn: () => void) {
  onUnauthorized = fn;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request(path: string, init: RequestInit): Promise<Response> {
  if (typeof window !== "undefined") await readyOrTimeout;
  const token = typeof window !== "undefined" ? await getToken() : null;
  const headers = new Headers(init.headers);
  if (init.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`/api${path}`, { ...init, headers });
  if (!res.ok) {
    // A 401 on a request that carried a token means the server rejected it
    // as invalid/expired (see verifyMember in auth.server.ts) -- silent
    // refresh either isn't possible (refresh token also expired) or hasn't
    // caught up yet, so send the user back through login. Guarded so a burst
    // of parallel requests doesn't fire loginWithRedirect more than once.
    if (res.status === 401 && token && !unauthorizedTriggered) {
      unauthorizedTriggered = true;
      onUnauthorized?.();
    }
    const body = await res.json<{ error?: string }>().catch(() => null);
    throw new ApiError(
      typeof body?.error === "string"
        ? body.error
        : `Request failed (${res.status})`,
      res.status,
    );
  }
  return res;
}

// Replaces the old direct-to-Supabase browser client (RLS enforced access
// there). Now every request goes through this app's own API routes, which
// verify the Auth0 ID token server-side (see lib/auth.server.ts) -- this
// helper's only job is attaching it as a bearer token. Use this for
// routes that return a JSON body.
export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await request(path, init);
  return res.json<T>();
}

// Use this for routes that return 204 No Content (mutations with nothing
// to hand back) -- kept separate from apiFetch<T> so no code ever needs
// to claim "undefined satisfies T" for an unconstrained T.
export async function apiFetchVoid(
  path: string,
  init: RequestInit = {},
): Promise<void> {
  await request(path, init);
}

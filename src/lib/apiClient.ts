let getToken: () => Promise<string | null> = () => Promise.resolve(null);

export function setAuthTokenGetter(fn: () => Promise<string | null>) {
  getToken = fn;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request(path: string, init: RequestInit): Promise<Response> {
  const token = typeof window !== "undefined" ? await getToken() : null;
  const headers = new Headers(init.headers);
  if (init.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`/api${path}`, { ...init, headers });
  if (!res.ok) {
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

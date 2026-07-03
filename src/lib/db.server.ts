import { getRequestContext } from "@cloudflare/next-on-pages";

export function getDb(): D1Database {
  const { env } = getRequestContext<CloudflareEnv>();
  return env.DB;
}

// D1/SQLite has no boolean type -- columns are stored as 0/1 integers.
// Convert at the app boundary so responses keep the same shape callers
// already depend on (Tables<"users">.notifications_email, etc. are typed
// as real booleans in the generated Supabase types this app still uses
// as its wire format).
export function toBool(value: unknown): boolean {
  return value === 1 || value === true;
}

export function fromBool(value: boolean | undefined): number {
  return value ? 1 : 0;
}

// jsonb / text[] columns are stored as JSON-encoded text in D1.
export function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string" || value === "") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function toJson(value: unknown): string {
  return JSON.stringify(value ?? null);
}

// D1 has no gen_random_uuid() default -- ids are generated in app code
// before insert (the edge runtime provides crypto.randomUUID() globally).
export function newId(): string {
  return crypto.randomUUID();
}

export function nowIso(): string {
  return new Date().toISOString();
}

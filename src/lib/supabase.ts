import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let getToken: () => Promise<string | null> = () => Promise.resolve(null);

export function setSupabaseTokenGetter(fn: () => Promise<string | null>) {
  getToken = fn;
}

let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        accessToken: async () => {
          if (typeof window === "undefined") return null;
          return await getToken();
        },
      },
    );
  }
  return _client;
}

// Lazy proxy so module-level imports don't crash during SSR prerendering
// when env vars are absent at build time.
// deno-lint-ignore no-explicit-any
export const supabase = new Proxy({} as SupabaseClient<any>, {
  get(_, prop: string) {
    return (getClient() as unknown as Record<string, unknown>)[prop];
  },
});

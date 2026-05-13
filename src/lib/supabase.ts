import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

let getToken: () => Promise<string | null> = () => Promise.resolve(null);

export function setSupabaseTokenGetter(fn: () => Promise<string | null>) {
  getToken = fn;
}

let _client: ReturnType<typeof createClient<Database>> | null = null;

function getClient() {
  if (!_client) {
    _client = createClient<Database>(
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
export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get(_, prop) {
    return Reflect.get(getClient(), prop);
  },
});

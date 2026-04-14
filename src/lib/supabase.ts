import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let getToken: () => Promise<string | null> = () => Promise.resolve(null);

export function setSupabaseTokenGetter(fn: () => Promise<string | null>) {
  getToken = fn;
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  accessToken: async () => {
    if (typeof window === "undefined") return null;
    return await getToken();
  },
});

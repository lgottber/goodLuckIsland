import { createClient } from "@supabase/supabase-js";
import { auth0 } from "./auth0";
import process from "node:process";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  accessToken: async () => {
    if (typeof window === "undefined") return null;
    const claims = await auth0.getIdTokenClaims();
    return claims?.__raw ?? null;
  },
});

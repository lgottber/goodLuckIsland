import { createClient } from "npm:@supabase/supabase-js@2";

const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") ?? "";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, content-type",
};

const BATCH_SIZE = 100;

function makeSupabaseClient(key: string, token?: string) {
  const accessToken = () => Promise.resolve(token);
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    key,
    token ? { accessToken } : undefined,
  );
}

function isNonEmptyString(value: string): boolean {
  return value.length > 0;
}

function subFromJwt(token: string): string {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error(`Malformed JWT: expected 3 parts, got ${parts.length}`);
  }
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(atob(parts[1]));
  } catch {
    throw new Error("Malformed JWT: payload is not valid base64-encoded JSON");
  }
  if (typeof payload.sub !== "string" || !payload.sub) {
    throw new Error("Malformed JWT: missing or invalid 'sub' claim");
  }
  return payload.sub;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
  if (!token) {
    return new Response("Unauthorized: missing Bearer token", { status: 401, headers: CORS_HEADERS });
  }

  let userId: string;
  try {
    userId = subFromJwt(token);
  } catch (err) {
    return new Response(`Unauthorized: ${(err as Error).message}`, { status: 401, headers: CORS_HEADERS });
  }

  // Verify admin using the caller's Auth0 JWT (respects RLS)
  const supabaseUser = makeSupabaseClient(Deno.env.get("SUPABASE_ANON_KEY")!, token);
  const { data: isAdmin } = await supabaseUser.rpc("is_admin", {
    user_id: userId,
  });
  if (!isAdmin) {
    return new Response("Forbidden", { status: 403, headers: CORS_HEADERS });
  }

  const { subject, body } = await req.json();
  if (!subject?.trim() || !body?.trim()) {
    return new Response("Missing subject or body", {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  // Use service role to read all user emails
  const supabaseAdmin = makeSupabaseClient(Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: users, error } = await supabaseAdmin
    .from("users")
    .select("email");
  if (error) {
    return new Response("Failed to fetch users", {
      status: 500,
      headers: CORS_HEADERS,
    });
  }

  const emails = (users ?? [])
    .map((u: { email: string }) => u.email)
    .filter(isNonEmptyString);
  if (emails.length === 0) {
    return new Response(JSON.stringify({ sent: 0 }), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const from = Deno.env.get("RESEND_FROM_EMAIL") ??
    "Good Luck Island <hello@goodluckisland.com>";
  const resendKey = Deno.env.get("RESEND_API_KEY")!;

  // Send in batches of 100 (Resend batch limit)
  for (let i = 0; i < emails.length; i += BATCH_SIZE) {
    const batch = emails.slice(i, i + BATCH_SIZE);
    const res = await fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        batch.map((to: string) => ({ from, to, subject, html: body })),
      ),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", detail);
      return new Response(`Email send failed: ${detail}`, {
        status: 502,
        headers: CORS_HEADERS,
      });
    }
  }

  return new Response(JSON.stringify({ sent: emails.length }), {
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
});

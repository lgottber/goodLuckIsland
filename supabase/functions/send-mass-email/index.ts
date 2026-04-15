import { createClient } from "npm:@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
};

const BATCH_SIZE = 100;

function subFromJwt(token: string): string | null {
  try {
    return JSON.parse(atob(token.split(".")[1])).sub ?? null;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
  const userId = subFromJwt(token);
  if (!token || !userId) {
    return new Response("Unauthorized", { status: 401, headers: CORS_HEADERS });
  }

  // Verify admin using the caller's Auth0 JWT (respects RLS)
  const supabaseUser = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { accessToken: () => Promise.resolve(token) },
  );
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
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const { data: users, error } = await supabaseAdmin
    .from("users")
    .select("email");
  if (error) {
    return new Response("Failed to fetch users", {
      status: 500,
      headers: CORS_HEADERS,
    });
  }

  const emails = (users ?? []).map((u: { email: string }) => u.email).filter(
    Boolean,
  );
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

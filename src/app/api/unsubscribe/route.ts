import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.redirect(new URL("/unsubscribe?error=1", request.url));
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { error } = await supabase
    .from("users")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("id", id)
    .is("unsubscribed_at", null);

  if (error) {
    return NextResponse.redirect(new URL("/unsubscribe?error=1", request.url));
  }

  return NextResponse.redirect(new URL("/unsubscribe?success=1", request.url));
}

import { NextResponse, type NextRequest } from "next/server";
import { checkRateLimit } from "./lib/rate-limit.server";

// Next.js middleware always runs on the edge runtime -- unlike route
// handlers, it doesn't take (and errors on) an explicit `runtime` export.

export const config = {
  matcher: "/api/:path*",
};

export default async function middleware(request: NextRequest) {
  try {
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const { success } = await checkRateLimit(`api:${ip}`, 120, 60);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down and try again shortly." },
        { status: 429 },
      );
    }
  } catch {
    // RATE_LIMIT_KV binding is unavailable outside the Cloudflare runtime
    // (local next dev) -- don't block requests locally.
  }

  return NextResponse.next();
}

import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Stub — full implementation to be added later.
// This endpoint will handle account deletion once the deletion flow is designed.
export async function POST(_request: NextRequest) {
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}

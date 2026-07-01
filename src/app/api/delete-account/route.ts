import { NextResponse } from "next/server";

export const runtime = "edge";

// Stub — full implementation to be added later.
export async function POST() {
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}

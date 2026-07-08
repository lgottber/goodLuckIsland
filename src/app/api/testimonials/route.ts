import { NextRequest, NextResponse } from "next/server";
import { getDb, newId, nowIso, publicCacheHeaders, toBool } from "../../../lib/db.server";
import { verifyMember } from "../../../lib/auth.server";

export const runtime = "edge";

interface TestimonialRow {
  id: string;
  name: string;
  content: string;
  featured: number;
}

export async function GET() {
  const db = getDb();
  const { results } = await db
    .prepare(
      "SELECT id, name, content, featured FROM testimonials WHERE status = 'approved' AND hidden = 0 ORDER BY featured DESC, display_order ASC",
    )
    .all<TestimonialRow>();
  return NextResponse.json(
    (results ?? []).map((r) => ({
      id: r.id,
      name: r.name,
      content: r.content,
      featured: toBool(r.featured),
    })),
    { headers: publicCacheHeaders(300, 3600) },
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_SUBMISSIONS = 3;

interface TestimonialPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

// No auth required -- this is the public "Get in touch" form on the About
// page, open to anonymous visitors. Rows land as status='pending' for the
// admin panel's existing Testimonial Workflow (fetchPendingTestimonials /
// TestimonialsPanel) to review before anything is published.
export async function POST(request: NextRequest) {
  const payload: TestimonialPayload = await request.json();
  const firstName = (payload.firstName ?? "").trim();
  const lastName = (payload.lastName ?? "").trim();
  const email = (payload.email ?? "").trim();
  const message = (payload.message ?? "").trim();
  const name = [firstName, lastName].filter(Boolean).join(" ");

  if (!name || !email || !message)
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 },
    );
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  if (name.length > 200 || email.length > 200 || message.length > 5000)
    return NextResponse.json({ error: "Submission is too long" }, { status: 400 });

  // Cloudflare always sets this on requests it proxies -- there is no
  // client-controllable header that can override it.
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const db = getDb();
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  const row = await db
    .prepare(
      "SELECT COUNT(*) as count FROM testimonial_submission_log WHERE ip = ? AND created_at > ?",
    )
    .bind(ip, windowStart)
    .first<{ count: number }>();
  if ((row?.count ?? 0) >= RATE_LIMIT_MAX_SUBMISSIONS)
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );

  const member = await verifyMember(request);
  const now = nowIso();

  await db.batch([
    // Prune this IP's own stale rows so the log table self-limits its size
    // instead of growing forever.
    db
      .prepare("DELETE FROM testimonial_submission_log WHERE ip = ? AND created_at <= ?")
      .bind(ip, windowStart),
    db
      .prepare("INSERT INTO testimonial_submission_log (ip, created_at) VALUES (?, ?)")
      .bind(ip, now),
    db
      .prepare(
        "INSERT INTO testimonials (id, member_id, name, email, content, status, submitted_at, created_at) VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)",
      )
      .bind(newId(), member?.sub ?? null, name, email, message, now, now),
  ]);

  return new NextResponse(null, { status: 204 });
}

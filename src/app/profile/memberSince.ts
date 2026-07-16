// Formats a Supabase users.created_at timestamp into "Member Since" copy:
// the join date plus a human duration, e.g. "January 3, 2024 · 1 year, 6 months".
export function formatMemberSince(createdAt: string | null | undefined, now: Date = new Date()): string {
  if (!createdAt) return "";
  const joined = new Date(createdAt);
  if (Number.isNaN(joined.getTime())) return "";

  let years = now.getFullYear() - joined.getFullYear();
  let months = now.getMonth() - joined.getMonth();
  let days = now.getDate() - joined.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const dateLabel = joined.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years === 1 ? "" : "s"}`);
  if (months > 0) parts.push(`${months} month${months === 1 ? "" : "s"}`);
  if (years === 0 && months === 0) {
    parts.push(days === 0 ? "joined today" : `${days} day${days === 1 ? "" : "s"}`);
  }

  return `${dateLabel} · ${parts.join(", ")}`;
}

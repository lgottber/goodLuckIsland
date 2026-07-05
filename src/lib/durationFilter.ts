// Shared by the podcast and video sections (src/app/articles/PodcastSection.tsx,
// VideosSection.tsx) so their identical duration-bucketing logic doesn't drift.
export const DURATION_FILTERS = [
  { label: "All", value: "all" },
  { label: "Under 30 min", value: "short" },
  { label: "30–60 min", value: "medium" },
  { label: "Over 60 min", value: "long" },
];

export function parseDurationMinutes(duration: string | null): number {
  if (!duration) return 0;
  const h = duration.match(/(\d+)h/);
  const m = duration.match(/(\d+)\s*min/);
  return (h ? parseInt(h[1], 10) * 60 : 0) + (m ? parseInt(m[1], 10) : 0);
}

export function matchesDurationFilter(duration: string | null, filter: string): boolean {
  if (filter === "all") return true;
  const mins = parseDurationMinutes(duration);
  if (filter === "short") return mins < 30;
  if (filter === "medium") return mins >= 30 && mins <= 60;
  if (filter === "long") return mins > 60;
  return true;
}

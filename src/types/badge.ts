export type BadgeMetricType =
  | "articles_read"
  | "videos_seen"
  | "podcasts_listened"
  | "feedback_given"
  | "steps_completed"
  | "assignments_completed";

export type BadgeComparator = "<" | ">" | "=";

export const BADGE_IMAGE_OPTIONS = [
  "bookworm",
  "good_listener",
  "milestone",
  "screen_time",
  "trailblazer",
  "voice_heard",
] as const;

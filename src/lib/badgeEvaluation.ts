import type { BadgeMetricType } from "../types/badge";

// articles_read/videos_seen/podcasts_listened have no tracking source yet
// (see BADGE_METRIC_OPTIONS in goodLuckAdmin/types/badge.ts, where they're
// shown disabled in the picker) -- badges using them must never evaluate as
// earned, rather than silently defaulting to a value like 0 that could
// satisfy a comparator for every member.
export function isImplementedMetricType(value: string): value is BadgeMetricType {
  return (
    value === "steps_completed" ||
    value === "feedback_given" ||
    value === "assignments_completed"
  );
}

export function isEarned(value: number, comparator: string, threshold: number): boolean {
  if (comparator === "<") return value < threshold;
  if (comparator === ">") return value > threshold;
  return value === threshold;
}

export interface StepProgressRow {
  one_question_challenge: number;
  wayfair_tool: number;
  values_and_beliefs: number;
  finding_your_purpose: number;
  new_skills: number;
  retirement: number;
  give_back_step: number;
}

export function countStepsCompleted(row: StepProgressRow | null): number {
  if (!row) return 0;
  return [
    row.one_question_challenge,
    row.wayfair_tool,
    row.values_and_beliefs,
    row.finding_your_purpose,
    row.new_skills,
    row.retirement,
    row.give_back_step,
  ].filter((v) => v === 1).length;
}

// Scoring engine for the generic (admin-authored) assessment system.
// Deliberately does NOT mirror src/lib/pinwirlScoring.ts's hardcoded 8
// dimensions / fixed 4-tier bands / unweighted mean -- those were right
// for Pinwirl's fixed rubric but this system has admin-configurable
// dimensions, weights, and per-dimension red/yellow/green thresholds.
// Mirrors goodLuckAdmin/lib/pdfReport.server.ts's zoneForScore/
// pickRecommendation formula exactly (that file is the source of truth;
// there's no shared package between the two repos to enforce this, so
// keep both in sync by hand if either changes).

export type Zone = 0 | 1 | 2;
export const ZONE_LABEL = ["Needs Attention", "Developing", "Strong"] as const;

// scale_min/scale_max on assessment_questions are text CAPTIONS ("Not at
// all"/"Very much"), not numeric bounds -- see goodLuckAdmin's
// ScaleLabelsSection.tsx. Scale answers are always collected on this
// fixed 1-10 range (matching the existing ScaleField.tsx picker), same as
// Pinwirl.
const SCALE_MIN = 1;
const SCALE_MAX = 10;

export interface ScorableQuestion {
  id: string;
  dimension: string | null;
  question_type: "multiple_choice" | "scale" | "yes_no" | "open_text";
  weight: number;
}

export interface ScorableDimension {
  name: string;
  red_max: number;
  yellow_max: number;
}

export interface Recommendation {
  dimension: string;
  band: string;
  body: string;
  sort_order: number;
}

function sameDimension(a: string | null | undefined, b: string): boolean {
  return (a ?? "").trim().toLowerCase() === b.trim().toLowerCase();
}

// Only scale-type answers count toward a dimension's score (matching the
// one precedent this app has, Pinwirl) -- multiple_choice/yes_no/open_text
// answers are recorded but don't affect scoring.
export function computeAssessmentScores(
  answers: Record<string, string | number>,
  questions: ScorableQuestion[],
  dimensions: ScorableDimension[],
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const dim of dimensions) {
    const scaleQs = questions.filter(
      (q) => q.question_type === "scale" && sameDimension(q.dimension, dim.name),
    );

    let weightedSum = 0;
    let weightTotal = 0;
    for (const q of scaleQs) {
      const raw = answers[q.id];
      if (raw === undefined || raw === "") continue;
      const num = Number(raw);
      if (Number.isNaN(num) || num < SCALE_MIN || num > SCALE_MAX) continue;
      const normalized = ((num - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;
      weightedSum += normalized * q.weight;
      weightTotal += q.weight;
    }

    result[dim.name] = weightTotal === 0 ? 0 : Math.round(weightedSum / weightTotal);
  }

  return result;
}

// <= red_max -> zone 0 (red/"Needs Attention"), <= yellow_max -> zone 1
// (yellow/"Developing"), else zone 2 (green/"Strong") -- per-dimension
// thresholds, not a fixed global cutoff.
export function zoneForScore(score: number, dim: ScorableDimension | undefined): Zone {
  const redMax = dim?.red_max ?? 40;
  const yellowMax = dim?.yellow_max ?? 70;
  if (score <= redMax) return 0;
  if (score <= yellowMax) return 1;
  return 2;
}

// Flat unweighted average of dimension scores -- intentionally NOT
// weighted by dimension.weight, to stay consistent with
// pdfReport.server.ts's existing "Summary" calculation.
export function overallScore(scores: Record<string, number>): number {
  const values = Object.values(scores).filter((v) => Number.isFinite(v));
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

// Recommendations are authored per-dimension in worst-to-best sort_order;
// the zone places the score into one of 3 bands, mapped proportionally
// onto however many recommendation entries exist for that dimension.
export function pickRecommendation(
  dimension: string,
  zone: Zone,
  recs: Recommendation[],
): Recommendation | null {
  const matching = recs
    .filter((r) => sameDimension(r.dimension, dimension))
    .sort((a, b) => a.sort_order - b.sort_order);
  if (matching.length === 0) return null;
  if (matching.length === 1) return matching[0];
  const index = Math.round((zone * (matching.length - 1)) / 2);
  return matching[index];
}

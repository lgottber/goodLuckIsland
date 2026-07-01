export type DimensionKey =
  | "Physical"
  | "Emotional"
  | "Intellectual"
  | "Spiritual"
  | "Social"
  | "Environmental"
  | "Purpose / Vision / Mission"
  | "Financial";

export type ScoreBand = "Needs Attention" | "Developing" | "Building Strength" | "Strong";

export type DimensionScores = Record<DimensionKey, number>;

export const DIMENSIONS: DimensionKey[] = [
  "Physical",
  "Emotional",
  "Intellectual",
  "Spiritual",
  "Social",
  "Environmental",
  "Purpose / Vision / Mission",
  "Financial",
];

export function scoreBand(score: number): ScoreBand {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Building Strength";
  if (score >= 40) return "Developing";
  return "Needs Attention";
}

export function scoreColor(score: number): string {
  if (score >= 80) return "#ffffff";
  if (score >= 60) return "#a8e6df";
  if (score >= 40) return "#ffd073";
  return "#ff7b7b";
}

type ScorableQuestion = {
  external_id: string;
  section: string;
  question_type: string;
};

export function computeScores(
  answers: Record<string, string | number>,
  questions: ScorableQuestion[],
): DimensionScores {
  const result: DimensionScores = {
    Physical: 0,
    Emotional: 0,
    Intellectual: 0,
    Spiritual: 0,
    Social: 0,
    Environmental: 0,
    "Purpose / Vision / Mission": 0,
    Financial: 0,
  };

  for (const dim of DIMENSIONS) {
    const scaleQs = questions.filter(
      (q) => q.section === dim && q.question_type === "scale",
    );
    const values = scaleQs
      .map((q) => answers[q.external_id])
      .filter((v): v is string | number => v !== undefined && v !== "")
      .map(Number)
      .filter((n) => !isNaN(n) && n >= 1 && n <= 10);

    result[dim] =
      values.length === 0
        ? 0
        : Math.round((values.reduce((sum, v) => sum + v, 0) / values.length) * 10);
  }

  return result;
}

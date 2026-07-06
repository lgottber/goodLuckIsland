import { apiFetch, apiFetchVoid } from "./apiClient";
import { computeAssessmentScores } from "./assessmentScoring";
import type { ScorableQuestion, ScorableDimension } from "./assessmentScoring";

export type AssignedAssessment = {
  id: string;
  slug: string;
  title: string;
  status: "received" | "seen" | "started" | "completed";
};

export type AssessmentQuestionType = "multiple_choice" | "scale" | "yes_no" | "open_text";

export type AssessmentQuestion = {
  id: string;
  order_index: number;
  question_text: string;
  question_type: AssessmentQuestionType;
  dimension: string | null;
  weight: number;
  required: boolean;
  hint: string | null;
  scale_min: string | null;
  scale_max: string | null;
  options: string[];
};

export type ReportTemplate = {
  showSummary: boolean;
  showDimensionBreakdown: boolean;
  showRecommendations: boolean;
  brandColor: string;
  brandLogoUrl: string | null;
  introText: string;
};

export type Recommendation = {
  dimension: string;
  band: string;
  body: string;
  sort_order: number;
};

export type AssessmentDetail = {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimated_minutes: number;
  dimensions: ScorableDimension[];
  reportTemplate: ReportTemplate | null;
  recommendations: Recommendation[];
};

export type AssessmentHistoryEntry = {
  id: string;
  taken_at: string;
  scores: Record<string, number>;
};

export async function fetchAssignedAssessments(): Promise<AssignedAssessment[]> {
  return apiFetch<AssignedAssessment[]>("/assessments/assigned");
}

export async function fetchAssessmentDetail(id: string): Promise<AssessmentDetail> {
  return apiFetch<AssessmentDetail>(`/assessments/${id}`);
}

export async function fetchAssessmentQuestions(id: string): Promise<AssessmentQuestion[]> {
  return apiFetch<AssessmentQuestion[]>(`/assessments/${id}/questions`);
}

export function markAssessmentSeen(id: string): void {
  apiFetchVoid(`/assessments/${id}/seen`, { method: "POST" }).catch(() => {});
}

export function markAssessmentStarted(id: string): void {
  apiFetchVoid(`/assessments/${id}/started`, { method: "POST" }).catch(() => {});
}

export async function submitAssessment(
  id: string,
  answers: Record<string, string | number>,
  questions: AssessmentQuestion[],
  dimensions: ScorableDimension[],
): Promise<Record<string, number>> {
  const rows = Object.entries(answers).map(([questionId, value]) => ({
    questionId,
    answer: String(value),
  }));

  const scorableQuestions: ScorableQuestion[] = questions.map((q) => ({
    id: q.id,
    dimension: q.dimension,
    question_type: q.question_type,
    weight: q.weight,
  }));
  const scores = computeAssessmentScores(answers, scorableQuestions, dimensions);

  await apiFetchVoid(`/assessments/${id}/submit`, {
    method: "POST",
    body: JSON.stringify({ rows, scores }),
  });

  return scores;
}

export async function fetchAssessmentHistory(id: string): Promise<AssessmentHistoryEntry[]> {
  return apiFetch<AssessmentHistoryEntry[]>(`/assessments/${id}/history`);
}

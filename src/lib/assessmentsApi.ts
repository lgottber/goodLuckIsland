import { apiFetch } from "./apiClient";

export type AssignedAssessmentStatus = "received" | "seen" | "started" | "completed";

export type AssignedAssessment = {
  assessmentId: string;
  title: string;
  type: string;
  source: string;
  estimatedMinutes: number;
  assignedAt: string;
  status: AssignedAssessmentStatus;
};

export function fetchAssignedAssessments(): Promise<AssignedAssessment[]> {
  return apiFetch<AssignedAssessment[]>("/assessments/assigned");
}

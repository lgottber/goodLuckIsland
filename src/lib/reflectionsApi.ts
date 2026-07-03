import { apiFetch } from "./apiClient";

export async function fetchStepReflections(
  stepSlug: string,
): Promise<string[]> {
  return apiFetch<string[]>(
    `/reflections?stepSlug=${encodeURIComponent(stepSlug)}`,
  );
}

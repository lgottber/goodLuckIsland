import { apiFetch } from "./apiClient";

export async function fetchInterests(): Promise<string[]> {
  const { interests } = await apiFetch<{ interests: string[] }>("/profile/interests");
  return interests;
}

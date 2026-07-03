import { apiFetch } from "./apiClient";

export type BackpackSection = {
  id: string;
  label: string;
  emoji: string;
  color: string;
  tagline: string;
  description: string;
  type: string;
};

export async function fetchBackpackSections(): Promise<BackpackSection[]> {
  return apiFetch<BackpackSection[]>("/backpack");
}

export async function fetchBackpackSectionBySlug(
  slug: string,
): Promise<BackpackSection | null> {
  return apiFetch<BackpackSection | null>(
    `/backpack?slug=${encodeURIComponent(slug)}`,
  );
}

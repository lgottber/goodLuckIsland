import { apiFetch } from "./apiClient";
import { createCachedFetcher } from "./clientCache";

export type PatreonLink = {
  url: string | null;
};

const cachedPatreonLink = createCachedFetcher<PatreonLink>();

export async function fetchPatreonLink(): Promise<PatreonLink> {
  return cachedPatreonLink("patreon-link", () =>
    apiFetch<PatreonLink>("/content/patreon"),
  );
}

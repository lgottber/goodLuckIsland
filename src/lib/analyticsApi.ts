import { apiFetchVoid } from "./apiClient";

export type AnalyticsProperties = Record<
  string,
  string | number | boolean | number[] | null | undefined
>;

export function trackEvent(event: string, properties?: AnalyticsProperties): void {
  apiFetchVoid("/track", {
    method: "POST",
    body: JSON.stringify({ event, properties }),
  }).catch(() => {});
}

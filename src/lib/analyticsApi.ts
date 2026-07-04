export type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

export function trackEvent(event: string, properties?: AnalyticsProperties): void {
  fetch("/api/track", {
    method: "POST",
    body: JSON.stringify({ event, properties }),
  }).catch(() => {});
}

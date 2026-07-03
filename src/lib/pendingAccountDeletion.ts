// Shared between the delete-account confirmation flow (profile/page.tsx)
// and the persistent notice (components/PendingDeletionNotice.tsx) that
// must keep showing this message across the full page reload Auth0's
// logout() triggers -- localStorage survives that reload, React state
// doesn't.
export const PENDING_ACCOUNT_DELETION_KEY = "pendingAccountDeletion";

export interface PendingAccountDeletion {
  requestedAt: string;
}

export function setPendingAccountDeletion(): void {
  const value: PendingAccountDeletion = { requestedAt: new Date().toISOString() };
  localStorage.setItem(PENDING_ACCOUNT_DELETION_KEY, JSON.stringify(value));
}

export function getPendingAccountDeletion(): PendingAccountDeletion | null {
  const raw = localStorage.getItem(PENDING_ACCOUNT_DELETION_KEY);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "requestedAt" in parsed &&
      typeof parsed.requestedAt === "string"
    ) {
      return { requestedAt: parsed.requestedAt };
    }
    return null;
  } catch {
    return null;
  }
}

export function clearPendingAccountDeletion(): void {
  localStorage.removeItem(PENDING_ACCOUNT_DELETION_KEY);
}

// The calendar day after the request was made, at 00:00 local time --
// matches the nightly purge cron's "next midnight" semantics closely
// enough for display purposes (the cron itself runs on a fixed UTC
// schedule, see goodLuckAdmin's wrangler.jsonc).
export function midnightAfter(requestedAt: string): Date {
  const requested = new Date(requestedAt);
  return new Date(
    requested.getFullYear(),
    requested.getMonth(),
    requested.getDate() + 1,
    0,
    0,
    0,
    0,
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchProfile } from "../lib/profileApi";
import {
  getPendingAccountDeletion,
  clearPendingAccountDeletion,
  midnightAfter,
  type PendingAccountDeletion,
} from "../lib/pendingAccountDeletion";
import styles from "./PendingDeletionNotice.module.css";

export function PendingDeletionNotice({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const [pending, setPending] = useState<PendingAccountDeletion | null>(null);

  useEffect(() => {
    setPending(getPendingAccountDeletion());
  }, []);

  // Reaching an authenticated request cancels the deletion server-side
  // (see goodLuckAdmin's GET /api/profile) -- fetchProfile is what
  // triggers that request; once it resolves, clear the local flag too.
  useEffect(() => {
    if (!pending || !isAuthenticated || !user?.sub) return;
    const sub = user.sub;
    async function cancelDeletion() {
      try {
        await fetchProfile(sub);
      } finally {
        clearPendingAccountDeletion();
        setPending(null);
      }
    }
    cancelDeletion();
  }, [pending, isAuthenticated, user]);

  if (!pending) return <>{children}</>;

  const deadlineLabel = midnightAfter(pending.requestedAt).toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Account Scheduled for Deletion</h1>
      <p className={styles.message}>
        Your account is scheduled for deletion at midnight on {deadlineLabel}.
        Log back in before then and we&apos;ll automatically cancel the deletion.
      </p>
      <button
        className={styles.loginButton}
        onClick={() => loginWithRedirect()}
      >
        Log back in to keep your account
      </button>
    </div>
  );
}

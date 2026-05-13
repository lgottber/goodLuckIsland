"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchProfile } from "../lib/profileApi";
import styles from "./BlockedGuard.module.css";

export function BlockedGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, logout } = useAuth0();
  const [isBlocked, setIsBlocked] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  function handleSignOut() {
    logout({ logoutParams: { returnTo: window.location.origin } });
  }

  useEffect(() => {
    if (!isAuthenticated || !user?.sub) return;
    const sub = user.sub;
    async function checkBlocked() {
      try {
        const profile = await fetchProfile(sub);
        if (profile?.blocked_at) setIsBlocked(true);
      } catch {
        setFetchError(true);
      }
    }
    checkBlocked();
  }, [isAuthenticated, user]);

  if (fetchError) {
    return (
      <p className={styles.fetchError}>
        Something went wrong. Please try again later.
      </p>
    );
  }

  if (isBlocked) {
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>
          Sorry, you&apos;ve been kicked off the island.
        </h1>
        <p className={styles.message}>
          An admin has removed your access to Good Luck Island.
        </p>
        <button
          className={styles.signOutButton}
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserDataStore } from "../lib/stores/userDataStore";
import styles from "./BlockedGuard.module.css";

export function BlockedGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, logout } = useAuth0();
  const isBlocked = useUserDataStore((state) => !!state.profile?.blocked_at);
  const fetchError = useUserDataStore((state) => state.profileStatus === "error");
  const ensureProfile = useUserDataStore((state) => state.ensureProfile);

  function handleSignOut() {
    logout({ logoutParams: { returnTo: window.location.origin } });
  }

  useEffect(() => {
    if (!isAuthenticated || !user?.sub) return;
    ensureProfile(user.sub);
  }, [isAuthenticated, user, ensureProfile]);

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
        <button className={styles.signOutButton} onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

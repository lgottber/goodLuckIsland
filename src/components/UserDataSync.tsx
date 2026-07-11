"use client";

import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserDataStore } from "../lib/stores/userDataStore";

// Flushes the cached profile/progress/badges/saved/watch-history the moment
// a session ends, and again if a different account logs in on the same
// tab -- otherwise the next user would see the previous member's cached data.
export function UserDataSync() {
  const { isAuthenticated, user } = useAuth0();
  const reset = useUserDataStore((state) => state.reset);
  const prevUserId = useRef<string | undefined>(undefined);

  useEffect(() => {
    const userId = isAuthenticated ? user?.sub : undefined;
    if (prevUserId.current !== undefined && prevUserId.current !== userId) {
      reset();
    }
    prevUserId.current = userId;
  }, [isAuthenticated, user, reset]);

  return null;
}

"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { setAuthTokenGetter } from "../lib/apiClient";

export function AuthTokenSync() {
  const { getIdTokenClaims, getAccessTokenSilently, isAuthenticated, loginWithRedirect } =
    useAuth0();

  useEffect(() => {
    const getToken = async () => {
      // Anonymous visitors have no session to refresh -- apiFetch calls
      // (e.g. page-view tracking, newsletter signup) fire on every page
      // regardless of auth state, so skip the silent-auth attempt entirely
      // rather than treating "never logged in" as a token failure.
      if (!isAuthenticated) return null;
      try {
        // Silently refreshes the session if the token is expired
        await getAccessTokenSilently();
        const claims = await getIdTokenClaims();
        return claims?.__raw ?? null;
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("AuthTokenSync: failed to get token", error);
        }
        loginWithRedirect({
          appState: {
            returnTo: window.location.pathname + window.location.search,
          },
        });
        return null;
      }
    };
    setAuthTokenGetter(getToken);
  }, [getIdTokenClaims, getAccessTokenSilently, isAuthenticated, loginWithRedirect]);

  return null;
}

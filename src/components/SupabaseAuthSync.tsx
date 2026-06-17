"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { setSupabaseTokenGetter } from "../lib/supabase";
import styles from "./SupabaseAuthSync.module.css";

export function SupabaseAuthSync() {
  const { getIdTokenClaims, getAccessTokenSilently } = useAuth0();
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        // Silently refreshes the session if the token is expired
        await getAccessTokenSilently();
        const claims = await getIdTokenClaims();
        return claims?.__raw ?? null;
      } catch {
        setTokenError(true);
        return null;
      }
    };
    setSupabaseTokenGetter(getToken);
  }, [getIdTokenClaims, getAccessTokenSilently]);

  if (tokenError) {
    return (
      <p className={styles.tokenError}>
        Something went wrong. Please try again later.
      </p>
    );
  }

  return null;
}

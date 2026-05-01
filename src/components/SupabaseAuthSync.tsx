"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { setSupabaseTokenGetter } from "../lib/supabase";
import styles from "./SupabaseAuthSync.module.css";

export function SupabaseAuthSync() {
  const { getIdTokenClaims } = useAuth0();
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const claims = await getIdTokenClaims();
        return claims?.__raw ?? null;
      } catch {
        setTokenError(true);
      }
    };
    setSupabaseTokenGetter(getToken);
  }, [getIdTokenClaims]);

  if (tokenError) {
    return (
      <p className={styles.tokenError}>
        Something went wrong. Please try again later.
      </p>
    );
  }

  return null;
}

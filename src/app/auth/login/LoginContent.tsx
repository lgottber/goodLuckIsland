"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "../../../lib/analyticsApi";

export default function LoginContent() {
  const { loginWithRedirect } = useAuth0();
  const searchParams = useSearchParams();

  useEffect(() => {
    const returnTo = searchParams.get("returnTo") ?? "/";
    trackEvent("login_started");
    loginWithRedirect({
      appState: { returnTo },
    });
  }, [loginWithRedirect, searchParams]);

  return null;
}

"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSearchParams } from "next/navigation";

export default function LoginContent() {
  const { loginWithRedirect } = useAuth0();
  const searchParams = useSearchParams();

  useEffect(() => {
    const returnTo = searchParams.get("returnTo") ?? "/";
    loginWithRedirect({
      appState: { returnTo },
    });
  }, [loginWithRedirect, searchParams]);

  return null;
}

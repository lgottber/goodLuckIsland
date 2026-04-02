"use client";

import { Suspense, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSearchParams } from "next/navigation";

function LoginContent() {
  const { loginWithRedirect } = useAuth0();
  const searchParams = useSearchParams();

  useEffect(() => {
    const returnTo = searchParams.get("returnTo") ?? "/";
    loginWithRedirect({
      appState: { returnTo },
    });
  }, []);

  return null;
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

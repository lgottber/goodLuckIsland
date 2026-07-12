"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { trackEvent } from "../../../lib/analyticsApi";
export default function CallbackPage() {
  const { isLoading, error, user } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isLoading || error) return;
    if (!user) return;
    trackEvent("auth_completed");
    router.replace("/");
  }, [isLoading, error, user, router]);

  if (error) {
    return <p>Authentication error: {error.message}</p>;
  }

  return null;
}

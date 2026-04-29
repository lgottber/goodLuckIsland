"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
export default function CallbackPage() {
  const { isLoading, error, user } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (error) throw error;
    if (!user) throw new Error("Auth completed but no user was returned");
    router.replace("/");
  }, [isLoading, error, user, router]);

  if (error) {
    return <p>Authentication error: {error.message}</p>;
  }

  return null;
}

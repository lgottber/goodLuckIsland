"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const { isLoading, error } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !error) {
      router.replace("/");
    }
  }, [isLoading, error, router]);

  if (error) {
    return <p>Authentication error: {error.message}</p>;
  }

  return null;
}

"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase.ts";

export default function CallbackPage() {
  const { isLoading, error, user } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isLoading || error || !user) return;

    const redirect = async () => {
      const { data } = await supabase.rpc("is_admin", { user_id: user.sub });
      router.replace(data ? "/admin" : "/");
    };

    redirect();
  }, [isLoading, error, user, router]);

  if (error) {
    return <p>Authentication error: {error.message}</p>;
  }

  return null;
}

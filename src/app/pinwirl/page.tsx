"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBarDynamic";
import PinwirlIntro from "./PinwirlIntro";
import PinwirlAssessment from "./PinwirlAssessment";
import "./pinwirl.css";
import { trackEvent } from "../../lib/analyticsApi";

export default function PinwirlPage() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const router = useRouter();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !isAuthenticated || !user) return null;

  const userId = user.sub ?? user.email ?? "";

  return (
    <>
      <NavBar activePage="pinwirl" largeAvatar />

      <div className="pinwirl-page">
        {started ? (
          <PinwirlAssessment userId={userId} />
        ) : (
          <PinwirlIntro
            username={user?.nickname}
            onStart={() => {
              trackEvent("pinwirl_started");
              setStarted(true);
            }}
          />
        )}
      </div>
    </>
  );
}

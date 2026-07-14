"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBarDynamic";
import PinwirlIntro from "./PinwirlIntro";
import PinwirlAssessment from "./PinwirlAssessment";
import PinwirlLocked from "./PinwirlLocked";
import "./pinwirl.css";
import { trackEvent } from "../../lib/analyticsApi";
import { isStepLocked, STEP_ORDER } from "../../lib/sevenStepApi";
import { useUserDataStore } from "../../lib/stores/userDataStore";

const PINWIRL_STEP_INDEX = STEP_ORDER.indexOf("wayfair_tool");

export default function PinwirlPage() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const progress = useUserDataStore((state) => state.progress);
  const progressStatus = useUserDataStore((state) => state.progressStatus);
  const ensureProgress = useUserDataStore((state) => state.ensureProgress);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, user, router]);

  const userId = user?.sub ?? user?.email ?? "";

  useEffect(() => {
    if (userId) ensureProgress(userId);
  }, [userId, ensureProgress]);

  if (isLoading || !isAuthenticated || !user) return null;

  const progressReady = progressStatus === "loaded" || progressStatus === "error";
  const locked =
    !progress?.wayfair_tool &&
    progressReady &&
    isStepLocked(PINWIRL_STEP_INDEX, progress);

  return (
    <>
      <NavBar activePage="pinwirl" largeAvatar />

      <div className="pinwirl-page">
        {locked ? (
          <PinwirlLocked />
        ) : started ? (
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

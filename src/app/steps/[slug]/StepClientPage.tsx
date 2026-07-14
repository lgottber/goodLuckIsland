"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../../../components/NavBarDynamic";
import StepCelebration from "../../../components/StepCelebration";
import StepContent from "./StepContent";
import StepLocked from "./StepLocked";
import { fetchBackpackSectionBySlug } from "../../../lib/backpackApi";
import type { BackpackSection } from "../../../lib/backpackApi";
import { fetchStepReflections } from "../../../lib/reflectionsApi";
import { markStepComplete, isStepLocked, SLUG_TO_STEP, STEP_ORDER } from "../../../lib/sevenStepApi";
import { trackEvent } from "../../../lib/analyticsApi";
import { useUserDataStore } from "../../../lib/stores/userDataStore";
import "./step.css";

export default function StepClientPage({ slug }: { slug: string }) {
  const { user } = useAuth0();
  const userId = user?.sub ?? "";
  const progress = useUserDataStore((state) => state.progress);
  const progressStatus = useUserDataStore((state) => state.progressStatus);
  const ensureProgress = useUserDataStore((state) => state.ensureProgress);
  const setProgress = useUserDataStore((state) => state.setProgress);

  const [section, setSection] = useState<BackpackSection | null>(null);
  const [reflections, setReflections] = useState<string[]>([]);
  const [completing, setCompleting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [giveBackMessage, setGiveBackMessage] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetchBackpackSectionBySlug(slug)
      .then((s: BackpackSection | null) => { setSection(s); setLoading(false); })
      .catch(() => { setLoadError(true); setLoading(false); });
    fetchStepReflections(slug).then(setReflections).catch(() => {});
  }, [slug]);

  useEffect(() => {
    if (!userId) return;
    ensureProgress(userId);
  }, [userId, ensureProgress]);

  const stepKey = SLUG_TO_STEP[slug];
  const isComplete = stepKey ? (progress?.[stepKey] ?? false) : false;
  const stepIndex = stepKey ? STEP_ORDER.indexOf(stepKey) : -1;
  const progressReady = stepIndex <= 0 || progressStatus === "loaded" || progressStatus === "error";
  const locked = !isComplete && stepIndex > 0 && progressReady && isStepLocked(stepIndex, progress);

  async function handleMarkComplete() {
    if (!stepKey || !userId) return;
    setCompleting(true);
    try {
      await markStepComplete(userId, stepKey);
      if (progress) setProgress({ ...progress, [stepKey]: true });
      setShowCelebration(true);
      trackEvent("step_completed", { step: stepKey });
    } finally {
      setCompleting(false);
    }
  }

  return (
    <>
      <NavBar activePage="backpack" largeAvatar />
      <StepCelebration show={showCelebration} />

      <div className="step-page">
        {loading && <p className="step-status">Loading…</p>}
        {loadError && <p className="step-error">Could not load this step. Please try again.</p>}

        {!loading && !loadError && section && (
          locked ? (
            <StepLocked />
          ) : (
            <StepContent
              section={section}
              slug={slug}
              userId={userId}
              reflections={reflections}
              giveBackMessage={giveBackMessage}
              onGiveBackChange={setGiveBackMessage}
              stepKey={stepKey}
              isComplete={isComplete}
              completing={completing}
              onMarkComplete={handleMarkComplete}
            />
          )
        )}
      </div>
    </>
  );
}

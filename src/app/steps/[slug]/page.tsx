"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../../../components/NavBarDynamic";
import StepCelebration from "../../../components/StepCelebration";
import StepContent from "./StepContent";
import { fetchBackpackSectionBySlug } from "../../../lib/backpackApi";
import type { BackpackSection } from "../../../lib/backpackApi";
import { fetchStepReflections } from "../../../lib/reflectionsApi";
import {
  fetchUserProgress,
  markStepComplete,
  SLUG_TO_STEP,
} from "../../../lib/sevenStepApi";
import "./step.css";

export default function StepPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : (params.slug?.[0] ?? "");
  const { user } = useAuth0();
  const userId = user?.sub ?? "";

  const [section, setSection] = useState<BackpackSection | null>(null);
  const [reflections, setReflections] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
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
    const stepKey = SLUG_TO_STEP[slug];
    if (!stepKey) return;
    fetchUserProgress(userId).then((progress) => {
      if (progress) setIsComplete(progress[stepKey]);
    }).catch(() => {});
  }, [userId, slug]);

  async function handleMarkComplete() {
    const stepKey = SLUG_TO_STEP[slug];
    if (!stepKey || !userId) return;
    setCompleting(true);
    try {
      await markStepComplete(userId, stepKey);
      setIsComplete(true);
      setShowCelebration(true);
    } finally {
      setCompleting(false);
    }
  }

  const stepKey = SLUG_TO_STEP[slug];

  return (
    <>
      <NavBar activePage="backpack" largeAvatar />
      <StepCelebration show={showCelebration} />

      <div className="step-page">
        {loading && <p className="step-status">Loading…</p>}
        {loadError && <p className="step-error">Could not load this step. Please try again.</p>}

        {!loading && !loadError && section && (
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
        )}
      </div>
    </>
  );
}

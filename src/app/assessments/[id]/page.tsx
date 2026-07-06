"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useRouter } from "next/navigation";
import NavBar from "../../../components/NavBarDynamic";
import AssessmentIntro from "./AssessmentIntro";
import AssessmentTaker from "./AssessmentTaker";
import AssessmentResults from "./AssessmentResults";
import { fetchAssessmentDetail, markAssessmentSeen } from "../../../lib/assessmentsApi";
import type { AssessmentDetail } from "../../../lib/assessmentsApi";
import "../../pinwirl/pinwirl.css";

type Stage = "intro" | "taking" | "results";

export default function AssessmentPage() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const assessmentId = params.id;

  const [stage, setStage] = useState<Stage>("intro");
  const [assessment, setAssessment] = useState<AssessmentDetail | null>(null);
  const [scores, setScores] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, user, router]);

  useEffect(() => {
    fetchAssessmentDetail(assessmentId).then(setAssessment).catch(() => {});
    markAssessmentSeen(assessmentId);
  }, [assessmentId]);

  if (isLoading || !isAuthenticated || !user || !assessment) return null;

  return (
    <>
      <NavBar activePage="backpack" largeAvatar />

      <div className="pinwirl-page">
        {stage === "intro" && (
          <AssessmentIntro assessment={assessment} onStart={() => setStage("taking")} />
        )}
        {stage === "taking" && (
          <AssessmentTaker
            assessment={assessment}
            onSubmitted={(s) => {
              setScores(s);
              setStage("results");
            }}
          />
        )}
        {stage === "results" && scores && (
          <AssessmentResults
            assessment={assessment}
            scores={scores}
            onRetake={() => {
              setScores(null);
              setStage("taking");
            }}
          />
        )}
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../../../components/NavBarDynamic";
import {
  fetchPastPersonQuestions,
  fetchPastPersonAnswers,
  savePastPersonAnswer,
} from "../../../lib/journalApi";
import type { PastPersonQuestion } from "../../../lib/journalApi";
import { trackEvent } from "../../../lib/analyticsApi";
import PastPersonQuestionCard from "./PastPersonQuestion";
import "./past-person.css";

export default function PastPersonPage() {
  const { user } = useAuth0();
  const userId = user?.sub ?? "";

  const [questions, setQuestions] = useState<PastPersonQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    fetchPastPersonQuestions().then(setQuestions).catch(() => {});
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetchPastPersonAnswers(userId).then(setAnswers).catch(() => {});
  }, [userId]);

  function handleChange(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setSaveStatus("idle");
  }

  async function handleSave() {
    if (!userId) return;
    setSaveStatus("saving");
    try {
      await Promise.all(
        questions.map(({ key }) =>
          savePastPersonAnswer(userId, key, answers[key] ?? ""),
        ),
      );
      setSaveStatus("saved");
      trackEvent("past_person_saved");
    } catch {
      setSaveStatus("error");
    }
  }

  return (
    <>
      <NavBar activePage="backpack" largeAvatar />

      <div className="past-person-page">
        <div className="past-person-header">
          <p className="past-person-eyebrow">7SHieLD Process</p>
          <h1>The Past Person Profile</h1>
          <p>
            Before building your retirement vision, it helps to understand who you were.
            Reflect on your pre-retirement self — honestly and with compassion.
          </p>
        </div>

        <div className="past-person-body">
          <Link href="/backpack" className="step-back-link">
            ← Back to My Backpack
          </Link>

          <form
            className="past-person-form"
            onSubmit={(e) => { e.preventDefault(); handleSave(); }}
          >
            {questions.map(({ key, text, placeholder }, i) => (
              <PastPersonQuestionCard
                key={key}
                questionKey={key}
                text={text}
                placeholder={placeholder}
                index={i}
                value={answers[key] ?? ""}
                onChange={handleChange}
              />
            ))}

            <div className="past-person-actions">
              <span
                className={`past-person-save-status${saveStatus === "saved" ? " past-person-save-status--success" : saveStatus === "error" ? " past-person-save-status--error" : ""}`}
              >
                {saveStatus === "saving" && "Saving…"}
                {saveStatus === "saved" && "Saved!"}
                {saveStatus === "error" && "Failed to save. Please try again."}
              </span>
              <button
                type="submit"
                className="past-person-save-btn"
                disabled={saveStatus === "saving" || questions.length === 0}
              >
                Save Answers
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

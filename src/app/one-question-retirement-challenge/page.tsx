"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../../components/NavBarDynamic";
import { fetchOqrcResponse, saveOqrcResponse } from "../../lib/oqrcApi";
import "./oqrc.css";

const SCENE_PARAGRAPHS = [
  "Imagine this: You're meeting a financial planner for the first time. You've been escorted into their high rise office by a friendly assistant, and now you're seated across from the advisor. The space feels very professional but has that 90's wood trim and panel vibe — family photos line the shelves, diplomas and awards hang on the walls, and the large desk between you and the financial advisor is covered with charts, spreadsheets, reports, calculator, brochures and a large coffee mug that says \"worlds best Dad\".",
  "You've brought most of your financial life with you in a folder and share it with them — account statements, benefits, and everything else they might need to see. Over the past 40 minutes, the advisor has asked you the usual questions about your savings, budget, and financial goals. They've been busy jotting down notes, mapping out everything you've shared.",
  "As they finish their last note, they set the pen down, lean forward a bit, and look at you with a focused expression. Their tone shifts slightly, becoming more personal, and they say:",
  "\"OK, Thank you for sharing all of this with me. It's clear we can help you with the tough financial questions and build a solid plan for your retirement. But before we move forward, I have one more question to ask — which will help me to understand you better.\"",
  "They pause for a moment, then ask:",
];

const QUESTION = "\"How would you describe your personal lifestyle goals and priorities in retirement? You know, the things which you saved and sacrificed for all these years to ensure. Take your time — I won't interrupt.\"";

const PROMPT = "Now, it's your turn. Picture yourself in that moment. In your own words, how would you answer this question? Don't overthink it — just write it down as if you were saying it out loud. There are no wrong answers.";

export default function OqrcPage() {
  const { user } = useAuth0();
  const [response, setResponse] = useState("");
  const [loadError, setLoadError] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if (!user?.sub) return;
    fetchOqrcResponse(user.sub)
      .then((saved) => { if (saved) setResponse(saved); })
      .catch(() => setLoadError(true));
  }, [user]);

  async function handleSave() {
    if (!user?.sub) return;
    setSaveStatus("saving");
    try {
      await saveOqrcResponse(user.sub, response);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
    }
  }

  return (
    <>
      <NavBar />
      <div className="oqrc-page">
        <div className="oqrc-header">
          <p className="oqrc-eyebrow">The 1 Question Retirement Challenge</p>
          <h1>The One Question</h1>
          <p className="oqrc-subtitle">One question. A lifetime of clarity.</p>
        </div>

        <div className="oqrc-content">
          <div className="oqrc-scene-card">
            <p className="oqrc-scene-label">The Scenario</p>
            <div className="oqrc-scene-text">
              {SCENE_PARAGRAPHS.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="oqrc-question-block">
              <p className="oqrc-question-byline">The Advisor Asks</p>
              <p className="oqrc-question-text">{QUESTION}</p>
            </div>
          </div>

          <div className="oqrc-response-card">
            <p className="oqrc-response-label">Your Answer</p>
            <p className="oqrc-prompt">{PROMPT}</p>
            {loadError && (
              <p className="oqrc-load-error">
                Couldn&apos;t load your previous response — you can still write below.
              </p>
            )}
            <textarea
              className="oqrc-textarea"
              placeholder="Start writing here…"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
            <div className="oqrc-response-footer">
              {saveStatus === "error" && (
                <span className="oqrc-save-error">Something went wrong. Please try again.</span>
              )}
              <button
                type="button"
                className="btn-oqrc-save"
                onClick={handleSave}
                disabled={saveStatus === "saving" || !response.trim()}
              >
                {saveStatus === "saving" ? "Saving…" : saveStatus === "saved" ? "Saved!" : "Save Response"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

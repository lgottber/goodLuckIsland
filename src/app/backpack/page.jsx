"use client";

import { useState } from "react";
import NavBar from "../../components/NavBar.jsx";
import "./backpack.css";

const BACKPACK_SECTIONS = [
  {
    id: "challenge",
    label: "The 1 Question Retirement Challenge",
    emoji: "❓",
    color: "#e8673a",
    tagline: "One question. One week. A lifetime of clarity.",
    description:
      "Each week a single powerful question helps you think more clearly about what retirement really means to you. No right answers — just honest reflection.",
    type: "challenge",
  },
  {
    id: "pinwhirl",
    label: "The Pinwhirl Tool",
    emoji: "🌀",
    color: "#2e8b7a",
    tagline: "Spin your priorities into focus.",
    description:
      "A guided self-assessment that helps you visualize the different dimensions of your retirement life — financial, social, physical, purposeful — and where you stand today.",
    type: "coming-soon",
  },
  {
    id: "values",
    label: "Values & Beliefs",
    emoji: "🧭",
    color: "#1e2d5a",
    tagline: "Know what you stand for before you stand down.",
    description:
      "Retirement is a chance to live more aligned with what you truly value. This section helps you identify, articulate, and commit to the values that will guide your next chapter.",
    type: "coming-soon",
  },
  {
    id: "purpose",
    label: "Finding Your Purpose",
    emoji: "🔦",
    color: "#7a5a9a",
    tagline: "What gets you out of bed when work doesn't?",
    description:
      "Purpose doesn't retire when you do. This section guides you through exercises to discover what gives your life meaning beyond your career identity.",
    type: "coming-soon",
  },
  {
    id: "skills",
    label: "New Skills",
    emoji: "🛠️",
    color: "#5a8a6a",
    tagline: "Life skills for the chapter ahead.",
    description:
      "From cooking to budgeting to technology to health management — retirement comes with a new set of everyday skills worth developing. Explore what's worth learning next.",
    type: "coming-soon",
  },
  {
    id: "refinement",
    label: "Refinement",
    emoji: "✨",
    color: "#c87840",
    tagline: "Bringing it all together.",
    description:
      "You've reflected, you've explored, you've grown. This section helps you synthesize everything into a clear, personal retirement vision you can actually live.",
    type: "coming-soon",
  },
  {
    id: "giveback",
    label: "Giveback & Share",
    emoji: "🤲",
    color: "#3a6a9a",
    tagline: "Share your story. Give back. Pay it forward.",
    description:
      "Your journey matters. This section invites you to share your experiences with the collective, mentor others just starting out, and find ways to contribute beyond yourself.",
    type: "coming-soon",
  },
];

const WEEKLY_QUESTIONS = [
  {
    question:
      "If money were no object, how would you spend your first week of retirement?",
    prompt:
      "Close your eyes and really picture it. Where are you? Who's with you? What does a Tuesday feel like?",
  },
  {
    question: "What does 'enough' mean to you financially?",
    prompt:
      "Not a number — a feeling. What would it feel like to know you have enough? What would change?",
  },
  {
    question: "What are you most afraid of about retirement?",
    prompt:
      "Name it honestly. Loss of identity? Running out of money? Boredom? Fear named is fear tamed.",
  },
  {
    question:
      "What would you do differently in your career if you could start over?",
    prompt:
      "This isn't about regret — it's about understanding what truly matters to you as you look ahead.",
  },
  {
    question:
      "Who do you want to be in retirement — not what you want to do, but who?",
    prompt:
      "Think about your values, your relationships, and the kind of person you're still becoming.",
  },
  {
    question:
      "What is one thing you keep putting off that retirement would finally give you time for?",
    prompt:
      "That creative project. That place you've always wanted to visit. That relationship you want to rebuild.",
  },
  {
    question: "How do you define a life well-lived?",
    prompt:
      "If you looked back at 85, what would make you feel proud? What would feel like a waste?",
  },
  {
    question:
      "What does your ideal Tuesday in retirement look like — in detail?",
    prompt:
      "Not vacation. Not a special day. Just a regular, ordinary, beautiful Tuesday.",
  },
  {
    question:
      "What role will work — or purpose-driven activity — play in your retirement?",
    prompt:
      "Some people can't imagine stopping. Others can't wait. Most are somewhere in between. Where are you?",
  },
  {
    question:
      "What conversation about money or retirement are you avoiding with someone you love?",
    prompt:
      "With a spouse? A parent? An adult child? What would it take to have it this week?",
  },
  {
    question:
      "If you retired tomorrow, what would you miss most about working?",
    prompt:
      "The people? The structure? The feeling of contributing? Knowing this helps you plan to replace it.",
  },
  {
    question: "What does your health need from you in the next five years?",
    prompt:
      "Retirement dreams are built on a foundation of health. What's one thing your future self is asking you to start now?",
  },
];

function getWeeklyQuestion() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));
  return WEEKLY_QUESTIONS[weekNum % WEEKLY_QUESTIONS.length];
}

export default function BackpackPage() {
  const [activeSection, setActiveSection] = useState(null);
  const [reflection, setReflection] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const weeklyQ = getWeeklyQuestion();

  const saveReflection = () => {
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 2500);
  };

  return (
    <>
      <NavBar activePage="backpack" largeAvatar />

      <div className="backpack-page">
        {/* ── HEADER ── */}
        <div className="backpack-header">
          <p className="backpack-eyebrow">Good Luck Island Collective</p>
          <h1>My Backpack</h1>
          <p>
            Your personal retirement toolkit. Work through each section at your
            own pace — every step brings your next chapter into clearer focus.
          </p>
        </div>

        {/* ── PROGRESS STRIP ── */}
        <div className="backpack-progress-strip">
          <span className="backpack-progress-label">Your Progress</span>
          <div className="backpack-progress-bar-wrap">
            <div className="backpack-progress-bar" />
          </div>
          <span className="backpack-progress-pct">1 of 7 started</span>
        </div>

        <div className="backpack-content">
          {/* ── PHOTO TRIO ── */}
          {!activeSection && (
            <div className="backpack-photo-trio">
              <div className="backpack-photo-item">
                <img src="/hikingCouple.png" alt="Hiking adventure" />
              </div>
              <div className="backpack-photo-item backpack-photo-item--tall">
                <img src="/tools.gif" alt="We have the tools" />
              </div>
              <div className="backpack-photo-item">
                <img src="/soloHiking.jpg" alt="Solo Hiking" />
              </div>
            </div>
          )}

          {/* ── SECTION GRID ── */}
          {!activeSection && (
            <div className="backpack-section-grid">
              {BACKPACK_SECTIONS.map((section, i) => (
                <button
                  type="button"
                  key={section.id}
                  className={`backpack-section-card ${
                    section.type === "coming-soon" ? "coming-soon" : ""
                  }`}
                  onClick={() =>
                    section.type !== "coming-soon" &&
                    setActiveSection(section.id)}
                  style={{ "--section-color": section.color }}
                >
                  <div className="backpack-card-accent" />
                  <div className="backpack-card-body">
                    <div className="backpack-section-num">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="backpack-section-emoji">
                      {section.emoji}
                    </div>
                    <div className="backpack-section-info">
                      <h4 className="backpack-section-title">
                        {section.label}
                      </h4>
                      <p className="backpack-section-tagline">
                        {section.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="backpack-card-footer">
                    {section.type === "coming-soon"
                      ? (
                        <span className="backpack-coming-soon">
                          Coming Soon
                        </span>
                      )
                      : (
                        <>
                          <span className="backpack-card-cta">Begin →</span>
                          <span className="backpack-section-arrow">→</span>
                        </>
                      )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── CHALLENGE DETAIL ── */}
          {activeSection === "challenge" && (
            <div className="backpack-detail-card">
              <div className="backpack-section-nav">
                <button
                  type="button"
                  className="backpack-back-btn"
                  onClick={() => setActiveSection(null)}
                >
                  ← Back to Backpack
                </button>
                <span className="backpack-section-breadcrumb">
                  ❓ The 1 Question Retirement Challenge
                </span>
              </div>

              <div className="challenge-card">
                <div className="challenge-week-badge">
                  Week of {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <h2 className="challenge-question">{weeklyQ.question}</h2>
                <p className="challenge-prompt">{weeklyQ.prompt}</p>
              </div>

              <div className="challenge-photo-banner">
                <img src="/bench.png" alt="A quiet moment of reflection" />
              </div>

              <div className="challenge-reflection">
                <label className="challenge-reflection-label">
                  Your Reflection
                </label>
                <textarea
                  className="challenge-textarea"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Take your time. There are no wrong answers here. Just write honestly..."
                  rows={8}
                />
                <div className="challenge-reflection-footer">
                  <span className="challenge-reflection-hint">
                    🔒 Your reflection is private — only you can see it.
                  </span>
                  <button
                    type="button"
                    className="btn-save"
                    onClick={saveReflection}
                    disabled={!reflection.trim()}
                    style={{ opacity: !reflection.trim() ? 0.5 : 1 }}
                  >
                    {reflectionSaved ? "✓ Saved!" : "Save Reflection"}
                  </button>
                </div>
              </div>

              <div className="challenge-archive-note">
                <span>📅</span>
                <p>
                  A new question appears every week. Your saved reflections will
                  build into a personal retirement journal over time.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

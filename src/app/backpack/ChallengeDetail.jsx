export default function ChallengeDetail({
  weeklyQ,
  reflection,
  setReflection,
  reflectionSaved,
  triggerReflectionSaved,
  onBack,
}) {
  return (
    <div className="backpack-detail-card">
      <div className="backpack-section-nav">
        <button
          type="button"
          className="backpack-back-btn"
          onClick={onBack}
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
        <label className="challenge-reflection-label">Your Reflection</label>
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
            onClick={triggerReflectionSaved}
            disabled={!reflection.trim()}
          >
            {reflectionSaved ? "✓ Saved!" : "Save Reflection"}
          </button>
        </div>
      </div>

      <div className="challenge-archive-note">
        <span>📅</span>
        <p>
          A new question appears every week. Your saved reflections will build
          into a personal retirement journal over time.
        </p>
      </div>
    </div>
  );
}

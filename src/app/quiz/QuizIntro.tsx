export default function QuizIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="quiz-intro">
      <div className="quiz-intro-badge">🏝️</div>
      <h1 className="quiz-intro-title">What Type of Islander Are You?</h1>
      <p className="quiz-intro-desc">
        15 questions. 6 archetypes. One island. Discover your style and how you
        navigate life&rsquo;s biggest chapters.
      </p>
      <button type="button" className="quiz-start-btn" onClick={onStart}>
        Take the Quiz
      </button>
    </div>
  );
}

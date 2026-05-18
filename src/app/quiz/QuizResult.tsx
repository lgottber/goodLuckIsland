import Link from "next/link";
import { Archetype } from "./quizData";

export default function QuizResult({
  archetype,
  onRetake,
}: {
  archetype: Archetype;
  onRetake: () => void;
}) {
  const setResultVars = (el: HTMLDivElement | null) => {
    if (el) {
      el.style.setProperty("--result-color", archetype.color);
      el.style.setProperty("--result-bg", archetype.bg);
    }
  };

  return (
    <div className="quiz-result" ref={setResultVars}>
      <p className="quiz-result-you">You are...</p>
      <h2 className="quiz-result-name">{archetype.name}</h2>
      <p className="quiz-result-tagline">&ldquo;{archetype.tagline}&rdquo;</p>
      <p className="quiz-result-description">{archetype.description}</p>
      <ul className="quiz-result-traits">
        {archetype.traits.map((trait) => (
          <li key={trait} className="quiz-result-trait">
            {trait}
          </li>
        ))}
      </ul>
      <div className="quiz-result-actions">
        <Link href="/profile" className="quiz-result-btn-primary">
          View My Profile
        </Link>
        <button
          type="button"
          className="quiz-result-btn-ghost"
          onClick={onRetake}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}

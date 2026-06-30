interface Props {
  isComplete: boolean;
  completing: boolean;
  onComplete: () => void;
}

export default function StepCompleteSection({ isComplete, completing, onComplete }: Props) {
  return (
    <div className="step-complete-wrap">
      {isComplete ? (
        <p className="step-already-complete">
          ✓ You&apos;ve completed this step. Keep going!
        </p>
      ) : (
        <button
          type="button"
          className="step-complete-btn"
          onClick={onComplete}
          disabled={completing}
        >
          {completing ? "Saving…" : "Mark Step Complete"}
        </button>
      )}
    </div>
  );
}

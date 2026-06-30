interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function GiveBackCard({ value, onChange }: Props) {
  return (
    <div className="step-card">
      <p className="step-card-title">Message in a Bottle</p>
      <p className="step-card-body">
        Write your &ldquo;Message in a Bottle&rdquo; — a piece of wisdom, a story, or a lesson
        you want to pass on to someone just beginning their retirement journey.
      </p>
      <textarea
        className="step-give-back-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Dear fellow traveller…"
        rows={8}
      />
    </div>
  );
}

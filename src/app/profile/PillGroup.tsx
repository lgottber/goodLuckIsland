export default function PillGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="yes-no-group">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`yes-no-btn ${value === opt ? "active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

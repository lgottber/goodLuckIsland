export default function YesNo({ value, onChange }) {
  return (
    <div className="yes-no-group">
      {["Yes", "No", "Prefer not to say"].map((opt) => (
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

export default function Field(
  { label, value, onChange, placeholder, multiline, hint },
) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      {multiline
        ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        )
        : (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        )}
      {hint && <span className="admin-field-hint">{hint}</span>}
    </div>
  );
}

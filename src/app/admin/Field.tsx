interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  hint?: string;
}

export default function Field(
  { label, value, onChange, placeholder, multiline, hint }: FieldProps,
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

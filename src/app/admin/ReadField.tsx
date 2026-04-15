interface ReadFieldProps {
  label: string;
  value: string | number | null | undefined;
  multiline?: boolean;
}

export default function ReadField({ label, value, multiline }: ReadFieldProps) {
  const display = value != null && value !== "" ? String(value) : "—";
  const readFieldProps = {
    value: display,
    readOnly: true,
    style: { opacity: 0.65, cursor: "default" },
  };
  return (
    <div className="admin-field">
      <label>{label}</label>
      {multiline
        ? <textarea {...readFieldProps} />
        : <input {...readFieldProps} />}
    </div>
  );
}

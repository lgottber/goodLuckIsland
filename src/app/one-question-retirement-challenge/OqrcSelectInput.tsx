"use client";

export default function OqrcSelectInput({
  id,
  options,
  value,
  onChange,
}: {
  id: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      id={id}
      className="oqrc-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select an option…</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

"use client";

export default function OqrcRadioOption({
  name,
  value,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="oqrc-radio-label">
      <input
        type="radio"
        className="oqrc-radio-input"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {value}
    </label>
  );
}

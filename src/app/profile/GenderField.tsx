import { useState } from "react";
import PillGroup from "./PillGroup";

const FIXED_OPTIONS = ["Male", "Female", "Prefer not to say"];
const SELF_DESCRIBE = "Self-describe";

export default function GenderField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const isCustom = value !== "" && !FIXED_OPTIONS.includes(value);
  const [selfDescribing, setSelfDescribing] = useState(isCustom);

  function handlePillChange(opt: string) {
    if (opt === SELF_DESCRIBE) {
      setSelfDescribing(true);
      onChange("");
      return;
    }
    setSelfDescribing(false);
    onChange(opt);
  }

  const pillValue = selfDescribing ? SELF_DESCRIBE : value;

  return (
    <div>
      <PillGroup options={[...FIXED_OPTIONS, SELF_DESCRIBE]} value={pillValue} onChange={handlePillChange} />
      {selfDescribing && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe your gender"
          className="gender-self-describe-input"
        />
      )}
    </div>
  );
}

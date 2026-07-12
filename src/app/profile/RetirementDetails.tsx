import { useState } from "react";
import Field from "./Field";
import Icon from "./Icon";
import Select from "./Select";
import type { ProfileForm, SetField } from "./types";

const RETIRED = "Yes, I'm retired";
const OTHER = "Other";

const RETIREMENT_DATE_REASON_OPTIONS = [
  "I just didn't want to work any longer",
  "I was let go from my employer and chose to retire",
  "Set a date arbitrarily (didn't want to work past 55)",
  "Set this date because it aligned with Social Security/Medicare",
  "Age my career/occupation allowed the guaranteed Pension/Benefits",
  "Health reasons led to the decision, or immediate health reasons required it",
  "Co-decided with our Financial Advisor",
];

function isOtherValue(value: string) {
  return value !== "" && !RETIREMENT_DATE_REASON_OPTIONS.includes(value);
}

export default function RetirementDetails({ form, set }: { form: Pick<ProfileForm, "retired" | "retirementDate" | "retirementDateReason">; set: SetField }) {
  const isRetired = form.retired === RETIRED;
  const [showOther, setShowOther] = useState(() => isOtherValue(form.retirementDateReason));
  const selectValue = showOther ? OTHER : form.retirementDateReason;

  return (
    <>
      <Field
        label={isRetired ? "When did you retire?" : "When do you plan to retire?"}
        hint={isRetired ? "Month and year you retired" : "Your target retirement date"}
      >
        <input
          type="month"
          value={form.retirementDate}
          onChange={(e) => set("retirementDate", e.target.value)}
        />
      </Field>
      <Field label="Which of the following answers would most accurately describe how you came to the decision of your intended retirement date?">
        <Select
          value={selectValue}
          onChange={(e) => {
            if (e.target.value === OTHER) {
              setShowOther(true);
            } else {
              setShowOther(false);
              set("retirementDateReason", e.target.value);
            }
          }}
          placeholder="Select a reason"
        >
          {RETIREMENT_DATE_REASON_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
          <option value={OTHER}>{OTHER}</option>
        </Select>
        {showOther && (
          <input
            type="text"
            placeholder="Please describe…"
            value={form.retirementDateReason}
            onChange={(e) => set("retirementDateReason", e.target.value)}
          />
        )}
      </Field>
      <div className={isRetired ? "retirement-tip congrats" : "retirement-tip"}>
        <span className="retirement-tip-icon">
          <Icon name={isRetired ? "celebrate" : "palm"} size={18} />
        </span>
        <p>
          {isRetired
            ? "Congratulations! Welcome to the next chapter. We're glad you're here."
            : "Planning ahead is exactly what the Good Luck Island Collective is here for. You're in the right place."}
        </p>
      </div>
    </>
  );
}

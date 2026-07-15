import Field from "./Field";
import ScaleField from "./ScaleField";
import TopThreeChecklist from "./TopThreeChecklist";
import RadioListOption from "./RadioListOption";
import type { ProfileForm, SetField } from "./types";

const IDENTITY_OPTIONS = [
  "I know exactly what I want retirement to look like",
  "I have some ideas but no clear vision",
  "I mostly focus on financial readiness",
  "I haven't really thought about it",
];

const MOTIVATION_OPTIONS = [
  "Freedom",
  "Family",
  "Travel",
  "Health",
  "Learning",
  "Creativity",
  "Volunteering",
  "Entrepreneurship",
  "Faith",
  "Adventure",
  "Community",
  "Relaxation",
  "Legacy",
  "Other",
];

const CONCERN_OPTIONS = [
  "Running out of money",
  "Health",
  "Loneliness",
  "Loss of purpose",
  "Identity loss",
  "Family obligations",
  "Inflation",
  "Housing",
  "Long-term care",
  "Market volatility",
  "Other",
];

const IDEAL_DAY_MAX_WORDS = 250;

function wordCount(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

type Props = {
  form: Pick<
    ProfileForm,
    | "retirementIdentity"
    | "retirementVisionClarity"
    | "retirementMotivations"
    | "retirementConcerns"
    | "idealRetirementDay"
  >;
  set: SetField;
};

export default function RetirementIdentityTab({ form, set }: Props) {
  const words = wordCount(form.idealRetirementDay);

  function handleIdealDayChange(text: string) {
    const parts = text.trim() === "" ? [] : text.trim().split(/\s+/);
    if (parts.length > IDEAL_DAY_MAX_WORDS) return;
    set("idealRetirementDay", text);
  }

  return (
    <div className="edit-modal-body">
      <div className="modal-section-label">Retirement Identity</div>
      <Field label="How would you describe your retirement vision?">
        <div className="radio-list">
          {IDENTITY_OPTIONS.map((opt) => (
            <RadioListOption
              key={opt}
              option={opt}
              checked={form.retirementIdentity === opt}
              onSelect={() => set("retirementIdentity", opt)}
            />
          ))}
        </div>
      </Field>
      <Field label="How clearly can you describe an average Tuesday in your ideal retirement?">
        <ScaleField
          value={form.retirementVisionClarity}
          onChange={(v) => set("retirementVisionClarity", v)}
          lowLabel="Not at all clear"
          highLabel="Extremely clear"
        />
      </Field>

      <div className="modal-section-label modal-section-label--spaced">
        Motivations & Concerns
      </div>
      <Field label="Primary Retirement Motivation" hint="Choose up to 3">
        <TopThreeChecklist
          options={MOTIVATION_OPTIONS}
          value={form.retirementMotivations}
          onChange={(v) => set("retirementMotivations", v)}
        />
      </Field>
      <Field label="Biggest Retirement Concern" hint="Choose up to 3">
        <TopThreeChecklist
          options={CONCERN_OPTIONS}
          value={form.retirementConcerns}
          onChange={(v) => set("retirementConcerns", v)}
        />
      </Field>
      <Field label="Describe your ideal day in retirement" hint={`${words} / ${IDEAL_DAY_MAX_WORDS} words`}>
        <textarea
          value={form.idealRetirementDay}
          onChange={(e) => handleIdealDayChange(e.target.value)}
          placeholder="Describe an average Tuesday in your ideal retirement..."
        />
      </Field>
    </div>
  );
}

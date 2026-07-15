import Field from "./Field";
import Select from "./Select";
import PillGroup from "./PillGroup";
import ScaleField from "./ScaleField";
import type { ProfileForm, SetField } from "./types";

const EMPLOYMENT_STATUS_OPTIONS = [
  "Full-time",
  "Part-time",
  "Self-employed",
  "Business owner",
  "Retired",
  "Semi-retired",
  "Not working",
];

const INDUSTRY_OPTIONS = [
  "Healthcare & Medical",
  "Education",
  "Financial Services",
  "Technology & Information Services",
  "Professional Services",
  "Government & Public Administration",
  "Military & Veterans",
  "Manufacturing",
  "Construction & Skilled Trades",
  "Transportation & Logistics",
  "Retail & Consumer Services",
  "Hospitality/Travel & Entertainment",
  "Real Estate",
  "Agriculture/Forestry & Natural Resources",
  "Nonprofit & Social Services",
  "Small Business Owner/Entrepreneur",
  "Sales & Business Development",
  "Other/Self-Describe",
];

const YEARS_UNTIL_RETIREMENT_OPTIONS = [
  "Already retired",
  "<5",
  "5-10",
  "10-15",
  "15+",
];

type Props = {
  form: Pick<
    ProfileForm,
    | "employmentStatus"
    | "industry"
    | "yearsUntilRetirement"
    | "retirementConfidence"
    | "lifeSatisfaction"
    | "senseOfPurpose"
    | "stressLevel"
    | "optimism"
    | "lonelinessConnection"
  >;
  set: SetField;
};

export default function WellnessTab({ form, set }: Props) {
  return (
    <div className="edit-modal-body">
      <div className="modal-section-label">Work & Transition</div>
      <Field label="Employment Status">
        <PillGroup
          options={EMPLOYMENT_STATUS_OPTIONS}
          value={form.employmentStatus}
          onChange={(v) => set("employmentStatus", v)}
        />
      </Field>
      <Field label="Industry">
        <Select
          value={form.industry}
          onChange={(e) => set("industry", e.target.value)}
          placeholder="Select an industry"
        >
          {INDUSTRY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Years Until Retirement">
        <PillGroup
          options={YEARS_UNTIL_RETIREMENT_OPTIONS}
          value={form.yearsUntilRetirement}
          onChange={(v) => set("yearsUntilRetirement", v)}
        />
      </Field>
      <Field label="Confidence in Retirement Readiness">
        <ScaleField
          value={form.retirementConfidence}
          onChange={(v) => set("retirementConfidence", v)}
          lowLabel="Not confident"
          highLabel="Very confident"
        />
      </Field>

      <div className="modal-section-label modal-section-label--spaced">
        Lifestyle Wellness
      </div>
      <Field label="Life Satisfaction">
        <ScaleField
          value={form.lifeSatisfaction}
          onChange={(v) => set("lifeSatisfaction", v)}
          lowLabel="Not satisfied"
          highLabel="Very satisfied"
        />
      </Field>
      <Field label="Sense of Purpose">
        <ScaleField
          value={form.senseOfPurpose}
          onChange={(v) => set("senseOfPurpose", v)}
          lowLabel="No purpose"
          highLabel="Strong purpose"
        />
      </Field>
      <Field label="Stress Level">
        <ScaleField
          value={form.stressLevel}
          onChange={(v) => set("stressLevel", v)}
          lowLabel="Low stress"
          highLabel="High stress"
        />
      </Field>
      <Field label="Optimism About the Future">
        <ScaleField
          value={form.optimism}
          onChange={(v) => set("optimism", v)}
          lowLabel="Not optimistic"
          highLabel="Very optimistic"
        />
      </Field>
      <Field label="Loneliness / Connection">
        <ScaleField
          value={form.lonelinessConnection}
          onChange={(v) => set("lonelinessConnection", v)}
          lowLabel="Isolated"
          highLabel="Connected"
        />
      </Field>
    </div>
  );
}

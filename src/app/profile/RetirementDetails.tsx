import Field from "./Field";
import Icon from "./Icon";
import type { ProfileForm, SetField } from "./types";

const RETIRED = "Yes, I'm retired";

export default function RetirementDetails({ form, set }: { form: Pick<ProfileForm, "retired" | "retirementDate">; set: SetField }) {
  const isRetired = form.retired === RETIRED;
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

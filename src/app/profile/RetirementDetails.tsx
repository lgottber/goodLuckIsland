import Field from "./Field";
import Icon from "./Icon";

const RETIRED = "Yes, I'm retired";

type FormState = { retired: string; retirementDate: string };

export default function RetirementDetails({ form, set }: { form: FormState; set: (key: string, val: unknown) => void }) {
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

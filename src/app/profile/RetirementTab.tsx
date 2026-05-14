import Field from "./Field";
import RetirementDetails from "./RetirementDetails";

const RETIRED = "Yes, I'm retired";

type FormState = { retired: string; retirementDate: string };

export default function RetirementTab({ form, set }: { form: FormState; set: (key: string, val: unknown) => void }) {

  return (
    <div className="edit-modal-body">
      <div className="modal-section-label">Retirement Status</div>
      <Field label="Are you retired yet?">
        <div className="yes-no-group">
          {[RETIRED, "Not yet", "Semi-retired"].map((opt) => (
            <button
              key={opt}
              type="button"
              className={`yes-no-btn ${form.retired === opt ? "active" : ""}`}
              onClick={() => set("retired", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </Field>
      {form.retired && <RetirementDetails form={form} set={set} />}
    </div>
  );
}

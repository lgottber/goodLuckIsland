import Field from "./Field";

const RETIRED = "Yes, I'm retired";

export default function RetirementTab({ form, set }) {
  return (
    <div className="edit-modal-body">
      <div className="modal-section-label">Retirement Status</div>
      <Field label="Are you retired yet?">
        <div className="yes-no-group">
          {[RETIRED, "Not yet", "Semi-retired"].map((opt) => (
            <button
              key={opt}
              type="button"
              className={`yes-no-btn ${form.isRetired === opt ? "active" : ""}`}
              onClick={() => set("isRetired", opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </Field>

      {form.isRetired && (
        <Field
          label={
            form.isRetired === RETIRED
              ? "When did you retire?"
              : "When do you plan to retire?"
          }
          hint={
            form.isRetired === RETIRED
              ? "Month and year you retired"
              : "Your target retirement date"
          }
        >
          <input
            type="month"
            value={form.retirementDate}
            onChange={(e) => set("retirementDate", e.target.value)}
          />
        </Field>
      )}

      {form.isRetired && form.isRetired !== RETIRED && (
        <div className="retirement-tip">
          <span className="retirement-tip-icon">🌴</span>
          <p>
            Planning ahead is exactly what the Good Luck Island Collective is
            here for. You're in the right place.
          </p>
        </div>
      )}
      {form.isRetired === RETIRED && (
        <div className="retirement-tip congrats">
          <span className="retirement-tip-icon">🎉</span>
          <p>
            Congratulations! Welcome to the next chapter. We're glad you're
            here.
          </p>
        </div>
      )}
    </div>
  );
}

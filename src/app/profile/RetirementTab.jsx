import Field from "./Field";

const RETIRED = "Yes, I'm retired";

export default function RetirementTab({ form, set }) {
  let retiredSection = null;
  if (form.retired) {
    let dateLabel = "When do you plan to retire?";
    let dateHint = "Your target retirement date";
    let tipIcon = "🌴";
    let tipClassName = "retirement-tip";
    let tipText =
      "Planning ahead is exactly what the Good Luck Island Collective is here for. You're in the right place.";

    if (form.retired === RETIRED) {
      dateLabel = "When did you retire?";
      dateHint = "Month and year you retired";
      tipIcon = "🎉";
      tipClassName = "retirement-tip congrats";
      tipText =
        "Congratulations! Welcome to the next chapter. We're glad you're here.";
    }

    retiredSection = (
      <>
        <Field label={dateLabel} hint={dateHint}>
          <input
            type="month"
            value={form.retirementDate}
            onChange={(e) => set("retirementDate", e.target.value)}
          />
        </Field>
        <div className={tipClassName}>
          <span className="retirement-tip-icon">{tipIcon}</span>
          <p>{tipText}</p>
        </div>
      </>
    );
  }

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
      {retiredSection}
    </div>
  );
}

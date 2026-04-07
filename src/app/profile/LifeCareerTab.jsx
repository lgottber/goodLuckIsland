import Field from "./Field";
import Select from "./Select";
import YesNo from "./YesNo";

export default function LifeCareerTab({ form, set }) {
  return (
    <div className="edit-modal-body">
      <div className="modal-section-label">Career</div>
      <Field label="Occupation">
        <input
          type="text"
          value={form.occupation}
          onChange={(e) => set("occupation", e.target.value)}
          placeholder="Your current or most recent role"
        />
      </Field>
      <div className="field-row">
        <Field label="Years in Occupation">
          <input
            type="number"
            value={form.yearsInOccupation}
            onChange={(e) => set("yearsInOccupation", e.target.value)}
            placeholder="e.g. 15"
            min="0"
            max="60"
          />
        </Field>
        <Field label="Education Level">
          <Select
            value={form.education}
            onChange={(e) => set("education", e.target.value)}
            placeholder="Select your highest level"
          >
            <option value="High School / GED">High School / GED</option>
            <option value="Trade / Vocational">Trade / Vocational</option>
            <option value="Some College">Some College</option>
            <option value="Associate's Degree">Associate's Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate / PhD">Doctorate / PhD</option>
            <option value="Professional Degree (JD/MD)">
              Professional Degree (JD/MD)
            </option>
          </Select>
        </Field>
      </div>

      <div className="modal-section-label modal-section-label--spaced">
        Life Snapshot
      </div>
      <Field label="Marital Status">
        <Select
          value={form.maritalStatus}
          onChange={(e) => set("maritalStatus", e.target.value)}
          placeholder="Select status"
        >
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Partnered">Partnered</option>
          <option value="Separated">Separated</option>
          <option value="Widowed">Widowed</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </Select>
      </Field>

      <div className="field-row">
        <Field label="Previously Divorced?">
          <YesNo value={form.divorced} onChange={(v) => set("divorced", v)} />
        </Field>
        <Field label="Do you have kids?">
          <YesNo value={form.kids} onChange={(v) => set("kids", v)} />
        </Field>
      </div>

      <Field label="Home paid off?">
        <YesNo
          value={form.homePaidOff}
          onChange={(v) => set("homePaidOff", v)}
        />
      </Field>
    </div>
  );
}

import Field from "./Field";
import Select from "./Select";

export default function FinancesTab({ form, set }) {
  return (
    <div className="edit-modal-body">
      <div className="modal-section-label">Financial Overview</div>
      <p className="modal-privacy-note">
        🔒 This information is private and never shared publicly. It helps us
        tailor content to where you are in your journey.
      </p>

      <Field label="Working Income (Annual)">
        <Select
          value={form.workingIncome}
          onChange={(e) => set("workingIncome", e.target.value)}
          placeholder="Select a range"
        >
          <option value="Under $50k">Under $50,000</option>
          <option value="$50k–$75k">$50,000 – $75,000</option>
          <option value="$75k–$100k">$75,000 – $100,000</option>
          <option value="$100k–$150k">$100,000 – $150,000</option>
          <option value="$150k–$200k">$150,000 – $200,000</option>
          <option value="$200k–$300k">$200,000 – $300,000</option>
          <option value="$300k–$500k">$300,000 – $500,000</option>
          <option value="$500k+">$500,000+</option>
          <option value="Not currently working">Not currently working</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </Select>
      </Field>

      <Field label="Estimated Net Worth">
        <Select
          value={form.netWorth}
          onChange={(e) => set("netWorth", e.target.value)}
          placeholder="Select a range"
        >
          <option value="Under $100k">Under $100,000</option>
          <option value="$100k–$250k">$100,000 – $250,000</option>
          <option value="$250k–$500k">$250,000 – $500,000</option>
          <option value="$500k–$1M">$500,000 – $1,000,000</option>
          <option value="$1M–$2M">$1,000,000 – $2,000,000</option>
          <option value="$2M–$5M">$2,000,000 – $5,000,000</option>
          <option value="$5M+">$5,000,000+</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </Select>
      </Field>
    </div>
  );
}

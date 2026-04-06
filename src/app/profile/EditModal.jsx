import { useState } from "react";
import Modal from "../../components/Modal";
import Icon from "./Icon";
import Field from "./Field";
import Select from "./Select";
import YesNo from "./YesNo";

const MODAL_TABS = ["Basic Info", "Life & Career", "Retirement", "Finances"];

export default function EditModal({ user, onSave, onClose }) {
  const [form, setForm] = useState({ ...user });
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [interestInput, setInterestInput] = useState("");

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const addInterest = (e) => {
    if (e.key === "Enter" && interestInput.trim()) {
      e.preventDefault();
      if (!form.interests.includes(interestInput.trim())) {
        set("interests", [...form.interests, interestInput.trim()]);
      }
      setInterestInput("");
    }
  };
  const removeInterest = (tag) =>
    set("interests", form.interests.filter((t) => t !== tag));

  const tabIdx = MODAL_TABS.indexOf(activeTab);

  return (
    <Modal backdropClassName="edit-modal-backdrop" contentClassName="edit-modal" onClose={onClose}>
      {/* Header */}
      <div className="edit-modal-header">
        <h2>Edit Islander Profile</h2>
        <button type="button" className="edit-modal-close" onClick={onClose}>
          <Icon name="x" size={18} />
        </button>
      </div>

      {/* Tab bar */}
      <div className="modal-tab-bar">
        {MODAL_TABS.map((t) => (
          <button
            type="button"
            key={t}
            className={`modal-tab-btn ${activeTab === t ? "active" : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── BASIC INFO ── */}
      {activeTab === "Basic Info" && (
        <div className="edit-modal-body">
          <div className="modal-section-label">Identity</div>
          <div className="field-row">
            <Field label="First Name">
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                placeholder="First name"
              />
            </Field>
            <Field label="Last Name">
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                placeholder="Last name"
              />
            </Field>
          </div>
          <div className="field-row">
            <Field label="Username">
              <input
                type="text"
                value={form.handle}
                onChange={(e) => set("handle", e.target.value)}
                placeholder="@username"
              />
            </Field>
            <Field label="Age">
              <input
                type="number"
                value={form.age}
                onChange={(e) => set("age", e.target.value)}
                placeholder="e.g. 52"
                min="1"
                max="120"
              />
            </Field>
          </div>
          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@example.com"
            />
          </Field>

          <div
            className="modal-section-label"
            style={{ marginTop: "0.5rem" }}
          >
            Location
          </div>
          <Field label="City / State">
            <input
              type="text"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="City, State"
            />
          </Field>
          <Field label="Mailing Address" hint="So we can send you gifts 🎁">
            <input
              type="text"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="Street, City, State, ZIP"
            />
          </Field>

          <div
            className="modal-section-label"
            style={{ marginTop: "0.5rem" }}
          >
            About You
          </div>
          <Field
            label="Bio"
            hint={`${(form.bio || "").length} / 300 characters`}
          >
            <textarea
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
              placeholder="Tell the collective about yourself..."
              maxLength={300}
            />
          </Field>
          <Field label="Interests" hint="Press Enter to add each interest">
            <input
              type="text"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={addInterest}
              placeholder="e.g. Travel, Golf, Cooking..."
            />
            {form.interests.length > 0 && (
              <div className="tag-list" style={{ marginTop: "0.6rem" }}>
                {form.interests.map((tag) => (
                  <span
                    key={tag}
                    className="tag"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeInterest(tag)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        lineHeight: 1,
                        color: "var(--muted)",
                      }}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Field>
        </div>
      )}

      {/* ── LIFE & CAREER ── */}
      {activeTab === "Life & Career" && (
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

          <div
            className="modal-section-label"
            style={{ marginTop: "0.5rem" }}
          >
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
              <YesNo
                value={form.divorced}
                onChange={(v) => set("divorced", v)}
              />
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
      )}

      {/* ── RETIREMENT ── */}
      {activeTab === "Retirement" && (
        <div className="edit-modal-body">
          <div className="modal-section-label">Retirement Status</div>
          <Field label="Are you retired yet?">
            <div className="yes-no-group">
              {["Yes, I'm retired", "Not yet", "Semi-retired"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`yes-no-btn ${
                    form.isRetired === opt ? "active" : ""
                  }`}
                  onClick={() => set("isRetired", opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </Field>

          {form.isRetired && (
            <Field
              label={form.isRetired === "Yes, I'm retired"
                ? "When did you retire?"
                : "When do you plan to retire?"}
              hint={form.isRetired === "Yes, I'm retired"
                ? "Month and year you retired"
                : "Your target retirement date"}
            >
              <input
                type="month"
                value={form.retirementDate}
                onChange={(e) => set("retirementDate", e.target.value)}
              />
            </Field>
          )}

          {form.isRetired && form.isRetired !== "Yes, I'm retired" && (
            <div className="retirement-tip">
              <span className="retirement-tip-icon">🌴</span>
              <p>
                Planning ahead is exactly what the Good Luck Island Collective
                is here for. You're in the right place.
              </p>
            </div>
          )}
          {form.isRetired === "Yes, I'm retired" && (
            <div className="retirement-tip congrats">
              <span className="retirement-tip-icon">🎉</span>
              <p>
                Congratulations! Welcome to the next chapter. We're glad
                you're here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── FINANCES ── */}
      {activeTab === "Finances" && (
        <div className="edit-modal-body">
          <div className="modal-section-label">Financial Overview</div>
          <p className="modal-privacy-note">
            🔒 This information is private and never shared publicly. It helps
            us tailor content to where you are in your journey.
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
              <option value="Not currently working">
                Not currently working
              </option>
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
      )}

      {/* Footer */}
      <div className="edit-modal-footer">
        <div className="modal-tab-nav">
          {tabIdx > 0 && (
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setActiveTab(MODAL_TABS[tabIdx - 1])}
            >
              ← Back
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          {tabIdx < MODAL_TABS.length - 1
            ? (
              <button
                type="button"
                className="btn-save"
                onClick={() => setActiveTab(MODAL_TABS[tabIdx + 1])}
              >
                Next →
              </button>
            )
            : (
              <button
                type="button"
                className="btn-save"
                onClick={() => onSave(form)}
              >
                Save Changes
              </button>
            )}
        </div>
      </div>
    </Modal>
  );
}

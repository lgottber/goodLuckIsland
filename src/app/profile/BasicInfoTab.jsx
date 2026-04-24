import Field from "./Field";
import InterestTagList from "./InterestTagList";

export default function BasicInfoTab({
  form,
  set,
  interestInput,
  setInterestInput,
  addInterest,
  removeInterest,
}) {
  return (
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
            value={form.username}
            onChange={(e) => set("username", e.target.value)}
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

      <div className="modal-section-label modal-section-label--spaced">
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

      <div className="modal-section-label modal-section-label--spaced">
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
          <InterestTagList tags={form.interests} onRemove={removeInterest} />
        )}
      </Field>
    </div>
  );
}

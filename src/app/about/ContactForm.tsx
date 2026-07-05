export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface Props {
  formData: ContactFormData;
  onChange: (formData: ContactFormData) => void;
  submitting: boolean;
  error: string;
  onSubmit: () => void;
}

export default function ContactForm({
  formData,
  onChange,
  submitting,
  error,
  onSubmit,
}: Props) {
  return (
    <div className="contact-form">
      <div className="contact-form-row">
        <input
          className="contact-input"
          placeholder="First name"
          value={formData.firstName}
          onChange={(e) => onChange({ ...formData, firstName: e.target.value })}
        />
        <input
          className="contact-input"
          placeholder="Last name"
          value={formData.lastName}
          onChange={(e) => onChange({ ...formData, lastName: e.target.value })}
        />
      </div>
      <input
        className="contact-input"
        type="email"
        placeholder="Email address"
        value={formData.email}
        onChange={(e) => onChange({ ...formData, email: e.target.value })}
      />
      <textarea
        className="contact-textarea"
        placeholder="Your message..."
        rows={6}
        value={formData.message}
        onChange={(e) => onChange({ ...formData, message: e.target.value })}
      />
      {error && <p className="contact-form-error">{error}</p>}
      <button
        type="button"
        className="contact-submit"
        onClick={onSubmit}
        disabled={submitting}
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </div>
  );
}

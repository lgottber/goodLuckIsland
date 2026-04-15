import EditPanel, { type PanelStatus } from "./EditPanel";
import Field from "./Field";

type EmailStatus = "idle" | "sending" | "sent" | "error";

const EMAIL_TITLE = "Compose Email";
const EMAIL_SUBJECT_PLACEHOLDER = "Your subject line…";
const EMAIL_BODY_PLACEHOLDER = "<p>Hello,</p>\n<p>…</p>";

interface ComposeEmailPanelProps {
  userCount: number;
  emailStatus: EmailStatus;
  emailSentCount: number;
  emailSubject: string;
  emailBody: string;
  onSubjectChange: (v: string) => void;
  onBodyChange: (v: string) => void;
  onSend: () => void;
}

function emailPanelStatus(emailStatus: EmailStatus): PanelStatus {
  switch (emailStatus) {
    case "sent":
      return "sent";
    case "error":
      return "error";
    default:
      return "idle";
  }
}

export default function ComposeEmailPanel(
  {
    userCount,
    emailStatus,
    emailSentCount,
    emailSubject,
    emailBody,
    onSubjectChange,
    onBodyChange,
    onSend,
  }: ComposeEmailPanelProps,
) {
  return (
    <EditPanel
      title={EMAIL_TITLE}
      saving={emailStatus === "sending"}
      status={emailPanelStatus(emailStatus)}
      saveLabel={`Send to ${userCount} user${userCount !== 1 ? "s" : ""}`}
      onSave={onSend}
      onDelete={null}
      statusOkLabel={`✓ Sent to ${emailSentCount}`}
    >
      <div className="admin-section">
        <div className="admin-section-label">Message</div>
        <Field
          label="Subject"
          value={emailSubject}
          onChange={onSubjectChange}
          placeholder={EMAIL_SUBJECT_PLACEHOLDER}
        />
        <Field
          label="Body (HTML supported)"
          value={emailBody}
          onChange={onBodyChange}
          placeholder={EMAIL_BODY_PLACEHOLDER}
          multiline
        />
      </div>
      <div className="admin-section">
        <div className="admin-section-label">Recipients</div>
        <p className="admin-email-recipients-hint">
          This will be sent to all{" "}
          <strong className="admin-email-recipients-count">{userCount}</strong>
          {" "}
          registered users.
        </p>
      </div>
    </EditPanel>
  );
}

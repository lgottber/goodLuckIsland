import type { ResetStatus } from "./types";

interface Props {
  exportStatus: string;
  exportLabel: () => string;
  onExport: () => void;
  resetStatus: ResetStatus;
  onResetPassword: () => void;
  onNotifications: () => void;
  onDeleteAccount: () => void;
}

export default function ProfileActionsDropdown({
  exportStatus,
  exportLabel,
  onExport,
  resetStatus,
  onResetPassword,
  onNotifications,
  onDeleteAccount,
}: Props) {
  return (
    <div className="profile-actions-dropdown" role="menu">
      <button
        type="button"
        className="profile-actions-item"
        role="menuitem"
        onClick={onExport}
        disabled={exportStatus === "exporting"}
      >
        {exportLabel()}
      </button>
      <button
        type="button"
        className="profile-actions-item"
        role="menuitem"
        onClick={onResetPassword}
        disabled={resetStatus === "sending" || resetStatus === "sent"}
      >
        {resetStatus === "sending" ? "Sending…" : "Reset Password"}
      </button>
      <button
        type="button"
        className="profile-actions-item"
        role="menuitem"
        onClick={onNotifications}
      >
        Notifications
      </button>
      <div className="profile-actions-divider" role="separator" />
      <button
        type="button"
        className="profile-actions-item profile-actions-item--danger"
        role="menuitem"
        onClick={onDeleteAccount}
      >
        Delete Account
      </button>
    </div>
  );
}

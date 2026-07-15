"use client";

import Modal from "../../components/Modal";
import Icon from "./Icon";

export default function NotificationPrefsModal({
  emailEnabled,
  inAppEnabled,
  saving,
  onToggleEmail,
  onToggleInApp,
  onClose,
}: {
  emailEnabled: boolean;
  inAppEnabled: boolean;
  saving: boolean;
  onToggleEmail: (enabled: boolean) => void;
  onToggleInApp: (enabled: boolean) => void;
  onClose: () => void;
}) {
  return (
    <Modal
      backdropClassName="notif-modal-backdrop"
      contentClassName="notif-modal"
      onClose={onClose}
    >
      <div className="notif-modal-header">
        <h2>Notification Preferences</h2>
        <button type="button" className="notif-modal-close" onClick={onClose}>
          <Icon name="x" size={16} />
        </button>
      </div>

      <div className="notif-modal-body">
        <div className="notif-row">
          <div className="notif-row-info">
            <span className="notif-row-label">Email newsletters</span>
            <span className="notif-row-desc">
              New articles, podcast episodes, and platform updates delivered to
              your inbox.
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={emailEnabled}
            className={`notif-toggle${emailEnabled ? " notif-toggle--on" : ""}`}
            onClick={() => onToggleEmail(!emailEnabled)}
            disabled={saving}
          >
            <span className="notif-toggle-thumb" />
          </button>
        </div>

        <div className="notif-row">
          <div className="notif-row-info">
            <span className="notif-row-label">In-app notifications</span>
            <span className="notif-row-desc">
              Badge and inbox alerts for new content and reminders while
              you&apos;re on the platform.
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={inAppEnabled}
            className={`notif-toggle${inAppEnabled ? " notif-toggle--on" : ""}`}
            onClick={() => onToggleInApp(!inAppEnabled)}
            disabled={saving}
          >
            <span className="notif-toggle-thumb" />
          </button>
        </div>
      </div>

      <div className="notif-modal-footer">
        <button type="button" className="btn-cta-outline" onClick={onClose}>
          Done
        </button>
      </div>
    </Modal>
  );
}

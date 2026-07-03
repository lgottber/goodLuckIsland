"use client";

import { useState } from "react";
import Modal from "../../components/Modal";
import Icon from "./Icon";

export default function DeleteAccountModal({
  deleting,
  error,
  scheduled,
  onConfirm,
  onClose,
}: {
  deleting: boolean;
  error: string | null;
  scheduled: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const [confirmText, setConfirmText] = useState("");
  const confirmed = confirmText === "DELETE";

  if (scheduled) {
    return (
      <Modal
        backdropClassName="delete-modal-backdrop"
        contentClassName="delete-modal"
        onClose={() => {}}
      >
        <div className="delete-modal-header">
          <h2>Account Scheduled for Deletion</h2>
        </div>
        <div className="delete-modal-body">
          <p className="delete-modal-warning">
            Your account has been scheduled for deletion at midnight tonight.
            If you change your mind, simply log back in before then and
            we&apos;ll automatically cancel the deletion.
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      backdropClassName="delete-modal-backdrop"
      contentClassName="delete-modal"
      onClose={onClose}
    >
      <div className="delete-modal-header">
        <h2>Delete Account</h2>
        <button type="button" className="delete-modal-close" onClick={onClose}>
          <Icon name="x" size={16} />
        </button>
      </div>

      <div className="delete-modal-body">
        <p className="delete-modal-warning">
          Deleting your account will remove your profile, assessment results,
          journal entries, and all saved content. Your account will be
          scheduled for deletion at midnight tonight — if you change your
          mind, simply log back in before then to cancel it.
        </p>

        <p className="delete-modal-instruction">
          Type <strong>DELETE</strong> below to confirm:
        </p>
        <input
          type="text"
          className="delete-modal-input"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="DELETE"
          autoComplete="off"
          spellCheck={false}
        />

        {error && <p className="delete-modal-error">{error}</p>}
      </div>

      <div className="delete-modal-footer">
        <button
          type="button"
          className="delete-modal-cancel"
          onClick={onClose}
          disabled={deleting}
        >
          Cancel
        </button>
        <button
          type="button"
          className="delete-modal-confirm"
          onClick={onConfirm}
          disabled={!confirmed || deleting}
        >
          {deleting ? "Deleting…" : "Delete My Account"}
        </button>
      </div>
    </Modal>
  );
}

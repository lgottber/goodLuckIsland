"use client";

import { useState } from "react";
import Modal from "../../components/Modal";
import Icon from "./Icon";

export default function DeleteAccountModal({
  deleting,
  error,
  onConfirm,
  onClose,
}: {
  deleting: boolean;
  error: string | null;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const [confirmText, setConfirmText] = useState("");
  const confirmed = confirmText === "DELETE";

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
          This will permanently delete your profile, assessment results, journal
          entries, and all saved content. <strong>This cannot be undone.</strong>
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

"use client";

import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import ProfileActionsDropdown from "./ProfileActionsDropdown";
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

export default function ProfileActionsMenu({
  exportStatus,
  exportLabel,
  onExport,
  resetStatus,
  onResetPassword,
  onNotifications,
  onDeleteAccount,
}: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setOpen(false), open);

  function close() { setOpen(false); }

  return (
    <div className="profile-actions-menu" ref={menuRef}>
      <button
        type="button"
        className="profile-actions-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Account settings"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="profile-actions-trigger-icon">⚙</span>
        <span className="profile-actions-trigger-label">Settings</span>
      </button>

      {open && (
        <ProfileActionsDropdown
          exportStatus={exportStatus}
          exportLabel={exportLabel}
          onExport={() => { onExport(); close(); }}
          resetStatus={resetStatus}
          onResetPassword={() => { onResetPassword(); close(); }}
          onNotifications={() => { onNotifications(); close(); }}
          onDeleteAccount={() => { onDeleteAccount(); close(); }}
        />
      )}
    </div>
  );
}

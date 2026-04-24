import { type ReactNode } from "react";

export type SaveStatus = "idle" | "saved" | "error";
export type PanelStatus = SaveStatus | "sent";

interface EditPanelProps {
  title: string;
  saving: boolean;
  status: PanelStatus;
  saveLabel: string;
  onSave: () => void;
  onDelete: (() => void) | null;
  children: ReactNode;
  statusOkLabel?: string;
}

export default function EditPanel(
  {
    title,
    saving,
    status,
    saveLabel,
    onSave,
    onDelete,
    children,
    statusOkLabel,
  }: EditPanelProps,
) {
  return (
    <>
      <div className="admin-form-header">
        <h2 className="admin-form-title">{title}</h2>
        <div className="admin-form-actions">
          {status === "saved" && (
            <span className="admin-status-ok">
              {statusOkLabel ?? "✓ Saved"}
            </span>
          )}
          {status === "sent" && (
            <span className="admin-status-ok">{statusOkLabel ?? "✓ Sent"}</span>
          )}
          {status === "error" && (
            <span className="admin-status-err">Save failed</span>
          )}
          {onDelete && (
            <button
              type="button"
              className="admin-delete-btn"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
          <button
            type="button"
            className="admin-save-btn"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? "Saving…" : saveLabel}
          </button>
        </div>
      </div>
      <div className="admin-form-scroll">{children}</div>
    </>
  );
}

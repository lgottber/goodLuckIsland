export default function EditPanel(
  { title, saving, status, saveLabel, onSave, onDelete, children },
) {
  return (
    <>
      <div className="admin-form-header">
        <h2 className="admin-form-title">{title}</h2>
        <div className="admin-form-actions">
          {status === "saved" && (
            <span className="admin-status-ok">✓ Saved</span>
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

import Modal from "./Modal";

export default function NavGateModal({ onClose }) {
  return (
    <Modal
      backdropClassName="nav-gate-backdrop"
      contentClassName="nav-gate-modal"
      onClose={onClose}
    >
      <button
        type="button"
        className="nav-gate-close"
        onClick={onClose}
      >
        ✕
      </button>
      <div className="nav-gate-icon">🔒</div>
      <h3 className="nav-gate-title">Member Content</h3>
      <p className="nav-gate-desc">
        Articles and podcast episodes are free to access — just sign in or
        create your free account to get in.
      </p>
      <div className="nav-gate-actions">
        <a href="/auth/login" className="nav-gate-btn-solid">Sign In</a>
        <a
          href="/auth/login?screen_hint=signup"
          className="nav-gate-btn-ghost"
        >
          Join Free →
        </a>
      </div>
    </Modal>
  );
}

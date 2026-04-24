export default function NavAdminMenuItem({ onClose }) {
  return (
    <>
      <div className="nav-dropdown-divider" />
      <a
        href="/admin"
        className="nav-dropdown-item"
        onClick={onClose}
      >
        <span className="nav-dropdown-icon">⚙️</span> Admin Portal
      </a>
    </>
  );
}

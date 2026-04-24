export default function NavDropdownItem({ href, label, onClose }) {
  return (
    <a
      href={href}
      className="nav-dropdown-item"
      onClick={onClose}
    >
      <span className="nav-dropdown-icon"></span> {label}
    </a>
  );
}

export default function NavDropdownItem({ href, label, onClose }: { href: string; label: string; onClose: () => void }) {
  return (
    <a href={href} className="nav-dropdown-item" onClick={onClose}>
      <span className="nav-dropdown-icon"></span> {label}
    </a>
  );
}

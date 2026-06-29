import Link from "next/link";

export default function NavDropdownItem({ href, label, onClose }: { href: string; label: string; onClose: () => void }) {
  return (
    <Link href={href} className="nav-dropdown-item" onClick={onClose}>
      <span className="nav-dropdown-icon"></span> {label}
    </Link>
  );
}

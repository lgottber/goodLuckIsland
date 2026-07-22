"use client";

import NavDropdownItem from "./NavDropdownItem";
import NavDropdownPatreonItem from "./NavDropdownPatreonItem";
import Icon from "./Icon";
import { usePatreonLink } from "../hooks/usePatreonLink";

const MENU_ITEMS = [
  { href: "/profile", label: "My Profile" },
  { href: "/backpack", label: "My Backpack" },
];

export default function NavDropdown({ onClose }: { onClose: () => void }) {
  const patreonUrl = usePatreonLink();

  return (
    <div className="nav-dropdown">
      {MENU_ITEMS.map(({ href, label }) => (
        <NavDropdownItem
          key={href}
          href={href}
          label={label}
          onClose={onClose}
        />
      ))}
      {patreonUrl && <NavDropdownPatreonItem url={patreonUrl} onClose={onClose} />}
      <div className="nav-dropdown-divider" />
      <a href="/auth/logout" className="nav-dropdown-item nav-dropdown-logout">
        <span className="nav-dropdown-icon"><Icon name="logout" size={14} /></span> Logout
      </a>
    </div>
  );
}

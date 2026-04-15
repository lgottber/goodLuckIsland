import NavDropdownItem from "./NavDropdownItem";
import NavAdminMenuItem from "./NavAdminMenuItem";

const MENU_ITEMS = [
  { href: "/profile", label: "My Profile" },
  { href: "/saved", label: "Saved Content" },
  { href: "/backpack", label: "My Backpack" },
];

export default function NavDropdown(
  { isAdmin, onClose, exportStatus, onExport },
) {
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
      <div className="nav-dropdown-divider" />
      <button
        type="button"
        className="nav-dropdown-item"
        onClick={onExport}
        disabled={exportStatus === "exporting"}
      >
        <span className="nav-dropdown-icon">📥</span>
        {exportStatus === "exporting"
          ? "Exporting…"
          : exportStatus === "done"
          ? "✓ Exported!"
          : exportStatus === "error"
          ? "Export failed"
          : "Export My Data"}
      </button>
      {isAdmin && <NavAdminMenuItem onClose={onClose} />}
      <div className="nav-dropdown-divider" />
      <a
        href="/auth/logout"
        className="nav-dropdown-item nav-dropdown-logout"
      >
        <span className="nav-dropdown-icon"></span> Logout
      </a>
    </div>
  );
}

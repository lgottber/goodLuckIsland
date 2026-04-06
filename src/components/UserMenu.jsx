export default function UserMenu({
  user,
  initials,
  largeAvatar,
  dropdownOpen,
  setDropdownOpen,
  dropdownRef,
}) {
  return (
    <div className="nav-user-menu" ref={dropdownRef}>
      <button
        type="button"
        className={`nav-avatar-btn${largeAvatar ? " nav-avatar-btn--lg" : ""}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label="User menu"
      >
        {user.picture
          ? (
            <img
              src={user.picture}
              alt={user.name ?? "User"}
              className="nav-avatar-img"
            />
          )
          : <div className="nav-avatar-initials">{initials}</div>}
      </button>
      {dropdownOpen && (
        <div className="nav-dropdown">
          {[
            { href: "/profile", label: "My Profile" },
            { href: "/saved", label: "Saved Content" },
            { href: "/backpack", label: "My Backpack" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="nav-dropdown-item"
              onClick={() => setDropdownOpen(false)}
            >
              <span className="nav-dropdown-icon"></span> {label}
            </a>
          ))}
          <div className="nav-dropdown-divider" />
          <a href="/auth/logout" className="nav-dropdown-item nav-dropdown-logout">
            <span className="nav-dropdown-icon"></span> Logout
          </a>
        </div>
      )}
    </div>
  );
}

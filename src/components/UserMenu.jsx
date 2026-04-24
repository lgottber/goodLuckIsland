import NavDropdown from "./NavDropdown";

export default function UserMenu({
  user,
  initials,
  largeAvatar,
  dropdownOpen,
  setDropdownOpen,
  dropdownRef,
  isAdmin = false,
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
        <NavDropdown
          isAdmin={isAdmin}
          onClose={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
}

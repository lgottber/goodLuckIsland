import { RefObject } from "react";
import { User } from "@auth0/auth0-react";
import NavDropdown from "./NavDropdown";
import PictureImage from "./PictureImage";

export default function UserMenu({
  user,
  initials,
  largeAvatar,
  dropdownOpen,
  setDropdownOpen,
  dropdownRef,
}: {
  user: User;
  initials: string;
  largeAvatar: boolean;
  dropdownOpen: boolean;
  setDropdownOpen: (v: boolean) => void;
  dropdownRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="nav-user-menu" ref={dropdownRef}>
      <button
        type="button"
        className={`nav-avatar-btn${largeAvatar ? " nav-avatar-btn--lg" : ""}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label="User menu"
      >
        {user.picture ? (
          <PictureImage
            name={user.picture}
            alt={user.name ? `${user.name} profile picture` : "User profile picture"}
            className="nav-avatar-img"
            sizes="40px"
          />
        ) : (
          <div className="nav-avatar-initials">{initials}</div>
        )}
      </button>
      {dropdownOpen && (
        <NavDropdown
          onClose={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
}

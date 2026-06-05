import { RefObject } from "react";
import { User } from "@auth0/auth0-react";
import { AVATAR_ERAS } from "../app/profile/AvatarDisplay";
import NavDropdown from "./NavDropdown";
import PictureImage from "./PictureImage";

export default function UserMenu({
  user,
  initials,
  avatarId,
  largeAvatar,
  dropdownOpen,
  setDropdownOpen,
  dropdownRef,
}: {
  user: User;
  initials: string;
  avatarId?: string;
  largeAvatar: boolean;
  dropdownOpen: boolean;
  setDropdownOpen: (v: boolean) => void;
  dropdownRef: RefObject<HTMLDivElement | null>;
}) {
  const avatarChar = avatarId
    ? AVATAR_ERAS.flatMap((e) => e.characters).find((c) => c.id === avatarId)
    : null;

  let avatarContent;
  if (avatarChar) {
    avatarContent = <PictureImage name={avatarChar.image} alt={avatarChar.name} className="nav-avatar-img" />;
  } else if (user.picture) {
    avatarContent = <PictureImage name={user.picture} alt={user.name ?? "User"} className="nav-avatar-img" />;
  } else {
    avatarContent = <div className="nav-avatar-initials">{initials}</div>;
  }

  return (
    <div className="nav-user-menu" ref={dropdownRef}>
      <button
        type="button"
        className={`nav-avatar-btn${largeAvatar ? " nav-avatar-btn--lg" : ""}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label="User menu"
      >
        {avatarContent}
      </button>
      {dropdownOpen && (
        <NavDropdown
          onClose={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
}

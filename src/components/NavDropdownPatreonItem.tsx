import Icon from "./Icon";
import { trackEvent } from "../lib/analyticsApi";

export default function NavDropdownPatreonItem({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="nav-dropdown-item"
      onClick={() => {
        trackEvent("patreon_link_clicked");
        onClose();
      }}
    >
      <span className="nav-dropdown-icon">
        <Icon name="heart" size={14} />
      </span>{" "}
      Support us on Patreon
    </a>
  );
}

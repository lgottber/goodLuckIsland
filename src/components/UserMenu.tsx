import { useState, RefObject } from "react";
import { User } from "@auth0/auth0-react";
import { exportProfileData } from "../lib/profileApi";
import NavDropdown from "./NavDropdown";

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
  const [exportStatus, setExportStatus] = useState("idle");

  function formatCsvValue(v: unknown) {
    return `"${String(v ?? "").replace(/"/g, '""')}"`;
  }

  async function handleExportData() {
    setExportStatus("exporting");
    try {
      const data = await exportProfileData(user.sub ?? "");
      const headers = Object.keys(data).join(",");
      const values = Object.values(data).map(formatCsvValue).join(",");
      const blob = new Blob([`${headers}\n${values}`], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-good-luck-island-data.csv";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 0);
      setExportStatus("done");
      setTimeout(() => setExportStatus("idle"), 3000);
    } catch {
      setExportStatus("error");
    }
  }

  return (
    <div className="nav-user-menu" ref={dropdownRef}>
      <button
        type="button"
        className={`nav-avatar-btn${largeAvatar ? " nav-avatar-btn--lg" : ""}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label="User menu"
      >
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name ?? "User"}
            className="nav-avatar-img"
          />
        ) : (
          <div className="nav-avatar-initials">{initials}</div>
        )}
      </button>
      {dropdownOpen && (
        <NavDropdown
          onClose={() => setDropdownOpen(false)}
          exportStatus={exportStatus}
          onExport={handleExportData}
        />
      )}
    </div>
  );
}

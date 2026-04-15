import { useState } from "react";
import { exportProfileData } from "../lib/profileApi";
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
  const [exportStatus, setExportStatus] = useState("idle");

  function formatCsvValue(v) {
    return `"${String(v ?? "").replace(/"/g, '""')}"`;
  }

  async function handleExportData() {
    setExportStatus("exporting");
    try {
      const data = await exportProfileData(user.sub);
      const headers = Object.keys(data).join(",");
      const values = Object.values(data).map(formatCsvValue).join(",");
      const blob = new Blob([`${headers}\n${values}`], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-good-luck-island-data.csv";
      a.click();
      URL.revokeObjectURL(url);
      setExportStatus("done");
      setTimeout(() => setExportStatus("idle"), 3000);
    } catch (error) {
      console.error(error);
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
          exportStatus={exportStatus}
          onExport={handleExportData}
        />
      )}
    </div>
  );
}

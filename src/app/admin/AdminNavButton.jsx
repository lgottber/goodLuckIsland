export default function AdminNavButton({ item, active, onClick }) {
  return (
    <button
      type="button"
      className={`admin-nav-btn${active ? " active" : ""}`}
      onClick={onClick}
    >
      <span>{item.icon}</span> {item.label}
    </button>
  );
}

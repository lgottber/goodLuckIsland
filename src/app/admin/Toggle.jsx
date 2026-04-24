export default function Toggle({ on, onToggle, labelOn, labelOff }) {
  return (
    <button
      type="button"
      className={`admin-toggle-btn${on ? " on" : ""}`}
      onClick={onToggle}
    >
      <span className={`admin-toggle-track${on ? " on" : ""}`}>
        <span className="admin-toggle-thumb" />
      </span>
      {on ? labelOn : labelOff}
    </button>
  );
}

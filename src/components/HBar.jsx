import "./HBar.css";

export default function HBar({ label, pct, color = "#2e8b7a", total }) {
  return (
    <div className="hbar">
      <span className="hbar-label">{label}</span>
      <div className="hbar-track">
        <div
          className="hbar-fill"
          ref={(el) => {
            if (el) {
              el.style.setProperty("--hbar-width", `${pct}%`);
              el.style.setProperty("--hbar-color", color);
            }
          }}
        />
      </div>
      <span className="hbar-pct">{pct}%</span>
      {total && (
        <span className="hbar-total">
          {Math.round(total * pct / 100)}
        </span>
      )}
    </div>
  );
}

export default function HBar({ label, pct, color = "#2e8b7a", total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <span
        style={{
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.55)",
          width: 110,
          flexShrink: 0,
          textAlign: "right",
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 8,
          background: "rgba(255,255,255,0.07)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: color,
            borderRadius: 4,
            transition: "width 0.6s ease",
          }}
        />
      </div>
      <span
        style={{
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.4)",
          width: 32,
          textAlign: "right",
        }}
      >
        {pct}%
      </span>
      {total && (
        <span
          style={{
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.25)",
            width: 36,
            textAlign: "right",
          }}
        >
          {Math.round(total * pct / 100)}
        </span>
      )}
    </div>
  );
}

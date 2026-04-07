export default function SectionCard({ title, children, span }) {
  return (
    <div
      style={{
        background: "#131c38",
        borderRadius: 16,
        padding: "1.5rem",
        border: "1px solid rgba(255,255,255,0.06)",
        gridColumn: span ? `span ${span}` : undefined,
      }}
    >
      <p
        style={{
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          marginBottom: "1.25rem",
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

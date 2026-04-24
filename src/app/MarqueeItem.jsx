export default function MarqueeItem({ text }) {
  return (
    <span className="marquee-item">
      <span className="marquee-dot">◈</span> {text}
    </span>
  );
}

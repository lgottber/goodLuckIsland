export default function MarqueeItem({ text }: { text: string }) {
  return (
    <span className="marquee-item">
      <span className="marquee-dot">◈</span> {text}
    </span>
  );
}

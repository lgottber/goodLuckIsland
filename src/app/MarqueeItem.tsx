import Icon from "../components/Icon";

export default function MarqueeItem({ text }: { text: string }) {
  return (
    <span className="marquee-item">
      <span className="marquee-dot"><Icon name="dot" size={8} /></span> {text}
    </span>
  );
}

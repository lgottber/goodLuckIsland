export default function PromiseItem({ text }: { text: string }) {
  return (
    <div className="promise-item">
      <div className="promise-check">✓</div>
      <span className="promise-text">{text}</span>
    </div>
  );
}

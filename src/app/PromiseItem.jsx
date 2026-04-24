export default function PromiseItem({ text }) {
  return (
    <div className="promise-item">
      <div className="promise-check">✓</div>
      <span className="promise-text">{text}</span>
    </div>
  );
}

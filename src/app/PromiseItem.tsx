import Icon from "../components/Icon";

export default function PromiseItem({ text }: { text: string }) {
  return (
    <div className="promise-item">
      <div className="promise-check"><Icon name="check" size={14} /></div>
      <span className="promise-text">{text}</span>
    </div>
  );
}

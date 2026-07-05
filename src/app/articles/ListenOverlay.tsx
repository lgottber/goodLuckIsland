import Icon from "../../components/Icon";

export default function ListenOverlay({ url, title }: { url: string; title: string }) {
  return (
    <a
      className="featured-play-overlay"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Listen to ${title}`}
    >
      <span className="featured-play-btn" aria-hidden="true">
        <Icon name="headphones" size={26} />
      </span>
      <span className="featured-play-label">Listen Now</span>
    </a>
  );
}

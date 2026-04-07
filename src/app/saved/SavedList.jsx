import Link from "next/link";

const TAG_COLORS = {
  "Retirement": "teal",
  "Wellness": "navy",
  "Clear Thinking": "coral",
  "Financial Independence": "teal",
};

export default function SavedList({ items }) {
  if (items.length === 0) {
    return (
      <div className="saved-empty">
        <div className="saved-empty-icon">🔖</div>
        <h3>Nothing saved yet</h3>
        <p>
          Bookmark articles and podcast episodes to find them here.
        </p>
        <Link href="/articles" className="saved-empty-cta">
          Browse Podcasts &amp; Articles →
        </Link>
      </div>
    );
  }
  return (
    <div className="saved-list">
      {items.map((item) => (
        <div key={item.id} className="saved-item">
          <div className="saved-item-img">
            <img src={item.image} alt={item.title} />
            <span
              className={`saved-item-type saved-item-type--${item.type}`}
            >
              {item.type === "podcast" ? "🎙 Podcast" : "📄 Article"}
            </span>
          </div>
          <div className="saved-item-body">
            <div className="saved-item-meta">
              <span
                className={`saved-tag saved-tag--${
                  TAG_COLORS[item.tag] ?? "teal"
                }`}
              >
                {item.tag}
              </span>
              <span className="saved-item-date">{item.date}</span>
              <span className="saved-item-dot">·</span>
              <span className="saved-item-time">{item.readTime}</span>
            </div>
            <h3 className="saved-item-title">{item.title}</h3>
            <p className="saved-item-excerpt">{item.excerpt}</p>
            <div className="saved-item-footer">
              <Link href="/articles" className="saved-item-cta">
                {item.type === "podcast" ? "Listen Now →" : "Read Now →"}
              </Link>
              <button type="button" className="saved-item-remove">
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

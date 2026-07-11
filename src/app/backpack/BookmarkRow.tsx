import type { SavedItemData } from "../saved/SavedItem";

export default function BookmarkRow({
  item,
  onRemove,
}: {
  item: SavedItemData;
  onRemove: (item: SavedItemData) => void;
}) {
  return (
    <div className="bm-row">
      <span className="bm-row-title">{item.title}</span>
      {item.date && <span className="bm-row-date">{item.date}</span>}
      <span className={`bm-row-type bm-row-type--${item.type}`}>
        {item.type === "podcast" ? "Podcast" : item.type === "video" ? "Video" : "Article"}
      </span>
      <button
        type="button"
        className="bm-row-remove"
        aria-label={`Remove "${item.title}"`}
        onClick={() => onRemove(item)}
      >
        ✕
      </button>
    </div>
  );
}

import Link from "next/link";
import PictureImage from "../../components/PictureImage";
import SavedTypeLabel from "./SavedTypeLabel";
import SavedItemCta from "./SavedItemCta";

const TAG_COLORS: Record<string, string> = {
  Retirement: "teal",
  Wellness: "navy",
  "Clear Thinking": "coral",
  "Financial Independence": "teal",
};

type SavedItemData = { id: number; image: string; type: string; tag: string; date: string; readTime: string; title: string; excerpt: string };

export default function SavedItem({ item }: { item: SavedItemData }) {
  return (
    <div className="saved-item">
      <div className="saved-item-img">
        <PictureImage
          name={item.image}
          alt={`Cover image for saved ${item.type}: ${item.title}`}
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <span className={`saved-item-type saved-item-type--${item.type}`}>
          <SavedTypeLabel type={item.type} />
        </span>
      </div>
      <div className="saved-item-body">
        <div className="saved-item-meta">
          <span
            className={`saved-tag saved-tag--${TAG_COLORS[item.tag] ?? "teal"}`}
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
            <SavedItemCta type={item.type} />
          </Link>
          <button type="button" className="saved-item-remove">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

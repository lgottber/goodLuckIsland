import Link from "next/link";
import SavedItem from "./SavedItem";

type SavedItemData = { id: number; image: string; type: string; tag: string; date: string; readTime: string; title: string; excerpt: string };

export default function SavedList({ items }: { items: SavedItemData[] }) {
  if (items.length === 0) {
    return (
      <div className="saved-empty">
        <div className="saved-empty-icon">🔖</div>
        <h3>Nothing saved yet</h3>
        <p>Bookmark articles and podcast episodes to find them here.</p>
        <Link href="/articles" className="saved-empty-cta">
          Browse Podcasts &amp; Articles →
        </Link>
      </div>
    );
  }
  return (
    <div className="saved-list">
      {items.map((item) => (
        <SavedItem key={item.id} item={item} />
      ))}
    </div>
  );
}

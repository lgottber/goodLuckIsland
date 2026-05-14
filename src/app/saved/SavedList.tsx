import Link from "next/link";
import SavedItem from "./SavedItem";
import Icon from "../../components/Icon";

type SavedItemData = { id: number; image: string; type: string; tag: string; date: string; readTime: string; title: string; excerpt: string };

export default function SavedList({ items }: { items: SavedItemData[] }) {
  if (items.length === 0) {
    return (
      <div className="saved-empty">
        <div className="saved-empty-icon"><Icon name="bookmark" size={32} /></div>
        <h3>Nothing saved yet</h3>
        <p>Bookmark articles and podcast episodes to find them here.</p>
        <Link href="/articles" className="saved-empty-cta">
          Browse Podcasts &amp; Articles <Icon name="arrow-right" size={14} />
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

import PictureImage from "../../components/PictureImage";
import Icon from "../../components/Icon";

type Article = { id: number; category: string; title: string; excerpt: string | null; date: string | null; readTime: string | null; image: string | null; featured?: boolean };

export default function FeaturedArticle({ featured }: { featured: Article }) {
  return (
    <div className="featured-article">
      <div className="featured-img">
        <PictureImage
          name={featured.image ?? undefined}
          alt={`Featured article cover image: ${featured.title}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span className="featured-tag-overlay">{featured.category}</span>
      </div>
      <div className="featured-body">
        <p className="featured-label"><Icon name="star" size={12} /> Featured Article</p>
        <div className="featured-meta">
          <span>{featured.date}</span>
          <span className="featured-meta-dot" />
          <span>{featured.readTime}</span>
        </div>
        <h2 className="featured-title">{featured.title}</h2>
        <p className="featured-excerpt">{featured.excerpt}</p>
        <button type="button" className="btn-read">
          Read Article <Icon name="arrow-right" size={14} />
        </button>
      </div>
    </div>
  );
}

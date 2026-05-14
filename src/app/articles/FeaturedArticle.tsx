type Article = { id: number; category: string; title: string; excerpt: string | null; date: string | null; readTime: string | null; image: string | null; featured?: boolean };

export default function FeaturedArticle({ featured }: { featured: Article }) {
  return (
    <div className="featured-article">
      <div className="featured-img">
        <img src={featured.image ?? undefined} alt={featured.title} />
        <span className="featured-tag-overlay">{featured.category}</span>
      </div>
      <div className="featured-body">
        <p className="featured-label">✦ Featured Article</p>
        <div className="featured-meta">
          <span>{featured.date}</span>
          <span className="featured-meta-dot" />
          <span>{featured.readTime}</span>
        </div>
        <h2 className="featured-title">{featured.title}</h2>
        <p className="featured-excerpt">{featured.excerpt}</p>
        <button type="button" className="btn-read">
          Read Article →
        </button>
      </div>
    </div>
  );
}

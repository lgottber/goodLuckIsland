import PictureImage from "../../components/PictureImage";

type Article = { id: number; category: string; title: string; excerpt: string | null; date: string | null; readTime: string | null; image: string | null; featured?: boolean };

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="article-card">
      <div className="article-card-img">
        <PictureImage
          name={article.image ?? undefined}
          alt={`Article cover image: ${article.title}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="article-card-tag">{article.category}</span>
      </div>
      <div className="article-card-body">
        <div className="article-card-meta">
          <span>{article.date}</span>
          <span className="article-card-meta-dot" />
          <span>{article.readTime}</span>
        </div>
        <h3 className="article-card-title">{article.title}</h3>
        <p className="article-card-excerpt">{article.excerpt}</p>
        <button type="button" className="article-card-read">
          Read More
        </button>
      </div>
    </div>
  );
}

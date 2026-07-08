import PictureImage from "../../components/PictureImage";
import BookmarkButton from "./BookmarkButton";
import type { Article } from "../../lib/articlesApi";
import { trackEvent } from "../../lib/analyticsApi";

interface Props {
  article: Article;
  userId: string;
  isSaved: boolean;
}

export default function ArticleCard({ article, userId, isSaved }: Props) {
  return (
    <div className="article-card">
      <div className="article-card-img">
        <PictureImage
          name={article.image ?? undefined}
          alt={`Article cover image: ${article.title}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="article-card-tag">{article.category}</span>
        {userId && (
          <BookmarkButton
            userId={userId}
            itemType="article"
            itemId={article.id}
            initialSaved={isSaved}
          />
        )}
      </div>
      <div className="article-card-body">
        <div className="article-card-meta">
          <span>{article.date}</span>
          <span className="article-card-meta-dot" />
          <span>{article.readTime}</span>
        </div>
        <h3 className="article-card-title">{article.title}</h3>
        <p className="article-card-excerpt">{article.excerpt}</p>
        <button
          type="button"
          className="article-card-read"
          onClick={() => trackEvent("content_viewed", { contentType: "article", contentId: article.id })}
        >
          Read More
        </button>
      </div>
    </div>
  );
}

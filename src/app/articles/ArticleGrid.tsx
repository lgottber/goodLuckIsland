import ArticleCard from "./ArticleCard";
import type { Article } from "../../lib/articlesApi";

interface Props {
  articles: Article[];
  userId: string;
  savedArticleIds: Set<number>;
  view: "grid" | "list";
}

export default function ArticleGrid({ articles, userId, savedArticleIds, view }: Props) {
  if (articles.length === 0) {
    return (
      <p className="articles-grid-empty">
        No articles in this category yet — check back soon.
      </p>
    );
  }
  return (
    <div className={`articles-grid${view === "list" ? " articles-grid--list" : ""}`}>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          userId={userId}
          isSaved={savedArticleIds.has(article.id)}
        />
      ))}
    </div>
  );
}

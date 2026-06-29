import ArticleCard from "./ArticleCard";
import type { Article } from "../../lib/articlesApi";

export default function ArticleGrid({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <p className="articles-grid-empty">
        No articles in this category yet — check back soon.
      </p>
    );
  }
  return (
    <div className="articles-grid">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

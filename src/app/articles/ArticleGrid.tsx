import ArticleCard from "./ArticleCard";

type Article = { id: number; category: string; title: string; excerpt: string | null; date: string | null; readTime: string | null; image: string | null; featured?: boolean };

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

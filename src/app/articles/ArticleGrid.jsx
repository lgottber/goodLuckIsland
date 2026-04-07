export default function ArticleGrid({ articles }) {
  if (articles.length === 0) {
    return (
      <p
        style={{
          color: "var(--muted)",
          textAlign: "center",
          padding: "2rem 0",
        }}
      >
        No articles in this category yet — check back soon.
      </p>
    );
  }
  return (
    <div className="articles-grid">
      {articles.map((article) => (
        <div key={article.id} className="article-card">
          <div className="article-card-img">
            <img src={article.image} alt={article.title} />
            <span className="article-card-tag">
              {article.category}
            </span>
          </div>
          <div className="article-card-body">
            <div className="article-card-meta">
              <span>{article.date}</span>
              <span className="article-card-meta-dot" />
              <span>{article.readTime}</span>
            </div>
            <h3 className="article-card-title">
              {article.title}
            </h3>
            <p className="article-card-excerpt">
              {article.excerpt}
            </p>
            <button
              type="button"
              className="article-card-read"
            >
              Read More <span className="article-card-read-arrow">→</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

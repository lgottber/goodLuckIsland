import ArticleCard from "../articles/ArticleCard";
import SearchSection from "./SearchSection";
import type { Article } from "../../lib/articlesApi";

interface Props {
  articles: Article[];
  userId: string;
  savedArticleIds: Set<number>;
}

export default function ArticleResults({ articles, userId, savedArticleIds }: Props) {
  return (
    <SearchSection title="Articles">
      <div className="search-article-grid">
        {articles.map((a) => (
          <ArticleCard
            key={a.id}
            article={a}
            userId={userId}
            isSaved={savedArticleIds.has(a.id)}
          />
        ))}
      </div>
    </SearchSection>
  );
}

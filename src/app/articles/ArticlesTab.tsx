import Link from "next/link";
import PictureImage from "../../components/PictureImage";
import Icon from "../../components/Icon";
import FilterTabs from "../../components/FilterTabs";
import ArticleGrid from "./ArticleGrid";
import FeaturedArticle from "./FeaturedArticle";
import PullQuoteBand from "./PullQuoteBand";
import type { Article } from "../../lib/articlesApi";

const CATEGORIES = [
  "All",
  "Getting Ready for Retirement",
  "Whole-Life Wellness",
  "Clear Thinking",
  "Financial Independence",
];

interface Props {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  featured: Article | null;
  filtered: Article[];
  sort: "newest" | "a-z";
  setSort: (s: "newest" | "a-z") => void;
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
  userId: string;
  savedArticleIds: Set<number>;
}

function sortArticles(articles: Article[], sort: "newest" | "a-z"): Article[] {
  if (sort === "a-z") return [...articles].sort((a, b) => a.title.localeCompare(b.title));
  return articles;
}

export default function ArticlesTab({
  activeCategory,
  setActiveCategory,
  featured,
  filtered,
  sort,
  setSort,
  view,
  setView,
  userId,
  savedArticleIds,
}: Props) {
  const sorted = sortArticles(filtered, sort);

  return (
    <>
      <div className="articles-arch">
        <PictureImage
          name="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80"
          alt="Serene beach with clear blue water representing the calm retirement lifestyle Good Luck Island promotes"
          sizes="(max-width: 768px) 100vw, 900px"
        />
      </div>

      <div className="articles-tab-pad">
        <div className="book-promo-strip">
          <div className="book-promo-icon"><Icon name="book" size={24} /></div>
          <div className="book-promo-text">
            <p className="book-promo-from">From our book:</p>
            <p className="book-promo-title">
              Don&apos;t Drink the Retirement Planning Cool Aid
            </p>
          </div>
          <Link href="/shop">
            <button type="button" className="book-promo-btn">
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="articles-content">
        <FilterTabs
          containerClass="filter-bar"
          buttonClass="filter-btn"
          items={CATEGORIES}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="articles-sort-bar">
          <div className="articles-sort-group">
            <span className="articles-sort-label">Sort:</span>
            <button
              type="button"
              className={`articles-sort-btn${sort === "newest" ? " active" : ""}`}
              onClick={() => setSort("newest")}
            >
              Newest
            </button>
            <button
              type="button"
              className={`articles-sort-btn${sort === "a-z" ? " active" : ""}`}
              onClick={() => setSort("a-z")}
            >
              A–Z
            </button>
          </div>
          <div className="articles-view-group">
            <button
              type="button"
              className={`articles-view-btn${view === "grid" ? " active" : ""}`}
              onClick={() => setView("grid")}
              aria-label="Grid view"
            >
              <Icon name="dot" size={14} />
            </button>
            <button
              type="button"
              className={`articles-view-btn${view === "list" ? " active" : ""}`}
              onClick={() => setView("list")}
              aria-label="List view"
            >
              <Icon name="minus" size={14} />
            </button>
          </div>
        </div>

        {activeCategory === "All" && featured && (
          <FeaturedArticle featured={featured} />
        )}

        {activeCategory === "All" && <PullQuoteBand />}

        <ArticleGrid
          articles={sorted}
          userId={userId}
          savedArticleIds={savedArticleIds}
          view={view}
        />

        <div className="newsletter-strip">
          <div className="newsletter-strip-text">
            <h3>Get new articles in your inbox</h3>
            <p>
              No noise. No spam. Just thoughtful content delivered when there&apos;s
              something worth reading.
            </p>
          </div>
          <div className="newsletter-form">
            <input
              className="newsletter-input"
              type="email"
              placeholder="Your email address"
            />
            <button type="button" className="newsletter-btn">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

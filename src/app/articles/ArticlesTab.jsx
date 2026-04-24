import Link from "next/link";
import FilterTabs from "../../components/FilterTabs";
import ArticleGrid from "./ArticleGrid";
import FeaturedArticle from "./FeaturedArticle";
import PullQuoteBand from "./PullQuoteBand";

const CATEGORIES = [
  "All",
  "Getting Ready for Retirement",
  "Whole-Life Wellness",
  "Clear Thinking",
  "Financial Independence",
];

export default function ArticlesTab({
  activeCategory,
  setActiveCategory,
  featured,
  filtered,
}) {
  return (
    <>
      <div className="articles-arch">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80"
          alt="Retirement lifestyle"
        />
      </div>

      <div className="articles-tab-pad">
        <div className="book-promo-strip">
          <div className="book-promo-icon">📖</div>
          <div className="book-promo-text">
            <p className="book-promo-from">From our book:</p>
            <p className="book-promo-title">
              Don't Drink the Retirement Planning Cool Aid
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

        {activeCategory === "All" && featured && (
          <FeaturedArticle featured={featured} />
        )}

        {activeCategory === "All" && <PullQuoteBand />}

        <ArticleGrid articles={filtered} />

        <div className="newsletter-strip">
          <div className="newsletter-strip-text">
            <h3>Get new articles in your inbox</h3>
            <p>
              No noise. No spam. Just thoughtful content delivered when there's
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

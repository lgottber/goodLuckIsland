"use client";

import { useState } from "react";
import Link from "next/link";
import "./articles.css";

// ─── Mock Articles — replace with your real CMS / database ───────────────────
const ALL_ARTICLES = [
  {
    id: 1,
    category: "Getting Ready for Retirement",
    title: "A Thoughtful Retirement Mindset for Gen X",
    excerpt:
      "What if the biggest obstacle to a great retirement isn't financial — it's psychological? We explore the mindset shifts that make all the difference.",
    date: "Mar 1, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    featured: true,
  },
  {
    id: 2,
    category: "Clear Thinking",
    title: "Popular Advice Isn't Always Helpful Advice",
    excerpt:
      "Loud guidance pushes urgency. Calm education builds confidence. Here's how to tell the difference — and why it matters more than ever.",
    date: "Feb 22, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
  },
  {
    id: 3,
    category: "Whole-Life Wellness",
    title: "A Calm Place to Think About What Comes Next",
    excerpt:
      "Good Luck Island Collective exists to help you step out of the noise and into clarity — through learning, reflection, and thoughtful perspective.",
    date: "Feb 15, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
  },
  {
    id: 4,
    category: "Whole-Life Wellness",
    title: "Whole-Life Wellness: What It Really Means After 50",
    excerpt:
      "Health isn't just physical. This piece reframes wellness as something that encompasses your relationships, your purpose, and your sense of self.",
    date: "Feb 8, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
  },
  {
    id: 5,
    category: "Getting Ready for Retirement",
    title: "Planning for the Future Isn't About Predicting Every Outcome",
    excerpt:
      "It's about giving your future self more choices. It's progress, resilience, and peace of mind — not a perfect plan.",
    date: "Feb 1, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
  },
  {
    id: 6,
    category: "Clear Thinking",
    title: "The Identity Problem Nobody Talks About in Retirement",
    excerpt:
      "For decades, work has been who you are. So what happens when it ends? The answer to this question might matter more than your 401(k) balance.",
    date: "Jan 25, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: 7,
    category: "Financial Independence",
    title: "What 'Enough' Really Means — And Why the Number Isn't the Point",
    excerpt:
      "Most people chase a retirement number without ever defining what enough actually feels like. This piece helps you start with the feeling instead.",
    date: "Jan 18, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
];

const CATEGORIES = [
  "All",
  "Getting Ready for Retirement",
  "Whole-Life Wellness",
  "Clear Thinking",
  "Financial Independence",
];

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);

  const featured = ALL_ARTICLES.find((a) => a.featured);
  const filtered = ALL_ARTICLES.filter((a) => {
    if (a.featured) return false;
    if (activeCategory === "All") return true;
    return a.category === activeCategory;
  });

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <img
              src="/goodLuckIslandLogoSmall.png"
              alt="Good Luck Island Collective"
              style={{ height: 75, width: "auto", objectFit: "contain" }}
            />
          </Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/shop">Book & Support</Link>
          </div>
          <div className="nav-auth">
            <a href="/auth/login" className="nav-btn-ghost">Sign In</a>
            <a href="/auth/login?screen_hint=signup" className="nav-btn-solid">
              Join Free
            </a>
          </div>
          <button
            type="button"
            className={`nav-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div className={`nav-mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button
          type="button"
          className="nav-mobile-close"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
        <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
        <Link href="/shop"onClick={() => setMobileOpen(false)}>Book & Support</Link>
      </div>

      <div className="articles-page">
        {/* ── HEADER with arch image ── */}
        <div className="articles-header">
          <span className="articles-header-eyebrow">Freemium Content</span>
          <h1>A Thoughtful Retirement Mindset</h1>
          <p>
            Good Luck Island Collective is a self-help education platform for
            Gen X professionals preparing for retirement — focused on whole-life
            wellness, clear thinking, and intentional choices.
          </p>
        </div>

        {/* Arch hero image */}
        <div className="articles-arch">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80"
            alt="Retirement lifestyle"
          />
        </div>

        {/* Book promo card — floats up over arch */}
        <div style={{ padding: "0 2rem" }}>
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

        {/* ── MAIN CONTENT ── */}
        <div className="articles-content">
          {/* Filter Bar */}
          <div className="filter-bar">
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                className={`filter-btn ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          {activeCategory === "All" && featured && (
            <div className="featured-article">
              <div className="featured-img">
                <img src={featured.image} alt={featured.title} />
                <span className="featured-tag-overlay">
                  {featured.category}
                </span>
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
          )}

          {/* Pull Quote */}
          {activeCategory === "All" && (
            <div className="pull-quote-band">
              <p className="pull-quote-text">
                Planning for the future isn't about predicting every outcome —
                it's about giving your future self more choices. It's progress,
                resilience, and peace of mind.
              </p>
              <p className="pull-quote-source">Good Luck Island Collective</p>
            </div>
          )}

          {/* Article Grid */}
          {filtered.length > 0
            ? (
              <div className="articles-grid">
                {filtered.map((article) => (
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
                      <h3 className="article-card-title">{article.title}</h3>
                      <p className="article-card-excerpt">{article.excerpt}</p>
                      <button type="button" className="article-card-read">
                        Read More{" "}
                        <span className="article-card-read-arrow">→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
            : (
              <p
                style={{
                  color: "var(--muted)",
                  textAlign: "center",
                  padding: "2rem 0",
                }}
              >
                No articles in this category yet — check back soon.
              </p>
            )}

          {/* Newsletter Strip */}
          <div className="newsletter-strip">
            <div className="newsletter-strip-text">
              <h3>Get new articles in your inbox</h3>
              <p>
                No noise. No spam. Just thoughtful content delivered when
                there's something worth reading.
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
      </div>
    </>
  );
}

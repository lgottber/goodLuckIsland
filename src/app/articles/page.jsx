"use client";

import { useState } from "react";
import Link from "next/link";
import NavBar from "../../components/NavBarDynamic";
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

// ─── Mock Episodes — replace with your real data / CMS ───────────────────────
const EPISODES = [
  {
    id: 1,
    num: "EP. 01",
    title: "Rethinking Retirement, One Choice at a Time",
    desc:
      "What if the biggest mistake Gen X makes isn't financial — it's not knowing what they actually want? We kick off the show by questioning everything you've been told about retirement.",
    date: "Mar 1, 2026",
    duration: "42 min",
    youtubeId: "YOUTUBE_ID_1",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: 2,
    num: "EP. 02",
    title: "The Advisor Who Actually Works for You",
    desc:
      "Not all financial advisors are created equal. We break down how to spot the ones who are selling Cool Aid — and how to find the rare ones who actually have your back.",
    date: "Feb 22, 2026",
    duration: "38 min",
    youtubeId: "YOUTUBE_ID_2",
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    id: 3,
    num: "EP. 03",
    title: "What Whole-Life Wellness Really Means After 50",
    desc:
      "Health isn't just about your body. It's about your mind, your relationships, your sense of purpose. This episode reframes what it means to actually be well going into retirement.",
    date: "Feb 15, 2026",
    duration: "45 min",
    youtubeId: "YOUTUBE_ID_3",
    thumbnail:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
  },
  {
    id: 4,
    num: "EP. 04",
    title: "The Identity Problem Nobody Talks About",
    desc:
      "For decades, work has been who you are. So what happens when it's gone? We talk candidly about the identity crisis that catches so many retirees off guard — and how to get ahead of it.",
    date: "Feb 8, 2026",
    duration: "51 min",
    youtubeId: "YOUTUBE_ID_4",
    thumbnail:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
  },
  {
    id: 5,
    num: "EP. 05",
    title: "A Thoughtful Retirement Mindset for Gen X",
    desc:
      "Gen X got sandwiched — between Boomers who changed the rules and Millennials who got the apps. This episode is about owning your unique position and planning on your own terms.",
    date: "Feb 1, 2026",
    duration: "36 min",
    youtubeId: "YOUTUBE_ID_5",
    thumbnail:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
  },
  {
    id: 6,
    num: "EP. 06",
    title: "Popular Advice Isn't Always Helpful Advice",
    desc:
      "Loud doesn't mean right. In this episode we dig into the most repeated retirement advice that sounds wise but often leads people astray — and what to think instead.",
    date: "Jan 25, 2026",
    duration: "40 min",
    youtubeId: "YOUTUBE_ID_6",
    thumbnail:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
  },
];

function PlayIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5V8.5l6.25 3.5-6.25 3.5z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function ArticlesPage() {
  const [activeTab, setActiveTab] = useState("articles");
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const [modalEpisode, setModalEpisode] = useState(null);

  const featured = ALL_ARTICLES.find((a) => a.featured);
  const filtered = ALL_ARTICLES.filter((a) => {
    if (a.featured) return false;
    if (activeCategory === "All") return true;
    return a.category === activeCategory;
  });

  const podcastFeatured = EPISODES[0];
  const podcastRest = EPISODES.slice(1);

  return (
    <>
      <NavBar activePage="articles" largeAvatar />

      <div className="articles-page">
        {/* ── HEADER ── */}
        <div className="articles-header">
          <span className="articles-header-eyebrow">Member Content</span>
          <h1>Podcasts &amp; Articles</h1>
          <p>
            Honest conversations and thoughtful reading for Gen X professionals
            preparing for retirement — focused on whole-life wellness, clear
            thinking, and intentional choices.
          </p>
        </div>

        {/* ── TAB SWITCHER ── */}
        <div className="content-tabs">
          <button
            type="button"
            className={`content-tab ${
              activeTab === "articles" ? "active" : ""
            }`}
            onClick={() => setActiveTab("articles")}
          >
            📖 Articles
          </button>
          <button
            type="button"
            className={`content-tab ${activeTab === "podcast" ? "active" : ""}`}
            onClick={() => setActiveTab("podcast")}
          >
            🎬 Podcast
          </button>
        </div>

        {/* ── ARTICLES TAB ── */}
        {activeTab === "articles" && (
          <>
            {/* Arch hero image */}
            <div className="articles-arch">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80"
                alt="Retirement lifestyle"
              />
            </div>

            {/* Book promo card */}
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
                    Planning for the future isn't about predicting every outcome
                    — it's about giving your future self more choices. It's
                    progress, resilience, and peace of mind.
                  </p>
                  <p className="pull-quote-source">
                    Good Luck Island Collective
                  </p>
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
          </>
        )}

        {/* ── PODCAST TAB ── */}
        {activeTab === "podcast" && (
          <div className="podcast-tab-wrapper">
            {/* Subscribe row */}
            <div className="podcast-subscribe-row">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button type="button" className="podcast-sub-btn">
                  <YoutubeIcon />
                  Subscribe on YouTube
                </button>
              </a>
              <button type="button" className="podcast-sub-btn">
                🎙️ Apple Podcasts
              </button>
              <button type="button" className="podcast-sub-btn">
                🟢 Spotify
              </button>
            </div>

            {/* Podcast content */}
            <div className="podcast-content">
              {/* Featured Episode */}
              <div>
                <p className="podcast-featured-label">🎬 Latest Episode</p>
                <div className="featured-episode">
                  <div className="featured-video-side">
                    {featuredPlaying
                      ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${podcastFeatured.youtubeId}?autoplay=1`}
                          title={podcastFeatured.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )
                      : (
                        <>
                          <img
                            className="featured-thumbnail"
                            src={podcastFeatured.thumbnail}
                            alt={podcastFeatured.title}
                          />
                          <div
                            className="featured-play-overlay"
                            onClick={() => setFeaturedPlaying(true)}
                          >
                            <button
                              type="button"
                              className="featured-play-btn"
                            >
                              <PlayIcon size={26} />
                            </button>
                            <span className="featured-play-label">
                              Watch Now
                            </span>
                          </div>
                        </>
                      )}
                  </div>

                  <div className="featured-info">
                    <div className="featured-meta">
                      <span className="ep-badge">Podcast</span>
                      <span className="ep-num">{podcastFeatured.num}</span>
                      <span className="ep-date">{podcastFeatured.date}</span>
                    </div>
                    <h2 className="featured-title">{podcastFeatured.title}</h2>
                    <p className="featured-desc">{podcastFeatured.desc}</p>
                    <div className="featured-duration">
                      <ClockIcon />
                      {podcastFeatured.duration}
                    </div>
                    <div className="featured-actions">
                      <button
                        type="button"
                        className="btn-watch"
                        onClick={() => setFeaturedPlaying(true)}
                      >
                        <PlayIcon size={14} /> Watch Episode
                      </button>
                      <a
                        href={`https://www.youtube.com/watch?v=${podcastFeatured.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button type="button" className="btn-youtube">
                          <YoutubeIcon /> Open on YouTube
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Episodes Grid */}
              <div>
                <p className="episodes-section-label">All Episodes</p>
                <div className="episodes-grid">
                  {podcastRest.map((ep) => (
                    <div
                      key={ep.id}
                      className="episode-card"
                      onClick={() => setModalEpisode(ep)}
                    >
                      <div className="episode-thumb">
                        <img src={ep.thumbnail} alt={ep.title} />
                        <div className="episode-thumb-overlay">
                          <button
                            type="button"
                            className="episode-thumb-play"
                          >
                            <PlayIcon size={16} />
                          </button>
                        </div>
                        <span className="episode-duration-badge">
                          {ep.duration}
                        </span>
                      </div>
                      <div className="episode-body">
                        <div className="episode-body-meta">
                          <span className="episode-body-num">{ep.num}</span>
                          <span className="episode-body-date">{ep.date}</span>
                        </div>
                        <h3 className="episode-body-title">{ep.title}</h3>
                        <p className="episode-body-desc">{ep.desc}</p>
                        <div className="episode-body-watch">
                          <PlayIcon size={12} /> Watch Episode
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── VIDEO MODAL ── */}
      {modalEpisode && (
        <div
          className="video-modal-backdrop"
          onClick={() => setModalEpisode(null)}
        >
          <div
            className="video-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="video-modal-header">
              <h3 className="video-modal-title">{modalEpisode.title}</h3>
              <button
                type="button"
                className="video-modal-close"
                onClick={() => setModalEpisode(null)}
              >
                ✕
              </button>
            </div>
            <div className="video-modal-embed">
              <iframe
                src={`https://www.youtube.com/embed/${modalEpisode.youtubeId}?autoplay=1`}
                title={modalEpisode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-modal-footer">
              <span className="video-modal-meta">
                {modalEpisode.num} · {modalEpisode.date} ·{" "}
                {modalEpisode.duration}
              </span>
              <a
                href={`https://www.youtube.com/watch?v=${modalEpisode.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button type="button" className="video-modal-yt">
                  <YoutubeIcon /> Open on YouTube
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

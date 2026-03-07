"use client";

import { useState } from "react";
import Link from "next/link";
import "./podcast.css";

// ─── Mock Episodes — replace with your real data / CMS ───────────────────────
// For YouTube embeds: replace YOUTUBE_ID with real video IDs
// Thumbnails auto-pull from YouTube: https://img.youtube.com/vi/YOUTUBE_ID/maxresdefault.jpg
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

export default function PodcastPage() {
  const featured = EPISODES[0];
  const rest = EPISODES.slice(1);
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const [modalEpisode, setModalEpisode] = useState(null);

  const openModal = (ep) => setModalEpisode(ep);
  const closeModal = () => setModalEpisode(null);

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <img
              src="/goodLuckIslandLogoSmall.png"
              alt="Good Luck Island Collective"
              style={{ height: 45, width: "auto", objectFit: "contain" }}
            />
          </Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/articles">Freemium Content</Link>
            <Link href="/podcast" className="active">Podcast</Link>
            <Link href="/about">About</Link>
            <Link href="/shop">Book & Support</Link>
          </div>
          <div className="nav-auth">
            <Link href="/login">
              <button type="button" className="nav-btn-ghost">Sign In</button>
            </Link>
            <Link href="/register">
              <button type="button" className="nav-btn-solid">Join Free</button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="podcast-page">
        {/* ── HEADER ── */}
        <div className="podcast-header">
          <p className="podcast-header-eyebrow">Good Luck Island Collective</p>
          <h1>
            The <em>Podcast</em>
          </h1>
          <p>
            Honest conversations about the retirement questions nobody else is
            asking. New episodes every week — watch on YouTube or listen
            wherever you get your podcasts.
          </p>
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
        </div>

        {/* ── CONTENT ── */}
        <div className="podcast-content">
          {/* Featured Episode */}
          <div>
            <p className="featured-label">🎬 Latest Episode</p>
            <div className="featured-episode">
              {/* Video Side */}
              <div className="featured-video-side">
                {featuredPlaying
                  ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${featured.youtubeId}?autoplay=1`}
                      title={featured.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )
                  : (
                    <>
                      <img
                        className="featured-thumbnail"
                        src={featured.thumbnail}
                        alt={featured.title}
                      />
                      <div
                        className="featured-play-overlay"
                        onClick={() => setFeaturedPlaying(true)}
                      >
                        <button type="button" className="featured-play-btn">
                          <PlayIcon size={26} />
                        </button>
                        <span className="featured-play-label">Watch Now</span>
                      </div>
                    </>
                  )}
              </div>

              {/* Info Side */}
              <div className="featured-info">
                <div className="featured-meta">
                  <span className="ep-badge">Podcast</span>
                  <span className="ep-num">{featured.num}</span>
                  <span className="ep-date">{featured.date}</span>
                </div>
                <h2 className="featured-title">{featured.title}</h2>
                <p className="featured-desc">{featured.desc}</p>
                <div className="featured-duration">
                  <ClockIcon />
                  {featured.duration}
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
                    href={`https://www.youtube.com/watch?v=${featured.youtubeId}`}
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
              {rest.map((ep) => (
                <div
                  key={ep.id}
                  className="episode-card"
                  onClick={() => openModal(ep)}
                >
                  <div className="episode-thumb">
                    <img src={ep.thumbnail} alt={ep.title} />
                    <div className="episode-thumb-overlay">
                      <button type="button" className="episode-thumb-play">
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

      {/* ── VIDEO MODAL ── */}
      {modalEpisode && (
        <div className="video-modal-backdrop" onClick={closeModal}>
          <div
            className="video-modal"
            onClick={(e) =>
              e.stopPropagation()}
          >
            <div className="video-modal-header">
              <h3 className="video-modal-title">{modalEpisode.title}</h3>
              <button
                type="button"
                className="video-modal-close"
                onClick={closeModal}
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

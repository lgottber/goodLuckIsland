"use client";

import "./home.css";
import { useEffect, useRef, useState } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const BLOG_POSTS = [
  {
    id: 1,
    tag: "Getting Ready for Retirement",
    title: "Popular Advice Isn't Always Helpful Advice",
    excerpt:
      "Loud guidance pushes urgency. Calm education builds confidence. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus.",
    date: "March 1, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
  },
  {
    id: 2,
    tag: "Whole-Life Wellness",
    title: "A Calm Place to Think About What Comes Next",
    excerpt:
      "Good Luck Island Collective exists to help you step out of the noise and into clarity—through learning, reflection, and thoughtful perspective.",
    date: "February 22, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: 3,
    tag: "Clear Thinking",
    title: "Rethinking Retirement, One Choice at a Time",
    excerpt:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    date: "February 14, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  },
];

const FEATURED_VIDEOS = [
  {
    id: 1,
    title: "Rethinking Retirement, One Choice at a Time",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus.",
    youtubeId: "tul5G9JtEJk",
  },
  {
    id: 2,
    title: "A Thoughtful Retirement Mindset for Gen X Professionals",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.",
    youtubeId: "w_lEhtJqhpA",
  },
  {
    id: 3,
    title: "Whole-Life Wellness: What It Really Means After 50",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
    youtubeId: "ZMkFWIQ8-9U",
  },
];

// ─── Auth Modal ───────────────────────────────────────────────────────────────

function AuthModal({ mode, onClose }) {
  const [tab, setTab] = useState(mode);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    globalThis.addEventListener("keydown", handleKey);
    return () => globalThis.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-card">
        <button type="button" className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-logo">
          <img
            src="/goodLuckIslandLogoSmall.png"
            alt="Good Luck Island Collective"
            style={{ height: 45, width: "auto", objectFit: "contain" }}
          />
        </div>
        <p className="modal-brand">Good Luck Island Collective</p>

        <div className="modal-tabs">
          <button
            type="button"
            className={`modal-tab ${tab === "login" ? "active" : ""}`}
            onClick={() => setTab("login")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`modal-tab ${tab === "register" ? "active" : ""}`}
            onClick={() => setTab("register")}
          >
            Join
          </button>
        </div>

        <div className="modal-form">
          {tab === "register" && (
            <div className="form-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          )}
          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button type="button" className="btn-primary full-width">
            {tab === "login" ? "Sign In" : "Create Account"}
          </button>

          {tab === "login" && (
            <p className="modal-hint">
              <a href="#">Forgot your password?</a>
            </p>
          )}
          <div className="modal-divider">
            <span>or continue with</span>
          </div>
          <button type="button" className="btn-ghost full-width">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              style={{ marginRight: 8 }}
            >
              <path
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Video Card ───────────────────────────────────────────────────────────────

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="video-card">
      <div className="video-thumb" onClick={() => setPlaying(true)}>
        {playing
          ? (
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )
          : (
            <>
              <img
                src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                alt={video.title}
                onError={(e) => {
                  e.target.src =
                    `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                }}
              />
              <button
                type="button"
                className="play-btn"
                aria-label="Play video"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M6 4l12 6-12 6V4z" />
                </svg>
              </button>
            </>
          )}
      </div>
      <div className="video-info">
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </div>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [authModal, setAuthModal] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(globalThis.scrollY > 60);
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
        />
      )}

      {/* ── NAV ── */}
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <img
              src="/goodLuckIslandLogoSmall.png"
              alt="Good Luck Island Collective"
              style={{ height: 45, width: "auto", objectFit: "contain" }}
            />
          </a>
          <div className="nav-links">
            <a href="/articles">Freemium Content</a>
            <a href="/podcast">Podcast</a>
            <a href="/about">About</a>
            <a
              href="/shop"
              style={{
                color: "var(--coral, #e8673a)",
                fontWeight: 600,
                opacity: 1,
              }}
            >
              Book & Support
            </a>
          </div>
          <div className="nav-auth">
            <button
              type="button"
              className="nav-btn-ghost"
              onClick={() => setAuthModal("login")}
            >
              Sign In
            </button>
            <button
              type="button"
              className="nav-btn-solid"
              onClick={() => setAuthModal("register")}
            >
              Join
            </button>
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

      {/* Mobile Menu */}
      <div className={`nav-mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button
          type="button"
          className="nav-mobile-close"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
        <a href="/articles" onClick={() => setMobileOpen(false)}>
          Freemium Content
        </a>
        <a href="/podcast" onClick={() => setMobileOpen(false)}>Podcast</a>
        <a href="/about" onClick={() => setMobileOpen(false)}>About</a>
        <a
          href="/shop"
          className="mobile-coral"
          onClick={() => setMobileOpen(false)}
        >
          Book & Support
        </a>
        <div className="nav-mobile-auth">
          <button
            type="button"
            className="ghost"
            onClick={() => {
              setMobileOpen(false);
              setAuthModal("login");
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className="solid"
            onClick={() => {
              setMobileOpen(false);
              setAuthModal("register");
            }}
          >
            Join Free
          </button>
        </div>
      </div>

      <main>
        {/* ── HERO ── */}
        <section className="hero" ref={heroRef}>
          <div className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">Good Luck Island Collective</p>
            <h1 className="hero-title">
              Welcome to the<br />
              <em>Good Luck Island Collective</em>
            </h1>
            <p className="hero-sub">
              A self-help education platform for Gen X professionals preparing
              for retirement— focused on whole-life wellness, clear thinking,
              and intentional choices.
            </p>
            <div className="hero-cta">
              <button
                type="button"
                className="cta-primary"
                onClick={() => setAuthModal("register")}
              >
                Join the Collective
              </button>
              <button
                type="button"
                className="cta-ghost"
                onClick={() => setAuthModal("login")}
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="hero-scroll">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee-bar">
          <div className="marquee-track">
            {[
              "Whole-Life Wellness",
              "Clear Thinking",
              "Intentional Choices",
              "Gen X Retirement",
              "Next Chapter",
              "Financial Clarity",
              "Life After Work",
              "Whole-Life Wellness",
              "Clear Thinking",
              "Intentional Choices",
              "Gen X Retirement",
              "Next Chapter",
              "Financial Clarity",
              "Life After Work",
            ].map((d, i) => (
              <span key={i} className="marquee-item">
                <span className="marquee-dot">◈</span> {d}
              </span>
            ))}
          </div>
        </div>

        {/* ── INTRO ── */}
        <section className="intro-section">
          <div className="intro-grid">
            <div className="intro-text">
              <p className="section-label">Who We Are</p>
              <h2>A calm place to think about what comes next</h2>
              <p>
                Good Luck Island Collective exists to help you step out of the
                noise and into clarity—through learning, reflection, and
                thoughtful perspective.
              </p>
              <p>
                We're built for Gen X professionals who are done with
                panic-driven finance advice and ready for something more
                intentional.
              </p>
              <button type="button" className="btn-underline">
                Learn more about us →
              </button>
            </div>
            <div className="intro-images">
              <div className="intro-img-main">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                  alt="Professional relaxing"
                />
              </div>
              <div className="intro-img-secondary">
                <img
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80"
                  alt="Ocean waves"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOG ── */}
        <section className="section">
          <div className="section-header">
            <div>
              <p className="section-label">Latest Stories</p>
              <h2>From the blog</h2>
            </div>
            <a href="#" className="view-all">View all stories →</a>
          </div>

          <div className="blog-grid">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-img">
                  <img src={post.image} alt={post.title} />
                  <span className="blog-tag">{post.tag}</span>
                </div>
                <div className="blog-body">
                  <p className="blog-meta">
                    {post.date} · {post.readTime}
                  </p>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <a href="#" className="btn-underline">Read more →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── VIDEOS ── */}
        <section className="section section-dark">
          <div className="section-header">
            <div>
              <p className="section-label" style={{ color: "#9eb8a8" }}>
                Watch &amp; Listen
              </p>
              <h2 style={{ color: "#fff" }}>Featured Episodes</h2>
            </div>
            <a href="#" className="view-all" style={{ color: "#9eb8a8" }}>
              View all →
            </a>
          </div>
          <div className="video-grid">
            {FEATURED_VIDEOS.map((v) => <VideoCard key={v.id} video={v} />)}
          </div>
        </section>

        {/* ── CTA BAND ── */}
        <section className="cta-band">
          <div className="cta-band-inner">
            <img
              src="/goodLuckIslandLogoFull.png"
              alt="Good Luck Island Collective"
              style={{ height: 150, width: "auto", objectFit: "contain" }}
            />
            <h2>Ready to join the island life?</h2>
            <p>
              Create a free account to unlock exclusive articles, podcast
              episodes, and a community of Gen X professionals building a better
              next chapter.
            </p>
            <button
              type="button"
              className="cta-primary dark"
              onClick={() => setAuthModal("register")}
            >
              Create Free Account
            </button>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <img
                src="/goodLuckIslandLogoSmall.png"
                alt="Good Luck Island Collective"
                style={{ height: 45, width: "auto", objectFit: "contain" }}
              />
              <span>Curating calm clarity for the next chapter of life.</span>
            </div>
            <div className="footer-links">
              <div>
                <strong>Explore</strong>
                <a href="/articles">Freemium Content</a>
                <a href="#">Podcast</a>
                <a href="#">Videos</a>
              </div>
              <div>
                <strong>Community</strong>
                <a href="/about">About</a>
                <a href="#">Newsletter</a>
                <a href="#">Contact</a>
              </div>
              <div>
                <strong>Account</strong>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setAuthModal("login");
                  }}
                >
                  Sign In
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setAuthModal("register");
                  }}
                >
                  Register
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © 2026 Good Luck Island Collective. All rights reserved.
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}

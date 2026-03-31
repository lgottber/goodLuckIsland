"use client";
import "./home.css";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function HomePage() {
  const { user } = useUser();
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
      {/* ── NAV ── */}
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <img
              src="/goodLuckIslandLogoSmall.png"
              alt="Good Luck Island Collective Logo"
              style={{ height: 75, width: "auto", objectFit: "contain" }}
            />
          </a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/shop">Book &amp; Support</a>
          </div>
          <div className="nav-auth">
            {user
              ? (
                <>
                  <a href="/profile" className="nav-btn-ghost">
                    Explore The Island
                  </a>
                  <a href="/auth/logout" className="nav-btn-solid">Sign Out</a>
                </>
              )
              : (
                <>
                  <a href="/auth/login" className="nav-btn-ghost">Sign In</a>
                  <a
                    href="/auth/login?screen_hint=signup"
                    className="nav-btn-solid"
                  >
                    Start Your Lifestyle Discovery
                  </a>
                </>
              )}
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
        <a href="/" onClick={() => setMobileOpen(false)}>Home</a>
        <a href="/about" onClick={() => setMobileOpen(false)}>About</a>
        <a href="/shop" onClick={() => setMobileOpen(false)}>
          Book &amp; Support
        </a>
        <div className="nav-mobile-auth">
          {user
            ? (
              <>
                <a
                  href="/profile"
                  className="ghost"
                  onClick={() => setMobileOpen(false)}
                >
                  Explore The Island
                </a>
                <a
                  href="/auth/logout"
                  className="solid"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Out
                </a>
              </>
            )
            : (
              <>
                <a
                  href="/auth/login"
                  className="ghost"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </a>
                <a
                  href="/auth/login?screen_hint=signup"
                  className="solid"
                  onClick={() => setMobileOpen(false)}
                >
                  Start Your Lifestyle Discovery
                </a>
              </>
            )}
        </div>
      </div>

      <main>
        {/* ── SECTION 1: HERO ── */}
        <section className="hero" ref={heroRef}>
          <div className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Good Luck Island</h1>
            <h2 className="hero-eyebrow">This Island has always existed...</h2>
            <p className="hero-sub">
              You worked. You saved. You planned. But somewhere along the way,
              nobody told you what the island was actually supposed to feel
              like.
            </p>
            <div className="hero-cta">
              {user
                ? (
                  <>
                    <a href="/profile" className="cta-primary">
                      Explore The Island
                    </a>
                    <a href="/auth/logout" className="cta-ghost">Sign Out</a>
                  </>
                )
                : (
                  <>
                    <a
                      href="/auth/login?screen_hint=signup"
                      className="cta-primary"
                    >
                      Start Your Lifestyle Discovery
                    </a>
                    <a href="/profile" className="cta-ghost">
                      Explore the Island
                    </a>
                  </>
                )}
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

        {/* ── SECTION 2: THE PROBLEM ── */}
        <section className="problem-section">
          <div className="problem-inner">
            <div className="problem-text">
              <p className="problem-eyebrow">The Challenge</p>
              <h2>Houston… We Have a Retirement Problem</h2>
              <p>
                For decades, the financial industry has trained us to focus on
                one thing: accumulation. Beat the market. Max the 401(k). Hit
                the number. But when the day finally comes — when the work stops
                and the calendar clears — millions of Gen X professionals are
                left asking a question nobody prepared them for:
              </p>
              <blockquote className="problem-pull-quote">
                "What do you actually want your life to look like?"
              </blockquote>
            </div>
            <div className="problem-image">
              <img src="/boardWalk.png" alt="couple on a boardwalk" />
            </div>
          </div>
        </section>

        {/* ── SECTION 3: THE ISLAND CONCEPT ── */}
        <section className="island-section">
          <div className="island-inner">
            <p className="island-eyebrow">The Island Philosophy</p>
            <h2>You Didn&#39;t Find the Island. You Grew Into It.</h2>
            <p>
              The island isn&#39;t a place. It&#39;s a state of clarity — the
              moment you stop reacting to noise and start designing a life with
              intention. It&#39;s the space between what you&#39;ve been told to
              want and what actually matters to you.
            </p>
            <div className="pillars-strip">
              {[
                { icon: "🚫", label: "Freedom from Noise" },
                { icon: "🧠", label: "Independent Thinking" },
                { icon: "🗺️", label: "Intentional Lifestyle Design" },
                { icon: "🤝", label: "Community Without Pressure" },
              ].map(({ icon, label }) => (
                <div key={label} className="pillar-card">
                  <span className="pillar-icon">{icon}</span>
                  <span className="pillar-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: GEN X VALUES ── */}
        <section className="values-section">
          <div className="values-inner">
            <div className="values-header">
              <p className="values-eyebrow">Who We&#39;re Built For</p>
              <h2>We Are the Generation That Questions Everything</h2>
              <p>
                Gen X didn&#39;t inherit a roadmap. We watched institutions
                fail, watched rules change, and learned to think for ourselves.
                These are the values we&#39;re building around:
              </p>
            </div>
            <div className="values-grid">
              {[
                {
                  icon: "🗽",
                  title: "Autonomy",
                  desc: "The right to design your own path without pressure",
                },
                {
                  icon: "🎨",
                  title: "Creative Reinvention",
                  desc: "Retirement isn't an ending. It's your second act",
                },
                {
                  icon: "🌿",
                  title: "Authentic Experiences",
                  desc: "Real moments over status symbols",
                },
                {
                  icon: "💪",
                  title: "Health & Longevity",
                  desc: "Investing in the vessel, not just the portfolio",
                },
                {
                  icon: "📈",
                  title: "Personal Growth",
                  desc: "Still curious. Still learning. Always evolving",
                },
                {
                  icon: "💡",
                  title: "Financial Confidence",
                  desc: "Calm clarity over panic-driven decisions",
                },
                {
                  icon: "⏳",
                  title: "Time Freedom",
                  desc: "The ultimate retirement asset",
                },
                {
                  icon: "❤️",
                  title: "Meaningful Relationships",
                  desc: "The people who make the island worth reaching",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="value-card">
                  <span className="value-icon">{icon}</span>
                  <span className="value-title">{title}</span>
                  <span className="value-desc">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: MISSION ── */}
        <section className="mission-section">
          <div className="mission-inner">
            <div className="mission-text">
              <p className="mission-eyebrow">Why We Exist</p>
              <h2>Why This Collective Exists</h2>
              <p>
                We started Good Luck Island Collective because we were tired of
                the noise. Tired of retirement content that treats people like
                portfolios. Tired of advisors who sell confidence instead of
                building it. Tired of the assumption that a number in a
                spreadsheet equals a life well-lived.
              </p>
              <p>
                This is a place for Gen X professionals who are done with
                panic-driven finance advice and ready for something more
                intentional. A calm place to think. To learn. To question. And
                to build the life they actually want.
              </p>
            </div>
            <div className="promise-strip">
              {[
                "No lead traps",
                "No pressure",
                "No product agenda",
                "Only perspective & learning",
              ].map((text) => (
                <div key={text} className="promise-item">
                  <div className="promise-check">✓</div>
                  <span className="promise-text">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: DISCOVERY INVITATION ── */}
        <section className="discovery-section">
          <div className="discovery-inner">
            <p className="discovery-eyebrow">Your Next Chapter</p>
            <h2>Your Next Chapter Doesn&#39;t Begin With a Portfolio</h2>
            <p>
              It begins with a question. One honest question about what you
              actually want. Take the challenge. Start the conversation.
            </p>
            <div className="discovery-ctas">
              <a href="/profile" className="cta-primary">
                Take the One Question Retirement Challenge
              </a>
              <a href="/profile" className="cta-navy-ghost">
                Explore the Lifestyle Pillars Map
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: CLOSING EMOTIONAL ANCHOR ── */}
        <section className="closing-section">
          <div className="closing-bg" />
          <div className="closing-overlay" />
          <div className="closing-content">
            <p>The Island was never about escaping.</p>
            <p>It was about finally seeing clearly.</p>
            <p className="closing-welcome">Welcome.</p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <img
                src="/goodLuckIslandLogoSmall.png"
                alt="Good Luck Island Collective"
                style={{ height: 100, width: "auto", objectFit: "contain" }}
              />
              <span>
                Curating calm clarity for the next chapter of life.
              </span>
            </div>
          </div>
          <nav className="footer-nav-row" aria-label="Footer navigation">
            <a href="/about">About</a>
            <a href="#">Resources</a>
            <a href="#">Contact</a>
            <a href="#">Privacy</a>
          </nav>
          <div className="social-row">
            <a
              href="#"
              className="social-link"
              aria-label="YouTube"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
              </svg>
            </a>
            <a
              href="#"
              className="social-link"
              aria-label="Instagram"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.9 1.8 5.1 5.1.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.2 3.3-1.8 4.9-5.1 5.1-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.2-4.9-1.8-5.1-5.1C2 15.6 2 15.2 2 12c0-3.2 0-3.6.1-4.8C2.3 3.9 3.9 2.3 7.2 2.1c1.2-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.1 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
              </svg>
            </a>
            <a
              href="#"
              className="social-link"
              aria-label="Facebook"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6 4.4 11 10.1 11.9v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.4l-.5 3.5H13.8V24C19.6 23.1 24 18.1 24 12.1z" />
              </svg>
            </a>
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

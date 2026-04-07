"use client";
import "./home.css";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import NavBar from "../components/NavBarDynamic";
import { YoutubeIcon, InstagramIcon, FacebookIcon } from "../components/Icons";
import HeroCtaUser from "./HeroCtaUser";
import HeroCtaGuest from "./HeroCtaGuest";

export default function HomePage() {
  const { user } = useAuth0();

  return (
    <>
      <NavBar activePage="home" largeAvatar />

      <main>
        {/* ── SECTION 1: HERO ── */}
        <section className="hero">
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
              {user ? <HeroCtaUser /> : <HeroCtaGuest />}
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
              <span key={`${d}-${i}`} className="marquee-item">
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
              <img src="/fallingbike.gif" alt="falling off a bike" />
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
              <Link href="/profile" className="cta-primary">
                Take the One Question Retirement Challenge
              </Link>
              <Link href="/profile" className="cta-navy-ghost">
                Explore the Lifestyle Pillars Map
              </Link>
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
            <Link href="/about">About</Link>
            <a href="#">Resources</a>
            <a href="#">Contact</a>
            <a href="#">Privacy</a>
          </nav>
          <div className="social-row">
            <a href="#" className="social-link" aria-label="YouTube">
              <YoutubeIcon />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <FacebookIcon />
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

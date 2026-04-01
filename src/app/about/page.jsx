"use client";

import { useState } from "react";
import Link from "next/link";
import NavBar from "../../components/NavBar.jsx";
import "./about.css";

const TESTIMONIALS = [
  {
    id: 1,
    style: "light",
    text:
      "I've read a lot of retirement content over the years. Most of it made me feel anxious. Good Luck Island Collective was the first place that made me feel like I was actually being prepared — not sold to.",
    name: "Sandra M., 54 — Chicago, IL",
    avatar: null,
  },
  {
    id: 2,
    style: "dark",
    text:
      "Nicholas has a way of cutting through the noise that I've never encountered anywhere else. The book changed how I talk to my financial advisor. The podcast changed how I think about what I actually want.\n\nI didn't know I was missing this kind of guidance until I found it.",
    name: "David K., 58 — Austin, TX",
    avatar: null,
  },
  {
    id: 3,
    style: "light",
    text:
      "I forwarded three articles to my husband and said 'this is exactly what I've been trying to say.' The content here puts words to things I've been feeling for years. That's rare.",
    name: "Renée T., 51 — Portland, OR",
    avatar: null,
  },
];

export default function AboutPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <>
      <NavBar activePage="about" largeAvatar />

      <div className="about-page">
        {/* ── HERO SPLIT — Canva style ── */}
        <div className="about-hero">
          <div className="about-hero-left">
            <p className="about-eyebrow">Good Luck Island Collective</p>
            <h1>About Us</h1>
            <div className="about-hero-body">
              <p>
                Good Luck Island Collective is a self-help education platform
                built specifically for Gen X professionals who are preparing for
                retirement — and aren't sure what they're actually preparing
                {" "}
                <em>for</em>.
              </p>
              <p>
                We exist because most retirement content is loud,
                anxiety-inducing, and focused entirely on money. We believe the
                bigger questions — who you'll be, what will matter, how you'll
                spend your days — deserve just as much attention.
              </p>
              <p>
                This is a calm place to think. A community of people asking the
                same honest questions. And a growing library of tools, articles,
                and conversations designed to help you arrive at retirement with
                clarity, confidence, and no regrets.
              </p>
            </div>
          </div>

          {/* Photo stack — right column, Canva style */}
          <div className="about-hero-photos">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
              alt="Peaceful scenery"
            />
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80"
              alt="Ocean view"
            />
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
              alt="Working outdoors"
            />
            <img
              src="https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=600&q=80"
              alt="Journey ahead"
            />
          </div>
        </div>

        {/* ── MISSION ── */}
        <div className="mission-section">
          <div className="mission-inner">
            <p className="mission-eyebrow">Why We Exist</p>
            <h2>
              Retirement isn't just a financial event.<br />
              <em>It's a life transition.</em>
            </h2>
            <div className="mission-pillars">
              <div className="mission-pillar">
                <span className="mission-pillar-icon">🧭</span>
                <h3 className="mission-pillar-title">Whole-Life Wellness</h3>
                <p className="mission-pillar-text">
                  We look at retirement through the lens of your whole life —
                  not just your portfolio. Health, relationships, purpose,
                  identity — all of it matters.
                </p>
              </div>
              <div className="mission-pillar">
                <span className="mission-pillar-icon">💡</span>
                <h3 className="mission-pillar-title">Clear Thinking</h3>
                <p className="mission-pillar-text">
                  We cut through the noise. No fear tactics. No complex jargon.
                  Just honest, calm guidance that helps you think more clearly
                  about what's ahead.
                </p>
              </div>
              <div className="mission-pillar">
                <span className="mission-pillar-icon">🌴</span>
                <h3 className="mission-pillar-title">Intentional Choices</h3>
                <p className="mission-pillar-text">
                  We help you decide — not just plan. The best retirement isn't
                  the one with the most money. It's the one that's most aligned
                  with who you actually are.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── NICHOLAS ── */}
        <div className="nicholas-section">
          <div className="nicholas-heading">
            <p className="nicholas-eyebrow">Meet the Founder</p>
            <h2>Nicholas Livecchi</h2>
          </div>

          <div className="nicholas-columns">
            <div className="nicholas-photo-wrap">
              <img
                className="nicholas-photo"
                src="/nicholas.png"
                alt="Nicholas Livecchi"
              />
              <div className="nicholas-cred-badge">
                CFP® · CRP® · CPRC® <br /> Author · Podcast Host
              </div>
              <div className="nicholas-links">
                <Link href="/shop">
                  <button type="button" className="btn-nicholas-primary">
                    Get the Book
                  </button>
                </Link>
                <Link href="/podcast">
                  <button type="button" className="btn-nicholas-ghost">
                    Listen to the Podcast →
                  </button>
                </Link>
              </div>
            </div>

            <div className="nicholas-info">
              <p>
                Nicholas Livecchi has dedicated his career to helping Gen X
                professionals bridge the gap between where they are and where
                they want to be in retirement. As a Certified Financial Planner,
                Certified Retirement Planner, and Certified Pre-Retirement
                Coach, he combines deep financial expertise with a
                human-centered approach, guiding people through both the
                practical and emotional sides of this major life transition.
                Good Luck Island Collective is more than a financial education
                platform—it’s the resource Nicholas always wished existed: a
                calm, honest, and holistic companion for retirement that
                challenges conventional wisdom and encourages deeper reflection.
                His book, Don’t Drink the Retirement Planning Cool Aid, lays the
                foundation, while the podcast, tools, and platform build on that
                vision to support people every step of the way.
              </p>
            </div>
          </div>
        </div>

        {/* ── POSITIVE STORIES — Canva style ── */}
        <div className="stories-section">
          <img
            className="stories-hero-img"
            src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1400&q=70"
            alt="Peaceful landscape"
          />
          <div className="stories-inner">
            <h2 className="stories-title">Positive Stories</h2>
            {TESTIMONIALS.map((t) =>
              t.style === "light"
                ? (
                  <div key={t.id} className="testimonial-light">
                    <div className="testimonial-avatar-placeholder">🙂</div>
                    <div className="testimonial-body">
                      <p className="testimonial-text">"{t.text}"</p>
                      <p className="testimonial-name">— {t.name}</p>
                    </div>
                    <span className="testimonial-light-quote">"</span>
                  </div>
                )
                : (
                  <div key={t.id} className="testimonial-dark">
                    <div className="testimonial-dark-body">
                      {t.text.split("\n\n").map((para, i) => (
                        <p key={i} className="testimonial-dark-text">
                          "{para}"
                        </p>
                      ))}
                      <p className="testimonial-dark-name">— {t.name}</p>
                    </div>
                    <div className="testimonial-dark-avatar-placeholder">
                      🙂
                    </div>
                  </div>
                )
            )}
          </div>
        </div>

        {/* ── CONTACT ── */}
        <div className="contact-section">
          <div className="contact-info">
            <p className="contact-eyebrow">Get in Touch</p>
            <h2>
              We'd love to <em>hear from you.</em>
            </h2>
            <p>
              Whether you have a question about the platform, want to share your
              story, or are interested in working with Nicholas — we're here. No
              bots. No auto-replies. Just real people.
            </p>
            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-detail-icon">🌐</div>{" "}
                goodluckislandcollective.com
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">📧</div>{" "}
                hello@goodluckislandcollective.com
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">🎙️</div>{" "}
                <Link
                  href="/podcast"
                  style={{ color: "var(--teal)", fontWeight: 600 }}
                >
                  Listen to the Podcast
                </Link>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">📖</div>{" "}
                <Link
                  href="/shop"
                  style={{ color: "var(--teal)", fontWeight: 600 }}
                >
                  Get the Book
                </Link>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <div className="contact-form-row">
              <input
                className="contact-input"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })}
              />
              <input
                className="contact-input"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <input
              className="contact-input"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })}
            />
            <textarea
              className="contact-textarea"
              placeholder="Your message..."
              rows={6}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })}
            />
            <button
              type="button"
              className="contact-submit"
              onClick={handleSubmit}
            >
              {submitted ? "✓ Message Sent!" : "Send Message"}
            </button>
          </div>
        </div>

        {/* ── FOOTER BAND — Canva style ── */}
      </div>
    </>
  );
}

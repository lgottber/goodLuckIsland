"use client";

import { useState } from "react";
import Link from "next/link";
import "./shop.css";

const DONATION_AMOUNTS = ["$5", "$10", "$25", "$50", "$100", "Custom"];

export default function ShopPage() {
  const [selectedFormat, setSelectedFormat] = useState("paperback");
  const [donationAmount, setDonationAmount] = useState("$25");
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [_donated, _setDonated] = useState(false);

  const formats = [
    { id: "paperback", icon: "📖", label: "Paperback", price: "$24.99" },
    { id: "ebook", icon: "📱", label: "eBook", price: "$12.99" },
    { id: "bundle", icon: "🎁", label: "Bundle", price: "$29.99" },
  ];

  const activeAmount = donationAmount === "Custom"
    ? (customAmount ? `$${customAmount}` : "Custom")
    : donationAmount;

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <img
              src="/goodLuckIslandLogoSmall.png"
              alt="Good Luck Island Collective"
              style={{ height: 90, width: "auto", objectFit: "contain" }}
            />
          </Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/shop" className="active">Book & Support</Link>
          </div>
          <div className="nav-auth">
            <a href="/auth/login" className="nav-btn-ghost">
              Explore The Island
            </a>
            <a href="/auth/login?screen_hint=signup" className="nav-btn-solid">
              Start Your Lifestyle Discovery
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
        <Link href="/shop" onClick={() => setMobileOpen(false)}>
          Book & Support
        </Link>
      </div>

      <div className="shop-page">
        {/* ── HERO ── */}
        <div className="shop-hero">
          <div className="shop-hero-inner">
            <p className="shop-hero-eyebrow">Good Luck Island Collective</p>
            <h1>
              The Book. <em>The Truth.</em>
            </h1>
            <p>
              A no-nonsense, laugh-out-loud honest guide to finding the right
              financial advisor — and not drinking the Cool Aid everyone else is
              serving.
            </p>
          </div>
        </div>

        <div className="shop-content">
          {/* ── BOOK ── */}
          <div className="shop-divider">
            <div className="shop-divider-line" />
            <span className="shop-divider-label">The Book</span>
            <div className="shop-divider-line" />
          </div>

          <div className="book-section">
            {/* Cover */}
            <div className="book-cover-wrap">
              <div className="book-cover-real">
                <img
                  src="/book.png"
                  alt="Don't Drink the Retirement Planning Cool Aid"
                />
                <div className="book-cover-shadow" />
              </div>
            </div>

            {/* Info */}
            <div className="book-info">
              <p className="book-eyebrow">Now Available — 2 in 1 Book</p>
              <h2 className="book-title">
                Don't Drink the Retirement Planning <em>Cool Aid</em>
              </h2>
              <p className="book-subtitle">
                Finding the Right Fit Financial Advisor for Retirement — Gen X
                Style
              </p>
              <p className="book-description">
                Most retirement advice sounds confident. A lot of it is Cool
                Aid. This book helps Gen X professionals cut through the noise,
                avoid the common traps, and find a financial advisor who
                actually fits — not just one who sells well.
              </p>
              <p className="book-description">
                A 2-in-1 book by{" "}
                <strong>Nicholas Livecchi, CFP® CRP® CPRC®</strong>{" "}
                — part cautionary tale, part practical guide. Equal parts funny
                and dead serious, because retirement is both.
              </p>

              {/* Format Picker */}
              <div className="book-formats">
                <p className="book-format-label">Choose your format</p>
                <div className="book-format-options">
                  {formats.map((f) => (
                    <button
                      type="button"
                      key={f.id}
                      className={`format-btn ${
                        selectedFormat === f.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedFormat(f.id)}
                    >
                      <span className="format-btn-icon">{f.icon}</span>
                      <span className="format-btn-label">{f.label}</span>
                      <span className="format-btn-price">{f.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="book-cta-row">
                <button type="button" className="btn-buy">
                  Buy {formats.find((f) => f.id === selectedFormat)?.label} —
                  {" "}
                  {formats.find((f) => f.id === selectedFormat)?.price}
                </button>
                <button type="button" className="btn-preview">
                  Read a Free Chapter →
                </button>
              </div>

              {/* Reviews */}
              <div className="book-reviews">
                <div className="book-review">
                  <div className="book-review-stars">★★★★★</div>
                  <p className="book-review-text">
                    "I wish I'd had this book ten years ago. It's funny, it's
                    honest, and it saved me from making a very expensive
                    mistake."
                  </p>
                  <p className="book-review-author">— Sandra M., 54, Chicago</p>
                </div>
                <div className="book-review">
                  <div className="book-review-stars">★★★★★</div>
                  <p className="book-review-text">
                    "Finally — a retirement book that treats Gen X like the
                    skeptics we are. I actually laughed out loud. Then I fired
                    my advisor."
                  </p>
                  <p className="book-review-author">— David K., 58, Austin</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── DONATE ── */}
          <div className="shop-divider">
            <div className="shop-divider-line" />
            <span className="shop-divider-label">Support the Mission</span>
            <div className="shop-divider-line" />
          </div>

          <div className="donate-section">
            {/* Why Donate */}
            <div className="donate-info">
              <p className="donate-eyebrow">Keep the Collective Going</p>
              <h2 className="donate-title">
                This community runs on <em>generosity.</em>
              </h2>
              <p className="donate-description">
                Good Luck Island Collective is an independent platform — no
                advertisers, no sponsors trying to sell you things you don't
                need. Just honest, calm guidance for people preparing for one of
                life's biggest chapters.
              </p>
              <p className="donate-description">
                Your support keeps it free and accessible for everyone,
                especially those who can't afford expensive financial advisors
                or retirement courses.
              </p>
              <div className="donate-uses">
                {[
                  {
                    icon: "📝",
                    title: "New Articles & Guides",
                    desc:
                      "Thoughtful long-form content written for where you actually are.",
                  },
                  {
                    icon: "🎙️",
                    title: "Podcast Episodes",
                    desc:
                      "Real conversations with real people navigating retirement.",
                  },
                  {
                    icon: "🛠️",
                    title: "Backpack Tools",
                    desc:
                      "Interactive tools like the Pinwhirl that take months to build.",
                  },
                  {
                    icon: "🌴",
                    title: "Keeping it Ad-Free",
                    desc:
                      "Your experience stays calm, clean, and distraction-free.",
                  },
                ].map((u) => (
                  <div key={u.title} className="donate-use-item">
                    <div className="donate-use-icon">{u.icon}</div>
                    <div className="donate-use-text">
                      <strong>{u.title}</strong>
                      {u.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation Card */}
            <div className="donate-card">
              <div>
                <p className="donate-card-label">Frequency</p>
                <div className="donate-frequency">
                  {["one-time", "monthly"].map((f) => (
                    <button
                      type="button"
                      key={f}
                      className={`freq-btn ${frequency === f ? "active" : ""}`}
                      onClick={() => setFrequency(f)}
                    >
                      {f === "one-time" ? "One-Time" : "Monthly"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="donate-card-label">Choose an amount</p>
                <div className="donate-amounts">
                  {DONATION_AMOUNTS.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      className={`donate-amt-btn ${
                        amt === "Custom" ? "custom" : ""
                      } ${donationAmount === amt ? "active" : ""}`}
                      onClick={() => setDonationAmount(amt)}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              </div>

              {donationAmount === "Custom" && (
                <div>
                  <p className="donate-card-label">Enter amount</p>
                  <input
                    className="donate-custom-input"
                    type="number"
                    placeholder="Enter amount in USD"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    min="1"
                  />
                </div>
              )}

              <div className="donate-platforms">
                <p className="donate-card-label">Donate with</p>
                <button type="button" className="donate-platform-btn paypal">
                  <span>💙</span>
                  <div style={{ textAlign: "left" }}>
                    <span style={{ display: "block", fontWeight: 700 }}>
                      Donate {activeAmount} via PayPal
                    </span>
                    <span className="donate-platform-label">
                      {frequency === "monthly"
                        ? "Recurring monthly donation"
                        : "Secure one-time donation"}
                    </span>
                  </div>
                </button>
                <button type="button" className="donate-platform-btn venmo">
                  <span>✌️</span>
                  <div style={{ textAlign: "left" }}>
                    <span style={{ display: "block", fontWeight: 700 }}>
                      Donate {activeAmount} via Venmo
                    </span>
                    <span className="donate-platform-label">
                      @GoodLuckIsland
                    </span>
                  </div>
                </button>
              </div>

              <p className="donate-privacy">
                🔒 Payments are processed securely. Good Luck Island Collective
                never stores your payment information.
              </p>
            </div>
          </div>

          {/* ── THANK YOU ── */}
          <div className="thankyou-banner">
            <h2>
              Thank you for being <em>here.</em>
            </h2>
            <p>
              Whether you bought the book, made a donation, or simply showed up
              — you're part of something that matters. Good luck out there. We
              mean it.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

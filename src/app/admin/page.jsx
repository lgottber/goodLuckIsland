"use client";

import { useState } from "react";
import Link from "next/link";
import StatCard from "../../components/StatCard";
import HBar from "../../components/HBar";
import SectionCard from "../../components/SectionCard";

// ─── Mock Data — replace with real API/DB calls ───────────────────────────────
const STATS = {
  totalUsers: 1284,
  dailyActive: 312,
  monthlyActive: 891,
  newThisMonth: 143,
  newLastMonth: 118,
  challengeParticipants: 487,
};

const SIGNUP_DATA = [
  { month: "Oct", count: 54 },
  { month: "Nov", count: 78 },
  { month: "Dec", count: 91 },
  { month: "Jan", count: 118 },
  { month: "Feb", count: 118 },
  { month: "Mar", count: 143 },
];

const AGE_DATA = [
  { label: "40–44", pct: 12 },
  { label: "45–49", pct: 24 },
  { label: "50–54", pct: 31 },
  { label: "55–59", pct: 22 },
  { label: "60–64", pct: 8 },
  { label: "65+", pct: 3 },
];

const RETIREMENT_DATA = [
  { label: "Planning", pct: 58, color: "#2e8b7a" },
  { label: "Semi-Retired", pct: 27, color: "#e8673a" },
  { label: "Retired", pct: 15, color: "#5a7abf" },
];

const INCOME_DATA = [
  { label: "Under $50k", pct: 6 },
  { label: "$50k–$75k", pct: 11 },
  { label: "$75k–$100k", pct: 18 },
  { label: "$100k–$150k", pct: 26 },
  { label: "$150k–$200k", pct: 19 },
  { label: "$200k–$300k", pct: 12 },
  { label: "$300k+", pct: 8 },
];

const NETWORTH_DATA = [
  { label: "Under $100k", pct: 8 },
  { label: "$100k–$250k", pct: 14 },
  { label: "$250k–$500k", pct: 22 },
  { label: "$500k–$1M", pct: 28 },
  { label: "$1M–$2M", pct: 18 },
  { label: "$2M–$5M", pct: 7 },
  { label: "$5M+", pct: 3 },
];

const EDUCATION_DATA = [
  { label: "HS / GED", pct: 4 },
  { label: "Some College", pct: 9 },
  { label: "Associate's", pct: 7 },
  { label: "Bachelor's", pct: 38 },
  { label: "Master's", pct: 29 },
  { label: "Doctorate", pct: 8 },
  { label: "Professional", pct: 5 },
];

const MARITAL_DATA = [
  { label: "Married", pct: 54, color: "#2e8b7a" },
  { label: "Single", pct: 18, color: "#e8673a" },
  { label: "Partnered", pct: 12, color: "#5a7abf" },
  { label: "Divorced", pct: 9, color: "#c87840" },
  { label: "Widowed", pct: 4, color: "#7a5a9a" },
  { label: "Other", pct: 3, color: "#4a8a6a" },
];

const LOCATION_DATA = [
  { state: "California", count: 187 },
  { state: "Texas", count: 143 },
  { state: "Florida", count: 128 },
  { state: "New York", count: 112 },
  { state: "Illinois", count: 89 },
  { state: "Washington", count: 76 },
  { state: "Colorado", count: 68 },
  { state: "Georgia", count: 61 },
  { state: "Arizona", count: 54 },
  { state: "North Carolina", count: 47 },
];

const TOP_OCCUPATIONS = [
  { title: "Engineer / Tech", count: 218 },
  { title: "Healthcare", count: 164 },
  { title: "Finance / Banking", count: 142 },
  { title: "Education", count: 118 },
  { title: "Management / Executive", count: 97 },
  { title: "Legal", count: 74 },
  { title: "Sales / Marketing", count: 61 },
];

const TOP_ARTICLES = [
  { title: "A Thoughtful Retirement Mindset for Gen X", reads: 4821 },
  { title: "Popular Advice Isn't Always Helpful Advice", reads: 3942 },
  { title: "What 'Enough' Really Means", reads: 3318 },
  { title: "The Identity Problem Nobody Talks About", reads: 2891 },
  { title: "Whole-Life Wellness After 50", reads: 2644 },
];

const TOP_PODCASTS = [
  { title: "Rethinking Retirement, One Choice at a Time", views: 6102 },
  { title: "The Advisor Who Actually Works for You", views: 4887 },
  { title: "The Identity Problem Nobody Talks About", views: 4201 },
  { title: "A Thoughtful Retirement Mindset", views: 3776 },
  { title: "Popular Advice Isn't Always Helpful Advice", views: 3244 },
];

const BACKPACK_DATA = [
  { section: "1 Question Challenge", pct: 62 },
  { section: "Values & Beliefs", pct: 0, soon: true },
  { section: "Finding Your Purpose", pct: 0, soon: true },
  { section: "New Skills", pct: 0, soon: true },
  { section: "Refinement", pct: 0, soon: true },
  { section: "Giveback & Share", pct: 0, soon: true },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const maxSignup = Math.max(...SIGNUP_DATA.map((d) => d.count));

// ─── Component ───────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [activeNav, setActiveNav] = useState("overview");

  // Simple auth gate — replace with real auth check
  const isAdmin = true; // wire to your session/auth
  if (!isAdmin) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0d1322",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", color: "#fff" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "2rem",
              marginBottom: "0.5rem",
            }}
          >
            Access Restricted
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>
            You must be an admin to view this page.
          </p>
          <Link href="/">
            <button
              type="button"
              style={{
                background: "#e8673a",
                color: "#fff",
                border: "none",
                borderRadius: 50,
                padding: "0.75rem 1.5rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              ← Back to Site
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d1322",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        color: "#fff",
      }}
    >
      {/* ── SIDEBAR ── */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: 220,
          background: "#0a1020",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
        }}
      >
        <div
          style={{
            padding: "1.5rem 1.25rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <img
            src="/goodLuckIslandLogoSmall.png"
            alt="Good Luck Island Collective"
            style={{ height: 90, width: "auto", objectFit: "contain" }}
          />
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            Admin Portal
          </div>
        </div>

        <nav
          style={{
            flex: 1,
            padding: "1rem 0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {[
            { id: "overview", icon: "◈", label: "Overview" },
            { id: "users", icon: "👥", label: "User Demographics" },
            { id: "content", icon: "📊", label: "Content Engagement" },
            { id: "backpack", icon: "🎒", label: "Backpack Stats" },
            { id: "location", icon: "📍", label: "Locations" },
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.65rem 0.9rem",
                borderRadius: 10,
                background: activeNav === item.id
                  ? "rgba(46,139,122,0.15)"
                  : "transparent",
                border: activeNav === item.id
                  ? "1px solid rgba(46,139,122,0.3)"
                  : "1px solid transparent",
                color: activeNav === item.id
                  ? "#2e8b7a"
                  : "rgba(255,255,255,0.45)",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: "1rem" }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Link href="/">
            <button
              type="button"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)",
                borderRadius: 10,
                padding: "0.6rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              ← Back to Site
            </button>
          </Link>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ marginLeft: 220, padding: "2.5rem", minHeight: "100vh" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "2.25rem",
                fontWeight: 600,
                lineHeight: 1.1,
                marginBottom: "0.3rem",
              }}
            >
              {activeNav === "overview" && "Platform Overview"}
              {activeNav === "users" && "User Demographics"}
              {activeNav === "content" && "Content Engagement"}
              {activeNav === "backpack" && "Backpack Stats"}
              {activeNav === "location" && "User Locations"}
            </h1>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>
              Last updated: {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <div
              style={{
                background: "#131c38",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "0.5rem 1rem",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              🟢 {STATS.dailyActive} active today
            </div>
            <div
              style={{
                background: "#131c38",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "0.5rem 1rem",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {STATS.totalUsers.toLocaleString()} total members
            </div>
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        {activeNav === "overview" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* KPI Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1rem",
              }}
            >
              <StatCard
                label="Total Members"
                value={STATS.totalUsers.toLocaleString()}
                sub="All time registrations"
                accent="#2e8b7a"
              />
              <StatCard
                label="Daily Active"
                value={STATS.dailyActive}
                sub="Unique sessions today"
                accent="#e8673a"
              />
              <StatCard
                label="Monthly Active"
                value={STATS.monthlyActive}
                sub="Last 30 days"
                accent="#5a7abf"
              />
              <StatCard
                label="New This Month"
                value={`+${STATS.newThisMonth}`}
                sub={`+${STATS.newLastMonth} last month`}
                accent="#c87840"
              />
            </div>

            {/* Signup Chart + Retirement Status */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "1rem",
              }}
            >
              <SectionCard title="New Signups — Last 6 Months">
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "0.75rem",
                    height: 140,
                    paddingTop: "1rem",
                  }}
                >
                  {SIGNUP_DATA.map((d) => (
                    <div
                      key={d.month}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.65rem",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {d.count}
                      </span>
                      <div
                        style={{
                          width: "100%",
                          background: "rgba(46,139,122,0.15)",
                          borderRadius: "6px 6px 0 0",
                          position: "relative",
                          height: `${(d.count / maxSignup) * 100}px`,
                          minHeight: 8,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background:
                              "linear-gradient(to top, #2e8b7a, rgba(46,139,122,0.5))",
                            borderRadius: "6px 6px 0 0",
                            height: "100%",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        {d.month}
                      </span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Retirement Status">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                    paddingTop: "0.5rem",
                  }}
                >
                  {RETIREMENT_DATA.map((d) => (
                    <div key={d.label}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "0.4rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.78rem",
                            color: "rgba(255,255,255,0.7)",
                            fontWeight: 600,
                          }}
                        >
                          {d.label}
                        </span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            color: d.color,
                            fontWeight: 700,
                          }}
                        >
                          {d.pct}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: 8,
                          background: "rgba(255,255,255,0.07)",
                          borderRadius: 4,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${d.pct}%`,
                            background: d.color,
                            borderRadius: 4,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* Top Content */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <SectionCard title="Top Articles">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {TOP_ARTICLES.map((a, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.6rem 0",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.2)",
                          width: 16,
                        }}
                      >
                        #{i + 1}
                      </span>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.75)",
                          flex: 1,
                          lineHeight: 1.4,
                        }}
                      >
                        {a.title}
                      </span>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "#2e8b7a",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {a.reads.toLocaleString()} reads
                      </span>
                    </div>
                  ))}
                </div>
              </SectionCard>
              <SectionCard title="Top Podcast Episodes">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {TOP_PODCASTS.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.6rem 0",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.2)",
                          width: 16,
                        }}
                      >
                        #{i + 1}
                      </span>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.75)",
                          flex: 1,
                          lineHeight: 1.4,
                        }}
                      >
                        {p.title}
                      </span>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "#e8673a",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.views.toLocaleString()} views
                      </span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        )}

        {/* ── USER DEMOGRAPHICS ── */}
        {activeNav === "users" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <SectionCard title="Age Distribution">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  {AGE_DATA.map((d) => (
                    <HBar
                      key={d.label}
                      label={d.label}
                      pct={d.pct}
                      total={STATS.totalUsers}
                    />
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Retirement Status">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.1rem",
                    paddingTop: "0.25rem",
                  }}
                >
                  {RETIREMENT_DATA.map((d) => (
                    <div key={d.label}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "0.35rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "rgba(255,255,255,0.7)",
                            fontWeight: 600,
                          }}
                        >
                          {d.label}
                        </span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            color: d.color,
                          }}
                        >
                          {d.pct}%{" "}
                          <span
                            style={{
                              color: "rgba(255,255,255,0.25)",
                              fontWeight: 400,
                            }}
                          >
                            · {Math.round(STATS.totalUsers * d.pct / 100)} users
                          </span>
                        </span>
                      </div>
                      <div
                        style={{
                          height: 10,
                          background: "rgba(255,255,255,0.07)",
                          borderRadius: 5,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${d.pct}%`,
                            background: d.color,
                            borderRadius: 5,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Education Level">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  {EDUCATION_DATA.map((d) => (
                    <HBar
                      key={d.label}
                      label={d.label}
                      pct={d.pct}
                      color="#5a7abf"
                      total={STATS.totalUsers}
                    />
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Marital Status">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  {MARITAL_DATA.map((d) => (
                    <HBar
                      key={d.label}
                      label={d.label}
                      pct={d.pct}
                      color={d.color}
                      total={STATS.totalUsers}
                    />
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Income Range (Working)">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  {INCOME_DATA.map((d) => (
                    <HBar
                      key={d.label}
                      label={d.label}
                      pct={d.pct}
                      color="#c87840"
                      total={STATS.totalUsers}
                    />
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Net Worth Range">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  {NETWORTH_DATA.map((d) => (
                    <HBar
                      key={d.label}
                      label={d.label}
                      pct={d.pct}
                      color="#7a5a9a"
                      total={STATS.totalUsers}
                    />
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Top Occupations" span={2}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "0.85rem",
                  }}
                >
                  {TOP_OCCUPATIONS.map((o) => (
                    <div
                      key={o.title}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "0.3rem",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.78rem",
                              color: "rgba(255,255,255,0.7)",
                            }}
                          >
                            {o.title}
                          </span>
                          <span
                            style={{
                              fontSize: "0.72rem",
                              color: "#2e8b7a",
                              fontWeight: 700,
                            }}
                          >
                            {o.count}
                          </span>
                        </div>
                        <div
                          style={{
                            height: 6,
                            background: "rgba(255,255,255,0.07)",
                            borderRadius: 3,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${
                                (o.count / TOP_OCCUPATIONS[0].count) * 100
                              }%`,
                              background: "#2e8b7a",
                              borderRadius: 3,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        )}

        {/* ── CONTENT ENGAGEMENT ── */}
        {activeNav === "content" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
              }}
            >
              <StatCard
                label="Total Article Reads"
                value="17.6k"
                sub="All time"
                accent="#2e8b7a"
              />
              <StatCard
                label="Total Podcast Views"
                value="22.2k"
                sub="All time on YouTube"
                accent="#e8673a"
              />
              <StatCard
                label="Challenge Participants"
                value={STATS.challengeParticipants}
                sub={`${
                  Math.round(
                    STATS.challengeParticipants / STATS.totalUsers * 100,
                  )
                }% of members`}
                accent="#c87840"
              />
            </div>

            {/* Signup chart */}
            <SectionCard title="New Signups — Last 6 Months">
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "1.25rem",
                  height: 180,
                  paddingTop: "1.5rem",
                }}
              >
                {SIGNUP_DATA.map((d) => (
                  <div
                    key={d.month}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.5)",
                        fontWeight: 600,
                      }}
                    >
                      {d.count}
                    </span>
                    <div
                      style={{
                        width: "100%",
                        position: "relative",
                        height: `${(d.count / maxSignup) * 140}px`,
                        minHeight: 10,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background:
                            "linear-gradient(to top, #2e8b7a, rgba(46,139,122,0.4))",
                          borderRadius: "8px 8px 0 0",
                          height: "100%",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      {d.month}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <SectionCard title="Most Read Articles">
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "0" }}
                >
                  {TOP_ARTICLES.map((a, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.85rem 0",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1rem",
                          width: 24,
                          textAlign: "center",
                          color: i === 0
                            ? "#f0b429"
                            : i === 1
                            ? "rgba(255,255,255,0.4)"
                            : i === 2
                            ? "#c87840"
                            : "rgba(255,255,255,0.15)",
                          fontWeight: 700,
                        }}
                      >
                        {i === 0
                          ? "🥇"
                          : i === 1
                          ? "🥈"
                          : i === 2
                          ? "🥉"
                          : `#${i + 1}`}
                      </span>
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "rgba(255,255,255,0.8)",
                            lineHeight: 1.4,
                            marginBottom: "0.25rem",
                          }}
                        >
                          {a.title}
                        </p>
                        <div
                          style={{
                            height: 4,
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${
                                (a.reads / TOP_ARTICLES[0].reads) * 100
                              }%`,
                              background: "#2e8b7a",
                              borderRadius: 2,
                            }}
                          />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "#2e8b7a",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {a.reads.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Most Watched Podcast Episodes">
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "0" }}
                >
                  {TOP_PODCASTS.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.85rem 0",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1rem",
                          width: 24,
                          textAlign: "center",
                          color: i === 0
                            ? "#f0b429"
                            : i === 1
                            ? "rgba(255,255,255,0.4)"
                            : i === 2
                            ? "#c87840"
                            : "rgba(255,255,255,0.15)",
                          fontWeight: 700,
                        }}
                      >
                        {i === 0
                          ? "🥇"
                          : i === 1
                          ? "🥈"
                          : i === 2
                          ? "🥉"
                          : `#${i + 1}`}
                      </span>
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "rgba(255,255,255,0.8)",
                            lineHeight: 1.4,
                            marginBottom: "0.25rem",
                          }}
                        >
                          {p.title}
                        </p>
                        <div
                          style={{
                            height: 4,
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${
                                (p.views / TOP_PODCASTS[0].views) * 100
                              }%`,
                              background: "#e8673a",
                              borderRadius: 2,
                            }}
                          />
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "#e8673a",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.views.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        )}

        {/* ── BACKPACK STATS ── */}
        {activeNav === "backpack" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
              }}
            >
              <StatCard
                label="Backpack Opened"
                value="68%"
                sub={`${Math.round(STATS.totalUsers * 0.68)} members`}
                accent="#2e8b7a"
              />
              <StatCard
                label="Challenge Participants"
                value={STATS.challengeParticipants}
                sub="Wrote at least 1 reflection"
                accent="#e8673a"
              />
              <StatCard
                label="Avg. Sections Started"
                value="1.2"
                sub="Per active backpack user"
                accent="#5a7abf"
              />
            </div>

            <SectionCard title="Section Engagement">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {BACKPACK_DATA.map((d) => (
                  <div key={d.section}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.4rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.82rem",
                          color: "rgba(255,255,255,0.75)",
                          fontWeight: 600,
                        }}
                      >
                        {d.section}
                      </span>
                      {d.soon
                        ? (
                          <span
                            style={{
                              fontSize: "0.58rem",
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              background: "rgba(255,255,255,0.07)",
                              color: "rgba(255,255,255,0.3)",
                              padding: "0.2rem 0.6rem",
                              borderRadius: 50,
                            }}
                          >
                            Coming Soon
                          </span>
                        )
                        : (
                          <span
                            style={{
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              color: "#2e8b7a",
                            }}
                          >
                            {d.pct}% participation
                          </span>
                        )}
                    </div>
                    <div
                      style={{
                        height: 10,
                        background: "rgba(255,255,255,0.07)",
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${d.pct}%`,
                          background: d.soon
                            ? "rgba(255,255,255,0.05)"
                            : "#2e8b7a",
                          borderRadius: 5,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="1 Question Challenge — Weekly Reflections Submitted">
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "0.75rem",
                  height: 140,
                  paddingTop: "1rem",
                }}
              >
                {[38, 52, 61, 74, 68, 82, 79, 91, 87, 95, 103, 98].map((
                  v,
                  i,
                ) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        position: "relative",
                        height: `${(v / 103) * 110}px`,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background:
                            "linear-gradient(to top, #e8673a, rgba(232,103,58,0.4))",
                          borderRadius: "4px 4px 0 0",
                          height: "100%",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "0.55rem",
                        color: "rgba(255,255,255,0.25)",
                      }}
                    >
                      W{i + 1}
                    </span>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.3)",
                  marginTop: "0.75rem",
                }}
              >
                Weekly reflections over the last 12 weeks — showing consistent
                growth in participation.
              </p>
            </SectionCard>
          </div>
        )}

        {/* ── LOCATION ── */}
        {activeNav === "location" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <SectionCard title="Top 10 States by Member Count">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.9rem",
                }}
              >
                {LOCATION_DATA.map((l, i) => (
                  <div
                    key={l.state}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "rgba(255,255,255,0.25)",
                        width: 20,
                        textAlign: "right",
                      }}
                    >
                      #{i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        color: "rgba(255,255,255,0.7)",
                        width: 140,
                        flexShrink: 0,
                      }}
                    >
                      {l.state}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: 10,
                        background: "rgba(255,255,255,0.07)",
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${(l.count / LOCATION_DATA[0].count) * 100}%`,
                          background: `hsl(${160 + i * 8}, 50%, 45%)`,
                          borderRadius: 5,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.5)",
                        width: 36,
                        textAlign: "right",
                      }}
                    >
                      {l.count}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1rem",
              }}
            >
              <StatCard
                label="States Represented"
                value="47"
                sub="Out of 50 US states"
                accent="#2e8b7a"
              />
              <StatCard
                label="International"
                value="38"
                sub="Members outside the US"
                accent="#5a7abf"
              />
              <StatCard
                label="Top City"
                value="Los Angeles"
                sub="84 members"
                accent="#c87840"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

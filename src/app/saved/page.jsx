"use client";

import { useState } from "react";
import NavBar from "../../components/NavBarDynamic";
import FilterTabs from "../../components/FilterTabs";
import SavedList from "./SavedList";
import "./saved.css";

const SAVED_ITEMS = [
  {
    id: 1,
    type: "article",
    tag: "Retirement",
    title: "Popular Advice Isn't Always Helpful Advice",
    excerpt:
      "Loud guidance pushes urgency. Calm education builds confidence. Here's how to tell the difference — and why it matters more than ever.",
    readTime: "5 min read",
    date: "Feb 22, 2026",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    id: 2,
    type: "article",
    tag: "Wellness",
    title: "A Calm Place to Think About What Comes Next",
    excerpt:
      "Good Luck Island Collective exists to help you step out of the noise and into clarity — through learning, reflection, and thoughtful perspective.",
    readTime: "4 min read",
    date: "Feb 15, 2026",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80",
  },
  {
    id: 3,
    type: "podcast",
    tag: "Clear Thinking",
    title: "Rethinking Retirement, One Choice at a Time",
    excerpt:
      "What if the biggest mistake Gen X makes isn't financial — it's not knowing what they actually want? We kick off the show by questioning everything.",
    readTime: "42 min",
    date: "Mar 1, 2026",
    image:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80",
  },
  {
    id: 4,
    type: "article",
    tag: "Wellness",
    title: "Whole-Life Wellness: What It Really Means After 50",
    excerpt:
      "Health isn't just physical. This piece reframes wellness as something that encompasses your relationships, your purpose, and your sense of self.",
    readTime: "7 min read",
    date: "Feb 8, 2026",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
  },
  {
    id: 5,
    type: "podcast",
    tag: "Financial Independence",
    title: "The Advisor Who Actually Works for You",
    excerpt:
      "Not all financial advisors are created equal. We break down how to spot the ones who are selling Cool Aid — and how to find the rare ones who have your back.",
    readTime: "38 min",
    date: "Feb 22, 2026",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  },
];

const FILTERS = ["All", "Articles", "Podcasts"];

export default function SavedPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = SAVED_ITEMS.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Articles") return item.type === "article";
    if (activeFilter === "Podcasts") return item.type === "podcast";
    return true;
  });

  const articleCount = SAVED_ITEMS.filter((i) => i.type === "article").length;
  const podcastCount = SAVED_ITEMS.length - articleCount;

  return (
    <>
      <NavBar activePage="saved" largeAvatar />

      <div className="saved-page">
        {/* ── HEADER ── */}
        <div className="saved-header">
          <p className="saved-eyebrow">My Library</p>
          <h1>Saved Content</h1>
          <p>Articles and episodes you&apos;ve bookmarked for later.</p>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="saved-stats-strip">
          <div className="saved-stat">
            <span className="saved-stat-num">{SAVED_ITEMS.length}</span>
            <span className="saved-stat-label">Saved Items</span>
          </div>
          <div className="saved-stat-divider" />
          <div className="saved-stat">
            <span className="saved-stat-num">{articleCount}</span>
            <span className="saved-stat-label">Articles</span>
          </div>
          <div className="saved-stat-divider" />
          <div className="saved-stat">
            <span className="saved-stat-num">{podcastCount}</span>
            <span className="saved-stat-label">Podcasts</span>
          </div>
        </div>

        <div className="saved-content">
          {/* ── FILTER TABS ── */}
          <FilterTabs
            containerClass="saved-filters"
            buttonClass="saved-filter-btn"
            items={FILTERS}
            active={activeFilter}
            onChange={setActiveFilter}
          />

          {/* ── LIST ── */}
          <SavedList items={filtered} />
        </div>
      </div>
    </>
  );
}

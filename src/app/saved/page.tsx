"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../../components/NavBarDynamic";
import FilterTabs from "../../components/FilterTabs";
import SavedList from "./SavedList";
import { fetchSavedContent } from "../../lib/savedApi";
import type { SavedItemData } from "./SavedItem";
import "./saved.css";

const FILTERS = ["All", "Articles", "Podcasts"];

export default function SavedPage() {
  const { user } = useAuth0();
  const userId = user?.sub ?? "";

  const [savedItems, setSavedItems] = useState<SavedItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (!userId) return;
    fetchSavedContent(userId)
      .then(setSavedItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  const filtered = savedItems.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Articles") return item.type === "article";
    if (activeFilter === "Podcasts") return item.type === "podcast";
    return true;
  });

  const articleCount = savedItems.filter((i) => i.type === "article").length;
  const podcastCount = savedItems.filter((i) => i.type === "podcast").length;

  return (
    <>
      <NavBar activePage="saved" largeAvatar />

      <div className="saved-page">
        <div className="saved-header">
          <p className="saved-eyebrow">My Library</p>
          <h1>Saved Content</h1>
          <p>Articles and episodes you&apos;ve bookmarked for later.</p>
        </div>

        <div className="saved-stats-strip">
          <div className="saved-stat">
            <span className="saved-stat-num">{savedItems.length}</span>
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
          <FilterTabs
            containerClass="saved-filters"
            buttonClass="saved-filter-btn"
            items={FILTERS}
            active={activeFilter}
            onChange={setActiveFilter}
          />
          {loading
            ? <p className="saved-loading">Loading your saved items…</p>
            : <SavedList items={filtered} />}
        </div>
      </div>
    </>
  );
}

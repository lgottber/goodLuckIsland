"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchArticles, fetchEpisodes } from "../../lib/articlesApi";
import type { Article, Episode } from "../../lib/articlesApi";
import { fetchSavedIds } from "../../lib/savedApi";
import NavBar from "../../components/NavBarDynamic";
import SearchBar from "./SearchBar";
import VideoModal from "./VideoModal";
import ArticlesContent from "./ArticlesContent";
import "./articles.css";

export default function ArticlesPage() {
  const { user } = useAuth0();
  const userId = user?.sub ?? "";

  const [activeTab, setActiveTab] = useState("articles");
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const [modalEpisode, setModalEpisode] = useState<Episode | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [sort, setSort] = useState<"newest" | "a-z">("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [durationFilter, setDurationFilter] = useState("all");
  const [savedArticleIds, setSavedArticleIds] = useState(new Set<number>());
  const [savedEpisodeIds, setSavedEpisodeIds] = useState(new Set<number>());

  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedEpisodes, articles] = await Promise.all([
          fetchEpisodes(),
          fetchArticles(),
        ]);
        setEpisodes(fetchedEpisodes);
        setAllArticles(articles);
      } catch {
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("articles-view");
    if (stored === "list" || stored === "grid") setView(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("articles-view", view);
  }, [view]);

  useEffect(() => {
    if (!userId) return;
    fetchSavedIds(userId).then(({ articles, episodes: eps }) => {
      setSavedArticleIds(articles);
      setSavedEpisodeIds(eps);
    }).catch(() => {});
  }, [userId]);

  let featured: Article | null = null;
  const filtered: Article[] = [];
  for (const a of allArticles) {
    if (a.featured) {
      featured = a;
      continue;
    }
    if (activeCategory === "All" || a.category === activeCategory) {
      filtered.push(a);
    }
  }

  const podcastFeatured = episodes[0];
  const podcastRest = episodes.slice(1);

  return (
    <>
      <NavBar activePage="articles" largeAvatar />

      <div className="articles-page">
        <div className="articles-header">
          <span className="articles-header-eyebrow">Member Content</span>
          <h1>Podcasts &amp; Articles</h1>
          <p>
            Honest conversations and thoughtful reading for Gen X professionals
            preparing for retirement — focused on whole-life wellness, clear
            thinking, and intentional choices.
          </p>
          <SearchBar />
        </div>

        {loading && <p className="articles-loading">Loading content…</p>}

        {loadError && (
          <p className="articles-load-error">
            Could not load content. Please try again later.
          </p>
        )}

        {!loading && !loadError && (
          <ArticlesContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            featured={featured}
            filtered={filtered}
            podcastFeatured={podcastFeatured}
            podcastRest={podcastRest}
            featuredPlaying={featuredPlaying}
            setFeaturedPlaying={setFeaturedPlaying}
            setModalEpisode={setModalEpisode}
            sort={sort}
            setSort={setSort}
            view={view}
            setView={setView}
            durationFilter={durationFilter}
            setDurationFilter={setDurationFilter}
            userId={userId}
            savedArticleIds={savedArticleIds}
            savedEpisodeIds={savedEpisodeIds}
          />
        )}
      </div>

      {modalEpisode && (
        <VideoModal
          episode={modalEpisode}
          onClose={() => setModalEpisode(null)}
        />
      )}
    </>
  );
}

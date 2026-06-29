"use client";

import { useEffect, useState } from "react";
import { fetchArticles, fetchEpisodes } from "../../lib/articlesApi";
import type { Article, Episode } from "../../lib/articlesApi";
import NavBar from "../../components/NavBarDynamic";
import VideoModal from "./VideoModal";
import ArticlesContent from "./ArticlesContent";
import "./articles.css";

export default function ArticlesPage() {
  const [activeTab, setActiveTab] = useState("articles");
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const [modalEpisode, setModalEpisode] = useState<Episode | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

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
        {/* ── HEADER ── */}
        <div className="articles-header">
          <span className="articles-header-eyebrow">Member Content</span>
          <h1>Podcasts &amp; Articles</h1>
          <p>
            Honest conversations and thoughtful reading for Gen X professionals
            preparing for retirement — focused on whole-life wellness, clear
            thinking, and intentional choices.
          </p>
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
          />
        )}
      </div>

      {/* ── VIDEO MODAL ── */}
      {modalEpisode && (
        <VideoModal
          episode={modalEpisode}
          onClose={() => setModalEpisode(null)}
        />
      )}
    </>
  );
}

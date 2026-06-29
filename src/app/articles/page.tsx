"use client";

import { useEffect, useState } from "react";
import { fetchArticles, fetchEpisodes } from "../../lib/articlesApi";
import NavBar from "../../components/NavBarDynamic";
import Icon from "../../components/Icon";
import FilterTabs from "../../components/FilterTabs";
import ArticlesTab from "./ArticlesTab";
import PodcastTab from "./PodcastTab";
import VideoModal from "./VideoModal";
import "./articles.css";

type Episode = { id: number; num: string; title: string; desc: string | null; date: string | null; duration: string | null; youtubeId: string | null; thumbnail: string | null };
type Article = { id: number; category: string; title: string; excerpt: string | null; date: string | null; readTime: string | null; image: string | null; featured?: boolean };

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

  let featured = null;
  const filtered = [];
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
          <>
            {/* ── TAB SWITCHER ── */}
            <FilterTabs
              containerClass="content-tabs"
              buttonClass="content-tab"
              items={[
                { label: <><Icon name="book" size={14} /> Articles</>, value: "articles" },
                { label: <><Icon name="film" size={14} /> Podcast</>, value: "podcast" },
              ]}
              active={activeTab}
              onChange={setActiveTab}
            />

            {/* ── ARTICLES TAB ── */}
            {activeTab === "articles" && (
              <ArticlesTab
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                featured={featured}
                filtered={filtered}
              />
            )}

            {/* ── PODCAST TAB ── */}
            {activeTab === "podcast" && (
              <PodcastTab
                podcastFeatured={podcastFeatured}
                podcastRest={podcastRest}
                featuredPlaying={featuredPlaying}
                setFeaturedPlaying={setFeaturedPlaying}
                setModalEpisode={setModalEpisode}
              />
            )}
          </>
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

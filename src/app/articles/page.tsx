"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchArticles, fetchEpisodes } from "../../lib/articlesApi";
import type { Article, Episode } from "../../lib/articlesApi";
import { fetchVideos } from "../../lib/videosApi";
import type { Video } from "../../lib/videosApi";
import { fetchPlaylists } from "../../lib/playlistsApi";
import type { Playlist } from "../../lib/playlistsApi";
import { fetchSavedIds } from "../../lib/savedApi";
import NavBar from "../../components/NavBarDynamic";
import SearchBar from "./SearchBar";
import FilterTabs from "../../components/FilterTabs";
import ArticlesTab from "./ArticlesTab";
import PodcastSection from "./PodcastSection";
import VideosSection from "./VideosSection";
import PlaylistsSection from "./PlaylistsSection";
import "./articles.css";
import "./playlists.css";

const VALID_TABS = ["articles", "podcast", "videos", "playlists"];

const CONTENT_TABS = [
  { label: "Articles", value: "articles" },
  { label: "Podcast", value: "podcast" },
  { label: "Videos", value: "videos" },
  { label: "Playlists", value: "playlists" },
];

export default function ArticlesPage() {
  const { user } = useAuth0();
  const userId = user?.sub ?? "";
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get("tab");
    return tab && VALID_TABS.includes(tab) ? tab : "articles";
  });
  const [activeCategory, setActiveCategory] = useState("All");
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [sort, setSort] = useState<"newest" | "a-z">("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [savedArticleIds, setSavedArticleIds] = useState(new Set<number>());
  const [savedEpisodeIds, setSavedEpisodeIds] = useState(new Set<number>());
  const [savedVideoIds, setSavedVideoIds] = useState(new Set<number>());

  useEffect(() => {
    Promise.all([fetchArticles(), fetchEpisodes(), fetchVideos(), fetchPlaylists()])
      .then(([articles, eps, vids, pls]) => {
        setAllArticles(articles);
        setEpisodes(eps);
        setVideos(vids);
        setPlaylists(pls);
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
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
    fetchSavedIds(userId).then(({ articles, episodes: eps, videos }) => {
      setSavedArticleIds(articles);
      setSavedEpisodeIds(eps);
      setSavedVideoIds(videos);
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

  return (
    <>
      <NavBar activePage="articles" largeAvatar />

      <div className="articles-page">
        <div className="articles-header">
          <span className="articles-header-eyebrow">Member Content</span>
          <h1>Membership Content</h1>
          <p>
            Articles, podcast episodes, videos, and curated playlists for Gen X
            professionals preparing for retirement — focused on whole-life
            wellness, clear thinking, and intentional choices.
          </p>
          <SearchBar />
        </div>

        <FilterTabs
          containerClass="content-tabs"
          buttonClass="content-tab"
          items={CONTENT_TABS}
          active={activeTab}
          onChange={setActiveTab}
        />

        {loading && <p className="articles-loading">Loading content…</p>}

        {loadError && (
          <p className="articles-load-error">
            Could not load content. Please try again later.
          </p>
        )}

        {!loading && !loadError && activeTab === "articles" && (
          <ArticlesTab
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            featured={featured}
            filtered={filtered}
            sort={sort}
            setSort={setSort}
            view={view}
            setView={setView}
            userId={userId}
            savedArticleIds={savedArticleIds}
          />
        )}
        {!loading && !loadError && activeTab === "podcast" && (
          <PodcastSection episodes={episodes} userId={userId} savedEpisodeIds={savedEpisodeIds} />
        )}
        {!loading && !loadError && activeTab === "videos" && (
          <VideosSection videos={videos} userId={userId} savedVideoIds={savedVideoIds} />
        )}
        {!loading && !loadError && activeTab === "playlists" && (
          <PlaylistsSection playlists={playlists} userId={userId} savedEpisodeIds={savedEpisodeIds} />
        )}
      </div>
    </>
  );
}

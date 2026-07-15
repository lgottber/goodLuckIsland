"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchArticles, fetchEpisodes } from "../../lib/articlesApi";
import type { Article, Episode } from "../../lib/articlesApi";
import { fetchVideos } from "../../lib/videosApi";
import type { Video } from "../../lib/videosApi";
import { fetchBackpackSections } from "../../lib/backpackApi";
import type { BackpackSection } from "../../lib/backpackApi";
import { fetchSavedIds } from "../../lib/savedApi";
import NavBar from "../../components/NavBarDynamic";
import SearchBar from "../articles/SearchBar";
import ArticleResults from "./ArticleResults";
import EpisodeResults from "./EpisodeResults";
import VideoResults from "./VideoResults";
import StepResults from "./StepResults";
import SearchResultsMeta from "./SearchResultsMeta";
import { sortSearchResults } from "./searchSort";
import type { SearchSortOption } from "./searchSort";
import "./search.css";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const { user } = useAuth0();
  const userId = user?.sub ?? "";

  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [allEpisodes, setAllEpisodes] = useState<Episode[]>([]);
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [allSteps, setAllSteps] = useState<BackpackSection[]>([]);
  const [savedArticleIds, setSavedArticleIds] = useState(new Set<number>());
  const [savedEpisodeIds, setSavedEpisodeIds] = useState(new Set<number>());
  const [savedVideoIds, setSavedVideoIds] = useState(new Set<number>());
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SearchSortOption>("relevance");

  useEffect(() => {
    Promise.all([fetchArticles(), fetchEpisodes(), fetchVideos(), fetchBackpackSections()])
      .then(([articles, episodes, videos, steps]) => {
        setAllArticles(articles);
        setAllEpisodes(episodes);
        setAllVideos(videos);
        setAllSteps(steps);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetchSavedIds(userId).then(({ articles, episodes, videos }) => {
      setSavedArticleIds(articles);
      setSavedEpisodeIds(episodes);
      setSavedVideoIds(videos);
    }).catch(() => {});
  }, [userId]);

  const q = query.toLowerCase();
  const matchedArticles = q
    ? allArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.excerpt ?? "").toLowerCase().includes(q) ||
          (a.category ?? "").toLowerCase().includes(q),
      )
    : [];
  const matchedEpisodes = q
    ? allEpisodes.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.desc ?? "").toLowerCase().includes(q),
      )
    : [];
  const matchedVideos = q
    ? allVideos
        .filter(
          (v) =>
            v.title.toLowerCase().includes(q) ||
            (v.desc ?? "").toLowerCase().includes(q),
        )
        .map((v) => ({ ...v, score: 0 }))
    : [];
  const matchedSteps = q
    ? allSteps.filter(
        (s) =>
          s.label.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      )
    : [];

  const sortedArticles = sortSearchResults(matchedArticles, sortBy);
  const sortedEpisodes = sortSearchResults(matchedEpisodes, sortBy);
  const sortedVideos = sortSearchResults(matchedVideos, sortBy);

  const totalResults =
    matchedArticles.length + matchedEpisodes.length + matchedVideos.length + matchedSteps.length;

  return (
    <>
      <NavBar activePage="articles" largeAvatar />

      <div className="search-page">
        <div className="search-header">
          <Link href="/articles" className="search-back-link">
            ← Back to Articles
          </Link>
          <h1 className="search-heading">Search</h1>
          <SearchBar />
          {query && !loading && (
            <SearchResultsMeta
              totalResults={totalResults}
              query={query}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          )}
        </div>

        {loading && <p className="search-loading">Loading…</p>}

        {!loading && query && (
          <div className="search-results">
            {sortedArticles.length > 0 && (
              <ArticleResults
                articles={sortedArticles}
                userId={userId}
                savedArticleIds={savedArticleIds}
              />
            )}
            {sortedEpisodes.length > 0 && (
              <EpisodeResults
                episodes={sortedEpisodes}
                userId={userId}
                savedEpisodeIds={savedEpisodeIds}
              />
            )}
            {sortedVideos.length > 0 && (
              <VideoResults
                videos={sortedVideos}
                userId={userId}
                savedVideoIds={savedVideoIds}
              />
            )}
            {matchedSteps.length > 0 && <StepResults steps={matchedSteps} />}
            {totalResults === 0 && (
              <p className="search-empty">
                No results found for &ldquo;{query}&rdquo; — try a different keyword.
              </p>
            )}
          </div>
        )}

        {!loading && !query && (
          <p className="search-prompt">
            Enter a keyword above to search articles, podcasts, videos, and the 7SHieLD steps.
          </p>
        )}
      </div>
    </>
  );
}

import Icon from "../../components/Icon";
import FilterTabs from "../../components/FilterTabs";
import ArticlesTab from "./ArticlesTab";
import PodcastTab from "./PodcastTab";
import type { Article, Episode } from "../../lib/articlesApi";

export type ArticlesContentProps = {
  activeTab: string;
  setActiveTab: (v: string) => void;
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  featured: Article | null;
  filtered: Article[];
  podcastFeatured: Episode | undefined;
  podcastRest: Episode[];
  featuredPlaying: boolean;
  setFeaturedPlaying: (v: boolean) => void;
  setModalEpisode: (ep: Episode | null) => void;
  sort: "newest" | "a-z";
  setSort: (s: "newest" | "a-z") => void;
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
  durationFilter: string;
  setDurationFilter: (v: string) => void;
  userId: string;
  savedArticleIds: Set<number>;
  savedEpisodeIds: Set<number>;
};

export default function ArticlesContent({
  activeTab,
  setActiveTab,
  activeCategory,
  setActiveCategory,
  featured,
  filtered,
  podcastFeatured,
  podcastRest,
  featuredPlaying,
  setFeaturedPlaying,
  setModalEpisode,
  sort,
  setSort,
  view,
  setView,
  durationFilter,
  setDurationFilter,
  userId,
  savedArticleIds,
  savedEpisodeIds,
}: ArticlesContentProps) {
  return (
    <>
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
      {activeTab === "articles" && (
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
      {activeTab === "podcast" && podcastFeatured && (
        <PodcastTab
          podcastFeatured={podcastFeatured}
          podcastRest={podcastRest}
          featuredPlaying={featuredPlaying}
          setFeaturedPlaying={setFeaturedPlaying}
          setModalEpisode={setModalEpisode}
          durationFilter={durationFilter}
          setDurationFilter={setDurationFilter}
          userId={userId}
          savedEpisodeIds={savedEpisodeIds}
        />
      )}
    </>
  );
}

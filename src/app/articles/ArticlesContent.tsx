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
        />
      )}
      {activeTab === "podcast" && podcastFeatured && (
        <PodcastTab
          podcastFeatured={podcastFeatured}
          podcastRest={podcastRest}
          featuredPlaying={featuredPlaying}
          setFeaturedPlaying={setFeaturedPlaying}
          setModalEpisode={setModalEpisode}
        />
      )}
    </>
  );
}

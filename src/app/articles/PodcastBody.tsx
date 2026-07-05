import FeaturedEpisode from "./FeaturedEpisode";
import ListenButton from "./ListenButton";
import EpisodeCard from "./EpisodeCard";
import BookmarkButton from "./BookmarkButton";
import FilterTabs from "../../components/FilterTabs";
import Pagination from "../../components/Pagination";
import { ClockIcon } from "../../components/Icons";
import Icon from "../../components/Icon";
import type { Episode } from "../../lib/articlesApi";

const DURATION_FILTERS = [
  { label: "All", value: "all" },
  { label: "Under 30 min", value: "short" },
  { label: "30–60 min", value: "medium" },
  { label: "Over 60 min", value: "long" },
];

interface Props {
  featured: Episode;
  visibleEpisodes: Episode[];
  userId: string;
  savedEpisodeIds: Set<number>;
  durationFilter: string;
  setDurationFilter: (v: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PodcastBody({
  featured,
  visibleEpisodes,
  userId,
  savedEpisodeIds,
  durationFilter,
  setDurationFilter,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="podcast-tab-wrapper">
      <div className="podcast-subscribe-row">
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <button type="button" className="podcast-sub-btn">
            Subscribe on YouTube
          </button>
        </a>
        <button type="button" className="podcast-sub-btn">
          Apple Podcasts
        </button>
        <button type="button" className="podcast-sub-btn">
          Spotify
        </button>
      </div>

      <div className="podcast-content">
        <div>
          <p className="podcast-featured-label"><Icon name="film" size={14} /> Latest Episode</p>
          <div className="featured-episode">
            <div className="featured-video-side">
              <FeaturedEpisode episode={featured} />
            </div>

            <div className="featured-info">
              <div className="featured-meta">
                <span className="ep-badge">Podcast</span>
                <span className="ep-num">{featured.num}</span>
                <span className="ep-date">{featured.date}</span>
              </div>
              <h2 className="featured-title">{featured.title}</h2>
              <p className="featured-desc">{featured.desc}</p>
              <div className="featured-duration">
                <ClockIcon />
                {featured.duration}
              </div>
              <div className="featured-actions">
                {featured.podcastUrl && <ListenButton url={featured.podcastUrl} />}
                {userId && (
                  <BookmarkButton
                    userId={userId}
                    itemType="episode"
                    itemId={featured.id}
                    initialSaved={savedEpisodeIds.has(featured.id)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="episodes-section-header">
            <p className="episodes-section-label">All Episodes</p>
            <FilterTabs
              containerClass="podcast-duration-filter"
              buttonClass="podcast-duration-btn"
              items={DURATION_FILTERS}
              active={durationFilter}
              onChange={setDurationFilter}
            />
          </div>
          <div className="episodes-grid">
            {visibleEpisodes.map((ep) => (
              <EpisodeCard
                key={ep.id}
                ep={ep}
                userId={userId}
                isSaved={savedEpisodeIds.has(ep.id)}
              />
            ))}
          </div>
          {visibleEpisodes.length === 0 && (
            <p className="podcast-empty">No episodes match this duration filter.</p>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}

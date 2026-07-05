import FeaturedEpisode from "./FeaturedEpisode";
import ListenButton from "./ListenButton";
import EpisodeCard from "./EpisodeCard";
import BookmarkButton from "./BookmarkButton";
import FilterTabs from "../../components/FilterTabs";
import Pagination from "../../components/Pagination";
import { ClockIcon } from "../../components/Icons";
import Icon from "../../components/Icon";
import type { Episode } from "../../lib/articlesApi";
import { DURATION_FILTERS } from "../../lib/durationFilter";

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
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="podcast-sub-btn"
        >
          Subscribe on YouTube
        </a>
        {/* No show URLs yet -- disabled instead of a dead-looking link. Wire up once available. */}
        <button type="button" className="podcast-sub-btn" disabled aria-disabled="true">
          Apple Podcasts (Coming Soon)
        </button>
        <button type="button" className="podcast-sub-btn" disabled aria-disabled="true">
          Spotify (Coming Soon)
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

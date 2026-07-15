import FeaturedVideoPlayer from "./FeaturedVideoPlayer";
import VideoCard from "./VideoCard";
import ContinueWatchingRow from "./ContinueWatchingRow";
import BookmarkButton from "./BookmarkButton";
import FilterTabs from "../../components/FilterTabs";
import Pagination from "../../components/Pagination";
import { ClockIcon } from "../../components/Icons";
import Icon from "../../components/Icon";
import type { Video } from "../../lib/videosApi";
import { DURATION_FILTERS } from "../../lib/durationFilter";

interface Props {
  featured: Video;
  visibleVideos: Video[];
  featuredPlaying: boolean;
  setFeaturedPlaying: (v: boolean) => void;
  durationFilter: string;
  setDurationFilter: (v: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  userId?: string;
  savedVideoIds?: Set<number>;
}

export default function VideosBody({
  featured,
  visibleVideos,
  featuredPlaying,
  setFeaturedPlaying,
  durationFilter,
  setDurationFilter,
  currentPage,
  totalPages,
  onPageChange,
  userId,
  savedVideoIds,
}: Props) {
  return (
    <div className="podcast-tab-wrapper">
      <div className="podcast-content">
        <div>
          <p className="podcast-featured-label"><Icon name="film" size={14} /> Latest Video</p>
          <div className="featured-episode">
            <div className="featured-video-side">
              <FeaturedVideoPlayer
                video={featured}
                playing={featuredPlaying}
                onPlay={() => setFeaturedPlaying(true)}
              />
            </div>

            <div className="featured-info">
              <div className="featured-meta">
                <span className="ep-badge">Video</span>
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
                <button
                  type="button"
                  className="btn-watch"
                  onClick={() => setFeaturedPlaying(true)}
                >
                  Watch Video
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${featured.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-youtube"
                >
                  Open on YouTube
                </a>
                {userId && (
                  <BookmarkButton
                    userId={userId}
                    itemType="video"
                    itemId={featured.id}
                    initialSaved={savedVideoIds?.has(featured.id) ?? false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <ContinueWatchingRow userId={userId} savedVideoIds={savedVideoIds} />

        <div>
          <div className="episodes-section-header">
            <p className="episodes-section-label">All Videos</p>
            <FilterTabs
              containerClass="podcast-duration-filter"
              buttonClass="podcast-duration-btn"
              items={DURATION_FILTERS}
              active={durationFilter}
              onChange={setDurationFilter}
            />
          </div>
          <div className="episodes-grid">
            {visibleVideos.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                userId={userId}
                isSaved={savedVideoIds?.has(v.id) ?? false}
              />
            ))}
          </div>
          {visibleVideos.length === 0 && (
            <p className="podcast-empty">No videos match this duration filter.</p>
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

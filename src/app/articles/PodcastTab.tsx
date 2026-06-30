import FeaturedVideoPlayer from "./FeaturedVideoPlayer";
import EpisodeCard from "./EpisodeCard";
import BookmarkButton from "./BookmarkButton";
import FilterTabs from "../../components/FilterTabs";
import { ClockIcon } from "../../components/Icons";
import Icon from "../../components/Icon";
import type { Episode } from "../../lib/articlesApi";

const DURATION_FILTERS = [
  { label: "All", value: "all" },
  { label: "Under 30 min", value: "short" },
  { label: "30–60 min", value: "medium" },
  { label: "Over 60 min", value: "long" },
];

function parseMins(duration: string | null): number {
  if (!duration) return 0;
  const h = duration.match(/(\d+)h/);
  const m = duration.match(/(\d+)\s*min/);
  return (h ? parseInt(h[1], 10) * 60 : 0) + (m ? parseInt(m[1], 10) : 0);
}

function matchesDuration(ep: Episode, filter: string): boolean {
  if (filter === "all") return true;
  const mins = parseMins(ep.duration);
  if (filter === "short") return mins < 30;
  if (filter === "medium") return mins >= 30 && mins <= 60;
  if (filter === "long") return mins > 60;
  return true;
}

interface Props {
  podcastFeatured: Episode;
  podcastRest: Episode[];
  featuredPlaying: boolean;
  setFeaturedPlaying: (v: boolean) => void;
  setModalEpisode: (ep: Episode | null) => void;
  durationFilter: string;
  setDurationFilter: (v: string) => void;
  userId: string;
  savedEpisodeIds: Set<number>;
}

export default function PodcastTab({
  podcastFeatured,
  podcastRest,
  featuredPlaying,
  setFeaturedPlaying,
  setModalEpisode,
  durationFilter,
  setDurationFilter,
  userId,
  savedEpisodeIds,
}: Props) {
  const visibleEpisodes = podcastRest.filter((ep) => matchesDuration(ep, durationFilter));

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
              <FeaturedVideoPlayer
                episode={podcastFeatured}
                playing={featuredPlaying}
                onPlay={() => setFeaturedPlaying(true)}
              />
            </div>

            <div className="featured-info">
              <div className="featured-meta">
                <span className="ep-badge">Podcast</span>
                <span className="ep-num">{podcastFeatured.num}</span>
                <span className="ep-date">{podcastFeatured.date}</span>
              </div>
              <h2 className="featured-title">{podcastFeatured.title}</h2>
              <p className="featured-desc">{podcastFeatured.desc}</p>
              <div className="featured-duration">
                <ClockIcon />
                {podcastFeatured.duration}
              </div>
              <div className="featured-actions">
                <button
                  type="button"
                  className="btn-watch"
                  onClick={() => setFeaturedPlaying(true)}
                >
                  Watch Episode
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${podcastFeatured.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button type="button" className="btn-youtube">
                    Open on YouTube
                  </button>
                </a>
                {userId && (
                  <BookmarkButton
                    userId={userId}
                    itemType="episode"
                    itemId={podcastFeatured.id}
                    initialSaved={savedEpisodeIds.has(podcastFeatured.id)}
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
                onPlay={() => setModalEpisode(ep)}
                userId={userId}
                isSaved={savedEpisodeIds.has(ep.id)}
              />
            ))}
          </div>
          {visibleEpisodes.length === 0 && (
            <p className="podcast-empty">No episodes match this duration filter.</p>
          )}
        </div>
      </div>
    </div>
  );
}

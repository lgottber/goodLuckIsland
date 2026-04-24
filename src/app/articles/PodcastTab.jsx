import FeaturedVideoPlayer from "./FeaturedVideoPlayer";
import EpisodeCard from "./EpisodeCard";
import { ClockIcon, PlayIcon, YoutubeIcon } from "../../components/Icons";

export default function PodcastTab({
  podcastFeatured,
  podcastRest,
  featuredPlaying,
  setFeaturedPlaying,
  setModalEpisode,
}) {
  return (
    <div className="podcast-tab-wrapper">
      <div className="podcast-subscribe-row">
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button type="button" className="podcast-sub-btn">
            <YoutubeIcon />
            Subscribe on YouTube
          </button>
        </a>
        <button type="button" className="podcast-sub-btn">
          🎙️ Apple Podcasts
        </button>
        <button type="button" className="podcast-sub-btn">
          🟢 Spotify
        </button>
      </div>

      <div className="podcast-content">
        <div>
          <p className="podcast-featured-label">🎬 Latest Episode</p>
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
                  <PlayIcon size={14} /> Watch Episode
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${podcastFeatured.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button type="button" className="btn-youtube">
                    <YoutubeIcon /> Open on YouTube
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="episodes-section-label">All Episodes</p>
          <div className="episodes-grid">
            {podcastRest.map((ep) => (
              <EpisodeCard
                key={ep.id}
                ep={ep}
                onPlay={() => setModalEpisode(ep)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

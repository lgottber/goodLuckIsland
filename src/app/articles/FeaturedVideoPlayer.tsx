import { PlayIcon } from "../../components/Icons";
import PictureImage from "../../components/PictureImage";
import type { Episode } from "../../lib/articlesApi";

export default function FeaturedVideoPlayer({ episode, playing, onPlay }: { episode: Episode; playing: boolean; onPlay: () => void }) {
  if (playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${episode.youtubeId}?autoplay=1`}
        title={episode.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <>
      <PictureImage
        className="featured-thumbnail"
        name={episode.thumbnail ?? undefined}
        alt={`Thumbnail for featured podcast episode: ${episode.title}`}
        sizes="(max-width: 768px) 100vw, 60vw"
      />
      <button
        type="button"
        className="featured-play-overlay"
        onClick={onPlay}
        aria-label={`Play ${episode.title}`}
      >
        <span className="featured-play-btn" aria-hidden="true">
          <PlayIcon size={26} />
        </span>
        <span className="featured-play-label">Watch Now</span>
      </button>
    </>
  );
}

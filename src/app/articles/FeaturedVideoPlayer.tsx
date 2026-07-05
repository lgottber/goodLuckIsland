import { PlayIcon } from "../../components/Icons";
import PictureImage from "../../components/PictureImage";
import type { Video } from "../../lib/videosApi";

export default function FeaturedVideoPlayer({ video, playing, onPlay }: { video: Video; playing: boolean; onPlay: () => void }) {
  if (playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <>
      <PictureImage
        className="featured-thumbnail"
        name={video.thumbnail ?? undefined}
        alt={`Thumbnail for featured video: ${video.title}`}
        sizes="(max-width: 768px) 100vw, 60vw"
      />
      <button
        type="button"
        className="featured-play-overlay"
        onClick={onPlay}
        aria-label={`Play ${video.title}`}
      >
        <span className="featured-play-btn" aria-hidden="true">
          <PlayIcon size={26} />
        </span>
        <span className="featured-play-label">Watch Now</span>
      </button>
    </>
  );
}

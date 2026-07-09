import { PlayIcon } from "../../components/Icons";
import PictureImage from "../../components/PictureImage";
import TrackedYouTubeEmbed from "../../components/TrackedYouTubeEmbed";
import type { Video } from "../../lib/videosApi";

export default function FeaturedVideoPlayer({ video, playing, onPlay }: { video: Video; playing: boolean; onPlay: () => void }) {
  if (playing && video.youtubeId) {
    return (
      <TrackedYouTubeEmbed
        videoId={video.id}
        youtubeId={video.youtubeId}
        title={video.title}
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

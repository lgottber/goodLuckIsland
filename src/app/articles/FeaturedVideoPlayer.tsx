import { PlayIcon } from "../../components/Icons";

type Episode = { id: number; num: string; title: string; desc: string | null; date: string | null; duration: string | null; youtubeId: string | null; thumbnail: string | null };

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
      <img
        className="featured-thumbnail"
        src={episode.thumbnail ?? undefined}
        alt={episode.title}
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

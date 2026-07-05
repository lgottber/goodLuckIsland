import { PlayIcon } from "../../components/Icons";
import PictureImage from "../../components/PictureImage";
import type { Video } from "../../lib/videosApi";

interface Props {
  video: Video;
  onPlay: () => void;
}

export default function VideoCard({ video, onPlay }: Props) {
  return (
    <div className="episode-card" onClick={onPlay}>
      <div className="episode-thumb">
        <PictureImage
          name={video.thumbnail ?? undefined}
          alt={`Thumbnail for video ${video.num}: ${video.title}`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="episode-thumb-overlay">
          <button type="button" className="episode-thumb-play">
            <PlayIcon size={16} />
          </button>
        </div>
        <span className="episode-duration-badge">{video.duration}</span>
      </div>
      <div className="episode-body">
        <div className="episode-body-meta">
          <span className="episode-body-num">{video.num}</span>
          <span className="episode-body-date">{video.date}</span>
        </div>
        <h3 className="episode-body-title">{video.title}</h3>
        <p className="episode-body-desc">{video.desc}</p>
        <div className="episode-body-watch">
          <PlayIcon size={12} /> Watch Video
        </div>
      </div>
    </div>
  );
}

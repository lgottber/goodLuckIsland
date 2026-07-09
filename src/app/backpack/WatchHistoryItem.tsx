import PictureImage from "../../components/PictureImage";
import type { Video } from "../../lib/videosApi";

export default function WatchHistoryItem({
  video,
  percent,
}: {
  video: Video;
  percent: number;
}) {
  return (
    <div className="watch-history-item">
      <div className="watch-history-item-thumb">
        <PictureImage
          name={video.thumbnail ?? undefined}
          alt={`Thumbnail for video: ${video.title}`}
          sizes="8rem"
        />
      </div>
      <div className="watch-history-item-body">
        <h3 className="watch-history-item-title">{video.title}</h3>
        <div className="watch-history-item-meta">
          <span>{video.num}</span>
          <span>{video.duration}</span>
        </div>
        <div className="watch-history-progress">
          <div className="watch-history-progress-track">
            <div className={`watch-history-progress-fill watch-history-progress-fill--${percent}`} />
          </div>
          <span className="watch-history-progress-label">
            {percent === 100 ? "Completed" : `${percent}% watched`}
          </span>
        </div>
      </div>
    </div>
  );
}

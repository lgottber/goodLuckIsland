import { ClockIcon } from "../../../components/Icons";
import type { Video } from "../../../lib/videosApi";

export default function VideoDetailContent({ video }: { video: Video }) {
  const durationEl = video.duration ? (
    <span className="video-detail-duration">
      <ClockIcon /> {video.duration}
    </span>
  ) : null;

  return (
    <>
      <div className="video-detail-embed-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="video-detail-embed"
        />
      </div>

      <div className="video-detail-info">
        <div className="video-detail-meta-row">
          <span className="ep-badge">Video</span>
          {video.num && <span className="video-detail-num">{video.num}</span>}
          {video.date && <span className="video-detail-date">{video.date}</span>}
          {durationEl}
        </div>
        <h1 className="video-detail-title">{video.title}</h1>
        {video.desc && <p className="video-detail-desc">{video.desc}</p>}
        <div className="video-detail-actions">
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-youtube"
          >
            Open on YouTube
          </a>
        </div>
      </div>
    </>
  );
}

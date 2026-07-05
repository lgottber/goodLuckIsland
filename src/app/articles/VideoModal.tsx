import Modal from "../../components/Modal";
import Icon from "../../components/Icon";
import type { Video } from "../../lib/videosApi";

export default function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  return (
    <Modal
      backdropClassName="video-modal-backdrop"
      contentClassName="video-modal"
      onClose={onClose}
    >
      <div className="video-modal-header">
        <h3 className="video-modal-title">{video.title}</h3>
        <button type="button" className="video-modal-close" onClick={onClose}>
          <Icon name="x" size={16} />
        </button>
      </div>
      <div className="video-modal-embed">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="video-modal-footer">
        <span className="video-modal-meta">
          {video.num} · {video.date} · {video.duration}
        </span>
        <a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="video-modal-yt"
        >
          Open on YouTube
        </a>
      </div>
    </Modal>
  );
}

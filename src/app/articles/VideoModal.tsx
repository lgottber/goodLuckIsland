import Modal from "../../components/Modal";
import Icon from "../../components/Icon";
import type { Episode } from "../../lib/articlesApi";

export default function VideoModal({ episode, onClose }: { episode: Episode; onClose: () => void }) {
  return (
    <Modal
      backdropClassName="video-modal-backdrop"
      contentClassName="video-modal"
      onClose={onClose}
    >
      <div className="video-modal-header">
        <h3 className="video-modal-title">{episode.title}</h3>
        <button type="button" className="video-modal-close" onClick={onClose}>
          <Icon name="x" size={16} />
        </button>
      </div>
      <div className="video-modal-embed">
        <iframe
          src={`https://www.youtube.com/embed/${episode.youtubeId}?autoplay=1`}
          title={episode.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="video-modal-footer">
        <span className="video-modal-meta">
          {episode.num} · {episode.date} · {episode.duration}
        </span>
        <a
          href={`https://www.youtube.com/watch?v=${episode.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button type="button" className="video-modal-yt">
            Open on YouTube
          </button>
        </a>
      </div>
    </Modal>
  );
}

import Modal from "../../components/Modal";
import { YoutubeIcon } from "../../components/Icons";

export default function VideoModal({ episode, onClose }) {
  return (
    <Modal
      backdropClassName="video-modal-backdrop"
      contentClassName="video-modal"
      onClose={onClose}
    >
      <div className="video-modal-header">
        <h3 className="video-modal-title">{episode.title}</h3>
        <button
          type="button"
          className="video-modal-close"
          onClick={onClose}
        >
          ✕
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
            <YoutubeIcon /> Open on YouTube
          </button>
        </a>
      </div>
    </Modal>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ClockIcon } from "../../../components/Icons";
import VideoDetailEmbedBlock from "./VideoDetailEmbedBlock";
import VideoDetailGate from "./VideoDetailGate";
import { apiFetch } from "../../../lib/apiClient";
import type { Video } from "../../../lib/videosApi";

export default function VideoDetailContent({ video }: { video: Video }) {
  const { isAuthenticated } = useAuth0();
  const [resolvedYoutubeId, setResolvedYoutubeId] = useState<string | null>(video.youtubeId);

  useEffect(() => {
    if (!video.isMembersOnly || !isAuthenticated || resolvedYoutubeId) return;
    let cancelled = false;
    apiFetch<{ youtubeId: string | null }>(`/content/videos/${video.id}/watch`)
      .then((res) => { if (!cancelled) setResolvedYoutubeId(res.youtubeId); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [video.isMembersOnly, isAuthenticated, video.id, resolvedYoutubeId]);

  const durationEl = video.duration ? (
    <span className="video-detail-duration">
      <ClockIcon /> {video.duration}
    </span>
  ) : null;

  return (
    <>
      {resolvedYoutubeId ? (
        <VideoDetailEmbedBlock videoId={video.id} youtubeId={resolvedYoutubeId} title={video.title} />
      ) : (
        <VideoDetailGate isMembersOnly={Boolean(video.isMembersOnly)} />
      )}

      <div className="video-detail-info">
        <div className="video-detail-meta-row">
          <span className="ep-badge">Video</span>
          {video.num && <span className="video-detail-num">{video.num}</span>}
          {video.date && <span className="video-detail-date">{video.date}</span>}
          {durationEl}
        </div>
        <h1 className="video-detail-title">{video.title}</h1>
        {video.desc && <p className="video-detail-desc">{video.desc}</p>}
      </div>
    </>
  );
}

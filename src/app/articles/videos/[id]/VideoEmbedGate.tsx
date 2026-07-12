"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { apiFetch } from "../../../../lib/apiClient";

interface Props {
  videoId: number;
  youtubeId: string | null;
  title: string;
  isMembersOnly: boolean;
}

export default function VideoEmbedGate({ videoId, youtubeId, title, isMembersOnly }: Props) {
  const { isAuthenticated } = useAuth0();
  const [resolvedId, setResolvedId] = useState<string | null>(youtubeId);

  useEffect(() => {
    if (!isMembersOnly || !isAuthenticated || resolvedId) return;
    let cancelled = false;
    apiFetch<{ youtubeId: string | null }>(`/content/videos/${videoId}/watch`)
      .then((res) => { if (!cancelled) setResolvedId(res.youtubeId); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [isMembersOnly, isAuthenticated, videoId, resolvedId]);

  if (resolvedId) {
    return (
      <>
        <div className="content-detail-embed">
          <iframe
            src={`https://www.youtube.com/embed/${resolvedId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${resolvedId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="content-detail-listen-btn"
        >
          ▶ Watch on YouTube
        </a>
      </>
    );
  }

  if (isMembersOnly && !isAuthenticated) {
    return (
      <p className="article-detail-gate">
        <a href="/signup">Sign up</a> or <a href="/auth/login">log in</a> to
        watch this members-only video for free.
      </p>
    );
  }

  return null;
}

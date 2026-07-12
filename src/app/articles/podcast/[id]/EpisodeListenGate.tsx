"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { apiFetch } from "../../../../lib/apiClient";

interface Props {
  episodeId: number;
  podcastUrl: string | null;
  isMembersOnly: boolean;
}

export default function EpisodeListenGate({ episodeId, podcastUrl, isMembersOnly }: Props) {
  const { isAuthenticated } = useAuth0();
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(podcastUrl);

  useEffect(() => {
    if (!isMembersOnly || !isAuthenticated || resolvedUrl) return;
    let cancelled = false;
    apiFetch<{ podcastUrl: string | null }>(`/content/episodes/${episodeId}/listen`)
      .then((res) => { if (!cancelled) setResolvedUrl(res.podcastUrl); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [isMembersOnly, isAuthenticated, episodeId, resolvedUrl]);

  if (resolvedUrl) {
    return (
      <a
        href={resolvedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="content-detail-listen-btn"
      >
        🎧 Listen to Episode
      </a>
    );
  }

  if (isMembersOnly && !isAuthenticated) {
    return (
      <p className="article-detail-gate">
        <a href="/signup">Sign up</a> or <a href="/auth/login">log in</a> to
        listen to this members-only episode for free.
      </p>
    );
  }

  return null;
}

"use client";

import { useEffect, useRef } from "react";
import { loadYouTubeIframeApi } from "../lib/youtubeIframeApi";
import { recordVideoProgress } from "../lib/videoProgressApi";
import type { VideoProgressPercent } from "../lib/videoProgressApi";

const PROGRESS_THRESHOLDS: VideoProgressPercent[] = [25, 50, 75, 100];
const POLL_INTERVAL_MS = 2000;

interface Props {
  videoId: number;
  youtubeId: string;
  title: string;
  autoplay?: boolean;
}

export default function TrackedYouTubeEmbed({
  videoId,
  youtubeId,
  title,
  autoplay = true,
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let player: YTPlayer | null = null;
    let pollId: ReturnType<typeof setInterval> | null = null;
    const firedThresholds = new Set<VideoProgressPercent>();

    function fireThreshold(percent: VideoProgressPercent) {
      if (firedThresholds.has(percent)) return;
      firedThresholds.add(percent);
      recordVideoProgress(videoId, percent);
    }

    function checkProgress() {
      if (!player) return;
      const duration = player.getDuration();
      if (!duration) return;
      const percentWatched = (player.getCurrentTime() / duration) * 100;
      for (const threshold of PROGRESS_THRESHOLDS) {
        if (percentWatched >= threshold) fireThreshold(threshold);
      }
    }

    function stopPolling() {
      if (pollId) {
        clearInterval(pollId);
        pollId = null;
      }
    }

    loadYouTubeIframeApi().then((YT) => {
      if (cancelled || !iframeRef.current) return;
      player = new YT.Player(iframeRef.current, {
        events: {
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED) {
              fireThreshold(100);
            }
            if (event.data === YT.PlayerState.PLAYING) {
              stopPolling();
              pollId = setInterval(checkProgress, POLL_INTERVAL_MS);
            } else {
              stopPolling();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      stopPolling();
      player?.destroy();
    };
  }, [videoId, youtubeId]);

  return (
    <iframe
      ref={iframeRef}
      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&enablejsapi=1`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

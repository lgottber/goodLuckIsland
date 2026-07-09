import { apiFetch } from "./apiClient";
import { trackEvent } from "./analyticsApi";

export type VideoWatchHistoryEntry = {
  videoId: number;
  percent: number;
  updatedAt: string;
};

export type VideoProgressPercent = 25 | 50 | 75 | 100;

export function recordVideoProgress(videoId: number, percent: VideoProgressPercent): void {
  trackEvent("video_progress", { contentType: "video", contentId: videoId, percent });
}

export function fetchVideoWatchHistory(): Promise<VideoWatchHistoryEntry[]> {
  return apiFetch<VideoWatchHistoryEntry[]>("/video-progress/history");
}

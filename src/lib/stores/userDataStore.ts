import { create } from "zustand";
import { fetchProfile } from "../profileApi";
import { fetchUserProgress, type UserProgress } from "../sevenStepApi";
import { fetchUserBadges, type EarnedBadge } from "../badgesApi";
import { fetchSavedContent } from "../savedApi";
import { fetchVideoWatchHistory, type VideoWatchHistoryEntry } from "../videoProgressApi";
import { fetchVideosByIds, type Video } from "../videosApi";
import type { SavedItemData } from "../../app/saved/SavedItem";
import type { Tables } from "../../types/supabase";

type LoadStatus = "idle" | "loading" | "loaded" | "error";

// Single client-side cache for data that's the same across every route
// (nav bar avatar, backpack, profile, step pages all want the same
// profile/progress/badges/saved/watch-history rows). Each slice is fetched
// at most once per login -- ensure* calls are cheap no-ops once `loaded`,
// so mounting the same consumer on every page navigation no longer refires
// the request. Call reset() on logout so the next login starts clean.
interface UserDataState {
  profile: Tables<"users"> | null;
  progress: UserProgress | null;
  badges: EarnedBadge[];
  saved: SavedItemData[];
  watchHistory: { entries: VideoWatchHistoryEntry[]; videos: Video[] };

  profileStatus: LoadStatus;
  progressStatus: LoadStatus;
  badgesStatus: LoadStatus;
  savedStatus: LoadStatus;
  watchHistoryStatus: LoadStatus;

  ensureProfile: (userId: string) => Promise<void>;
  ensureProgress: (userId: string) => Promise<void>;
  ensureBadges: () => Promise<void>;
  ensureSaved: (userId: string) => Promise<void>;
  ensureWatchHistory: () => Promise<void>;

  setProfile: (profile: Tables<"users"> | null) => void;
  invalidateProfile: () => void;
  setProgress: (progress: UserProgress) => void;
  removeSavedItem: (id: string) => void;
  restoreSavedItem: (item: SavedItemData) => void;

  reset: () => void;
}

type UserDataSnapshot = Pick<
  UserDataState,
  | "profile"
  | "progress"
  | "badges"
  | "saved"
  | "watchHistory"
  | "profileStatus"
  | "progressStatus"
  | "badgesStatus"
  | "savedStatus"
  | "watchHistoryStatus"
>;

const initialData: UserDataSnapshot = {
  profile: null,
  progress: null,
  badges: [],
  saved: [],
  watchHistory: { entries: [], videos: [] },
  profileStatus: "idle",
  progressStatus: "idle",
  badgesStatus: "idle",
  savedStatus: "idle",
  watchHistoryStatus: "idle",
};

export const useUserDataStore = create<UserDataState>((set, get) => ({
  ...initialData,

  ensureProfile: async (userId) => {
    if (!userId || get().profileStatus === "loading" || get().profileStatus === "loaded") return;
    set({ profileStatus: "loading" });
    try {
      const profile = await fetchProfile(userId);
      set({ profile, profileStatus: "loaded" });
    } catch {
      set({ profileStatus: "error" });
    }
  },

  ensureProgress: async (userId) => {
    if (!userId || get().progressStatus === "loading" || get().progressStatus === "loaded") return;
    set({ progressStatus: "loading" });
    try {
      const progress = await fetchUserProgress(userId);
      set({ progress, progressStatus: "loaded" });
    } catch {
      set({ progressStatus: "error" });
    }
  },

  ensureBadges: async () => {
    if (get().badgesStatus === "loading" || get().badgesStatus === "loaded") return;
    set({ badgesStatus: "loading" });
    try {
      const badges = await fetchUserBadges();
      set({ badges, badgesStatus: "loaded" });
    } catch {
      set({ badgesStatus: "error" });
    }
  },

  ensureSaved: async (userId) => {
    if (!userId || get().savedStatus === "loading" || get().savedStatus === "loaded") return;
    set({ savedStatus: "loading" });
    try {
      const saved = await fetchSavedContent(userId);
      set({ saved, savedStatus: "loaded" });
    } catch {
      set({ savedStatus: "error" });
    }
  },

  ensureWatchHistory: async () => {
    if (get().watchHistoryStatus === "loading" || get().watchHistoryStatus === "loaded") return;
    set({ watchHistoryStatus: "loading" });
    try {
      const entries = await fetchVideoWatchHistory();
      const videos = await fetchVideosByIds(entries.map((entry) => entry.videoId));
      set({ watchHistory: { entries, videos }, watchHistoryStatus: "loaded" });
    } catch {
      set({ watchHistoryStatus: "error" });
    }
  },

  setProfile: (profile) => set({ profile, profileStatus: "loaded" }),

  // Used after a profile/avatar save whose response doesn't hand back the
  // canonical row -- flips status back to idle so the next ensureProfile
  // (e.g. NavBar re-render) refetches instead of trusting a stale copy.
  invalidateProfile: () => set({ profileStatus: "idle" }),

  setProgress: (progress) => set({ progress, progressStatus: "loaded" }),

  removeSavedItem: (id) =>
    set((state) => ({ saved: state.saved.filter((item) => item.id !== id) })),

  restoreSavedItem: (item) =>
    set((state) =>
      state.saved.some((i) => i.id === item.id)
        ? state
        : { saved: [...state.saved, item] },
    ),

  reset: () => set({ ...initialData }),
}));

import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../profileApi", () => ({ fetchProfile: vi.fn() }));
vi.mock("../sevenStepApi", () => ({ fetchUserProgress: vi.fn() }));
vi.mock("../badgesApi", () => ({ fetchUserBadges: vi.fn() }));
vi.mock("../savedApi", () => ({ fetchSavedContent: vi.fn() }));
vi.mock("../videoProgressApi", () => ({ fetchVideoWatchHistory: vi.fn() }));
vi.mock("../videosApi", () => ({ fetchVideosByIds: vi.fn() }));

import { fetchProfile } from "../profileApi";
import { fetchUserProgress } from "../sevenStepApi";
import { fetchSavedContent } from "../savedApi";
import { useUserDataStore } from "./userDataStore";
import type { Tables } from "../../types/supabase";
import type { SavedItemData } from "../../app/saved/SavedItem";

const mockedFetchProfile = vi.mocked(fetchProfile);
const mockedFetchUserProgress = vi.mocked(fetchUserProgress);
const mockedFetchSavedContent = vi.mocked(fetchSavedContent);

function makeProfile(overrides: Partial<Tables<"users">> = {}): Tables<"users"> {
  return {
    age: null,
    avatar_id: null,
    bio: null,
    blocked_at: null,
    city: null,
    created_at: null,
    divorced: null,
    education: null,
    email: "test@example.com",
    first_name: null,
    home_paid_off: null,
    id: "user-1",
    interests: null,
    is_deleted: false,
    kids: null,
    last_login: null,
    last_name: null,
    location: null,
    mantra: null,
    marital_status: null,
    net_worth: null,
    notifications_email: true,
    occupation: null,
    retired: null,
    retirement_date: null,
    retirement_date_reason: null,
    state: null,
    unsubscribed_at: null,
    updated_at: null,
    username: null,
    working_income: null,
    years_in_occupation: null,
    zip_code: null,
    ...overrides,
  };
}

afterEach(() => {
  useUserDataStore.getState().reset();
  vi.clearAllMocks();
});

describe("ensureProfile", () => {
  it("fetches once and caches the result", async () => {
    mockedFetchProfile.mockResolvedValue(makeProfile({ avatar_id: "palm" }));

    await useUserDataStore.getState().ensureProfile("user-1");
    await useUserDataStore.getState().ensureProfile("user-1");

    expect(mockedFetchProfile).toHaveBeenCalledTimes(1);
    expect(useUserDataStore.getState().profile?.avatar_id).toBe("palm");
    expect(useUserDataStore.getState().profileStatus).toBe("loaded");
  });

  it("marks the slice as error without caching a value on failure", async () => {
    mockedFetchProfile.mockRejectedValue(new Error("boom"));

    await useUserDataStore.getState().ensureProfile("user-1");

    expect(useUserDataStore.getState().profileStatus).toBe("error");
    expect(useUserDataStore.getState().profile).toBeNull();
  });

  it("refetches after invalidateProfile", async () => {
    mockedFetchProfile.mockResolvedValue(makeProfile({ avatar_id: "palm" }));

    await useUserDataStore.getState().ensureProfile("user-1");
    useUserDataStore.getState().invalidateProfile();
    await useUserDataStore.getState().ensureProfile("user-1");

    expect(mockedFetchProfile).toHaveBeenCalledTimes(2);
  });
});

describe("independent slices", () => {
  it("fetches progress and profile independently", async () => {
    mockedFetchProfile.mockResolvedValue(null);
    mockedFetchUserProgress.mockResolvedValue({
      one_question_challenge: true,
      wayfair_tool: false,
      values_and_beliefs: false,
      finding_your_purpose: false,
      new_skills: false,
      retirement: false,
      give_back_step: false,
    });

    await Promise.all([
      useUserDataStore.getState().ensureProfile("user-1"),
      useUserDataStore.getState().ensureProgress("user-1"),
    ]);

    expect(mockedFetchProfile).toHaveBeenCalledTimes(1);
    expect(mockedFetchUserProgress).toHaveBeenCalledTimes(1);
    expect(useUserDataStore.getState().progress?.one_question_challenge).toBe(true);
  });
});

describe("setProgress", () => {
  it("patches progress in place without refetching", () => {
    useUserDataStore.getState().setProgress({
      one_question_challenge: false,
      wayfair_tool: false,
      values_and_beliefs: false,
      finding_your_purpose: false,
      new_skills: false,
      retirement: false,
      give_back_step: false,
    });

    const current = useUserDataStore.getState().progress;
    if (!current) throw new Error("expected progress to be set");
    useUserDataStore.getState().setProgress({ ...current, wayfair_tool: true });

    expect(useUserDataStore.getState().progress?.wayfair_tool).toBe(true);
    expect(useUserDataStore.getState().progressStatus).toBe("loaded");
    expect(mockedFetchUserProgress).not.toHaveBeenCalled();
  });
});

describe("saved item optimistic updates", () => {
  const item: SavedItemData = {
    id: "a-1",
    image: null,
    type: "article",
    tag: "",
    date: "",
    readTime: "",
    title: "Test",
    excerpt: "",
    itemType: "article",
    numericId: 1,
  };

  it("removes and can restore a saved item without refetching", async () => {
    mockedFetchSavedContent.mockResolvedValue([item]);
    await useUserDataStore.getState().ensureSaved("user-1");

    useUserDataStore.getState().removeSavedItem(item.id);
    expect(useUserDataStore.getState().saved).toEqual([]);

    useUserDataStore.getState().restoreSavedItem(item);
    expect(useUserDataStore.getState().saved).toEqual([item]);
    expect(mockedFetchSavedContent).toHaveBeenCalledTimes(1);
  });
});

describe("reset", () => {
  it("flushes every slice back to idle, e.g. on logout", async () => {
    mockedFetchProfile.mockResolvedValue(makeProfile({ avatar_id: "palm" }));
    await useUserDataStore.getState().ensureProfile("user-1");

    useUserDataStore.getState().reset();

    expect(useUserDataStore.getState().profile).toBeNull();
    expect(useUserDataStore.getState().profileStatus).toBe("idle");

    mockedFetchProfile.mockResolvedValue(makeProfile({ avatar_id: "shell" }));
    await useUserDataStore.getState().ensureProfile("user-2");
    expect(useUserDataStore.getState().profile?.avatar_id).toBe("shell");
  });
});

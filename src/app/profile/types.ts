import type { ProfileUpdate } from "../../lib/profileApi";

// Form state represents all DB fields as strings (including DB number/null columns).
// Derived from ProfileUpdate (which references Tables<"users">) so it stays in sync with the schema.
type ToFormString<T> = NonNullable<T> extends string[] ? string[] : string;

export type ResetStatus = "idle" | "sending" | "sent" | "error";

export type SetField = <K extends keyof ProfileForm>(key: K, val: ProfileForm[K]) => void;

export type ProfileForm = {
  [K in keyof ProfileUpdate]: ToFormString<ProfileUpdate[K]>;
} & {
  avatarUrl: string;
  address: string;
  memberSince: string;
  interests: string[];
  stats: {
    articlesRead: number | null;
    podcastsListened: number | null;
    savedItems: number | null;
    daysActive: number | null;
  };
};

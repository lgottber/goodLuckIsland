import { supabase } from "./supabase";

export interface Episode {
  id?: string;
  num: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  "youtube_id": string;
  thumbnail: string;
  "sort_order": number;
}

export interface Article {
  id?: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  "read_time": string;
  image: string;
  featured: boolean;
  "sort_order": number;
}

export interface BackpackSection {
  id?: string;
  slug: string;
  label: string;
  emoji: string;
  color: string;
  tagline: string;
  description: string;
  type: string;
  "sort_order": number;
}

export interface UserRecord {
  id: string;
  email: string;
  "first_name": string | null;
  "last_name": string | null;
  username: string | null;
  location: string | null;
  bio: string | null;
  mantra: string | null;
  interests: string[] | null;
  age: number | null;
  occupation: string | null;
  "years_in_occupation": number | null;
  education: string | null;
  retired: string | null;
  "retirement_date": string | null;
  "marital_status": string | null;
  divorced: string | null;
  kids: string | null;
  "home_paid_off": string | null;
  "working_income": string | null;
  "net_worth": string | null;
  "avatar_id": string | null;
  "updated_at": string | null;
}

export async function isAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_admin", { user_id: userId });
  if (error) throw error;
  return !!data;
}

// ── Episodes ──────────────────────────────────────────────────────────────────
export async function fetchAdminEpisodes(): Promise<Episode[]> {
  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as Episode[];
}

export async function insertEpisode(
  payload: Omit<Episode, "id">,
): Promise<void> {
  const { error } = await supabase.from("episodes").insert(payload);
  if (error) throw error;
}

export async function updateEpisode(
  id: string,
  payload: Episode,
): Promise<void> {
  const { error } = await supabase.from("episodes").update(payload).eq(
    "id",
    id,
  );
  if (error) throw error;
}

export async function deleteEpisode(id: string): Promise<void> {
  const { error } = await supabase.from("episodes").delete().eq("id", id);
  if (error) throw error;
}

// ── Articles ──────────────────────────────────────────────────────────────────
export async function fetchAdminArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as Article[];
}

export async function insertArticle(
  payload: Omit<Article, "id">,
): Promise<void> {
  const { error } = await supabase.from("articles").insert(payload);
  if (error) throw error;
}

export async function updateArticle(
  id: string,
  payload: Article,
): Promise<void> {
  const { error } = await supabase.from("articles").update(payload).eq(
    "id",
    id,
  );
  if (error) throw error;
}

export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
}

// ── Backpack Sections ─────────────────────────────────────────────────────────
export async function fetchAdminBackpackSections(): Promise<BackpackSection[]> {
  const { data, error } = await supabase
    .from("backpack_sections")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as BackpackSection[];
}

export async function insertBackpackSection(
  payload: Omit<BackpackSection, "id">,
): Promise<void> {
  const { error } = await supabase.from("backpack_sections").insert(payload);
  if (error) throw error;
}

export async function updateBackpackSection(
  id: string,
  payload: BackpackSection,
): Promise<void> {
  const { error } = await supabase.from("backpack_sections").update(payload)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteBackpackSection(id: string): Promise<void> {
  const { error } = await supabase.from("backpack_sections").delete().eq(
    "id",
    id,
  );
  if (error) throw error;
}

// ── Users ─────────────────────────────────────────────────────────────────────
export async function fetchUsers(): Promise<UserRecord[]> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("first_name");
  if (error) throw error;
  return (data ?? []) as UserRecord[];
}

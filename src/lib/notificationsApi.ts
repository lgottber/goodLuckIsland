import { apiFetch, apiFetchVoid } from "./apiClient";

export type Notification = {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
};

export async function fetchNotifications(
  _userId: string,
): Promise<Notification[]> {
  return apiFetch<Notification[]>("/notifications");
}

export async function markAllRead(_userId: string): Promise<void> {
  await apiFetchVoid("/notifications/read-all", { method: "POST" });
}

import type { Notification } from "../lib/notificationsApi";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <div className={`notif-item${notification.read ? "" : " notif-item--unread"}`}>
      <p className="notif-item-title">{notification.title}</p>
      <p className="notif-item-body">{notification.body}</p>
      <span className="notif-item-date">{formatDate(notification.created_at)}</span>
    </div>
  );
}

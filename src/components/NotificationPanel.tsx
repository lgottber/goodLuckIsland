import type { Notification } from "../lib/notificationsApi";
import NotificationItem from "./NotificationItem";

export default function NotificationPanel({
  notifications,
  onMarkAllRead,
}: {
  notifications: Notification[];
  onMarkAllRead: () => void;
}) {
  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div className="notif-panel" role="dialog" aria-label="Notifications">
      <div className="notif-panel-header">
        <span className="notif-panel-title">Notifications</span>
        {hasUnread && (
          <button type="button" className="notif-mark-read-btn" onClick={onMarkAllRead}>
            Mark all read
          </button>
        )}
      </div>
      <div className="notif-panel-body">
        {notifications.length === 0 ? (
          <p className="notif-empty">You&apos;re all caught up!</p>
        ) : (
          notifications.map((n) => <NotificationItem key={n.id} notification={n} />)
        )}
      </div>
    </div>
  );
}

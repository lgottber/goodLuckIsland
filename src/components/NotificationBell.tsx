"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import NotificationPanel from "./NotificationPanel";
import { fetchNotifications, markAllRead, dismissNotification } from "../lib/notificationsApi";
import type { Notification } from "../lib/notificationsApi";
import { useClickOutside } from "../hooks/useClickOutside";
import "./notification-bell.css";

export default function NotificationBell({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setOpen(false), open);

  useEffect(() => {
    if (!userId) return;
    fetchNotifications(userId).then(setNotifications).catch(() => null);
  }, [userId]);

  function handleOpen() {
    setOpen((prev) => !prev);
  }

  function handleMarkAllRead() {
    markAllRead(userId)
      .then(() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))))
      .catch(() => null);
  }

  function handleDismiss(id: string) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    dismissNotification(userId, id).catch(() => null);
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notif-bell-wrap" ref={containerRef}>
      <button
        type="button"
        className="notif-bell-btn"
        onClick={handleOpen}
        aria-label={unreadCount > 0 ? `${unreadCount} unread notifications` : "Notifications"}
      >
        <Icon name="bell" size={18} />
        {unreadCount > 0 && (
          <span className="notif-badge" aria-hidden="true">
            {unreadCount > 9 ? "9+" : String(unreadCount)}
          </span>
        )}
      </button>
      {open && (
        <NotificationPanel
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onDismiss={handleDismiss}
        />
      )}
    </div>
  );
}

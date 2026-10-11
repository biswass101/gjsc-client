"use client";

import { useRef, useEffect, useState } from "react";
import { Bell } from "lucide-react";

const NOTIF_COLORS: Record<string, string> = {
  order: "bg-primary/10 text-primary",
  promo: "bg-rose/10 text-rose",
  system: "bg-muted text-muted-foreground",
};

interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "order" | "promo" | "system";
}

interface NotificationsDropdownProps {
  notifications: Notification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

export function NotificationsDropdown({
  notifications,
  unreadCount,
  markRead,
  markAllRead,
}: NotificationsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Notifications"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((v) => !v)}
        className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
      >
        <Bell className="h-[18px] w-[18px]" strokeWidth={1.5} />
        {unreadCount > 0 && (
          <span className="absolute right-0.5 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] text-primary-foreground">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed left-2 right-2 top-28 z-50 overflow-hidden rounded-2xl border border-border bg-popover shadow-[var(--shadow-lift)] sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[11px] text-primary hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No notifications</p>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`flex w-full gap-3 border-b border-border/50 px-4 py-3 text-left transition-colors hover:bg-secondary ${!n.read ? "bg-secondary/40" : ""}`}
                >
                  <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold uppercase ${NOTIF_COLORS[n.type]}`}>
                    {n.type[0]?.toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium">{n.title}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2">{n.body}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{n.time}</p>
                  </div>
                  {!n.read && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
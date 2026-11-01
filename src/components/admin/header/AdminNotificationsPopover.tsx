import React from "react";
import { useRouter } from "next/navigation";
import { Bell, ShoppingBag, Package, CheckCircle2 } from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function AdminNotificationsPopover() {
  const router = useRouter();
  const { notifications, unreadNotifCount, markNotificationRead, markAllNotificationsRead } =
    useAdmin();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="relative grid h-9 w-9 place-items-center rounded-full border border-border/70 hover:bg-secondary transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4 text-foreground" />
          {unreadNotifCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose px-1 text-[9px] font-bold text-white shadow-2xs">
              {unreadNotifCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 sm:w-96 p-0">
        <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-sm font-semibold">Store Notifications</span>
            {unreadNotifCount > 0 && (
              <span className="rounded-full bg-rose/15 px-1.5 py-0.2 text-[10px] font-bold text-rose">
                {unreadNotifCount} new
              </span>
            )}
          </div>
          {unreadNotifCount > 0 && (
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="text-[11px] text-primary hover:underline font-medium"
            >
              Mark all read
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-border/40">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">
              No notifications yet.
            </div>
          ) : (
            notifications.slice(0, 8).map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.link) router.push(notif.link);
                }}
                className={`flex items-start gap-3 p-3.5 text-xs cursor-pointer transition-colors hover:bg-secondary/40 ${
                  !notif.read ? "bg-primary/5" : ""
                }`}
              >
                <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                  {notif.type === "order" ? (
                    <ShoppingBag className="h-3.5 w-3.5" />
                  ) : notif.type === "stock" ? (
                    <Package className="h-3.5 w-3.5" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="flex-1 space-y-0.5">
                  <p className="font-semibold text-foreground text-xs leading-snug">
                    {notif.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{notif.message}</p>
                  <p className="text-[10px] text-muted-foreground/70 font-mono">{notif.time}</p>
                </div>
                {!notif.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

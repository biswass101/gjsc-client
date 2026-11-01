import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SidebarNavGroup } from "./types";

interface AdminSidebarNavGroupProps {
  group: SidebarNavGroup;
  collapsed: boolean;
  pathname: string;
  onNavigateMobile?: (() => void) | undefined;
}

export function AdminSidebarNavGroup({
  group,
  collapsed,
  pathname,
  onNavigateMobile,
}: AdminSidebarNavGroupProps) {
  return (
    <div className="space-y-1">
      {!collapsed && (
        <p className="px-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
          {group.group}
        </p>
      )}

      <div className="space-y-0.5">
        {group.items.map((item) => {
          const isActive =
            item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onNavigateMobile?.()}
              title={collapsed ? item.label : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-2.5 py-2 text-xs font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                collapsed && "justify-center px-0 py-2.5",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform group-hover:scale-105",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
                strokeWidth={isActive ? 2 : 1.75}
              />

              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.2 text-[10px] font-bold shrink-0",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : item.badge.variant === "amber"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300"
                            : item.badge.variant === "rose"
                              ? "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300"
                              : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300",
                      )}
                    >
                      {item.badge.text}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

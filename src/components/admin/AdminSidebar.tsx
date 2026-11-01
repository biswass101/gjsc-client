"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  AdminSidebarProps,
  AdminSidebarBrandHeader,
  AdminSidebarNavGroup,
  AdminSidebarFooter,
  useAdminSidebarNav,
} from "./sidebar";

export function AdminSidebar({ collapsed, onToggleCollapse, onNavigateMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const navGroups = useAdminSidebarNav();

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen max-h-screen border-r border-border/80 bg-card/95 backdrop-blur-md transition-all duration-300 z-30 select-none",
        collapsed ? "w-[72px]" : "w-[260px]",
      )}
    >
      <AdminSidebarBrandHeader
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse}
        onNavigateMobile={onNavigateMobile}
      />

      <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 space-y-6 custom-scrollbar">
        {navGroups.map((group) => (
          <AdminSidebarNavGroup
            key={group.group}
            group={group}
            collapsed={collapsed}
            pathname={pathname}
            onNavigateMobile={onNavigateMobile}
          />
        ))}
      </div>

      <AdminSidebarFooter collapsed={collapsed} />
    </aside>
  );
}

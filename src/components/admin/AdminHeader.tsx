"use client";

import React from "react";
import { Search } from "lucide-react";
import {
  AdminHeaderBreadcrumbs,
  AdminHeaderQuickActions,
  AdminNotificationsPopover,
  AdminProfileDropdown,
} from "./header";

interface AdminHeaderProps {
  onOpenCommandPalette: () => void;
  onOpenMobileMenu: () => void;
  onOpenQuickNewProduct: () => void;
  onOpenQuickNewOrder: () => void;
  onOpenQuickNewDiscount: () => void;
}

export function AdminHeader({
  onOpenCommandPalette,
  onOpenMobileMenu,
  onOpenQuickNewProduct,
  onOpenQuickNewOrder,
  onOpenQuickNewDiscount,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border/80 bg-background/95 backdrop-blur-md px-4 sm:px-6">
      {/* Left: Mobile hamburger & Breadcrumbs */}
      <AdminHeaderBreadcrumbs onOpenMobileMenu={onOpenMobileMenu} />

      {/* Center: Command Palette Search Bar */}
      <div className="flex-1 max-w-md mx-4">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="flex h-9 w-full items-center justify-between rounded-full border border-border/80 bg-secondary/30 px-3.5 text-xs text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-all shadow-2xs"
        >
          <span className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-primary" />
            <span className="truncate">Search orders, products, customers...</span>
          </span>
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border/70 bg-card px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right: Actions, Live Status, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Live Status indicator (Desktop) */}
        <div className="hidden xl:flex items-center gap-2 rounded-full border border-border/60 bg-secondary/20 px-3 py-1 text-[11px] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-semibold text-foreground">Live Store</span>
          <span>•</span>
          <span>Tokyo Sync Active</span>
        </div>

        <AdminHeaderQuickActions
          onOpenQuickNewProduct={onOpenQuickNewProduct}
          onOpenQuickNewOrder={onOpenQuickNewOrder}
          onOpenQuickNewDiscount={onOpenQuickNewDiscount}
        />

        <AdminNotificationsPopover />

        <AdminProfileDropdown />
      </div>
    </header>
  );
}

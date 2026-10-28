"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Search,
  Plus,
  ExternalLink,
  Menu,
  CheckCircle2,
  Clock,
  Sparkles,
  ShoppingBag,
  Package,
  Tag,
  LogOut,
  RefreshCw,
  Store,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { useShop } from "@/context/shop-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

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
  const pathname = usePathname();
  const router = useRouter();
  const { notifications, unreadNotifCount, markNotificationRead, markAllNotificationsRead, resetToDefaults } = useAdmin();
  const { logout } = useShop();

  const getBreadcrumbs = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return [{ label: "Executive Dashboard", href: "/admin" }];

    return parts.map((part, index) => {
      const href = "/" + parts.slice(0, index + 1).join("/");
      const label =
        part === "admin"
          ? "Admin"
          : part.charAt(0).toUpperCase() + part.slice(1).replace("-", " ");
      return { label, href };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  const handleSignOut = () => {
    logout();
    toast.info("Signed out of admin session.");
    router.push("/auth");
  };

  const handleFactoryReset = () => {
    if (window.confirm("Reset all store products, orders, and settings back to factory Japanese demo state?")) {
      resetToDefaults();
      toast.success("Admin store state restored to default factory dataset! 🌸");
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border/80 bg-background/95 backdrop-blur-md px-4 sm:px-6">
      {/* Left: Mobile hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden grid h-9 w-9 place-items-center rounded-xl border border-border text-foreground hover:bg-secondary"
          aria-label="Open Admin Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/admin" className="hover:text-foreground font-medium">
            Admin
          </Link>
          {breadcrumbs.slice(1).map((crumb) => (
            <React.Fragment key={crumb.href}>
              <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
              <span className="text-foreground font-semibold">
                {crumb.label}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

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

        {/* Quick Action Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="rounded-full text-xs h-8 px-3 gap-1.5 shadow-2xs font-semibold"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Create</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-xs font-semibold">
              Quick Store Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onOpenQuickNewProduct} className="cursor-pointer gap-2 text-xs">
              <Package className="h-4 w-4 text-primary" />
              <span>Add New Product</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenQuickNewOrder} className="cursor-pointer gap-2 text-xs">
              <ShoppingBag className="h-4 w-4 text-primary" />
              <span>Create Manual Order</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenQuickNewDiscount} className="cursor-pointer gap-2 text-xs">
              <Tag className="h-4 w-4 text-primary" />
              <span>Create Promo Coupon</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/admin/merchandising")} className="cursor-pointer gap-2 text-xs">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Manage Announcements</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications Popover */}
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
                      <p className="text-[11px] text-muted-foreground line-clamp-2">
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 font-mono">
                        {notif.time}
                      </p>
                    </div>
                    {!notif.read && (
                      <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                    )}
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Admin Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-border/80 bg-secondary/30 p-1 pr-2 hover:bg-secondary transition-colors"
            >
              <div className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
                A
              </div>
              <span className="hidden md:inline text-xs font-semibold text-foreground">
                Admin
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2.5 border-b border-border/60">
              <p className="text-xs font-semibold text-foreground">Super Administrator</p>
              <p className="text-[11px] text-muted-foreground">admin@gloriousjapan.com</p>
              <span className="inline-block mt-1 rounded-full bg-emerald-500/15 px-2 py-0.2 text-[9px] font-bold text-emerald-700 dark:text-emerald-300">
                Full Access • All Modules
              </span>
            </div>
            <DropdownMenuItem asChild className="cursor-pointer gap-2 text-xs">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Store className="h-3.5 w-3.5 text-primary" />
                <span>View Customer Storefront</span>
                <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/admin/settings")} className="cursor-pointer gap-2 text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Store Configuration</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleFactoryReset} className="cursor-pointer gap-2 text-xs text-amber-600 focus:text-amber-600">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset Demo Store State</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer gap-2 text-xs text-rose focus:text-rose">
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}


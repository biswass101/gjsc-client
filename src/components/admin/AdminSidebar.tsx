"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Tag,
  Megaphone,
  FolderTree,
  Sparkles,
  Award,
  Plane,
  Image as ImageIcon,
  FileText,
  Star,
  HelpCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Store,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavigateMobile?: () => void;
}

export function AdminSidebar({
  collapsed,
  onToggleCollapse,
  onNavigateMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { orders, products, discounts, preOrders, reviews } = useAdmin();

  const pendingOrdersCount = orders.filter(
    (o) => o.fulfillmentStatus === "Pending" || o.fulfillmentStatus === "Processing"
  ).length;

  const lowStockCount = products.filter(
    (p) => p.stock <= p.lowStockThreshold
  ).length;

  const activeDiscountsCount = discounts.filter(
    (d) => d.status === "active"
  ).length;

  const activePreOrdersCount = preOrders.filter(
    (p) => p.active
  ).length;

  const pendingReviewsCount = reviews.filter(
    (r) => r.status === "pending"
  ).length;

  const navGroups = [
    {
      group: "Intelligence",
      items: [
        {
          label: "Executive Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
          badge: null,
        },
      ],
    },
    {
      group: "Catalog & Fulfillment",
      items: [
        {
          label: "Orders & Shipments",
          href: "/admin/orders",
          icon: ShoppingBag,
          badge: pendingOrdersCount > 0 ? { text: `${pendingOrdersCount}`, variant: "amber" } : null,
        },
        {
          label: "Products & SKUs",
          href: "/admin/products",
          icon: Package,
          badge: lowStockCount > 0 ? { text: `${lowStockCount} low`, variant: "rose" } : null,
        },
        {
          label: "Pre-Orders & Cargo",
          href: "/admin/pre-orders",
          icon: Plane,
          badge: activePreOrdersCount > 0 ? { text: `${activePreOrdersCount}`, variant: "emerald" } : null,
        },
        {
          label: "Categories & Subcats",
          href: "/admin/categories",
          icon: FolderTree,
          badge: null,
        },
        {
          label: "Curated Collections",
          href: "/admin/collections",
          icon: Sparkles,
          badge: null,
        },
        {
          label: "Japanese Brand House",
          href: "/admin/brands",
          icon: Award,
          badge: null,
        },
        {
          label: "Customers & CRM",
          href: "/admin/customers",
          icon: Users,
          badge: null,
        },
      ],
    },
    {
      group: "Marketing & Atomic Content",
      items: [
        {
          label: "Page Banners & Hero",
          href: "/admin/banners",
          icon: ImageIcon,
          badge: null,
        },
        {
          label: "Page Content & SEO",
          href: "/admin/pages",
          icon: FileText,
          badge: null,
        },
        {
          label: "Store Merchandising",
          href: "/admin/merchandising",
          icon: Megaphone,
          badge: null,
        },
        {
          label: "Discounts & Vouchers",
          href: "/admin/discounts",
          icon: Tag,
          badge: activeDiscountsCount > 0 ? { text: `${activeDiscountsCount}`, variant: "emerald" } : null,
        },
        {
          label: "Reviews Moderation",
          href: "/admin/reviews",
          icon: Star,
          badge: pendingReviewsCount > 0 ? { text: `${pendingReviewsCount}`, variant: "amber" } : null,
        },
        {
          label: "FAQ Knowledge Base",
          href: "/admin/faqs",
          icon: HelpCircle,
          badge: null,
        },
      ],
    },
    {
      group: "System & Operations",
      items: [
        {
          label: "Store & Courier Logistics",
          href: "/admin/settings",
          icon: Settings,
          badge: null,
        },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-border/80 bg-card/95 backdrop-blur-md transition-all duration-300 z-30 select-none",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-border/70 px-4">
        {!collapsed ? (
          <Link
            href="/admin"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            onClick={() => onNavigateMobile?.()}
          >
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary/90 to-primary text-primary-foreground font-display text-lg font-bold shadow-xs">
              🌸
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-sm font-semibold tracking-tight text-foreground">
                  Glorious Japan
                </span>
                <span className="rounded-sm bg-primary/10 px-1 py-0.2 text-[9px] font-bold text-primary">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground truncate">
                Admin Console • v2.6
              </p>
            </div>
          </Link>
        ) : (
          <Link
            href="/admin"
            className="mx-auto grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary/90 to-primary text-primary-foreground shadow-xs"
            title="Glorious Japan Admin"
            onClick={() => onNavigateMobile?.()}
          >
            🌸
          </Link>
        )}

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden lg:grid h-7 w-7 place-items-center rounded-lg border border-border/60 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation Links Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.group} className="space-y-1">
            {!collapsed && (
              <p className="px-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                {group.group}
              </p>
            )}

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
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
                      collapsed && "justify-center px-0 py-2.5"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform group-hover:scale-105",
                        isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
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
                                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
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
        ))}
      </div>

      {/* Footer Store Switcher & Admin Info */}
      <div className="border-t border-border/70 p-3 space-y-2 bg-secondary/10">
        {!collapsed ? (
          <>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-border/80 bg-background/80 px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Store className="h-3.5 w-3.5 text-primary" />
                <span>View Storefront</span>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="flex items-center gap-2.5 px-2 py-1.5">
              <div className="relative">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                  SA
                </div>
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-card" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-foreground truncate">
                  Super Admin
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  Tokyo Hub • Online
                </p>
              </div>
            </div>
          </>
        ) : (
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title="View Storefront"
            className="grid h-9 w-9 mx-auto place-items-center rounded-xl border border-border hover:bg-secondary text-primary transition-colors"
          >
            <Store className="h-4 w-4" />
          </a>
        )}
      </div>
    </aside>
  );
}

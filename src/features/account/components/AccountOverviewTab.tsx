"use client";

import { ArrowRight, Droplets, Heart, Package, Sparkles, Truck } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/catalog";
import type { BuyerOrder } from "../types";

export interface AccountOverviewTabProps {
  orders: BuyerOrder[];
  wishlistCount: number;
  skinType: string;
  onNavigateTab: (tab: string) => void;
  onViewReceipt: (order: BuyerOrder) => void;
}

export function AccountOverviewTab({
  orders,
  wishlistCount,
  skinType,
  onNavigateTab,
  onViewReceipt,
}: AccountOverviewTabProps) {
  const recentOrder = orders[0];

  return (
    <div className="space-y-6">
      {/* VIP Tier Status Card */}
      <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-cream via-card to-cream p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Glorious Sakura VIP Club
            </span>
            <h3 className="mt-1 font-display text-xl sm:text-2xl font-medium text-foreground">
              You are ৳1,260 away from Pearl Elite Tier
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Unlock free lifetime nationwide express delivery & seasonal full-sized J-Beauty gifts.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="rounded-full text-xs shrink-0 cursor-pointer"
          >
            <Link to="/offers">View VIP Club Perks</Link>
          </Button>
        </div>

        {/* Tier Progress Bar */}
        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between text-[11px] font-medium">
            <span className="text-primary font-bold">Sakura Member (৳15,500 spent)</span>
            <span className="text-muted-foreground">Pearl Elite (৳20,000 threshold)</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-700 w-[77%]" />
          </div>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div
          onClick={() => onNavigateTab("orders")}
          className="rounded-xl border border-border/80 bg-card p-4 hover:border-primary/50 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <Package className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="mt-3 text-2xl font-bold font-display text-foreground">{orders.length}</p>
          <p className="text-xs text-muted-foreground font-medium">Total Orders Placed</p>
        </div>

        <div
          onClick={() => onNavigateTab("wishlist")}
          className="rounded-xl border border-border/80 bg-card p-4 hover:border-primary/50 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <Heart className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="mt-3 text-2xl font-bold font-display text-foreground">{wishlistCount}</p>
          <p className="text-xs text-muted-foreground font-medium">Saved to Wishlist</p>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs">
          <Sparkles className="h-4 w-4 text-primary" />
          <p className="mt-3 text-2xl font-bold font-display text-foreground">500</p>
          <p className="text-xs text-muted-foreground font-medium">Ritual Points (৳200)</p>
        </div>

        <div
          onClick={() => onNavigateTab("skincare")}
          className="rounded-xl border border-border/80 bg-card p-4 hover:border-primary/50 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <Droplets className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="mt-3 text-lg font-bold font-display text-foreground truncate">{skinType}</p>
          <p className="text-xs text-muted-foreground font-medium">Skin Profile Type</p>
        </div>
      </div>

      {/* Recent Order Snapshot */}
      {recentOrder && (
        <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Most Recent Order
              </span>
              <h4 className="font-display text-lg font-medium text-foreground">
                #{recentOrder.id}
              </h4>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                recentOrder.status === "Delivered"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {recentOrder.status}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              {recentOrder.items.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="h-12 w-11 rounded-md border border-border overflow-hidden bg-cream shrink-0"
                >
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
              ))}
              <div>
                <p className="font-semibold text-foreground">
                  {recentOrder.items[0]?.name}
                  {recentOrder.items.length > 1 && ` + ${recentOrder.items.length - 1} more items`}
                </p>
                <p className="text-muted-foreground">
                  Placed on {recentOrder.date} • {formatBDT(recentOrder.total)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewReceipt(recentOrder)}
                className="rounded-full text-xs cursor-pointer"
              >
                View Details
              </Button>
              <Button size="sm" asChild className="rounded-full text-xs cursor-pointer">
                <Link to="/track">
                  <Truck className="h-3.5 w-3.5 mr-1" />
                  Live Tracking
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

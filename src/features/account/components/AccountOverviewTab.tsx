"use client";

import {
  ArrowRight,
  Award,
  CheckCircle2,
  Circle,
  Crown,
  Droplets,
  Heart,
  Lock,
  Package,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { CustomerDashboardResponse } from "@/lib/api";
import type { BuyerOrder } from "../types";

export interface AccountOverviewTabProps {
  orders: BuyerOrder[];
  wishlistCount: number;
  skinType: string;
  dashboard: CustomerDashboardResponse | null;
  isLoading?: boolean | undefined;
  onNavigateTab: (tab: string) => void;
  onViewReceipt: (order: BuyerOrder) => void;
}

export function AccountOverviewTab({
  orders,
  wishlistCount,
  skinType,
  dashboard,
  isLoading,
  onNavigateTab,
  onViewReceipt,
}: AccountOverviewTabProps) {
  const recentOrder = orders[0];
  const loyalty = dashboard?.loyalty;
  const points = dashboard?.points;

  const currentTier = loyalty?.currentTier;
  const nextTier = loyalty?.nextTier ?? null;
  const qualifyingSpend = loyalty?.qualifyingSpend ?? 0;
  const amountToNextTier = loyalty?.amountToNextTier ?? 5000;
  const progressPercent = loyalty?.progressPercent ?? 0;
  const tiers = loyalty?.tiers ?? [];

  const availablePoints = points?.availablePoints ?? 0;
  const bdtValue = points?.bdtValue ?? 0;
  const criteria = points?.criteria ?? [];
  const onboardingEarned = points?.onboardingEarned ?? 0;
  const onboardingPossible = points?.onboardingPossible ?? 500;

  return (
    <div className="space-y-6">
      {/* Glorious Sakura VIP Club Multi-Tier Progress Card */}
      <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-cream via-card to-cream p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Crown className="h-3.5 w-3.5" />
                Glorious Sakura VIP Club
              </span>
              {currentTier && (
                <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                  Level {currentTier.level} • {currentTier.name} ({currentTier.multiplier}x Points)
                </span>
              )}
            </div>

            <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-medium text-foreground">
              {isLoading && !loyalty
                ? "Calculating your VIP tier progress..."
                : nextTier
                ? `You are ${formatBDT(amountToNextTier)} away from ${nextTier.name} Tier`
                : `${currentTier?.name || "Tokyo Imperial"} Status Unlocked — Highest VIP Tier`}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {nextTier ? nextTier.tagline : currentTier?.tagline}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="rounded-full text-xs shrink-0 cursor-pointer"
          >
            <Link to="/shop">Shop to Unlock Perks</Link>
          </Button>
        </div>

        {/* Dynamic Tier Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap justify-between gap-2 text-[11px] font-medium">
            <span className="text-primary font-bold">
              {currentTier?.name || "Sakura Petal"} ({formatBDT(qualifyingSpend)} qualifying spend)
            </span>
            <span className="text-muted-foreground">
              {nextTier
                ? `${nextTier.name} (${formatBDT(nextTier.minSpend)} threshold) • ${progressPercent}%`
                : "Max Tier Achieved • 100%"}
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${Math.max(2, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Multi-Tier Level Stepper Grid */}
        {tiers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            {tiers.map((tier) => (
              <div
                key={tier.slug}
                className={cn(
                  "rounded-lg border p-3 text-xs transition-all",
                  tier.isCurrent
                    ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                    : tier.unlocked
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-border/70 bg-background/60 opacity-85",
                )}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    {tier.unlocked ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <Lock className="h-3 w-3 text-muted-foreground shrink-0" />
                    )}
                    {tier.name}
                  </span>
                  <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-foreground">
                    {tier.multiplier}x
                  </span>
                </div>
                <p className="mt-1 text-[11px] font-medium text-muted-foreground">
                  {tier.minSpend === 0 ? "Starter (৳0+)" : `${formatBDT(tier.minSpend)}+ spend`}
                </p>
                <p className="mt-1 text-[10.5px] text-muted-foreground line-clamp-2">
                  {tier.perks[0]}
                </p>
              </div>
            ))}
          </div>
        )}
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
          <div className="flex items-center justify-between">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              Worth {formatBDT(bdtValue)}
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold font-display text-foreground">
            {availablePoints.toLocaleString("en-US")}
          </p>
          <p className="text-xs text-muted-foreground font-medium">Available Ritual Points</p>
        </div>

        <div
          onClick={() => onNavigateTab("skincare")}
          className="rounded-xl border border-border/80 bg-card p-4 hover:border-primary/50 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <Droplets className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="mt-3 text-lg font-bold font-display text-foreground truncate">
            {skinType || "Not Set Yet"}
          </p>
          <p className="text-xs text-muted-foreground font-medium">Skin Profile Type</p>
        </div>
      </div>

      {/* Available Ritual Points & Earning Criteria Breakdown */}
      <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" />
              Ritual Points Criteria & Rewards
            </span>
            <h4 className="mt-1 font-display text-lg sm:text-xl font-medium text-foreground">
              {availablePoints.toLocaleString("en-US")} Pts Available (Value: {formatBDT(bdtValue)})
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Complete profile milestones ({onboardingEarned}/{onboardingPossible} Welcome Pts) or
              shop authentic J-Beauty to earn points (10 Pts = ৳4).
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {criteria.map((item) => (
            <div
              key={item.id}
              className={cn(
                "rounded-xl border p-3.5 text-xs flex flex-col justify-between gap-2 transition-colors",
                item.achieved
                  ? "border-emerald-500/35 bg-emerald-500/5"
                  : "border-border/80 bg-secondary/20",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  {item.achieved ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>

                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold whitespace-nowrap",
                    item.achieved
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : "bg-primary/10 text-primary",
                  )}
                >
                  {item.pointsEarned > 0 ? `+${item.pointsEarned} Pts` : item.pointsLabel}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px]">
                <span className="text-muted-foreground font-medium">{item.progressLabel}</span>

                {item.actionTab ? (
                  <button
                    type="button"
                    onClick={() => onNavigateTab(item.actionTab!)}
                    className="font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Complete now →
                  </button>
                ) : item.actionHref ? (
                  <Link
                    to={item.actionHref}
                    className="font-semibold text-primary hover:underline"
                  >
                    {item.id === "order_spend_rewards" ? "Shop to earn →" : "Explore →"}
                  </Link>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Credited ✓
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Order Snapshot */}
      {recentOrder ? (
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
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                recentOrder.status === "Delivered"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : recentOrder.status === "Cancelled"
                  ? "bg-rose/10 text-rose"
                  : "bg-primary/10 text-primary",
              )}
            >
              {recentOrder.status}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              {recentOrder.items.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="h-12 w-11 rounded-md border border-border overflow-hidden bg-cream shrink-0 grid place-items-center"
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <Package className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
              <div>
                <p className="font-semibold text-foreground">
                  {recentOrder.items[0]?.name || "Skincare Order"}
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
                <Link to={`/track?orderId=${encodeURIComponent(recentOrder.id)}`}>
                  <Truck className="h-3.5 w-3.5 mr-1" />
                  Live Tracking
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border/80 bg-card/50 p-8 text-center space-y-3">
          <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground/60" />
          <div className="space-y-1">
            <h4 className="font-display text-lg font-medium text-foreground">
              No Orders Placed Yet
            </h4>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Start building your authentic Japanese skincare routine to earn Order Spend Rewards
              and advance toward Pearl Elite VIP Tier.
            </p>
          </div>
          <Button asChild size="sm" className="rounded-full text-xs px-5 cursor-pointer">
            <Link to="/shop">Explore J-Beauty Shop</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

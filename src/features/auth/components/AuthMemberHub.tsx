"use client";

import { useEffect, useState } from "react";
import { LogOut, MapPin, Package, Sparkles, Star } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User } from "@/types";
import { customerApi, tokenStorage, type CustomerDashboardResponse } from "@/lib/api";
import { formatBDT } from "@/lib/catalog";
import { GoogleIcon } from "./GoogleIcon";
import { FacebookIcon } from "./FacebookIcon";

export interface AuthMemberHubProps {
  user: User;
  wishlistCount: number;
  onLogout: () => void;
}

export function AuthMemberHub({ user, wishlistCount, onLogout }: AuthMemberHubProps) {
  const [dashboard, setDashboard] = useState<CustomerDashboardResponse | null>(null);

  useEffect(() => {
    if (!tokenStorage.get()) return;
    let cancelled = false;
    customerApi
      .getDashboard()
      .then((res) => {
        if (!cancelled) setDashboard(res);
      })
      .catch(() => {
        /* fallback gracefully */
      });
    return () => {
      cancelled = true;
    };
  }, [user.email]);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const availablePoints = dashboard?.points.availablePoints;
  const bdtValue = dashboard?.points.bdtValue ?? 0;
  const activeOrders = dashboard?.stats.activeOrders;
  const tierLabel = dashboard?.loyalty.currentTier.badgeLabel || "Sakura Petal Member";
  const resolvedWishlistCount = dashboard?.stats.wishlistCount ?? wishlistCount;

  const linkedProviders =
    user.linkedProviders && user.linkedProviders.length > 0
      ? user.linkedProviders
      : user.authProvider
      ? [user.authProvider]
      : [];

  return (
    <div className="container-lux py-12 sm:py-20">
      <div className="mx-auto max-w-2xl rounded-xl border border-border/80 bg-card p-6 sm:p-10 shadow-sm text-center">
        {/* User Avatar */}
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="mx-auto h-20 w-20 rounded-full object-cover border-2 border-primary/30 shadow-xs"
          />
        ) : (
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-primary/30 bg-primary/10 text-primary font-display text-2xl font-bold shadow-xs">
            {initials || "GJ"}
          </div>
        )}

        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
          <span className="eyebrow text-primary">Member Portal</span>
          <span className="text-muted-foreground/40">•</span>
          {linkedProviders.includes("google") && (
            <>
              <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <GoogleIcon className="h-2.5 w-2.5" /> Google
              </span>
              <span className="text-muted-foreground/40">•</span>
            </>
          )}
          {linkedProviders.includes("facebook") && (
            <>
              <span className="rounded-full bg-[#1877F2]/10 border border-[#1877F2]/25 px-2 py-0.5 text-[10px] font-semibold text-[#1877F2] flex items-center gap-1">
                <FacebookIcon className="h-2.5 w-2.5" /> Facebook
              </span>
              <span className="text-muted-foreground/40">•</span>
            </>
          )}
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              user.role === "admin"
                ? "bg-purple-500/15 text-purple-700 dark:text-purple-300"
                : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
            )}
          >
            {user.role === "admin" ? "🛡️ Verified Admin" : `🌸 ${tierLabel}`}
          </span>
        </div>

        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
          Welcome Back, {user.name}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          {user.isPlaceholderEmail
            ? "Facebook login connected (verify email in Settings to unify across email providers)"
            : user.email}
        </p>
        {user.address && (
          <p className="mt-1.5 inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>{user.address}</span>
          </p>
        )}

        {/* Quick Balance / Stats Grid (Real Backend Data) */}
        <div className="mt-8 grid grid-cols-3 gap-3 text-left">
          <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-primary" />
              Ritual Points
            </span>
            <p className="mt-1 text-lg font-bold text-foreground">
              {availablePoints !== undefined ? `${availablePoints.toLocaleString("en-US")} Pts` : "—"}
            </p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              {availablePoints !== undefined ? `Worth ${formatBDT(bdtValue)}` : "Loading..."}
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Package className="h-3 w-3 text-primary" />
              Active Orders
            </span>
            <p className="mt-1 text-lg font-bold text-foreground">
              {activeOrders !== undefined ? `${activeOrders} Active` : "—"}
            </p>
            <Link to="/account" className="text-[10px] text-primary hover:underline font-medium">
              View orders →
            </Link>
          </div>

          <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Star className="h-3 w-3 text-primary" />
              Saved Wishlist
            </span>
            <p className="mt-1 text-lg font-bold text-foreground">{resolvedWishlistCount} Items</p>
            <Link to="/wishlist" className="text-[10px] text-primary hover:underline font-medium">
              View saved →
            </Link>
          </div>
        </div>

        {/* Quick Action Navigation Links */}
        <div className="mt-8 space-y-2.5">
          {user.role === "admin" && (
            <Button
              asChild
              className="w-full rounded-full py-6 text-xs uppercase tracking-[0.2em] font-bold shadow-sm"
            >
              <Link to="/admin">Go to Administrator Dashboard</Link>
            </Button>
          )}

          <Button
            asChild
            variant="outline"
            className="w-full rounded-full py-6 text-xs uppercase tracking-[0.2em] font-semibold"
          >
            <Link to="/account">View Account & Order History</Link>
          </Button>

          <Button
            asChild
            variant="secondary"
            className="w-full rounded-full py-5 text-xs uppercase tracking-[0.2em] font-semibold"
          >
            <Link to="/shop">Browse Japanese Skincare Catalog</Link>
          </Button>

          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full rounded-full text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-rose hover:bg-rose/5 gap-2 mt-2"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out of Account
          </Button>
        </div>
      </div>
    </div>
  );
}

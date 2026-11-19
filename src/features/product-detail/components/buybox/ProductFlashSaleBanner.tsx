"use client";

import { useEffect, useState } from "react";
import { Flame, Clock, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "@/lib/navigation";
import { formatBDT } from "@/lib/catalog";
import type { FlashSaleItem } from "@/types";

export interface ProductFlashSaleBannerProps {
  deal: FlashSaleItem;
  campaignTitle?: string | undefined;
  endsAt?: string | null | undefined;
}

export function ProductFlashSaleBanner({
  deal,
  campaignTitle,
  endsAt,
}: ProductFlashSaleBannerProps) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const endsDate = endsAt ? new Date(endsAt) : null;

    const calcTime = () => {
      if (endsDate && !isNaN(endsDate.getTime())) {
        const diff = Math.max(0, endsDate.getTime() - Date.now());
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft((prev) => {
          if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
          if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
          if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
          return { hours: 14, minutes: 35, seconds: 12 };
        });
      }
    };

    calcTime();
    const interval = setInterval(calcTime, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const claimedPercent = Math.min(
    100,
    Math.max(
      0,
      deal.claimedPercent ??
        (deal.allocatedStock > 0
          ? Math.round((deal.claimedCount / deal.allocatedStock) * 100)
          : 50),
    ),
  );

  return (
    <div className="mt-4 rounded-xl border-2 border-red-500/40 bg-gradient-to-br from-red-500/[0.08] via-rose-500/[0.04] to-background p-4 sm:p-5 shadow-sm transition-all">
      {/* Top Header: Reddish Badge + Campaign Title + All Drops Link */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-500/15 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm animate-pulse">
            <Flame className="h-3.5 w-3.5 fill-white" />
            Flash Sale
          </span>
          <span className="text-xs sm:text-sm font-semibold text-foreground">
            {campaignTitle || "Tokyo Flash Festival"}
          </span>
        </div>

        <Link
          to="/flash-sale"
          className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-red-600 hover:text-red-700 hover:underline transition-colors shrink-0"
        >
          <span>All Flash Drops</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Prominent Live Countdown Timer Block */}
      <div className="mt-4 rounded-lg border border-red-500/25 bg-background/80 backdrop-blur-sm p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
            <Clock className="h-4 w-4 animate-spin text-red-600 dark:text-red-400" style={{ animationDuration: "8s" }} />
            <span>Flash Deal Ends In:</span>
          </span>
          <span className="rounded-full bg-red-600/10 border border-red-600/20 px-2 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400">
            Live Timer
          </span>
        </div>

        {/* Big Digit Blocks */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md border border-border/80 bg-secondary/30 p-2 sm:p-2.5">
            <div className="font-mono text-xl sm:text-2xl font-black text-foreground">
              {pad(timeLeft.hours)}
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
              Hours
            </div>
          </div>

          <div className="rounded-md border border-border/80 bg-secondary/30 p-2 sm:p-2.5">
            <div className="font-mono text-xl sm:text-2xl font-black text-foreground">
              {pad(timeLeft.minutes)}
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
              Minutes
            </div>
          </div>

          <div className="rounded-md border border-red-500/30 bg-red-500/10 p-2 sm:p-2.5">
            <div className="font-mono text-xl sm:text-2xl font-black text-red-600 dark:text-red-400">
              {pad(timeLeft.seconds)}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mt-0.5">
              Seconds
            </div>
          </div>
        </div>
      </div>

      {/* Claimed Stock Quota Progress Bar */}
      <div className="mt-3.5 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] sm:text-xs">
          <span className="inline-flex items-center gap-1 font-medium text-foreground">
            <TrendingUp className="h-3.5 w-3.5 text-amber-500" />
            <span>
              <strong>{deal.claimedCount}</strong> of {deal.allocatedStock} Claimed ({claimedPercent}%)
            </span>
          </span>

          <span className="font-bold text-red-600 dark:text-red-400">
            🔥 Only {deal.stockLeft} units left at flash price!
          </span>
        </div>

        {/* Progress track */}
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary/80 border border-border/40">
          <div
            role="progressbar"
            aria-valuenow={claimedPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${claimedPercent}%` }}
          >
            <div className="absolute inset-0 bg-white/25 animate-[pulse_2s_infinite]" />
          </div>
        </div>

        <p className="text-[10px] sm:text-[11px] text-muted-foreground flex items-center gap-1.5 pt-0.5">
          <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
          <span>
            Tokyo Flash discount locked. Price reverts to regular <strong>{formatBDT(deal.compareAt)}</strong> when quota is filled.
          </span>
        </p>
      </div>
    </div>
  );
}

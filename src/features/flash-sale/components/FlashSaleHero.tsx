"use client";

import React from "react";
import { Flame, Zap, ShieldCheck, Plane, Clock } from "lucide-react";

interface FlashSaleHeroProps {
  title: string;
  description: string;
  bannerUrl?: string | null | undefined;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  itemCount: number;
}

export function FlashSaleHero({
  title,
  description,
  bannerUrl,
  timeLeft,
  itemCount,
}: FlashSaleHeroProps) {
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-zinc-900 to-stone-950 text-white border-b border-rose-500/20">
      {/* Background Banner Image or Ambient Gradient */}
      {bannerUrl ? (
        <div className="absolute inset-0 z-0">
          <img
            src={bannerUrl}
            alt={title}
            className="h-full w-full object-cover object-center opacity-30 blur-xs scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]" />
      )}

      <div className="container-lux relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left: Campaign Headline & Description */}
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400 backdrop-blur-md">
              <Flame className="h-4 w-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span className="tracking-widest uppercase text-[11px]">Limited Tokyo Beauty Drop</span>
              <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] text-white">
                {itemCount} Deals Active
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
              {description}
            </p>

            {/* Authenticity badges strip */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Plane className="h-3.5 w-3.5 text-rose-400" />
                <span>Tokyo Air-Freight</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>100% Japan Domestic Authentic</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span>Auto-Discount at Checkout</span>
              </span>
            </div>
          </div>

          {/* Right: Live Glassmorphism Countdown Timer */}
          <div className="self-start lg:self-center">
            <div className="rounded-2xl border border-rose-500/30 bg-black/40 backdrop-blur-xl p-5 sm:p-6 shadow-2xl space-y-3 min-w-[280px] sm:min-w-[320px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400">
                  <Clock className="h-4 w-4 animate-spin text-rose-400" style={{ animationDuration: "8s" }} />
                  <span>Flash Sale Closes In:</span>
                </span>
                <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                  Live Countdown
                </span>
              </div>

              {/* Digits Display */}
              <div className="grid grid-cols-3 gap-2.5 text-center pt-1">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                    {pad(timeLeft.hours)}
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 mt-1">
                    Hours
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                    {pad(timeLeft.minutes)}
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400 mt-1">
                    Minutes
                  </div>
                </div>

                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 backdrop-blur-md">
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-rose-400">
                    {pad(timeLeft.seconds)}
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-rose-300 mt-1">
                    Seconds
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-center text-zinc-400 pt-1">
                ⚡ Prices revert immediately when the timer hits zero or deal stock is claimed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


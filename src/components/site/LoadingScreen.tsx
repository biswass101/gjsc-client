"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

const LOADING_TIPS = [
  "Curating authentic Tokyo rituals...",
  "Slow-fermenting botanical essences...",
  "Balancing low-pH rice ferments...",
  "Preparing your daily skincare stillness...",
];

export function LoadingScreen({
  message,
  fullScreen = false,
}: LoadingScreenProps) {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md p-4 select-none"
          : "flex min-h-[65vh] w-full flex-col items-center justify-center p-6 select-none"
      }
      role="status"
      aria-live="polite"
    >
      {/* Background Japanese gold ambient aura */}
      <div className="relative flex flex-col items-center">
        <div className="absolute h-44 w-44 rounded-full bg-primary/15 blur-3xl animate-pulse pointer-events-none" />

        {/* Animated Double Ring with Center Logo */}
        <div className="relative flex items-center justify-center">
          {/* Outer rotating decorative ring */}
          <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border border-primary/25 border-t-primary border-r-primary/50 animate-spin" />

          {/* Inner counter-rotating ring */}
          <div className="absolute h-18 w-18 sm:h-20 sm:w-20 rounded-full border border-dashed border-primary/40 animate-[spin_4s_linear_infinite_reverse]" />

          {/* Center Brand Emblem with breathing scale */}
          <div className="absolute grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-background border border-primary/40 shadow-lg p-0.5 overflow-hidden animate-pulse">
            <img
              src="/glorious-japan-skin-care-logo.jpeg"
              alt="Glorious Japan Skin Care"
              width={64}
              height={64}
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          {/* Floating Sparkle */}
          <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-primary animate-bounce opacity-80" />
        </div>

        {/* Brand Name & Japanese Script */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-wide text-foreground">
              Glorious Japan
            </h3>
            <span className="rounded-full bg-primary/15 border border-primary/30 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-primary">
              Beta
            </span>
          </div>
          <p className="mt-0.5 text-[10px] font-mono tracking-[0.3em] text-primary/80 uppercase">
            栄光日本 · 美の儀式
          </p>
        </div>

        {/* Dynamic Micro-Message */}
        <p className="mt-3 text-xs sm:text-sm text-muted-foreground font-medium transition-all duration-500 min-h-[1.5rem] text-center">
          {message ?? LOADING_TIPS[tipIndex]}
        </p>

        {/* Sleek Golden Loading Bar */}
        <div className="mt-4 h-1 w-36 sm:w-48 overflow-hidden rounded-full bg-muted/60 border border-border/40">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-primary/30 via-primary to-primary/30 animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>

        {/* Under Development Notice */}
        <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-muted/40 border border-border/50 px-2.5 py-1 text-[9px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
          <span>Under Active Development · Version 0.9 Beta</span>
        </div>
      </div>
    </div>
  );
}

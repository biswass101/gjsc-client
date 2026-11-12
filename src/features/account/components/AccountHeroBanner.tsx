"use client";

import { Sparkles } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";

export interface AccountHeroBannerProps {
  user: User | null;
  name: string;
  avatar?: string | undefined;
  tierLabel?: string | undefined;
  availablePoints?: number | undefined;
}

export function AccountHeroBanner({
  user,
  name,
  avatar,
  tierLabel,
  availablePoints,
}: AccountHeroBannerProps) {
  const initials =
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "GJ";

  return (
    <div className="border-b border-border/50 bg-gradient-to-b from-cream to-background">
      <div className="container-lux py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 rounded-full object-cover border-2 border-primary/40 shadow-xs"
                />
              ) : (
                <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-primary/30 bg-primary/10 text-primary font-display text-2xl font-bold shadow-xs">
                  {initials}
                </div>
              )}
              {(user?.linkedProviders?.includes("google") || user?.authProvider === "google") && (
                <div
                  title="Google Verified Account"
                  className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-background border border-border shadow-xs"
                >
                  <svg className="h-3 w-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
              )}
              {!user?.linkedProviders?.includes("google") &&
                user?.authProvider !== "google" &&
                (user?.linkedProviders?.includes("facebook") ||
                  user?.authProvider === "facebook") && (
                <div
                  title="Facebook Verified Account"
                  className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-background border border-border shadow-xs"
                >
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="eyebrow text-primary">Member Account</span>
                <span className="text-muted-foreground/40">•</span>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  🌸 {tierLabel || "Sakura Petal Member"}
                </span>
              </div>
              <h1 className="mt-1 font-display text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                Konnichiwa, {name}
              </h1>
              <p className="text-xs text-muted-foreground">
                Manage your Japanese beauty orders, saved addresses, and routine diagnostics.
              </p>
            </div>
          </div>

          {/* Quick Points & Shop Action */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-2.5 text-xs">
              <span className="text-[10.5px] text-muted-foreground block">Available Points</span>
              <span className="font-display text-lg font-bold text-primary flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                {(availablePoints ?? 0).toLocaleString("en-US")} Pts
              </span>
            </div>

            <Button asChild className="rounded-full text-xs font-semibold px-5">
              <Link to="/shop">Shop New Tokyo Arrivals</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

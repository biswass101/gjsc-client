"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles, Star, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { REVIEWS } from "./reviews/reviewsData";
import { ReviewCard } from "./reviews/ReviewCard";

export function EnhancedReviews() {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<Record<string, boolean>>({});

  const handleHelpful = (id: string, initialCount: number) => {
    if (voted[id]) return;
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
    setVoted((prev) => ({ ...prev, [id]: true }));
  };

  const filteredReviews =
    selectedTag === "all" ? REVIEWS : REVIEWS.filter((r) => r.tag === selectedTag);

  return (
    <section className="bg-cream/40 py-8 sm:py-12 lg:py-16 border-t border-border/40">
      <div className="container-lux space-y-6 sm:space-y-8">
        {/* Header & Trust Metrics Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-1.5 text-primary text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>COMMUNITY STORIES</span>
            </div>
            <h2 className="mt-1 font-display text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Loved in Bangladesh
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
              Real results from verified customers using authentic Japanese skincare across
              Bangladesh.
            </p>
          </div>

          {/* Rating Summary Box */}
          <div className="flex items-center gap-3.5 bg-card border border-border rounded-md sm:rounded-lg p-3 sm:p-4 shadow-xs self-stretch sm:self-start lg:self-auto">
            <div className="text-center pr-3.5 border-r border-border shrink-0">
              <span className="font-display text-2xl sm:text-4xl font-bold text-foreground block leading-none">
                4.9
              </span>
              <div className="flex items-center justify-center gap-0.5 mt-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-0.5 text-[10px] sm:text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">1,850+ Verified 5-Star Reviews</p>
              <div className="flex items-center gap-2.5 text-[10px]">
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <CheckCircle2 className="h-3 w-3" /> 100% Genuine
                </span>
                <span className="flex items-center gap-1 text-primary font-medium">
                  <Truck className="h-3 w-3" /> 64 Districts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          <span className="text-xs font-medium text-muted-foreground mr-1 shrink-0">Filter:</span>
          {[
            { id: "all", label: "All Reviews (1,850+)" },
            { id: "radiance", label: "Glass Skin & Radiance" },
            { id: "acne", label: "Acne & Pore Care" },
            { id: "sensitive", label: "Sensitive & Barrier" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedTag(tab.id)}
              className={cn(
                "rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer",
                selectedTag === tab.id
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-background border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-3.5 sm:gap-6 md:grid-cols-2">
          {filteredReviews.map((rev) => {
            const currentHelpful = helpfulVotes[rev.id] ?? rev.helpfulCount;
            const hasVoted = voted[rev.id] ?? false;

            return (
              <ReviewCard
                key={rev.id}
                rev={rev}
                currentHelpful={currentHelpful}
                hasVoted={hasVoted}
                onHelpful={handleHelpful}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

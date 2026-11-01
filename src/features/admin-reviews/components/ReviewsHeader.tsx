import React from "react";
import { ChevronRight, Star } from "lucide-react";

export function ReviewsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          <span>Customer Trust & Voice</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary font-bold">Reviews Moderation</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1 flex items-center gap-2.5">
          <Star className="h-7 w-7 text-amber-500 fill-amber-500" />
          <span>Product Reviews & Ratings Moderation</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor real buyer feedback, verify genuine purchases, approve ratings, and reply directly
          with Japanese skincare concierge care.
        </p>
      </div>
    </div>
  );
}

import React from "react";
import { MessageSquare, CheckCircle, Star } from "lucide-react";

interface ReviewsKpiCardsProps {
  totalReviews: number;
  pendingCount: number;
  approvedCount: number;
  averageRating: string;
}

export function ReviewsKpiCards({
  totalReviews,
  pendingCount,
  approvedCount,
  averageRating,
}: ReviewsKpiCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Total Reviews</span>
          <MessageSquare className="h-4 w-4 text-primary" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{totalReviews}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Across all Tokyo SKUs</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Pending Moderation</span>
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
        </div>
        <p className="text-2xl font-display font-bold text-amber-600 dark:text-amber-400 mt-2">
          {pendingCount}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">Awaiting store admin review</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Approved & Live</span>
          <CheckCircle className="h-4 w-4 text-emerald-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">{approvedCount}</p>
        <p className="text-[11px] text-muted-foreground mt-1">Visible on product detail pages</p>
      </div>

      <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
        <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
          <span>Average Store Rating</span>
          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
        </div>
        <p className="text-2xl font-display font-bold text-foreground mt-2">
          {averageRating} <span className="text-sm font-normal text-muted-foreground">/ 5.0</span>
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">High customer satisfaction</p>
      </div>
    </div>
  );
}

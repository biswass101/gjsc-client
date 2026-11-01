"use client";

import { Rating } from "@/components/common";
import { Button } from "@/components/ui/button";

interface ProductReviewSummaryCardProps {
  rating: number;
  reviewsCount: number;
  onOpenReviewModal: () => void;
}

export function ProductReviewSummaryCard({
  rating,
  reviewsCount,
  onOpenReviewModal,
}: ProductReviewSummaryCardProps) {
  return (
    <div className="lg:col-span-4 rounded-xl border border-border/80 bg-cream p-6 space-y-6">
      <div>
        <h4 className="font-display text-xl font-semibold">Customer Ratings</h4>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="font-display text-5xl font-bold">{rating}</span>
          <div>
            <Rating value={rating} />
            <p className="mt-1 text-xs text-muted-foreground">
              Based on {reviewsCount} verified purchases
            </p>
          </div>
        </div>
      </div>

      {/* Rating Distribution Bars */}
      <div className="space-y-2 text-xs">
        {[
          { stars: 5, pct: 82 },
          { stars: 4, pct: 14 },
          { stars: 3, pct: 3 },
          { stars: 2, pct: 1 },
          { stars: 1, pct: 0 },
        ].map((row) => (
          <div key={row.stars} className="flex items-center gap-2.5">
            <span className="w-12 text-muted-foreground">{row.stars} Stars</span>
            <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-amber-400" style={{ width: `${row.pct}%` }} />
            </div>
            <span className="w-8 text-right text-muted-foreground">{row.pct}%</span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border/60">
        <p className="text-xs text-muted-foreground mb-4">
          Have you experienced this Japanese formula? Share your thoughts with our skincare
          community.
        </p>
        <Button
          onClick={onOpenReviewModal}
          className="w-full rounded-full py-5 text-xs uppercase tracking-wider font-semibold cursor-pointer"
        >
          Write a Review
        </Button>
      </div>
    </div>
  );
}

import React from "react";
import { Star } from "lucide-react";
import { AdminReview } from "@/context/admin-context";
import { ReviewCard } from "./ReviewCard";

interface ReviewsListProps {
  reviews: AdminReview[];
  onApprove: (review: AdminReview) => void;
  onHide: (review: AdminReview) => void;
  onReply: (review: AdminReview) => void;
  onDelete: (review: AdminReview) => void;
}

export function ReviewsList({ reviews, onApprove, onHide, onReply, onDelete }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
        <Star className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
        <h3 className="font-bold text-foreground text-lg">No Reviews Match</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
          Try adjusting your search criteria or review filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onApprove={onApprove}
          onHide={onHide}
          onReply={onReply}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

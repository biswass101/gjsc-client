"use client";

import type { Product } from "@/types";
import type { UserReview } from "../../types";
import { ProductReviewSummaryCard } from "../reviews/ProductReviewSummaryCard";
import { ProductReviewItem } from "../reviews/ProductReviewItem";

interface ProductReviewsTabProps {
  product: Product;
  reviewsList: UserReview[];
  helpfulClicked: Record<string, boolean>;
  replyingToId: string | null;
  replyName: string;
  setReplyName: (v: string) => void;
  replyText: string;
  setReplyText: (v: string) => void;
  expandedReplies: Record<string, boolean>;
  onOpenReviewModal: () => void;
  onHelpfulClick: (reviewId: string) => void;
  onStartReply: (reviewId: string) => void;
  onCancelReply: () => void;
  onSubmitReply: (reviewId: string) => void;
  onToggleReplies: (reviewId: string) => void;
}

export function ProductReviewsTab({
  product,
  reviewsList,
  helpfulClicked,
  replyingToId,
  replyName,
  setReplyName,
  replyText,
  setReplyText,
  expandedReplies,
  onOpenReviewModal,
  onHelpfulClick,
  onStartReply,
  onCancelReply,
  onSubmitReply,
  onToggleReplies,
}: ProductReviewsTabProps) {
  const reviewsCount = product.reviews + reviewsList.length - 3;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Rating Summary Breakdown Card */}
      <ProductReviewSummaryCard
        rating={product.rating}
        reviewsCount={reviewsCount}
        onOpenReviewModal={onOpenReviewModal}
      />

      {/* Reviews List */}
      <div className="lg:col-span-8 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-xl font-medium">
            Verified Customer Feedback ({reviewsList.length})
          </h4>
          <span className="text-xs text-muted-foreground">Sorted by most recent</span>
        </div>

        <div className="space-y-4">
          {reviewsList.map((rev) => (
            <ProductReviewItem
              key={rev.id}
              review={rev}
              isHelpfulClicked={Boolean(helpfulClicked[rev.id])}
              isReplying={replyingToId === rev.id}
              replyName={replyName}
              setReplyName={setReplyName}
              replyText={replyText}
              setReplyText={setReplyText}
              isRepliesExpanded={Boolean(expandedReplies[rev.id])}
              onHelpfulClick={() => onHelpfulClick(rev.id)}
              onStartReply={() => onStartReply(rev.id)}
              onCancelReply={onCancelReply}
              onSubmitReply={() => onSubmitReply(rev.id)}
              onToggleReplies={() => onToggleReplies(rev.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { UserReview, ReviewReply } from "../types";
import { INITIAL_REVIEWS } from "../data/initialReviews";
import { feedbackApi } from "@/lib/api";

export function useProductReviews(productSlug?: string) {
  const [reviewsList, setReviewsList] = useState<UserReview[]>(INITIAL_REVIEWS);

  useEffect(() => {
    if (productSlug) {
      feedbackApi
        .getProductReviews(productSlug)
        .then((res) => {
          if (res?.reviews && res.reviews.length > 0) {
            const formatted: UserReview[] = res.reviews.map((r: any) => ({
              id: String(r.id),
              name: r.name,
              rating: r.rating,
              date: new Date(r.createdAt || Date.now()).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              verified: r.verified,
              skinType: r.skinType || "Combination",
              title: r.title,
              comment: r.comment,
              helpfulCount: r.helpfulCount || 0,
              adminReply: r.adminReply || undefined,
              replies: r.replies || [],
            }));
            setReviewsList(formatted);
          }
        })
        .catch(() => {
          /* keep initial reviews fallback */
        });
    }
  }, [productSlug]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  const [reviewSkinType, setReviewSkinType] = useState("Combination");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});

  // Inline reply state for threaded review discussions
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyText, setReplyText] = useState("");
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({
    "rev-1": true,
    "rev-2": false,
  });

  const handleHelpfulClick = (reviewId: string) => {
    if (helpfulClicked[reviewId]) return;
    setReviewsList((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r)),
    );
    setHelpfulClicked((prev) => ({ ...prev, [reviewId]: true }));
    toast.success("Thank you for your feedback!");

    const numericId = Number(reviewId);
    if (!isNaN(numericId)) {
      feedbackApi.voteHelpful(numericId).catch(() => {});
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error("Please fill in your name and review message.");
      return;
    }
    const newRev: UserReview = {
      id: `rev-${Date.now()}`,
      name: reviewName.trim(),
      rating: reviewRating,
      date: "Just now",
      verified: true,
      skinType: reviewSkinType,
      title: reviewTitle.trim() || "Exceptional product",
      comment: reviewComment.trim(),
      helpfulCount: 0,
    };
    setReviewsList((prev) => [newRev, ...prev]);
    setIsReviewModalOpen(false);
    setReviewName("");
    setReviewTitle("");
    setReviewComment("");
    toast.success("Review submitted!", {
      description: "Thank you for sharing your Japanese ritual experience with our community.",
    });

    if (productSlug) {
      const reviewPayload: any = {
        productSlug,
        name: newRev.name,
        rating: newRev.rating,
        title: newRev.title,
        comment: newRev.comment,
      };
      if (newRev.skinType) reviewPayload.skinType = newRev.skinType;
      feedbackApi.submitReview(reviewPayload).catch(() => {});
    }
  };

  const handleStartReply = (reviewId: string) => {
    setReplyingToId(reviewId);
    setExpandedReplies((prev) => ({ ...prev, [reviewId]: true }));
  };

  const handleCancelReply = () => {
    setReplyingToId(null);
    setReplyText("");
  };

  const handleSubmitReply = (reviewId: string) => {
    if (!replyName.trim() || !replyText.trim()) {
      toast.error("Please enter your name and reply message.");
      return;
    }
    const newReply: ReviewReply = {
      id: `rep-${Date.now()}`,
      name: replyName.trim(),
      role: "customer",
      date: "Just now",
      comment: replyText.trim(),
    };
    setReviewsList((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, replies: [...(r.replies || []), newReply] } : r,
      ),
    );
    setReplyingToId(null);
    setReplyText("");
    toast.success("Reply posted!", {
      description: "Your comment has been added to this review discussion.",
    });
  };

  const toggleRepliesExpanded = (reviewId: string) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  return {
    reviewsList,
    isReviewModalOpen,
    setIsReviewModalOpen,
    reviewRating,
    setReviewRating,
    reviewName,
    setReviewName,
    reviewSkinType,
    setReviewSkinType,
    reviewTitle,
    setReviewTitle,
    reviewComment,
    setReviewComment,
    helpfulClicked,
    replyingToId,
    replyName,
    setReplyName,
    replyText,
    setReplyText,
    expandedReplies,
    handleHelpfulClick,
    handleSubmitReview,
    handleStartReply,
    handleCancelReply,
    handleSubmitReply,
    toggleRepliesExpanded,
  };
}

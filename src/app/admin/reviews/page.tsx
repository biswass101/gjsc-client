"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useAdmin, AdminReview } from "@/context/admin-context";
import {
  ReviewsHeader,
  ReviewsKpiCards,
  ReviewsFiltersBar,
  ReviewsList,
  ReviewReplyModal,
  ReviewDeleteDialog,
  useReviewsFilter,
  useReviewReply,
} from "@/features/admin-reviews";

export default function AdminReviewsPage() {
  const { reviews, updateReviewStatus, deleteReview } = useAdmin();
  const [reviewToDelete, setReviewToDelete] = useState<AdminReview | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    filteredReviews,
    pendingCount,
    approvedCount,
    averageRating,
  } = useReviewsFilter(reviews);

  const {
    replyingReview,
    setReplyingReview,
    replyText,
    setReplyText,
    openReplyModal,
    handleSendReply,
    applyReplyTemplate,
  } = useReviewReply();

  const handleApprove = (r: AdminReview) => {
    updateReviewStatus(r.id, "approved");
    toast.success(`Review by ${r.customerName} approved and live on product page!`);
  };

  const handleHide = (r: AdminReview) => {
    updateReviewStatus(r.id, "hidden");
    toast.success(`Review by ${r.customerName} hidden from storefront.`);
  };

  const handleConfirmDelete = () => {
    if (!reviewToDelete) return;
    deleteReview(reviewToDelete.id);
    toast.success("Review deleted successfully.");
    setReviewToDelete(null);
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      <ReviewsHeader />

      <ReviewsKpiCards
        totalReviews={reviews.length}
        pendingCount={pendingCount}
        approvedCount={approvedCount}
        averageRating={averageRating}
      />

      <ReviewsFiltersBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        totalReviews={reviews.length}
        pendingCount={pendingCount}
        approvedCount={approvedCount}
        hiddenCount={reviews.filter((r) => r.status === "hidden").length}
      />

      <ReviewsList
        reviews={filteredReviews}
        onApprove={handleApprove}
        onHide={handleHide}
        onReply={openReplyModal}
        onDelete={(review) => setReviewToDelete(review)}
      />

      <ReviewReplyModal
        replyingReview={replyingReview}
        replyText={replyText}
        setReplyText={setReplyText}
        onClose={() => setReplyingReview(null)}
        onSubmit={handleSendReply}
        onApplyTemplate={applyReplyTemplate}
      />

      <ReviewDeleteDialog
        reviewToDelete={reviewToDelete}
        onClose={() => setReviewToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

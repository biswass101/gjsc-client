import { useState, useMemo } from "react";
import { AdminReview } from "@/context/admin-context";

export function useReviewsFilter(reviews: AdminReview[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<string>("all");

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        r.productName.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q);

      const matchesStatus = selectedStatus === "all" || r.status === selectedStatus;

      const matchesRating = selectedRating === "all" || String(r.rating) === selectedRating;

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [reviews, searchQuery, selectedStatus, selectedRating]);

  const pendingCount = useMemo(
    () => reviews.filter((r) => r.status === "pending").length,
    [reviews],
  );
  const approvedCount = useMemo(
    () => reviews.filter((r) => r.status === "approved").length,
    [reviews],
  );
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return "0.0";
    const sum = reviews.reduce((s, r) => s + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  return {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedRating,
    setSelectedRating,
    filteredReviews,
    pendingCount,
    approvedCount,
    averageRating,
  };
}

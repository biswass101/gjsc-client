"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { UserReview, ReviewReply } from "../types";
import { INITIAL_REVIEWS } from "../data/initialReviews";
import { feedbackApi } from "@/lib/api";
import { useShop } from "@/context/shop-context";

function parseReviewImages(val: unknown): string[] {
  if (!val) return [];
  if (Array.isArray(val)) {
    return val.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  }
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (!trimmed || trimmed === "[]" || trimmed === "null" || trimmed === "undefined") {
      return [];
    }
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
      }
    } catch {
      if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
        return [trimmed];
      }
    }
  }
  return [];
}

export function useProductReviews(productSlug?: string) {
  const { user } = useShop();
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
              date: r.date || new Date(r.createdAt || Date.now()).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              verified: Boolean(r.verified),
              skinType: r.skinType || "Combination",
              title: r.title,
              comment: r.comment,
              helpfulCount: r.helpfulCount || 0,
              adminReply: r.adminReply || undefined,
              replies: r.replies || [],
              images: parseReviewImages(r.images),
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
  const [reviewName, setReviewName] = useState(user?.name || "");
  const [reviewSkinType, setReviewSkinType] = useState("Combination");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});

  // Sync user name when user logs in
  useEffect(() => {
    if (user?.name && !reviewName) {
      setReviewName(user.name);
    }
  }, [user?.name, reviewName]);

  // Inline reply state for threaded review discussions
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyName, setReplyName] = useState(user?.name || "");
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

  const handleUploadImages = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    if (reviewImages.length + fileArray.length > 4) {
      toast.error("You can upload a maximum of 4 photos per review.");
      return;
    }

    setIsUploadingImage(true);
    try {
      const uploadPromises = fileArray.map(async (file) => {
        try {
          const res = await feedbackApi.uploadReviewImage(file);
          if (res?.url || (res as any)?.data?.url) {
            return res.url || (res as any).data.url;
          }
        } catch {
          // Fallback to data URL
        }
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(Boolean);
      setReviewImages((prev) => [...prev, ...validUrls].slice(0, 4));
      toast.success(`${validUrls.length} photo(s) added!`);
    } catch {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setReviewImages((prev) => prev.filter((_, i) => i !== index));
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
      images: reviewImages,
    };
    setReviewsList((prev) => [newRev, ...prev]);
    setIsReviewModalOpen(false);
    setReviewName(user?.name || "");
    setReviewTitle("");
    setReviewComment("");
    setReviewImages([]);
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
        images: newRev.images,
      };
      if (newRev.skinType) reviewPayload.skinType = newRev.skinType;
      feedbackApi.submitReview(reviewPayload).catch(() => {});
    }
  };

  const handleStartReply = (reviewId: string) => {
    setReplyingToId(reviewId);
    if (!replyName && user?.name) {
      setReplyName(user.name);
    }
    setExpandedReplies((prev) => ({ ...prev, [reviewId]: true }));
  };

  const handleCancelReply = () => {
    setReplyingToId(null);
    setReplyText("");
  };

  const handleSubmitReply = (reviewId: string) => {
    const authorName = replyName.trim() || user?.name || "Customer";
    if (!authorName || !replyText.trim()) {
      toast.error("Please enter your name and reply message.");
      return;
    }

    const isAdmin = (user as any)?.role === "admin";
    const role: ReviewReply["role"] = isAdmin ? "brand" : "customer";

    const newReply: ReviewReply = {
      id: `rep-${Date.now()}`,
      name: authorName,
      role,
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

    const numericId = Number(reviewId);
    if (!isNaN(numericId)) {
      feedbackApi.replyReview(numericId, newReply.comment, newReply.name, role).catch(() => {});
    }
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
    reviewImages,
    setReviewImages,
    isUploadingImage,
    handleUploadImages,
    handleRemoveImage,
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

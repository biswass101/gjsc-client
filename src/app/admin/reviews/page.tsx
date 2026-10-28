"use client";

import React, { useState, useMemo } from "react";
import {
  Star,
  Search,
  CheckCircle,
  EyeOff,
  Trash2,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Send,
  ThumbsUp,
  UserCheck,
} from "lucide-react";
import { useAdmin, AdminReview } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function AdminReviewsPage() {
  const { reviews, updateReviewStatus, replyReview, deleteReview } = useAdmin();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<string>("all");

  // Reply Dialog State
  const [replyingReview, setReplyingReview] = useState<AdminReview | null>(null);
  const [replyText, setReplyText] = useState("");

  // Delete Alert
  const [reviewToDelete, setReviewToDelete] = useState<AdminReview | null>(null);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        r.productName.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q);

      const matchesStatus =
        selectedStatus === "all" || r.status === selectedStatus;

      const matchesRating =
        selectedRating === "all" || String(r.rating) === selectedRating;

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [reviews, searchQuery, selectedStatus, selectedRating]);

  // Statistics
  const pendingCount = useMemo(
    () => reviews.filter((r) => r.status === "pending").length,
    [reviews]
  );
  const approvedCount = useMemo(
    () => reviews.filter((r) => r.status === "approved").length,
    [reviews]
  );
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((s, r) => s + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const openReplyModal = (r: AdminReview) => {
    setReplyingReview(r);
    setReplyText(r.adminReply || "");
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingReview) return;
    if (!replyText.trim()) {
      toast.error("Please enter a reply message.");
      return;
    }

    replyReview(replyingReview.id, replyText.trim());
    toast.success(`Admin reply posted to ${replyingReview.customerName}'s review! 🌸`);
    setReplyingReview(null);
  };

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

  const applyReplyTemplate = (text: string) => {
    setReplyText(text);
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Top Banner / Breadcrumb */}
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
            Monitor real buyer feedback, verify genuine purchases, approve ratings, and reply directly with Japanese skincare concierge care.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Total Reviews</span>
            <MessageSquare className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {reviews.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Across all Tokyo SKUs
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Pending Moderation</span>
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
          </div>
          <p className="text-2xl font-display font-bold text-amber-600 dark:text-amber-400 mt-2">
            {pendingCount}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Awaiting store admin review
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Approved & Live</span>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {approvedCount}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Visible on product detail pages
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Average Store Rating</span>
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {averageRating} <span className="text-sm font-normal text-muted-foreground">/ 5.0</span>
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            High customer satisfaction
          </p>
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="flex flex-col gap-3 bg-card p-4 rounded-xl border border-border/70">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product, customer name, review contents..."
              className="pl-9 bg-background/60"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <Button
              variant={selectedStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("all")}
              className="text-xs shrink-0"
            >
              All ({reviews.length})
            </Button>
            <Button
              variant={selectedStatus === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("pending")}
              className="text-xs shrink-0 text-amber-600 dark:text-amber-400"
            >
              Pending ({pendingCount})
            </Button>
            <Button
              variant={selectedStatus === "approved" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("approved")}
              className="text-xs shrink-0"
            >
              Approved ({approvedCount})
            </Button>
            <Button
              variant={selectedStatus === "hidden" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("hidden")}
              className="text-xs shrink-0"
            >
              Hidden ({reviews.filter((r) => r.status === "hidden").length})
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => {
          return (
            <div
              key={review.id}
              className={`rounded-xl border p-5 bg-card shadow-xs transition-all duration-200 ${
                review.status === "pending"
                  ? "border-amber-300 dark:border-amber-800/60 bg-amber-50/20 dark:bg-amber-950/10"
                  : review.status === "approved"
                  ? "border-border/80"
                  : "border-border/40 opacity-70"
              }`}
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                {/* Product & Customer Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Gold Stars */}
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "text-amber-500 fill-amber-500"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>

                    <span className="font-bold text-foreground text-sm">
                      {review.productName}
                    </span>

                    {review.verified && (
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        Verified Buyer
                      </Badge>
                    )}

                    <Badge
                      variant="outline"
                      className={`text-[10px] capitalize ${
                        review.status === "approved"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : review.status === "pending"
                          ? "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {review.status}
                    </Badge>
                  </div>

                  {/* Customer and Date */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {review.customerName}
                    </span>
                    <span>•</span>
                    <span>{review.date}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-foreground/90 leading-relaxed pt-1">
                    &quot;{review.comment}&quot;
                  </p>

                  {/* Admin Reply Card */}
                  {review.adminReply && (
                    <div className="rounded-lg bg-secondary/50 border border-border/80 p-3 mt-3 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-primary">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Official Store Response:</span>
                      </div>
                      <p className="text-foreground/90 italic">
                        {review.adminReply}
                      </p>
                    </div>
                  )}
                </div>

                {/* Moderation Actions */}
                <div className="flex md:flex-col items-center md:items-end gap-2 shrink-0 w-full md:w-auto justify-between md:justify-start pt-3 md:pt-0 border-t md:border-t-0 border-border/60">
                  <div className="flex items-center gap-1.5">
                    {review.status !== "approved" && (
                      <Button
                        size="sm"
                        onClick={() => handleApprove(review)}
                        className="h-8 gap-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>Approve</span>
                      </Button>
                    )}

                    {review.status !== "hidden" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleHide(review)}
                        className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <EyeOff className="h-3.5 w-3.5" />
                        <span>Hide</span>
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openReplyModal(review)}
                      className="h-8 gap-1 text-xs"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-primary" />
                      <span>{review.adminReply ? "Edit Reply" : "Reply"}</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReviewToDelete(review)}
                      className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReviews.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
          <Star className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
          <h3 className="font-bold text-foreground text-lg">No Reviews Match</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or review filters.
          </p>
        </div>
      )}

      {/* Admin Reply Dialog */}
      <Dialog open={!!replyingReview} onOpenChange={(open) => !open && setReplyingReview(null)}>
        <DialogContent className="max-w-lg">
          <form onSubmit={handleSendReply}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-display text-lg">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Reply to Customer Review</span>
              </DialogTitle>
              <DialogDescription>
                Public store response for {replyingReview?.customerName} on &quot;{replyingReview?.productName}&quot;.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="rounded-lg bg-secondary/30 p-3 text-xs italic text-muted-foreground border border-border/60">
                &quot;{replyingReview?.comment}&quot;
              </div>

              {/* Quick Response Templates */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  Quick Response Templates:
                </span>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      applyReplyTemplate(
                        `Arigato gozaimasu ${replyingReview?.customerName}! We are thrilled you're loving the authentic Japanese results! 🌸`
                      )
                    }
                    className="text-left text-xs p-2 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    ✨ &quot;Arigato gozaimasu! We are thrilled you love the authentic Japanese results...&quot;
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      applyReplyTemplate(
                        `Thank you for sharing your experience ${replyingReview?.customerName}. Sourced fresh from Tokyo to keep active botanicals potent!`
                      )
                    }
                    className="text-left text-xs p-2 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    🌿 &quot;Thank you for sharing! Sourced fresh from Tokyo to keep active botanicals potent...&quot;
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reply-input" className="text-xs font-semibold">
                  Official Store Reply Message
                </Label>
                <Textarea
                  id="reply-input"
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a warm, professional customer care response..."
                  required
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setReplyingReview(null)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground font-semibold gap-1.5">
                <Send className="h-3.5 w-3.5" />
                <span>Post Reply</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog
        open={!!reviewToDelete}
        onOpenChange={(open) => !open && setReviewToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              <span>Delete Review</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review by <strong>{reviewToDelete?.customerName}</strong>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}


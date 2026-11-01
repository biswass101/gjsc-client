import React from "react";
import { Star, ShieldCheck, MessageSquare, CheckCircle, EyeOff, Trash2 } from "lucide-react";
import { AdminReview } from "@/context/admin-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ReviewCardProps {
  review: AdminReview;
  onApprove: (review: AdminReview) => void;
  onHide: (review: AdminReview) => void;
  onReply: (review: AdminReview) => void;
  onDelete: (review: AdminReview) => void;
}

export function ReviewCard({ review, onApprove, onHide, onReply, onDelete }: ReviewCardProps) {
  return (
    <div
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

            <span className="font-bold text-foreground text-sm">{review.productName}</span>

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
            <span className="font-semibold text-foreground">{review.customerName}</span>
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
              <p className="text-foreground/90 italic">{review.adminReply}</p>
            </div>
          )}
        </div>

        {/* Moderation Actions */}
        <div className="flex md:flex-col items-center md:items-end gap-2 shrink-0 w-full md:w-auto justify-between md:justify-start pt-3 md:pt-0 border-t md:border-t-0 border-border/60">
          <div className="flex items-center gap-1.5">
            {review.status !== "approved" && (
              <Button
                size="sm"
                onClick={() => onApprove(review)}
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
                onClick={() => onHide(review)}
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
              onClick={() => onReply(review)}
              className="h-8 gap-1 text-xs"
            >
              <MessageSquare className="h-3.5 w-3.5 text-primary" />
              <span>{review.adminReply ? "Edit Reply" : "Reply"}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(review)}
              className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

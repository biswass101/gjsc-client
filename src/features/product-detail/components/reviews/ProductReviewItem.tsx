"use client";

import { Check, ChevronDown, ChevronUp, CornerDownRight, MessageSquare, Send } from "lucide-react";
import { Rating } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { UserReview } from "../../types";

interface ProductReviewItemProps {
  review: UserReview;
  isHelpfulClicked: boolean;
  isReplying: boolean;
  replyName: string;
  setReplyName: (v: string) => void;
  replyText: string;
  setReplyText: (v: string) => void;
  isRepliesExpanded: boolean;
  onHelpfulClick: () => void;
  onStartReply: () => void;
  onCancelReply: () => void;
  onSubmitReply: () => void;
  onToggleReplies: () => void;
}

export function ProductReviewItem({
  review,
  isHelpfulClicked,
  isReplying,
  replyName,
  setReplyName,
  replyText,
  setReplyText,
  isRepliesExpanded,
  onHelpfulClick,
  onStartReply,
  onCancelReply,
  onSubmitReply,
  onToggleReplies,
}: ProductReviewItemProps) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-6 shadow-xs space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Rating value={review.rating} />
            <span className="font-semibold text-sm text-foreground">{review.title}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{review.name}</span>
            <span>•</span>
            <span>{review.date}</span>
            {review.skinType && (
              <>
                <span>•</span>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px]">
                  {review.skinType}
                </span>
              </>
            )}
          </div>
        </div>

        {review.verified && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
            <Check className="h-3 w-3" />
            Verified Buyer
          </span>
        )}
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{review.comment}</p>

      {/* Review Actions: Helpful & Reply */}
      <div className="pt-2.5 flex items-center justify-between text-xs text-muted-foreground border-t border-border/40">
        <span className="hidden sm:inline">Was this feedback helpful?</span>
        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          <button
            type="button"
            onClick={onHelpfulClick}
            className={cn(
              "rounded-full px-3 py-1 border text-xs transition-colors cursor-pointer",
              isHelpfulClicked
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-border hover:border-primary hover:text-primary",
            )}
          >
            Helpful ({review.helpfulCount})
          </button>

          <button
            type="button"
            onClick={onStartReply}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 border border-border text-xs transition-colors hover:border-primary hover:text-primary font-medium cursor-pointer"
          >
            <MessageSquare className="h-3 w-3" />
            Reply {review.replies && review.replies.length > 0 ? `(${review.replies.length})` : ""}
          </button>
        </div>
      </div>

      {/* Threaded Discussion Replies */}
      {review.replies && review.replies.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border/30">
          <button
            type="button"
            onClick={onToggleReplies}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-2.5 cursor-pointer"
          >
            {isRepliesExpanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" />
                Hide replies ({review.replies.length})
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" />
                View replies ({review.replies.length})
              </>
            )}
          </button>

          {isRepliesExpanded && (
            <div className="ml-2 sm:ml-6 pl-3 sm:pl-4 border-l-2 border-primary/30 space-y-2.5">
              {review.replies.map((reply) => (
                <div
                  key={reply.id}
                  className={cn(
                    "rounded-xl p-3 sm:p-3.5 text-xs leading-relaxed",
                    reply.role === "brand"
                      ? "border border-primary/25 bg-primary/5 shadow-xs"
                      : "border border-border/60 bg-secondary/30",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-foreground">{reply.name}</span>
                      {reply.role === "brand" && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold text-primary-foreground">
                          Official · Glorious Japan Expert
                        </span>
                      )}
                      {reply.role === "verified" && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-600 dark:text-emerald-400">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{reply.date}</span>
                  </div>
                  <p className="mt-1.5 text-muted-foreground">{reply.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interactive Inline Reply Form */}
      {isReplying && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitReply();
          }}
          className="mt-3 rounded-xl border border-primary/40 bg-secondary/20 p-4 space-y-3 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <CornerDownRight className="h-3.5 w-3.5 text-primary" />
              Replying to {review.name}
            </span>
            <button
              type="button"
              onClick={onCancelReply}
              className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-2">
            <Input
              required
              value={replyName}
              onChange={(e) => setReplyName(e.target.value)}
              placeholder="Your Name (e.g. Ayesha)"
              className="h-8 rounded-full text-xs"
            />
          </div>

          <Textarea
            required
            rows={2}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Reply or ask ${review.name} about their experience...`}
            className="rounded-xl text-xs"
          />

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="rounded-full text-xs h-7 px-3 cursor-pointer"
              onClick={onCancelReply}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="rounded-full text-xs h-7 px-4 gap-1.5 font-semibold cursor-pointer"
            >
              <Send className="h-3 w-3" />
              Post Reply
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

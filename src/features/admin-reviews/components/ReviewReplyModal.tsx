import React from "react";
import { MessageSquare, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminReview } from "@/context/admin-context";

interface ReviewReplyModalProps {
  replyingReview: AdminReview | null;
  replyText: string;
  setReplyText: (val: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onApplyTemplate: (text: string) => void;
}

export function ReviewReplyModal({
  replyingReview,
  replyText,
  setReplyText,
  onClose,
  onSubmit,
  onApplyTemplate,
}: ReviewReplyModalProps) {
  return (
    <Dialog open={!!replyingReview} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-lg">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Reply to Customer Review</span>
            </DialogTitle>
            <DialogDescription>
              Public store response for {replyingReview?.customerName} on &quot;
              {replyingReview?.productName}&quot;.
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
                    onApplyTemplate(
                      `Arigato gozaimasu ${replyingReview?.customerName}! We are thrilled you're loving the authentic Japanese results! 🌸`,
                    )
                  }
                  className="text-left text-xs p-2 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  ✨ &quot;Arigato gozaimasu! We are thrilled you love the authentic Japanese
                  results...&quot;
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onApplyTemplate(
                      `Thank you for sharing your experience ${replyingReview?.customerName}. Sourced fresh from Tokyo to keep active botanicals potent!`,
                    )
                  }
                  className="text-left text-xs p-2 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  🌿 &quot;Thank you for sharing! Sourced fresh from Tokyo to keep active botanicals
                  potent...&quot;
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground font-semibold gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Post Reply</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

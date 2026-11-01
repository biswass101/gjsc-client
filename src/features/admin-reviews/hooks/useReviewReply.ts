import { useState } from "react";
import { toast } from "sonner";
import { AdminReview, useAdmin } from "@/context/admin-context";

export function useReviewReply() {
  const { replyReview } = useAdmin();
  const [replyingReview, setReplyingReview] = useState<AdminReview | null>(null);
  const [replyText, setReplyText] = useState("");

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

  const applyReplyTemplate = (text: string) => {
    setReplyText(text);
  };

  return {
    replyingReview,
    setReplyingReview,
    replyText,
    setReplyText,
    openReplyModal,
    handleSendReply,
    applyReplyTemplate,
  };
}


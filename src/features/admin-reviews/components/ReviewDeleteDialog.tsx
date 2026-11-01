import React from "react";
import { Trash2 } from "lucide-react";
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
import { AdminReview } from "@/context/admin-context";

interface ReviewDeleteDialogProps {
  reviewToDelete: AdminReview | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function ReviewDeleteDialog({
  reviewToDelete,
  onClose,
  onConfirm,
}: ReviewDeleteDialogProps) {
  return (
    <AlertDialog open={!!reviewToDelete} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            <span>Delete Review</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this review by{" "}
            <strong>{reviewToDelete?.customerName}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-rose-600 hover:bg-rose-700 text-white"
          >
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

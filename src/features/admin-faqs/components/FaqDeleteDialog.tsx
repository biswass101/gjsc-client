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
import { AdminFaq } from "@/context/admin-context";

interface FaqDeleteDialogProps {
  faqToDelete: AdminFaq | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function FaqDeleteDialog({ faqToDelete, onClose, onConfirm }: FaqDeleteDialogProps) {
  return (
    <AlertDialog open={!!faqToDelete} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            <span>Delete FAQ</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this FAQ: &quot;{faqToDelete?.question}&quot;?
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

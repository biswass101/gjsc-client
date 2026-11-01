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
import { AdminBanner } from "@/context/admin-context";

interface BannerDeleteDialogProps {
  bannerToDelete: AdminBanner | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function BannerDeleteDialog({
  bannerToDelete,
  onClose,
  onConfirm,
}: BannerDeleteDialogProps) {
  return (
    <AlertDialog open={!!bannerToDelete} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            <span>Delete Promotional Banner</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete banner &quot;{bannerToDelete?.title}&quot;? This will
            remove the visual banner from the {bannerToDelete?.pageTitle} page.
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

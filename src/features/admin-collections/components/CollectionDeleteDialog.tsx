import React from "react";
import { Trash2 } from "lucide-react";
import type { AdminCollection } from "@/types";
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

interface CollectionDeleteDialogProps {
  collectionToDelete: AdminCollection | null;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

export function CollectionDeleteDialog({
  collectionToDelete,
  onOpenChange,
  onConfirmDelete,
}: CollectionDeleteDialogProps) {
  return (
    <AlertDialog open={!!collectionToDelete} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            <span>Delete Collection</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{collectionToDelete?.title}</strong>? This will
            remove the collection landing page from the storefront.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmDelete}
            className="bg-rose-600 hover:bg-rose-700 text-white"
          >
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

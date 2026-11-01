import React from "react";
import { Trash2 } from "lucide-react";
import type { AdminPreOrder } from "@/types";
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

interface PreOrderDeleteDialogProps {
  poToDelete: AdminPreOrder | null;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

export function PreOrderDeleteDialog({
  poToDelete,
  onOpenChange,
  onConfirmDelete,
}: PreOrderDeleteDialogProps) {
  return (
    <AlertDialog open={!!poToDelete} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            <span>Delete Pre-Order Campaign</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{poToDelete?.productName}</strong>? This will
            remove the pre-order campaign and customer reservation quota.
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

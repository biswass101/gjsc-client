import React from "react";
import { Trash2 } from "lucide-react";
import type { AdminCategory } from "@/types";
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

interface CategoryDeleteDialogProps {
  categoryToDelete: AdminCategory | null;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

export function CategoryDeleteDialog({
  categoryToDelete,
  onOpenChange,
  onConfirmDelete,
}: CategoryDeleteDialogProps) {
  return (
    <AlertDialog open={!!categoryToDelete} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            <span>Delete Category</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{categoryToDelete?.title}</strong>? This action
            cannot be undone and will detach {categoryToDelete?.subcategories.length} subcategories.
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

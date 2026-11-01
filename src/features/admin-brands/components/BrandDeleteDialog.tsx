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
import { AdminBrand } from "@/context/admin-context";

interface BrandDeleteDialogProps {
  brandToDelete: AdminBrand | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function BrandDeleteDialog({ brandToDelete, onClose, onConfirm }: BrandDeleteDialogProps) {
  return (
    <AlertDialog open={!!brandToDelete} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            <span>Delete Brand</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{brandToDelete?.name}</strong>? This brand will
            be removed from storefront directories and product listings.
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

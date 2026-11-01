"use client";

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
import type { AdminFeaturedVideo } from "@/context/admin-context";

interface VideoDeleteDialogProps {
  video: AdminFeaturedVideo | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function VideoDeleteDialog({ video, onClose, onConfirm }: VideoDeleteDialogProps) {
  return (
    <AlertDialog open={!!video} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">Delete Video Reel?</AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            Are you sure you want to remove <strong>"{video?.title}"</strong> from the homepage
            video showcase? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs"
          >
            Delete Video
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

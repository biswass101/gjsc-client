"use client";

import { Camera, ImagePlus, Loader2, Star, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ProductWriteReviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  reviewRating: number;
  setReviewRating: (rating: number) => void;
  reviewName: string;
  setReviewName: (name: string) => void;
  reviewSkinType: string;
  setReviewSkinType: (skinType: string) => void;
  reviewTitle: string;
  setReviewTitle: (title: string) => void;
  reviewComment: string;
  setReviewComment: (comment: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  reviewImages?: string[];
  onUploadImages?: (files: FileList | File[]) => void;
  onRemoveImage?: (index: number) => void;
  isUploadingImage?: boolean;
}

export function ProductWriteReviewModal({
  isOpen,
  onOpenChange,
  reviewRating,
  setReviewRating,
  reviewName,
  setReviewName,
  reviewSkinType,
  setReviewSkinType,
  reviewTitle,
  setReviewTitle,
  reviewComment,
  setReviewComment,
  onSubmit,
  reviewImages = [],
  onUploadImages,
  onRemoveImage,
  isUploadingImage = false,
}: ProductWriteReviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Write a Customer Review</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Your Rating
            </label>
            <div className="mt-1.5 flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewRating(star)}
                  className="p-1 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={cn(
                      "h-6 w-6",
                      star <= reviewRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/40",
                    )}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-medium text-foreground">
                {reviewRating} of 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Your Full Name
            </label>
            <Input
              required
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              placeholder="e.g. Nusrat Jahan"
              className="mt-1 rounded-full text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Your Skin Type
            </label>
            <select
              value={reviewSkinType}
              onChange={(e) => setReviewSkinType(e.target.value)}
              className="mt-1 w-full rounded-full border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="Combination">Combination</option>
              <option value="Dry">Dry Skin</option>
              <option value="Oily">Oily Skin</option>
              <option value="Sensitive">Sensitive</option>
              <option value="Normal">Normal</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Headline / Title
            </label>
            <Input
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="e.g. My absolute holy grail serum!"
              className="mt-1 rounded-full text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Detailed Review
            </label>
            <Textarea
              required
              rows={4}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share how this product felt on your skin, absorption, and results..."
              className="mt-1 rounded-xl text-xs"
            />
          </div>

          {/* Skincare Photo Upload Section */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Camera className="h-3.5 w-3.5 text-primary" />
                Upload Review Images (Optional)
              </label>
              <span className="text-[11px] text-muted-foreground">
                {reviewImages.length}/4 photos
              </span>
            </div>

            {/* Thumbnail previews */}
            {reviewImages.length > 0 && (
              <div className="mt-2 grid grid-cols-4 gap-2">
                {reviewImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group aspect-square rounded-lg overflow-hidden border border-border/80 bg-secondary/30"
                  >
                    <img
                      src={img}
                      alt={`Review photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {onRemoveImage && (
                      <button
                        type="button"
                        onClick={() => onRemoveImage(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white hover:bg-rose-600 transition-colors cursor-pointer"
                        title="Remove photo"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Upload trigger button */}
            {reviewImages.length < 4 && (
              <label className="mt-2 flex flex-col items-center justify-center p-3 border-2 border-dashed border-border/80 hover:border-primary/60 rounded-xl cursor-pointer bg-secondary/10 hover:bg-secondary/20 transition-colors">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  multiple
                  className="hidden"
                  disabled={isUploadingImage}
                  onChange={(e) => {
                    if (e.target.files && onUploadImages) {
                      onUploadImages(e.target.files);
                      e.target.value = "";
                    }
                  }}
                />
                {isUploadingImage ? (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span>Uploading photo(s)...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ImagePlus className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">Attach skincare photos</span>
                    <span className="text-[11px] text-muted-foreground/80">(PNG, JPG)</span>
                  </div>
                )}
              </label>
            )}
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-full text-xs cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUploadingImage}
              className="rounded-full text-xs px-6 cursor-pointer"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

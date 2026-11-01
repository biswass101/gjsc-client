"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductLightboxModalProps {
  product: Product;
  galleryImages: string[];
  activeImageIndex: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectImage: (idx: number) => void;
  onPrevImage: () => void;
  onNextImage: () => void;
}

export function ProductLightboxModal({
  product,
  galleryImages,
  activeImageIndex,
  isOpen,
  onOpenChange,
  onSelectImage,
  onPrevImage,
  onNextImage,
}: ProductLightboxModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-border/80">
        <DialogHeader className="p-4 border-b border-border/50 flex flex-row items-center justify-between">
          <DialogTitle className="font-display text-lg font-normal">
            {product.name} — Authentic Tokyo View
          </DialogTitle>
        </DialogHeader>

        <div className="relative aspect-square max-h-[75vh] w-full flex items-center justify-center bg-cream p-4">
          <img
            src={galleryImages[activeImageIndex] || product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />

          {/* Lightbox arrows */}
          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={onPrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md hover:bg-background cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={onNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md hover:bg-background cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Lightbox thumbnail bar */}
        <div className="p-4 border-t border-border/50 flex items-center justify-center gap-3">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelectImage(i)}
              className={cn(
                "h-12 w-12 rounded-md overflow-hidden border-2 transition-all cursor-pointer",
                activeImageIndex === i ? "border-primary scale-105" : "border-border opacity-70",
              )}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

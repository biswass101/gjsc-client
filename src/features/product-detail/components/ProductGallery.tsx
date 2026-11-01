"use client";

import { ChevronLeft, ChevronRight, Maximize2, Leaf, Droplets, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductGalleryProps {
  product: Product;
  galleryImages: string[];
  activeImageIndex: number;
  discountPct: number;
  onSelectImage: (idx: number) => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onOpenLightbox: () => void;
}

export function ProductGallery({
  product,
  galleryImages,
  activeImageIndex,
  discountPct,
  onSelectImage,
  onPrevImage,
  onNextImage,
  onOpenLightbox,
}: ProductGalleryProps) {
  return (
    <div className="lg:col-span-5 space-y-3.5 max-w-[440px] mx-auto w-full">
      <div className="relative group overflow-hidden rounded-xl border border-border/70 bg-cream shadow-xs aspect-square max-h-[420px] w-full flex items-center justify-center">
        {/* Top Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          <span className="rounded-full bg-primary/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-xs shadow-xs">
            {product.badge || "Authentic Japan"}
          </span>
          {discountPct > 0 && (
            <span className="rounded-full bg-rose px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
              Save {discountPct}%
            </span>
          )}
        </div>

        {/* Japanese Provenance Stamp */}
        <div className="absolute right-3 top-3 z-10 hidden sm:flex items-center gap-1.5 rounded-full border border-border/60 bg-background/90 px-2.5 py-1 text-[9.5px] font-semibold tracking-wider text-foreground backdrop-blur-md shadow-xs pointer-events-none">
          <span className="inline-block h-2 w-2 rounded-full bg-rose animate-pulse" />
          東京正規輸入 · TOKYO AUTHENTIC
        </div>

        {/* Left / Right Navigation Arrow Buttons */}
        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                onPrevImage();
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-border/80 bg-background/90 text-foreground backdrop-blur-md shadow-md transition-all hover:bg-background hover:scale-105 active:scale-95 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                onNextImage();
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-border/80 bg-background/90 text-foreground backdrop-blur-md shadow-md transition-all hover:bg-background hover:scale-105 active:scale-95 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </button>
          </>
        )}

        {/* Main Photo with sleek contained padding */}
        <div
          className="cursor-zoom-in h-full w-full flex items-center justify-center p-3 sm:p-5"
          onClick={onOpenLightbox}
        >
          <img
            src={galleryImages[activeImageIndex] || product.image}
            alt={`${product.name} - View ${activeImageIndex + 1}`}
            width={900}
            height={900}
            className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Zoom pill trigger */}
        <button
          type="button"
          onClick={onOpenLightbox}
          className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full border border-border/60 bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-md transition-all hover:bg-background hover:scale-105 shadow-sm cursor-pointer"
        >
          <Maximize2 className="h-3 w-3 text-primary" />
          <span>Tap to zoom</span>
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="grid grid-cols-4 gap-2.5">
        {galleryImages.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectImage(idx)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border-2 bg-cream p-1 transition-all hover:opacity-100 flex items-center justify-center cursor-pointer",
              activeImageIndex === idx
                ? "border-primary ring-2 ring-primary/20 shadow-xs opacity-100 scale-[1.02]"
                : "border-border/60 opacity-70 hover:border-primary/40",
            )}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              width={200}
              height={200}
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
            {activeImageIndex === idx && (
              <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Visual Skincare Attributes Highlights */}
      <div className="hidden sm:grid grid-cols-3 gap-2 pt-1">
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/30 p-2 text-center sm:text-left">
          <Leaf className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-[10.5px] font-medium leading-tight">Fermented Botanicals</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/30 p-2">
          <Droplets className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-[10.5px] font-medium leading-tight">72h Deep Hydration</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/30 p-2">
          <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-[10.5px] font-medium leading-tight">Dermatologist Tested</span>
        </div>
      </div>
    </div>
  );
}

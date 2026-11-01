"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { AdminFeaturedVideo, AdminProduct } from "@/context/admin-context";
import { VideoModalMediaFields } from "./modal/VideoModalMediaFields";
import { VideoModalProductFields } from "./modal/VideoModalProductFields";

interface VideoFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingVideo: AdminFeaturedVideo | null;
  products: AdminProduct[];
  onSubmit: (e: React.FormEvent) => void;

  // Media & Creator State
  title: string;
  setTitle: (v: string) => void;
  caption: string;
  setCaption: (v: string) => void;
  duration: string;
  setDuration: (v: string) => void;
  views: string;
  setViews: (v: string) => void;
  thumbnail: string;
  setThumbnail: (v: string) => void;
  videoUrl: string;
  setVideoUrl: (v: string) => void;
  creatorName: string;
  setCreatorName: (v: string) => void;
  creatorHandle: string;
  setCreatorHandle: (v: string) => void;
  creatorAvatar: string;
  setCreatorAvatar: (v: string) => void;

  // Product & Ordering State
  selectedProductSlug: string;
  onSelectProduct: (slug: string) => void;
  productName: string;
  setProductName: (v: string) => void;
  productBrand: string;
  setProductBrand: (v: string) => void;
  productPrice: string;
  setProductPrice: (v: string) => void;
  productCompareAt: string;
  setProductCompareAt: (v: string) => void;
  active: boolean;
  setActive: (v: boolean) => void;
  featured: boolean;
  setFeatured: (v: boolean) => void;
  order: string;
  setOrder: (v: string) => void;
}

export function VideoFormModal({
  isOpen,
  onOpenChange,
  editingVideo,
  products,
  onSubmit,
  title,
  setTitle,
  caption,
  setCaption,
  duration,
  setDuration,
  views,
  setViews,
  thumbnail,
  setThumbnail,
  videoUrl,
  setVideoUrl,
  creatorName,
  setCreatorName,
  creatorHandle,
  setCreatorHandle,
  creatorAvatar,
  setCreatorAvatar,
  selectedProductSlug,
  onSelectProduct,
  productName,
  setProductName,
  productBrand,
  setProductBrand,
  productPrice,
  setProductPrice,
  productCompareAt,
  setProductCompareAt,
  active,
  setActive,
  featured,
  setFeatured,
  order,
  setOrder,
}: VideoFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            {editingVideo ? "Edit Featured Video Reel" : "Add Featured Video Reel"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Configure creator credentials, video reel media, and link a high-converting store
            product.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-5 pt-2">
          <div className="grid md:grid-cols-2 gap-5">
            <VideoModalMediaFields
              title={title}
              setTitle={setTitle}
              caption={caption}
              setCaption={setCaption}
              duration={duration}
              setDuration={setDuration}
              views={views}
              setViews={setViews}
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              videoUrl={videoUrl}
              setVideoUrl={setVideoUrl}
              creatorName={creatorName}
              setCreatorName={setCreatorName}
              creatorHandle={creatorHandle}
              setCreatorHandle={setCreatorHandle}
              creatorAvatar={creatorAvatar}
              setCreatorAvatar={setCreatorAvatar}
            />

            <VideoModalProductFields
              products={products}
              selectedProductSlug={selectedProductSlug}
              onSelectProduct={onSelectProduct}
              productName={productName}
              setProductName={setProductName}
              productBrand={productBrand}
              setProductBrand={setProductBrand}
              productPrice={productPrice}
              setProductPrice={setProductPrice}
              productCompareAt={productCompareAt}
              setProductCompareAt={setProductCompareAt}
              active={active}
              setActive={setActive}
              featured={featured}
              setFeatured={setFeatured}
              order={order}
              setOrder={setOrder}
              thumbnail={thumbnail}
              creatorName={creatorName}
              title={title}
            />
          </div>

          <DialogFooter className="pt-3 border-t border-border/70 flex sm:justify-between items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button type="submit" className="text-xs shadow-xs">
              {editingVideo ? "Save Changes" : "Publish Video Reel"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

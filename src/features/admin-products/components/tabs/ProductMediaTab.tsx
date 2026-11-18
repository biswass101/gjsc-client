"use client";

import { useRef, useState } from "react";
import { Plus, Upload, Loader2, Cloud, Image as ImageIcon, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ProductMediaTabProps {
  image: string;
  onImageChange: (val: string) => void;
  gallery: string[];
  newGalleryInput: string;
  onNewGalleryInputChange: (val: string) => void;
  onAddGalleryImage: (url?: string) => void;
  onRemoveGalleryImage: (url: string) => void;
  isUploadingCover?: boolean;
  isUploadingGallery?: boolean;
  onUploadCover?: (file: File) => void;
  onUploadGallery?: (files: File | File[]) => void;
  onClearCover?: () => void;
}

export function ProductMediaTab({
  image,
  onImageChange,
  gallery,
  newGalleryInput,
  onNewGalleryInputChange,
  onAddGalleryImage,
  onRemoveGalleryImage,
  isUploadingCover = false,
  isUploadingGallery = false,
  onUploadCover,
  onUploadGallery,
  onClearCover,
}: ProductMediaTabProps) {
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadCover) {
      onUploadCover(file);
    }
    e.target.value = "";
  };

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0 && onUploadGallery) {
      onUploadGallery(files);
    }
    e.target.value = "";
  };

  const handleCoverDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingCover(false);
    const file = e.dataTransfer.files?.[0];
    if (file && onUploadCover) {
      onUploadCover(file);
    }
  };

  const handleGalleryDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingGallery(false);
    const files = e.dataTransfer.files ? Array.from(e.dataTransfer.files) : [];
    if (files.length > 0 && onUploadGallery) {
      onUploadGallery(files);
    }
  };

  const validGallery = gallery.filter((url) => typeof url === "string" && url.trim().length > 0);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Primary Cover Image Upload (Pure Cloudinary) */}
      <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon className="h-3.5 w-3.5 text-primary" /> Primary Storefront Cover Image *
          </h3>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
            <Cloud className="h-3 w-3 text-sky-500" /> Cloudinary Cloud Storage
          </span>
        </div>

        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          onChange={handleCoverFileChange}
          className="hidden"
        />

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Interactive Cover Dropzone / Preview */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingCover(true);
            }}
            onDragLeave={() => setIsDraggingCover(false)}
            onDrop={handleCoverDrop}
            onClick={() => !isUploadingCover && coverInputRef.current?.click()}
            className={`relative h-36 w-36 rounded-xl overflow-hidden border-2 border-dashed bg-card shadow-sm shrink-0 grid place-items-center cursor-pointer transition-all group ${
              isDraggingCover
                ? "border-primary bg-primary/10 scale-[1.02]"
                : image
                  ? "border-primary/50"
                  : "border-border hover:border-primary/60 hover:bg-primary/5"
            }`}
          >
            {image ? (
              <>
                <img
                  src={image}
                  alt="Cover Preview"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <span className="absolute bottom-1.5 left-1.5 rounded bg-primary/95 text-primary-foreground text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wide shadow-sm">
                  Cover
                </span>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1.5 text-muted-foreground p-3 text-center">
                <Upload className="h-6 w-6 text-primary/70" />
                <span className="text-[10.5px] font-medium text-foreground">Click or Drop</span>
                <span className="text-[9.5px] text-muted-foreground">Upload cover photo</span>
              </div>
            )}

            {isUploadingCover && (
              <div className="absolute inset-0 bg-background/85 backdrop-blur-xs flex flex-col items-center justify-center gap-1 text-[10px] text-primary font-medium">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Uploading...</span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isUploadingCover}
                onClick={() => coverInputRef.current?.click()}
                className="rounded-xl text-xs h-9 px-3.5 border-primary/40 text-primary hover:bg-primary/10 cursor-pointer font-medium"
              >
                {isUploadingCover ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                    Uploading to Cloudinary...
                  </>
                ) : (
                  <>
                    <Upload className="h-3.5 w-3.5 mr-1.5" />
                    {image ? "Replace Cover Image" : "Upload Cover to Cloudinary"}
                  </>
                )}
              </Button>

              {image && onClearCover && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={isUploadingCover}
                  onClick={onClearCover}
                  className="rounded-xl text-xs h-9 px-3 text-muted-foreground hover:text-rose-600 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Remove Cover
                </Button>
              )}

              <span className="text-[11px] text-muted-foreground">JPG, PNG, WEBP up to 10MB</span>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-foreground">
                Cloudinary Image URL (auto-filled after upload)
              </Label>
              <Input
                value={image}
                onChange={(e) => onImageChange(e.target.value)}
                placeholder="Upload an image or paste a https://res.cloudinary.com/... URL"
                className="h-9 rounded-xl text-xs font-mono"
              />
            </div>

            <p className="text-[11px] text-muted-foreground">
              This image will appear as the lead hero visual on the shop grid, product details, search results, and shopping bag.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Multi-Angle Gallery Images (Pure Cloudinary) */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingGallery(true);
        }}
        onDragLeave={() => setIsDraggingGallery(false)}
        onDrop={handleGalleryDrop}
        className={`rounded-xl border p-4 space-y-3.5 transition-colors ${
          isDraggingGallery
            ? "border-primary bg-primary/10"
            : "border-border/80 bg-secondary/15"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Additional Product Gallery Photos
          </h3>
          <span className="text-[10.5px] font-medium text-muted-foreground">
            {validGallery.length} {validGallery.length === 1 ? "Photo" : "Photos"} Uploaded
          </span>
        </div>

        {/* Upload Multiple & Add URL Controls */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploadingGallery}
            onClick={() => galleryInputRef.current?.click()}
            className="rounded-xl text-xs h-10 px-4 shrink-0 border-primary/40 text-primary hover:bg-primary/10 cursor-pointer font-medium"
          >
            {isUploadingGallery ? (
              <>
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                Uploading to Cloudinary...
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5 mr-1.5" />
                Upload Additional Photos
              </>
            )}
          </Button>

          <div className="flex flex-1 gap-2">
            <Input
              value={newGalleryInput}
              onChange={(e) => onNewGalleryInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddGalleryImage();
                }
              }}
              placeholder="Or paste additional Cloudinary image URL..."
              className="h-10 rounded-xl text-xs font-mono"
            />
            <Button
              type="button"
              size="sm"
              onClick={() => onAddGalleryImage()}
              className="rounded-xl text-xs h-10 px-4 shrink-0 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add
            </Button>
          </div>
        </div>

        {/* Empty State or Uploaded Gallery Grid */}
        {validGallery.length === 0 ? (
          <div
            onClick={() => !isUploadingGallery && galleryInputRef.current?.click()}
            className="rounded-xl border border-dashed border-border/80 bg-background/50 p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <Cloud className="h-6 w-6 mx-auto text-muted-foreground/70 mb-1.5" />
            <p className="text-xs font-medium text-foreground">No gallery photos uploaded yet</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Click here or drag &amp; drop one or multiple images (back label, texture swatch, packaging) to upload directly to Cloudinary.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {validGallery.map((imgUrl, idx) => {
              const isCover = image === imgUrl;
              return (
                <div
                  key={`${imgUrl}-${idx}`}
                  className={`group relative rounded-xl overflow-hidden border bg-card p-1.5 transition-all ${
                    isCover ? "border-primary ring-1 ring-primary/40 shadow-xs" : "border-border/80"
                  }`}
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/30">
                    <img
                      src={imgUrl}
                      alt={`Gallery ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                    {isCover && (
                      <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[8.5px] font-bold px-1.5 py-0.5 rounded shadow-xs uppercase">
                        Cover
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] px-0.5">
                    {isCover ? (
                      <span className="text-primary font-bold">Active Cover</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onImageChange(imgUrl)}
                        className="text-muted-foreground hover:text-primary font-medium cursor-pointer transition-colors"
                      >
                        Make Cover
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onRemoveGalleryImage(imgUrl)}
                      className="text-muted-foreground hover:text-rose-600 transition-colors cursor-pointer font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState } from "react";
import { Package, Upload, Loader2, Trash2, Cloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BRANDS, CATEGORIES } from "@/lib/catalog";
import { adminApi } from "@/lib/api";
import { useAdmin } from "@/context/admin-context";
import { toast } from "sonner";

interface QuickAddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickAddProductModal({ open, onOpenChange }: QuickAddProductModalProps) {
  const { addProduct } = useAdmin();
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [prodName, setProdName] = useState("");
  const [prodBrand, setProdBrand] = useState<string>(BRANDS[0] || "Shiseido");
  const [prodCat, setProdCat] = useState<string>(CATEGORIES[0] || "Serum");
  const [prodPrice, setProdPrice] = useState("2800");
  const [prodCost, setProdCost] = useState("1750");
  const [prodStock, setProdStock] = useState("30");
  const [prodSku, setProdSku] = useState("");
  const [prodImage, setProdImage] = useState("");
  const [prodGallery, setProdGallery] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleUploadFiles = async (files: FileList | null, asCover: boolean) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          toast.error(`Skipped "${file.name}" — invalid image format.`);
          continue;
        }
        const data = await adminApi.uploadImage(file);
        if (data?.url) uploaded.push(data.url);
      }

      if (uploaded.length > 0) {
        if (asCover) {
          setProdImage(uploaded[0]!);
          setProdGallery((prev) => [uploaded[0]!, ...prev.filter((u) => u !== uploaded[0])]);
        } else {
          setProdGallery((prev) => {
            const next = [...prev];
            for (const url of uploaded) {
              if (!next.includes(url)) next.push(url);
            }
            return next;
          });
          setProdImage((prev) => prev.trim() || uploaded[0]!);
        }
        toast.success(`Uploaded ${uploaded.length} image(s) to Cloudinary! ☁️`);
      }
    } catch (err: any) {
      toast.error(err?.message || "Cloudinary upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (url: string) => {
    setProdGallery((prev) => {
      const remaining = prev.filter((u) => u !== url);
      if (prodImage === url) {
        setProdImage(remaining[0] || "");
      }
      return remaining;
    });
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      toast.error("Please enter a product title.");
      return;
    }

    const cleanCover = prodImage.trim() || prodGallery[0] || "";
    if (!cleanCover) {
      toast.error("Please upload a product cover image to Cloudinary.");
      return;
    }

    const allImages = [cleanCover, ...prodGallery.filter((u) => u && u !== cleanCover)];
    const priceNum = parseFloat(prodPrice) || 0;
    const costNum = parseFloat(prodCost) || Math.round(priceNum * 0.6);
    const stockNum = parseInt(prodStock, 10) || 0;
    const generatedSku =
      prodSku.trim() ||
      `${prodBrand.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    setIsSaving(true);
    try {
      await addProduct({
        name: prodName.trim(),
        japaneseName: `${prodBrand} プレミアム処方`,
        brand: prodBrand,
        category: prodCat,
        productType: "in-stock",
        price: priceNum,
        compareAt: Math.round(priceNum * 1.25),
        costPrice: costNum,
        stock: stockNum,
        lowStockThreshold: 5,
        sku: generatedSku,
        barcode: `4580${Math.floor(10000000 + Math.random() * 90000000)}`,
        badge: "New",
        status: "active",
        rating: 5.0,
        reviewsCount: 1,
        image: cleanCover,
        images: allImages,
        short: "Imported authentic Japanese formulation.",
        description: "Authentic Tokyo formulation with skin-soothing botanical extracts.",
        ingredients: ["Sakura Extract", "Rice Ferment Filtrate", "Hyaluronic Acid"],
        benefits: ["Deep 72-hour hydration", "Moisture barrier repair", "Radiant glass-skin finish"],
        howTo: "Dispense appropriate amount and massage gently.",
        skinTypes: ["All Skin Types"],
        concerns: ["Hydration"],
        sizes: ["50ml"],
        origin: "Tokyo, Japan",
        texture: "Lightweight Essence",
        pao: "12M",
      });

      toast.success(`Product "${prodName}" added to catalog! 🌸`);
      onOpenChange(false);
      setProdName("");
      setProdSku("");
      setProdImage("");
      setProdGallery([]);
    } catch (err: any) {
      toast.error(err?.message || "Failed to create product");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <Package className="h-5 w-5 text-primary" />
            Add Product to Tokyo Catalog
          </DialogTitle>
          <DialogDescription className="text-xs">
            Quickly create a new Japanese skincare SKU with Cloudinary image hosting.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateProduct} className="space-y-4 pt-2">
          <div>
            <Label className="text-xs font-semibold">Product Title *</Label>
            <Input
              required
              value={prodName}
              onChange={(e) => setProdName(e.target.value)}
              placeholder="e.g. Rohto Melano CC Intensive Anti-Spot Essence"
              className="mt-1 h-9 rounded-full text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold">Japanese Brand</Label>
              <select
                value={prodBrand}
                onChange={(e) => setProdBrand(e.target.value)}
                className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
              >
                {BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-xs font-semibold">Category</Label>
              <select
                value={prodCat}
                onChange={(e) => setProdCat(e.target.value)}
                className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs font-semibold">Retail Price (৳)</Label>
              <Input
                type="number"
                required
                value={prodPrice}
                onChange={(e) => setProdPrice(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Cost Price (৳)</Label>
              <Input
                type="number"
                value={prodCost}
                onChange={(e) => setProdCost(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Initial Stock</Label>
              <Input
                type="number"
                required
                value={prodStock}
                onChange={(e) => setProdStock(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>
          </div>

          {/* Pure Cloudinary Cover & Additional Images */}
          <div className="space-y-2.5 rounded-xl border border-border/80 bg-secondary/15 p-3.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Product Media (Cloudinary) *</Label>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
                <Cloud className="h-3 w-3 text-sky-500" /> Cloudinary CDN
              </span>
            </div>

            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                void handleUploadFiles(e.target.files, true);
                e.target.value = "";
              }}
              className="hidden"
            />
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                void handleUploadFiles(e.target.files, false);
                e.target.value = "";
              }}
              className="hidden"
            />

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isUploading}
                onClick={() => coverInputRef.current?.click()}
                className="rounded-xl text-xs h-8 px-3 border-primary/40 text-primary hover:bg-primary/10"
              >
                {isUploading ? (
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                ) : (
                  <Upload className="h-3.5 w-3.5 mr-1.5" />
                )}
                {prodImage ? "Replace Cover" : "Upload Cover Photo"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isUploading}
                onClick={() => galleryInputRef.current?.click()}
                className="rounded-xl text-xs h-8 px-3"
              >
                <Upload className="h-3.5 w-3.5 mr-1.5" />
                Add More Photos
              </Button>
            </div>

            {prodGallery.length > 0 && (
              <div className="grid grid-cols-4 gap-2 pt-1">
                {prodGallery.map((url, idx) => (
                  <div
                    key={`${url}-${idx}`}
                    className={`relative aspect-square rounded-lg overflow-hidden border ${
                      prodImage === url ? "border-primary ring-1 ring-primary/40" : "border-border"
                    }`}
                  >
                    <img src={url} alt={`Uploaded ${idx + 1}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(url)}
                      className="absolute top-1 right-1 rounded-full bg-background/90 p-1 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                      aria-label="Remove photo"
                    >
                      <Trash2 className="h-2.5 w-2.5" />
                    </button>
                    {prodImage === url && (
                      <span className="absolute bottom-0.5 left-0.5 rounded bg-primary/90 px-1 py-0.5 text-[8px] font-bold text-primary-foreground uppercase">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="rounded-full text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isUploading || isSaving}
              className="rounded-full text-xs px-5"
            >
              {isSaving ? "Publishing..." : "Save & Publish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

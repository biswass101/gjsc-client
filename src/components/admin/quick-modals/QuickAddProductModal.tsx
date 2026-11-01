"use client";

import React, { useState } from "react";
import { Package } from "lucide-react";
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
import { useAdmin } from "@/context/admin-context";
import { toast } from "sonner";

interface QuickAddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickAddProductModal({ open, onOpenChange }: QuickAddProductModalProps) {
  const { addProduct } = useAdmin();

  const [prodName, setProdName] = useState("");
  const [prodBrand, setProdBrand] = useState<string>(BRANDS[0] || "Shiseido");
  const [prodCat, setProdCat] = useState<string>(CATEGORIES[0] || "Serum");
  const [prodPrice, setProdPrice] = useState("2800");
  const [prodCost, setProdCost] = useState("1750");
  const [prodStock, setProdStock] = useState("30");
  const [prodSku, setProdSku] = useState("");
  const [prodImage, setProdImage] = useState(
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      toast.error("Please enter a product title.");
      return;
    }
    const priceNum = parseFloat(prodPrice) || 0;
    const costNum = parseFloat(prodCost) || Math.round(priceNum * 0.6);
    const stockNum = parseInt(prodStock, 10) || 0;
    const generatedSku =
      prodSku.trim() ||
      `${prodBrand.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    addProduct({
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
      image: prodImage,
      images: [prodImage],
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
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <Package className="h-5 w-5 text-primary" />
            Add Product to Tokyo Catalog
          </DialogTitle>
          <DialogDescription className="text-xs">
            Quickly create a new Japanese skincare SKU with instant inventory tracking.
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

          <div>
            <Label className="text-xs font-semibold">Image URL (Unsplash or direct asset)</Label>
            <Input
              value={prodImage}
              onChange={(e) => setProdImage(e.target.value)}
              className="mt-1 h-9 rounded-full text-xs"
            />
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
            <Button type="submit" size="sm" className="rounded-full text-xs px-5">
              Save & Publish
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

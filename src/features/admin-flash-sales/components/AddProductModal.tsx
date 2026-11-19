"use client";

import React, { useState, useMemo } from "react";
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
import { Search, Flame, Check } from "lucide-react";
import type { AdminProduct } from "@/types";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (productDeal: {
    productId: number;
    flashPrice: number;
    originalPrice: number;
    discountPercent: number;
    allocatedStock: number;
    claimedCount: number;
  }) => Promise<void>;
  products: AdminProduct[];
  existingProductIds: number[];
}

export function AddProductModal({
  isOpen,
  onClose,
  onAdd,
  products,
  existingProductIds,
}: AddProductModalProps) {
  const [search, setSearch] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [flashPrice, setFlashPrice] = useState<number | "">("");
  const [allocatedStock, setAllocatedStock] = useState<number>(15);
  const [claimedCount, setClaimedCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Filter available products
  const availableProducts = useMemo(() => {
    return products.filter((p) => {
      const numId = Number(p.id);
      if (existingProductIds.includes(numId)) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
      );
    });
  }, [products, existingProductIds, search]);

  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return products.find((p) => Number(p.id) === selectedProductId) || null;
  }, [selectedProductId, products]);

  const originalPrice = selectedProduct?.price || 0;
  const currentFlashPrice = typeof flashPrice === "number" ? flashPrice : 0;
  const discountPercent =
    originalPrice > 0 && currentFlashPrice > 0 && currentFlashPrice < originalPrice
      ? Math.round(((originalPrice - currentFlashPrice) / originalPrice) * 100)
      : 0;

  const handleSelectProduct = (prod: AdminProduct) => {
    const numId = Number(prod.id);
    setSelectedProductId(numId);
    // Suggest 20% discount as default
    const suggested = Math.round(prod.price * 0.8);
    setFlashPrice(suggested);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !flashPrice || flashPrice <= 0) return;

    setLoading(true);
    try {
      await onAdd({
        productId: selectedProductId,
        flashPrice: Number(flashPrice),
        originalPrice,
        discountPercent,
        allocatedStock: Math.max(1, allocatedStock),
        claimedCount: Math.max(0, claimedCount),
      });
      onClose();
      setSelectedProductId(null);
      setFlashPrice("");
      setSearch("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl bg-card border-border/80 max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold flex items-center gap-2">
            <Flame className="h-5 w-5 text-rose-500 fill-rose-500" />
            Add Product to Flash Drop
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Select an inventory item, define its flash discount price, and set a quota for limited deal stock drops.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 py-2 text-xs">
          {/* Step 1: Search & Pick Product */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold">1. Search Catalog Products</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by product name, brand or slug..."
                className="pl-9 h-9 rounded-lg text-xs"
              />
            </div>

            <div className="max-h-40 overflow-y-auto rounded-lg border border-border/60 divide-y divide-border/40 bg-muted/20">
              {availableProducts.length === 0 ? (
                <div className="p-4 text-center text-xs text-muted-foreground">
                  No unassigned products found matching your search.
                </div>
              ) : (
                availableProducts.slice(0, 15).map((p) => {
                  const numId = Number(p.id);
                  const isSelected = selectedProductId === numId;
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className={`flex items-center justify-between p-2.5 cursor-pointer transition-colors ${
                        isSelected ? "bg-rose-500/10 border-l-4 border-rose-500" : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-9 w-9 rounded-md object-cover border border-border/50 shrink-0"
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center text-[10px] text-muted-foreground shrink-0">
                            No Img
                          </div>
                        )}
                        <div className="truncate">
                          <p className="font-semibold text-foreground truncate">{p.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {p.brand || "Glorious Japan"} • In Stock: {p.stock}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        <span className="font-mono font-semibold text-foreground">
                          ৳{p.price.toLocaleString()}
                        </span>
                        {isSelected && <Check className="h-4 w-4 text-rose-600 font-bold" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Step 2: Pricing & Stock Quotas */}
          {selectedProduct && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                <span className="text-xs font-semibold text-foreground">Selected Product:</span>
                <span className="text-xs font-bold text-rose-600">{selectedProduct.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-[11px] font-semibold text-muted-foreground">
                    Regular Storefront Price
                  </Label>
                  <div className="h-9 rounded-lg border border-border/60 bg-muted/40 px-3 flex items-center font-mono font-semibold text-muted-foreground">
                    ৳{originalPrice.toLocaleString()}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-[11px] font-semibold text-rose-600">
                    Flash Deal Price (৳) *
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max={originalPrice - 1}
                    value={flashPrice}
                    onChange={(e) => setFlashPrice(e.target.value ? Number(e.target.value) : "")}
                    placeholder="e.g. 1990"
                    required
                    className="h-9 rounded-lg font-mono font-bold text-rose-600 border-rose-500/40"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-[11px] font-semibold text-muted-foreground">
                    Discount Savings
                  </Label>
                  <div className="h-9 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 flex items-center font-bold text-emerald-600">
                    {discountPercent > 0 ? `-${discountPercent}% OFF` : "No discount"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <Label className="text-[11px] font-semibold">
                    Allocated Deal Stock Quota *
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max={selectedProduct.stock || 999}
                    value={allocatedStock}
                    onChange={(e) => setAllocatedStock(Number(e.target.value))}
                    required
                    className="h-9 rounded-lg font-mono text-xs"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Limit of units sold at this special price before reverting.
                  </p>
                </div>

                <div className="space-y-1">
                  <Label className="text-[11px] font-semibold">
                    Already Claimed Units (Initial)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max={allocatedStock}
                    value={claimedCount}
                    onChange={(e) => setClaimedCount(Number(e.target.value))}
                    className="h-9 rounded-lg font-mono text-xs"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Simulates urgency progress (e.g. {Math.round((claimedCount / allocatedStock) * 100)}% claimed).
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={loading || !selectedProductId || !flashPrice}
              className="bg-rose-600 hover:bg-rose-500 text-white font-semibold gap-1.5"
            >
              <Flame className="h-4 w-4" />
              {loading ? "Adding Deal..." : "Add to Flash Drop"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


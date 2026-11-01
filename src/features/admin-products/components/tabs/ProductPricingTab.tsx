"use client";

import { DollarSign, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ComputedMarginMetrics } from "../../types";

export interface ProductPricingTabProps {
  price: string;
  onPriceChange: (val: string) => void;
  compareAt: string;
  onCompareAtChange: (val: string) => void;
  costPrice: string;
  onCostPriceChange: (val: string) => void;
  stock: string;
  onStockChange: (val: string) => void;
  lowStockThreshold: string;
  onLowStockThresholdChange: (val: string) => void;
  sku: string;
  onSkuChange: (val: string) => void;
  barcode: string;
  onBarcodeChange: (val: string) => void;
  sizes: string;
  onSizesChange: (val: string) => void;
  computedMargin: ComputedMarginMetrics;
  onGenerateSku: () => void;
  onGenerateBarcode: () => void;
}

export function ProductPricingTab({
  price,
  onPriceChange,
  compareAt,
  onCompareAtChange,
  costPrice,
  onCostPriceChange,
  stock,
  onStockChange,
  lowStockThreshold,
  onLowStockThresholdChange,
  sku,
  onSkuChange,
  barcode,
  onBarcodeChange,
  sizes,
  onSizesChange,
  computedMargin,
  onGenerateSku,
  onGenerateBarcode,
}: ProductPricingTabProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Dynamic Live Profit Analysis Widget */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
        <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
          <span className="font-semibold text-xs text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
            Live Unit Profitability & Margin Health
          </span>
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            Margin: {computedMargin.percent}%
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-3 text-center">
          <div>
            <span className="block text-[11px] text-muted-foreground">Gross Profit / Unit</span>
            <span className="block font-mono font-bold text-base sm:text-lg text-emerald-600 dark:text-emerald-400">
              ৳{computedMargin.profit.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="block text-[11px] text-muted-foreground">Gross Margin</span>
            <span className="block font-mono font-bold text-base sm:text-lg text-foreground">
              {computedMargin.percent}%
            </span>
          </div>
          <div>
            <span className="block text-[11px] text-muted-foreground">Buyer Discount</span>
            <span className="block font-mono font-bold text-base sm:text-lg text-rose">
              {computedMargin.discount > 0 ? `-${computedMargin.discount}% OFF` : "Full Retail"}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className="text-xs font-bold text-foreground">
            Retail Price (৳ BDT) <span className="text-rose-500">*</span>
          </Label>
          <Input
            type="number"
            required
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            className="mt-1.5 h-10 rounded-xl text-xs font-semibold"
          />
        </div>

        <div>
          <Label className="text-xs font-bold text-foreground">Compare-at Price (৳ BDT)</Label>
          <Input
            type="number"
            value={compareAt}
            onChange={(e) => onCompareAtChange(e.target.value)}
            placeholder="Optional original strike price"
            className="mt-1.5 h-10 rounded-xl text-xs font-medium"
          />
        </div>

        <div>
          <Label className="text-xs font-bold text-foreground">Cost of Goods / COGS (৳ BDT)</Label>
          <Input
            type="number"
            value={costPrice}
            onChange={(e) => onCostPriceChange(e.target.value)}
            placeholder="Landed import cost"
            className="mt-1.5 h-10 rounded-xl text-xs font-medium"
          />
        </div>
      </div>

      {/* SKU & Barcode Generator */}
      <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-3">
        <h3 className="font-semibold text-xs text-foreground uppercase tracking-wider">
          Logistics Barcoding & Identification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-foreground">SKU Code</Label>
              <button
                type="button"
                onClick={onGenerateSku}
                className="text-[10.5px] text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" /> Auto-Generate
              </button>
            </div>
            <Input
              value={sku}
              onChange={(e) => onSkuChange(e.target.value)}
              placeholder="e.g. SHI-1042"
              className="mt-1.5 h-10 rounded-xl text-xs font-mono"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-foreground flex items-center gap-1">
                JAN Barcode (Japanese Article Number)
              </Label>
              <button
                type="button"
                onClick={onGenerateBarcode}
                className="text-[10.5px] text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" /> Auto-Generate JAN
              </button>
            </div>
            <Input
              value={barcode}
              onChange={(e) => onBarcodeChange(e.target.value)}
              placeholder="e.g. 4580123456789"
              className="mt-1.5 h-10 rounded-xl text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Inventory Quantities & Sizing */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className="text-xs font-bold text-foreground">Available Stock Qty</Label>
          <Input
            type="number"
            required
            value={stock}
            onChange={(e) => onStockChange(e.target.value)}
            className="mt-1.5 h-10 rounded-xl text-xs font-semibold"
          />
        </div>

        <div>
          <Label className="text-xs font-bold text-foreground">Low Stock Alert Threshold</Label>
          <Input
            type="number"
            value={lowStockThreshold}
            onChange={(e) => onLowStockThresholdChange(e.target.value)}
            placeholder="Default 5"
            className="mt-1.5 h-10 rounded-xl text-xs font-medium"
          />
        </div>

        <div>
          <Label className="text-xs font-bold text-foreground">Available Sizes / Volumes</Label>
          <Input
            value={sizes}
            onChange={(e) => onSizesChange(e.target.value)}
            placeholder="e.g. 30ml, 50ml, 100ml, 170ml Refill"
            className="mt-1.5 h-10 rounded-xl text-xs font-medium"
          />
        </div>
      </div>
    </div>
  );
}

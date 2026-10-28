"use client";

import React, { useState, useMemo } from "react";
import {
  Tag,
  Plus,
  Copy,
  Check,
  Percent,
  DollarSign,
  Truck,
  Sparkles,
  Calendar,
  Trash2,
  Power,
  TrendingUp,
} from "lucide-react";
import { useAdmin, AdminDiscount } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AdminDiscountsPage() {
  const { discounts, addDiscount, toggleDiscount, deleteDiscount } = useAdmin();

  // Create Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [type, setType] = useState<AdminDiscount["type"]>("percentage");
  const [value, setValue] = useState("10");
  const [minSpend, setMinSpend] = useState("2000");
  const [usageLimit, setUsageLimit] = useState("500");
  const [endDate, setEndDate] = useState("2026-12-31");

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeDiscounts = useMemo(
    () => discounts.filter((d) => d.status === "active"),
    [discounts]
  );

  const totalRedemptions = useMemo(
    () => discounts.reduce((sum, d) => sum + d.usageCount, 0),
    [discounts]
  );

  const handleCopy = (coupon: AdminDiscount) => {
    navigator.clipboard.writeText(coupon.code);
    setCopiedId(coupon.id);
    toast.success(`Copied code ${coupon.code} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }

    addDiscount({
      code: code.trim().toUpperCase(),
      type,
      value: parseFloat(value) || 10,
      minSpend: parseFloat(minSpend) || 0,
      usageLimit: parseInt(usageLimit, 10) || 100,
      status: "active",
      startDate: new Date().toISOString().slice(0, 10),
      endDate: endDate || "2026-12-31",
    });

    toast.success(`Coupon code "${code.toUpperCase()}" created and active! 🌸`);
    setIsOpen(false);
    setCode("");
  };

  const applyTemplate = (tmpl: {
    code: string;
    type: AdminDiscount["type"];
    val: string;
    min: string;
    limit: string;
  }) => {
    setCode(tmpl.code);
    setType(tmpl.type);
    setValue(tmpl.val);
    setMinSpend(tmpl.min);
    setUsageLimit(tmpl.limit);
    setIsOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-primary">Marketing & Conversion Optimization</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
              {activeDiscounts.length} Active Codes
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-foreground">
            Promotional Coupons & Discount Rules
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Create percentage vouchers, cash rebates (BDT), and free shipping codes with spend thresholds and usage ceilings.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => {
            setCode("");
            setValue("10");
            setMinSpend("2000");
            setUsageLimit("500");
            setIsOpen(true);
          }}
          className="rounded-full text-xs h-8 px-4 gap-1.5 shadow-2xs font-semibold"
        >
          <Plus className="h-3.5 w-3.5" />
          Create Coupon
        </Button>
      </div>

      {/* Analytics Strip */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="surface-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Active Campaign Vouchers
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-foreground">
            {activeDiscounts.length} Active
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {discounts.length - activeDiscounts.length} expired or paused
          </p>
        </div>

        <div className="surface-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Total Customer Redemptions
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-emerald-600">
            {totalRedemptions} Uses
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Average +26% cart size uplift
          </p>
        </div>

        <div className="surface-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Top Performing Code
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-primary font-mono">
            {discounts[0]?.code || "TOKYO10"}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {discounts[0]?.usageCount || 0} redemptions in Bangladesh
          </p>
        </div>
      </div>

      {/* Quick Campaign Templates */}
      <div className="surface-card p-4 space-y-3">
        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> One-Click Campaign Presets
        </p>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() =>
              applyTemplate({
                code: "TOKYO15",
                type: "percentage",
                val: "15",
                min: "3000",
                limit: "300",
              })
            }
            className="flex items-center gap-2 rounded-full border border-border/80 bg-secondary/30 px-3 py-1.5 text-xs text-foreground hover:bg-secondary transition-all"
          >
            <Percent className="h-3 w-3 text-primary" />
            <span>15% Off Tokyo Weekend (Min ৳3,000)</span>
          </button>

          <button
            type="button"
            onClick={() =>
              applyTemplate({
                code: "DHAKAFREE",
                type: "free_shipping",
                val: "60",
                min: "2500",
                limit: "1000",
              })
            }
            className="flex items-center gap-2 rounded-full border border-border/80 bg-secondary/30 px-3 py-1.5 text-xs text-foreground hover:bg-secondary transition-all"
          >
            <Truck className="h-3 w-3 text-blue-600" />
            <span>Free Dhaka Shipping (Min ৳2,500)</span>
          </button>

          <button
            type="button"
            onClick={() =>
              applyTemplate({
                code: "VIP500",
                type: "fixed",
                val: "500",
                min: "4500",
                limit: "150",
              })
            }
            className="flex items-center gap-2 rounded-full border border-border/80 bg-secondary/30 px-3 py-1.5 text-xs text-foreground hover:bg-secondary transition-all"
          >
            <DollarSign className="h-3 w-3 text-emerald-600" />
            <span>৳500 Instant Cashback (Min ৳4,500)</span>
          </button>
        </div>
      </div>

      {/* Discounts Table */}
      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/70 bg-secondary/30 text-muted-foreground font-semibold">
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount Type & Benefit</th>
                <th className="py-3 px-4">Min Order Threshold</th>
                <th className="py-3 px-4 text-center">Usage Progress</th>
                <th className="py-3 px-4">Validity</th>
                <th className="py-3 px-4 text-center">Active Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {discounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    No promotional coupons created yet. Click "Create Coupon" to launch your first offer.
                  </td>
                </tr>
              ) : (
                discounts.map((d) => {
                  const percentUsed = Math.min(100, Math.round((d.usageCount / d.usageLimit) * 100));

                  return (
                    <tr key={d.id} className="hover:bg-secondary/20 transition-colors">
                      {/* Code */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-foreground bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
                            {d.code}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(d)}
                            className="text-muted-foreground hover:text-foreground"
                            title="Copy code"
                          >
                            {copiedId === d.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Type & Value */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-foreground text-xs">
                          {d.type === "percentage"
                            ? `${d.value}% Off Entire Order`
                            : d.type === "fixed"
                            ? `৳${d.value.toLocaleString()} Direct Discount`
                            : "Free Delivery in Bangladesh"}
                        </p>
                        <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                          {d.type}
                        </p>
                      </td>

                      {/* Min Spend */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-foreground">
                        {d.minSpend > 0 ? `৳${d.minSpend.toLocaleString()}` : "No Minimum"}
                      </td>

                      {/* Usage */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="space-y-1 max-w-[120px] mx-auto">
                          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                            <span>{d.usageCount} used</span>
                            <span>{d.usageLimit} max</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${percentUsed}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Validity */}
                      <td className="py-3.5 px-4 text-muted-foreground font-mono text-[11px]">
                        Until {d.endDate}
                      </td>

                      {/* Status Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                            d.status === "active"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300"
                              : "bg-secondary text-muted-foreground border-border/80"
                          }`}
                        >
                          {d.status === "active" ? "Active" : "Paused"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              toggleDiscount(d.id);
                              toast.info(`Toggled status of ${d.code}`);
                            }}
                            className="rounded-md border border-border px-2 py-1 text-[11px] font-medium hover:bg-secondary"
                          >
                            {d.status === "active" ? "Pause" : "Enable"}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete coupon ${d.code}?`)) {
                                deleteDiscount(d.id);
                                toast.info(`Deleted ${d.code}`);
                              }
                            }}
                            className="text-muted-foreground hover:text-rose p-1"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Discount Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <Tag className="h-5 w-5 text-primary" />
              Create Promotional Coupon
            </DialogTitle>
            <DialogDescription className="text-xs">
              Configure code name, percentage or fixed value, and redemption limits.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4 pt-2 text-xs">
            <div>
              <Label className="text-xs font-semibold">Coupon Code *</Label>
              <Input
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. SAKURA20"
                className="mt-1 h-9 rounded-full text-xs font-mono font-bold tracking-wider uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Discount Type</Label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
                >
                  <option value="percentage">Percentage Off (%)</option>
                  <option value="fixed">Fixed Amount (৳)</option>
                  <option value="free_shipping">Free Shipping</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-semibold">
                  {type === "percentage" ? "Percentage (%)" : "Value (৳)"}
                </Label>
                <Input
                  type="number"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Min Spend Threshold (৳)</Label>
                <Input
                  type="number"
                  value={minSpend}
                  onChange={(e) => setMinSpend(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Usage Limit (Redemptions)</Label>
                <Input
                  type="number"
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold">Expiry Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="rounded-full text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="rounded-full text-xs px-5">
                Save & Activate
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

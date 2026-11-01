"use client";

import React, { useState } from "react";
import { Tag } from "lucide-react";
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
import { useAdmin } from "@/context/admin-context";
import { toast } from "sonner";

interface QuickAddDiscountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickAddDiscountModal({ open, onOpenChange }: QuickAddDiscountModalProps) {
  const { addDiscount } = useAdmin();

  const [discCode, setDiscCode] = useState("");
  const [discType, setDiscType] = useState<"percentage" | "fixed" | "free_shipping">("percentage");
  const [discValue, setDiscValue] = useState("15");
  const [discMinSpend, setDiscMinSpend] = useState("2500");
  const [discLimit, setDiscLimit] = useState("200");

  const handleCreateDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discCode.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }

    addDiscount({
      code: discCode.trim().toUpperCase(),
      type: discType,
      value: parseFloat(discValue) || 10,
      minSpend: parseFloat(discMinSpend) || 0,
      usageLimit: parseInt(discLimit, 10) || 100,
      status: "active",
      startDate: new Date().toISOString().slice(0, 10),
      endDate: "2026-12-31",
    });

    toast.success(`Coupon code ${discCode.toUpperCase()} activated! 🎉`);
    onOpenChange(false);
    setDiscCode("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <Tag className="h-5 w-5 text-primary" />
            Create Promo Coupon
          </DialogTitle>
          <DialogDescription className="text-xs">
            Generate a high-converting promotional voucher for campaigns or VIP buyers.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateDiscount} className="space-y-4 pt-2">
          <div>
            <Label className="text-xs font-semibold">Coupon Code *</Label>
            <Input
              required
              value={discCode}
              onChange={(e) => setDiscCode(e.target.value.toUpperCase())}
              placeholder="e.g. SAKURA15"
              className="mt-1 h-9 rounded-full text-xs uppercase font-mono tracking-wider font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold">Discount Type</Label>
              <select
                value={discType}
                onChange={(e) =>
                  setDiscType(e.target.value as "percentage" | "fixed" | "free_shipping")
                }
                className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
              >
                <option value="percentage">Percentage Off (%)</option>
                <option value="fixed">Fixed Amount (৳)</option>
                <option value="free_shipping">Free Shipping</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-semibold">
                {discType === "percentage" ? "Percentage (%)" : "Value (৳)"}
              </Label>
              <Input
                type="number"
                required
                value={discValue}
                onChange={(e) => setDiscValue(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold">Min Spend (৳)</Label>
              <Input
                type="number"
                value={discMinSpend}
                onChange={(e) => setDiscMinSpend(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Max Uses Limit</Label>
              <Input
                type="number"
                value={discLimit}
                onChange={(e) => setDiscLimit(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>
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
              Create & Activate
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { AdminDiscount } from "@/context/admin-context";

export interface CreateDiscountModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  code: string;
  onCodeChange: (val: string) => void;
  type: AdminDiscount["type"];
  onTypeChange: (val: AdminDiscount["type"]) => void;
  value: string;
  onValueChange: (val: string) => void;
  minSpend: string;
  onMinSpendChange: (val: string) => void;
  usageLimit: string;
  onUsageLimitChange: (val: string) => void;
  endDate: string;
  onEndDateChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CreateDiscountModal({
  isOpen,
  onOpenChange,
  code,
  onCodeChange,
  type,
  onTypeChange,
  value,
  onValueChange,
  minSpend,
  onMinSpendChange,
  usageLimit,
  onUsageLimitChange,
  endDate,
  onEndDateChange,
  onSubmit,
}: CreateDiscountModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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

        <form onSubmit={onSubmit} className="space-y-4 pt-2 text-xs">
          <div>
            <Label className="text-xs font-semibold">Coupon Code *</Label>
            <Input
              required
              value={code}
              onChange={(e) => onCodeChange(e.target.value.toUpperCase())}
              placeholder="e.g. SAKURA20"
              className="mt-1 h-9 rounded-full text-xs font-mono font-bold tracking-wider uppercase"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold">Discount Type</Label>
              <select
                value={type}
                onChange={(e) => onTypeChange(e.target.value as AdminDiscount["type"])}
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
                onChange={(e) => onValueChange(e.target.value)}
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
                onChange={(e) => onMinSpendChange(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Usage Limit (Redemptions)</Label>
              <Input
                type="number"
                value={usageLimit}
                onChange={(e) => onUsageLimitChange(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold">Expiry Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="mt-1 h-9 rounded-full text-xs"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="rounded-full text-xs cursor-pointer"
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="rounded-full text-xs px-5 cursor-pointer">
              Save & Activate
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


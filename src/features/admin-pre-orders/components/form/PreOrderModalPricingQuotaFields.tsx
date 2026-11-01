import React from "react";
import type { AdminPreOrder } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BATCH_STATUSES } from "../../constants";

interface PreOrderModalPricingQuotaFieldsProps {
  price: string;
  setPrice: (val: string) => void;
  depositPercent: string;
  setDepositPercent: (val: string) => void;
  estimatedArrival: string;
  setEstimatedArrival: (val: string) => void;
  batchStatus: AdminPreOrder["batchStatus"];
  setBatchStatus: (val: AdminPreOrder["batchStatus"]) => void;
  slotsTotal: string;
  setSlotsTotal: (val: string) => void;
  slotsBooked: string;
  setSlotsBooked: (val: string) => void;
}

export function PreOrderModalPricingQuotaFields({
  price,
  setPrice,
  depositPercent,
  setDepositPercent,
  estimatedArrival,
  setEstimatedArrival,
  batchStatus,
  setBatchStatus,
  slotsTotal,
  setSlotsTotal,
  slotsBooked,
  setSlotsBooked,
}: PreOrderModalPricingQuotaFieldsProps) {
  const depositAmount = (
    (parseFloat(price) || 0) *
    ((parseInt(depositPercent, 10) || 50) / 100)
  ).toFixed(0);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="po-price" className="text-xs font-semibold">
            Full Retail Price (BDT ৳) <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="po-price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={1}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="po-deposit" className="text-xs font-semibold">
            Advance Booking Deposit (% of Price)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="po-deposit"
              type="number"
              value={depositPercent}
              onChange={(e) => setDepositPercent(e.target.value)}
              min={10}
              max={100}
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              = ৳{depositAmount} deposit
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="po-eta" className="text-xs font-semibold">
            Estimated Arrival in Dhaka (ETA) <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="po-eta"
            value={estimatedArrival}
            onChange={(e) => setEstimatedArrival(e.target.value)}
            placeholder="e.g. 15 Nov 2026"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="po-stage" className="text-xs font-semibold">
            Current Air-Freight Batch Stage
          </Label>
          <Select
            value={batchStatus}
            onValueChange={(val) => setBatchStatus(val as AdminPreOrder["batchStatus"])}
          >
            <SelectTrigger id="po-stage">
              <SelectValue placeholder="Select batch stage" />
            </SelectTrigger>
            <SelectContent>
              {BATCH_STATUSES.map((b) => (
                <SelectItem key={b.status} value={b.status}>
                  {b.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="po-total-slots" className="text-xs font-semibold">
            Total Flight Quota Allocation (Slots)
          </Label>
          <Input
            id="po-total-slots"
            type="number"
            value={slotsTotal}
            onChange={(e) => setSlotsTotal(e.target.value)}
            min={1}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="po-booked-slots" className="text-xs font-semibold">
            Currently Booked Slots
          </Label>
          <Input
            id="po-booked-slots"
            type="number"
            value={slotsBooked}
            onChange={(e) => setSlotsBooked(e.target.value)}
            min={0}
          />
        </div>
      </div>
    </>
  );
}


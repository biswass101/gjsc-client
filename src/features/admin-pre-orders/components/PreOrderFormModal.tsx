import React from "react";
import { Plane } from "lucide-react";
import type { AdminBrand, AdminPreOrder } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { PreOrderModalIdentityFields } from "./form/PreOrderModalIdentityFields";
import { PreOrderModalPricingQuotaFields } from "./form/PreOrderModalPricingQuotaFields";
import { PreOrderModalMediaFields } from "./form/PreOrderModalMediaFields";

interface PreOrderFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingPreOrder: AdminPreOrder | null;
  brands: AdminBrand[];
  onSubmit: (e: React.FormEvent) => void;
  // Field values and setters
  productName: string;
  setProductName: (val: string) => void;
  japaneseName: string;
  setJapaneseName: (val: string) => void;
  brand: string;
  setBrand: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
  depositPercent: string;
  setDepositPercent: (val: string) => void;
  estimatedArrival: string;
  setEstimatedArrival: (val: string) => void;
  slotsTotal: string;
  setSlotsTotal: (val: string) => void;
  slotsBooked: string;
  setSlotsBooked: (val: string) => void;
  batchStatus: AdminPreOrder["batchStatus"];
  setBatchStatus: (val: AdminPreOrder["batchStatus"]) => void;
  image: string;
  setImage: (val: string) => void;
  active: boolean;
  setActive: (val: boolean) => void;
  notes: string;
  setNotes: (val: string) => void;
}

export function PreOrderFormModal({
  isOpen,
  onOpenChange,
  editingPreOrder,
  brands,
  onSubmit,
  productName,
  setProductName,
  japaneseName,
  setJapaneseName,
  brand,
  setBrand,
  category,
  setCategory,
  price,
  setPrice,
  depositPercent,
  setDepositPercent,
  estimatedArrival,
  setEstimatedArrival,
  slotsTotal,
  setSlotsTotal,
  slotsBooked,
  setSlotsBooked,
  batchStatus,
  setBatchStatus,
  image,
  setImage,
  active,
  setActive,
  notes,
  setNotes,
}: PreOrderFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <Plane className="h-5 w-5 text-primary" />
              <span>
                {editingPreOrder ? "Edit Pre-Order Campaign" : "Launch Tokyo Pre-Order Campaign"}
              </span>
            </DialogTitle>
            <DialogDescription>
              Configure Tokyo direct air-cargo arrival dates, quota reservation limits, and required
              customer advance deposits.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <PreOrderModalIdentityFields
              productName={productName}
              setProductName={setProductName}
              japaneseName={japaneseName}
              setJapaneseName={setJapaneseName}
              brand={brand}
              setBrand={setBrand}
              category={category}
              setCategory={setCategory}
              brands={brands}
            />

            <PreOrderModalPricingQuotaFields
              price={price}
              setPrice={setPrice}
              depositPercent={depositPercent}
              setDepositPercent={setDepositPercent}
              estimatedArrival={estimatedArrival}
              setEstimatedArrival={setEstimatedArrival}
              batchStatus={batchStatus}
              setBatchStatus={setBatchStatus}
              slotsTotal={slotsTotal}
              setSlotsTotal={setSlotsTotal}
              slotsBooked={slotsBooked}
              setSlotsBooked={setSlotsBooked}
            />

            <PreOrderModalMediaFields
              image={image}
              setImage={setImage}
              notes={notes}
              setNotes={setNotes}
              active={active}
              setActive={setActive}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
              {editingPreOrder ? "Save Pre-Order Changes" : "Launch Pre-Order Batch"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

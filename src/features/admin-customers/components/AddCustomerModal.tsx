import React from "react";
import { Users } from "lucide-react";
import type { AdminCustomer } from "@/types";
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

interface AddCustomerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  addName: string;
  setAddName: (val: string) => void;
  addPhone: string;
  setAddPhone: (val: string) => void;
  addEmail: string;
  setAddEmail: (val: string) => void;
  addCity: string;
  setAddCity: (val: string) => void;
  addTier: AdminCustomer["tier"];
  setAddTier: (val: AdminCustomer["tier"]) => void;
  addSkinType: string;
  setAddSkinType: (val: string) => void;
}

export function AddCustomerModal({
  isOpen,
  onOpenChange,
  onSubmit,
  addName,
  setAddName,
  addPhone,
  setAddPhone,
  addEmail,
  setAddEmail,
  addCity,
  setAddCity,
  addTier,
  setAddTier,
  addSkinType,
  setAddSkinType,
}: AddCustomerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <Users className="h-5 w-5 text-primary" />
            Add Customer Account
          </DialogTitle>
          <DialogDescription className="text-xs">
            Manually register a customer for telephone orders or VIP showroom visits.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 pt-2">
          <div>
            <Label className="text-xs font-semibold">Customer Full Name *</Label>
            <Input
              required
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
              placeholder="e.g. Mahia Mahi"
              className="mt-1 h-9 rounded-full text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold">Mobile Phone *</Label>
              <Input
                required
                value={addPhone}
                onChange={(e) => setAddPhone(e.target.value)}
                placeholder="017XX-XXXXXX"
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Email Address</Label>
              <Input
                type="email"
                value={addEmail}
                onChange={(e) => setAddEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold">City</Label>
              <Input
                value={addCity}
                onChange={(e) => setAddCity(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">VIP Tier</Label>
              <select
                value={addTier}
                onChange={(e) => setAddTier(e.target.value as AdminCustomer["tier"])}
                className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
              >
                <option value="Standard">Standard</option>
                <option value="VIP">VIP</option>
                <option value="Platinum">Platinum VIP</option>
              </select>
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold">Primary Skin Concern</Label>
            <Input
              value={addSkinType}
              onChange={(e) => setAddSkinType(e.target.value)}
              placeholder="e.g. Oily / Dehydrated"
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
              Register Customer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


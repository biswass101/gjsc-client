import React from "react";
import { Store } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SettingsStoreIdentityCardProps {
  storeName: string;
  setStoreName: (val: string) => void;
  tagline: string;
  setTagline: (val: string) => void;
  contactEmail: string;
  setContactEmail: (val: string) => void;
  contactPhone: string;
  setContactPhone: (val: string) => void;
  warehouseAddress: string;
  setWarehouseAddress: (val: string) => void;
  tokyoOfficeAddress: string;
  setTokyoOfficeAddress: (val: string) => void;
}

export function SettingsStoreIdentityCard({
  storeName,
  setStoreName,
  tagline,
  setTagline,
  contactEmail,
  setContactEmail,
  contactPhone,
  setContactPhone,
  warehouseAddress,
  setWarehouseAddress,
  tokyoOfficeAddress,
  setTokyoOfficeAddress,
}: SettingsStoreIdentityCardProps) {
  return (
    <div className="surface-card p-5 space-y-4">
      <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Store className="h-4 w-4" />
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-foreground">
            Store Identity & Sourcing Offices
          </h2>
          <p className="text-[11px] text-muted-foreground">
            Brand headers and concierge contact lines
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="text-xs font-semibold">Store Brand Name</Label>
          <Input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold">Brand Tagline</Label>
          <Input
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold">Concierge Support Email</Label>
          <Input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold">Hotline / WhatsApp Number</Label>
          <Input
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold">Dhaka Warehouse Hub Address</Label>
          <Input
            value={warehouseAddress}
            onChange={(e) => setWarehouseAddress(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold">Tokyo Sourcing Office Address (Japan)</Label>
          <Input
            value={tokyoOfficeAddress}
            onChange={(e) => setTokyoOfficeAddress(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs"
          />
        </div>
      </div>
    </div>
  );
}


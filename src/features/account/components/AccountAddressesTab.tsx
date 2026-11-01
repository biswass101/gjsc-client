"use client";

import { Edit2, MapPin, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SavedAddress } from "../types";

export interface AccountAddressesTabProps {
  addresses: SavedAddress[];
  onOpenAddressModal: (addr?: SavedAddress) => void;
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AccountAddressesTab({
  addresses,
  onOpenAddressModal,
  onSetDefault,
  onDelete,
}: AccountAddressesTabProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-medium text-foreground">
            Saved Delivery Addresses
          </h2>
          <p className="text-xs text-muted-foreground">
            Manage doorstep destinations across Dhaka and nationwide for instant one-click checkout.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => onOpenAddressModal()}
          className="rounded-full text-xs gap-1.5 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          Add New Address
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`rounded-xl border p-5 shadow-2xs space-y-3 transition-all ${
              addr.isDefault
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-border/80 bg-card hover:border-primary/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold text-xs text-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {addr.label}
              </span>

              {addr.isDefault && (
                <span className="rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-[10px] font-bold">
                  Default Address
                </span>
              )}
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">{addr.name}</p>
              <p>{addr.phone}</p>
              <p className="leading-relaxed">
                {addr.street}, {addr.area}, {addr.city}, {addr.division} Division
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
              {!addr.isDefault ? (
                <button
                  type="button"
                  onClick={() => onSetDefault(addr.id)}
                  className="text-primary hover:underline font-medium text-[11px] cursor-pointer"
                >
                  Set as Default
                </button>
              ) : (
                <span className="text-[11px] text-muted-foreground">Default shipping address</span>
              )}

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenAddressModal(addr)}
                  className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>

                {addresses.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(addr.id)}
                    className="h-7 w-7 rounded-full text-muted-foreground hover:text-rose cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface AccountAddressModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  addressLabel: "Home" | "Office" | "Other";
  onAddressLabelChange: (label: "Home" | "Office" | "Other") => void;
  addressName: string;
  onAddressNameChange: (val: string) => void;
  addressPhone: string;
  onAddressPhoneChange: (val: string) => void;
  addressDivision: string;
  onAddressDivisionChange: (val: string) => void;
  addressCity: string;
  onAddressCityChange: (val: string) => void;
  addressArea: string;
  onAddressAreaChange: (val: string) => void;
  addressStreet: string;
  onAddressStreetChange: (val: string) => void;
  addressIsDefault: boolean;
  onAddressIsDefaultChange: (val: boolean) => void;
  onSaveAddress: (e: React.FormEvent) => void;
}

const BD_DIVISIONS = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Sylhet",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

export function AccountAddressModal({
  isOpen,
  onOpenChange,
  isEditing,
  addressLabel,
  onAddressLabelChange,
  addressName,
  onAddressNameChange,
  addressPhone,
  onAddressPhoneChange,
  addressDivision,
  onAddressDivisionChange,
  addressCity,
  onAddressCityChange,
  addressArea,
  onAddressAreaChange,
  addressStreet,
  onAddressStreetChange,
  addressIsDefault,
  onAddressIsDefaultChange,
  onSaveAddress,
}: AccountAddressModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-medium">
            {isEditing ? "Edit Delivery Address" : "Add New Delivery Address"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-0.5">
            Deliveries dispatched from our central warehouse will use this address.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSaveAddress} className="space-y-3.5 pt-2 text-xs">
          {/* Label selector: Home, Office, Other */}
          <div>
            <Label className="text-xs font-semibold">Address Label</Label>
            <div className="flex gap-2 mt-1.5">
              {(["Home", "Office", "Other"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => onAddressLabelChange(l)}
                  className={`rounded-full px-4 py-1 text-xs font-semibold border transition-all cursor-pointer ${
                    addressLabel === l
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary/30 text-foreground hover:border-primary/50"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="addr-name" className="text-xs font-semibold">
                Recipient Name
              </Label>
              <Input
                id="addr-name"
                required
                value={addressName}
                onChange={(e) => onAddressNameChange(e.target.value)}
                placeholder="Nusrat Jahan"
                className="mt-1 rounded-full text-xs"
              />
            </div>

            <div>
              <Label htmlFor="addr-phone" className="text-xs font-semibold">
                Mobile Number
              </Label>
              <Input
                id="addr-phone"
                required
                value={addressPhone}
                onChange={(e) => onAddressPhoneChange(e.target.value)}
                placeholder="017XXXXXXXX"
                className="mt-1 rounded-full text-xs"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="addr-div" className="text-xs font-semibold">
                Division
              </Label>
              <select
                id="addr-div"
                value={addressDivision}
                onChange={(e) => onAddressDivisionChange(e.target.value)}
                className="mt-1 w-full rounded-full border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {BD_DIVISIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="addr-city" className="text-xs font-semibold">
                District / City
              </Label>
              <Input
                id="addr-city"
                required
                value={addressCity}
                onChange={(e) => onAddressCityChange(e.target.value)}
                placeholder="Dhaka"
                className="mt-1 rounded-full text-xs"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="addr-area" className="text-xs font-semibold">
              Thana / Area
            </Label>
            <Input
              id="addr-area"
              required
              value={addressArea}
              onChange={(e) => onAddressAreaChange(e.target.value)}
              placeholder="e.g. Dhanmondi, Gulshan, Uttara"
              className="mt-1 rounded-full text-xs"
            />
          </div>

          <div>
            <Label htmlFor="addr-street" className="text-xs font-semibold">
              Street, Road & House Details
            </Label>
            <Input
              id="addr-street"
              required
              value={addressStreet}
              onChange={(e) => onAddressStreetChange(e.target.value)}
              placeholder="House 42, Road 9/A, Flat 4-B"
              className="mt-1 rounded-full text-xs"
            />
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <Checkbox
              id="addr-default"
              checked={addressIsDefault}
              onCheckedChange={(v) => onAddressIsDefaultChange(Boolean(v))}
            />
            <label htmlFor="addr-default" className="text-xs text-muted-foreground cursor-pointer">
              Set as default shipping address
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="rounded-full text-xs cursor-pointer"
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="rounded-full text-xs px-6 cursor-pointer">
              {isEditing ? "Save Address" : "Add Address"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


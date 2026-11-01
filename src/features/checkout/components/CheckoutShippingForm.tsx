"use client";

import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { DeliveryZone } from "../types";
import { BD_DIVISIONS, POPULAR_DHAKA_AREAS } from "../data/checkoutConstants";

export interface CheckoutShippingFormProps {
  zone: DeliveryZone;
  onZoneChange: (zone: DeliveryZone) => void;
  subtotal: number;
  appliedCoupon: string | null;
  division: string;
  onDivisionChange: (val: string) => void;
  cityDistrict: string;
  onCityDistrictChange: (val: string) => void;
  area: string;
  onAreaChange: (val: string) => void;
  streetAddress: string;
  onStreetAddressChange: (val: string) => void;
  deliveryNote: string;
  onDeliveryNoteChange: (val: string) => void;
}

export function CheckoutShippingForm({
  zone,
  onZoneChange,
  subtotal,
  appliedCoupon,
  division,
  onDivisionChange,
  cityDistrict,
  onCityDistrictChange,
  area,
  onAreaChange,
  streetAddress,
  onStreetAddressChange,
  deliveryNote,
  onDeliveryNoteChange,
}: CheckoutShippingFormProps) {
  const isFreeDelivery = subtotal >= 5000 || appliedCoupon === "FREESHIP";

  return (
    <section className="rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
      <div className="flex items-center gap-2 border-b border-border/50 pb-3">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          2
        </span>
        <h2 className="font-display text-lg sm:text-xl font-medium">
          Shipping & Delivery Destination
        </h2>
      </div>

      {/* Delivery Zone Selector */}
      <div className="mt-5">
        <Label className="text-xs font-semibold">
          Select Delivery Zone <span className="text-rose">*</span>
        </Label>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
          <label
            onClick={() => onZoneChange("dhaka_metro")}
            className={cn(
              "cursor-pointer rounded-xl border p-3.5 transition-all flex flex-col justify-between",
              zone === "dhaka_metro"
                ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                : "border-border hover:border-primary/50 bg-secondary/20",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-foreground">Inside Dhaka</span>
              <input
                type="radio"
                name="zone"
                checked={zone === "dhaka_metro"}
                onChange={() => onZoneChange("dhaka_metro")}
                className="text-primary focus:ring-0"
              />
            </div>
            <div className="mt-2">
              <span className="text-xs font-bold text-primary">
                {isFreeDelivery ? "FREE" : "৳80"}
              </span>
              <p className="text-[10.5px] text-muted-foreground">24–48 Hours</p>
            </div>
          </label>

          <label
            onClick={() => onZoneChange("dhaka_suburbs")}
            className={cn(
              "cursor-pointer rounded-xl border p-3.5 transition-all flex flex-col justify-between",
              zone === "dhaka_suburbs"
                ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                : "border-border hover:border-primary/50 bg-secondary/20",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-foreground">Dhaka Suburbs</span>
              <input
                type="radio"
                name="zone"
                checked={zone === "dhaka_suburbs"}
                onChange={() => onZoneChange("dhaka_suburbs")}
                className="text-primary focus:ring-0"
              />
            </div>
            <div className="mt-2">
              <span className="text-xs font-bold text-primary">
                {isFreeDelivery ? "FREE" : "৳100"}
              </span>
              <p className="text-[10.5px] text-muted-foreground">Gazipur, Savar, N.ganj</p>
            </div>
          </label>

          <label
            onClick={() => onZoneChange("outside_dhaka")}
            className={cn(
              "cursor-pointer rounded-xl border p-3.5 transition-all flex flex-col justify-between",
              zone === "outside_dhaka"
                ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                : "border-border hover:border-primary/50 bg-secondary/20",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-foreground">Outside Dhaka</span>
              <input
                type="radio"
                name="zone"
                checked={zone === "outside_dhaka"}
                onChange={() => onZoneChange("outside_dhaka")}
                className="text-primary focus:ring-0"
              />
            </div>
            <div className="mt-2">
              <span className="text-xs font-bold text-primary">
                {isFreeDelivery ? "FREE" : "৳130"}
              </span>
              <p className="text-[10.5px] text-muted-foreground">All 64 Districts</p>
            </div>
          </label>
        </div>
      </div>

      {/* Division & District Inputs */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="division" className="text-xs font-semibold">
            Division <span className="text-rose">*</span>
          </Label>
          <select
            id="division"
            value={division}
            onChange={(e) => onDivisionChange(e.target.value)}
            className="mt-1.5 w-full rounded-full border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {BD_DIVISIONS.map((d) => (
              <option key={d} value={d}>
                {d} Division
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="district" className="text-xs font-semibold">
            District / City <span className="text-rose">*</span>
          </Label>
          <Input
            id="district"
            required
            value={cityDistrict}
            onChange={(e) => onCityDistrictChange(e.target.value)}
            placeholder="e.g. Dhaka, Chattogram, Sylhet"
            className="mt-1.5 rounded-full text-xs"
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="area" className="text-xs font-semibold">
            Thana / Area <span className="text-rose">*</span>
          </Label>
          <Input
            id="area"
            required
            list="dhaka-areas"
            value={area}
            onChange={(e) => onAreaChange(e.target.value)}
            placeholder="e.g. Dhanmondi, Gulshan, Uttara, Halishahar"
            className="mt-1.5 rounded-full text-xs"
          />
          <datalist id="dhaka-areas">
            {POPULAR_DHAKA_AREAS.map((a) => (
              <option key={a} value={a} />
            ))}
          </datalist>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="address" className="text-xs font-semibold">
            Street Address & House Details <span className="text-rose">*</span>
          </Label>
          <div className="relative mt-1.5">
            <Input
              id="address"
              required
              value={streetAddress}
              onChange={(e) => onStreetAddressChange(e.target.value)}
              placeholder="House no, Road no, Flat / Floor no, Block / Sector"
              className="rounded-full pl-9 text-xs"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="notes" className="text-xs font-semibold">
            Special Delivery Instructions (Optional)
          </Label>
          <Textarea
            id="notes"
            rows={2}
            value={deliveryNote}
            onChange={(e) => onDeliveryNoteChange(e.target.value)}
            placeholder="e.g. Call before coming, Leave with building security reception..."
            className="mt-1.5 rounded-xl text-xs"
          />
        </div>
      </div>
    </section>
  );
}


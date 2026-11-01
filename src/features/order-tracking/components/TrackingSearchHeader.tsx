"use client";

import { Phone, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { OrderTrackingData } from "../types";
import { DEMO_ORDERS } from "../data/demoOrders";

export interface TrackingSearchHeaderProps {
  orderIdInput: string;
  onOrderIdInputChange: (val: string) => void;
  phoneInput: string;
  onPhoneInputChange: (val: string) => void;
  isLoading: boolean;
  activeOrder: OrderTrackingData | null;
  onSelectPreset: (id: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function TrackingSearchHeader({
  orderIdInput,
  onOrderIdInputChange,
  phoneInput,
  onPhoneInputChange,
  isLoading,
  activeOrder,
  onSelectPreset,
  onSubmit,
}: TrackingSearchHeaderProps) {
  return (
    <div className="border-b border-border/50 bg-secondary/30">
      <div className="container-lux py-8 sm:py-12 text-center">
        <span className="eyebrow text-primary">荷物追跡 · Tokyo To Doorstep Logistics</span>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground">
          Track Your Japanese Parcel
        </h1>
        <p className="mt-2.5 max-w-xl mx-auto text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Real-time tracking for all imported skincare orders. Monitor customs clearance,
          temperature-controlled packaging, and Pathao / Steadfast courier dispatch.
        </p>

        {/* Quick Tracking Form */}
        <form
          onSubmit={onSubmit}
          className="mt-6 sm:mt-8 mx-auto max-w-xl flex flex-col sm:flex-row items-center gap-2.5 rounded-xl border border-border/80 bg-background/95 p-2 shadow-sm"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              required
              value={orderIdInput}
              onChange={(e) => onOrderIdInputChange(e.target.value)}
              placeholder="Enter Order ID (e.g. GJ-2026-4821)"
              className="h-11 rounded-full border-0 bg-transparent pl-10 text-xs sm:text-sm shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="relative w-full sm:w-44 border-t sm:border-t-0 sm:border-l border-border/60">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="tel"
              value={phoneInput}
              onChange={(e) => onPhoneInputChange(e.target.value)}
              placeholder="Phone (optional)"
              className="h-11 rounded-full border-0 bg-transparent pl-9 text-xs shadow-none focus-visible:ring-0"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto h-11 rounded-full px-7 text-xs font-bold uppercase tracking-wider shrink-0 gap-2 shadow-xs cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                Locating...
              </>
            ) : (
              <>
                <Search className="h-3.5 w-3.5" />
                Track Parcel
              </>
            )}
          </Button>
        </form>

        {/* Quick Demo Order Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-muted-foreground text-[11px] font-medium">Quick Demo Samples:</span>
          {Object.keys(DEMO_ORDERS).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onSelectPreset(id)}
              className={cn(
                "rounded-full px-3 py-1 border text-[11px] font-medium transition-all cursor-pointer",
                activeOrder?.orderId === id
                  ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/30"
                  : "border-border/80 bg-background/80 text-muted-foreground hover:border-primary hover:text-foreground",
              )}
            >
              #{id} (
              {id === "GJ-2026-4821"
                ? "Out for Delivery"
                : id === "GJ-2026-8314"
                  ? "In Transit"
                  : "Delivered"}
              )
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


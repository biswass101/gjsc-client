import React from "react";
import { Plane, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreOrdersHeaderProps {
  onOpenCreate: () => void;
}

export function PreOrdersHeader({ onOpenCreate }: PreOrdersHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          <span>Air Cargo Pipeline</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary font-bold">Tokyo Direct Pre-Orders</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1 flex items-center gap-2.5">
          <Plane className="h-7 w-7 text-primary" />
          <span>Pre-Order Flights & Quota Management</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage advance Japanese skin care bookings, Tokyo warehouse arrival ETAs, 50% deposit
          tracking, and air-freight batch progress.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={onOpenCreate}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Launch Pre-Order Campaign</span>
        </Button>
      </div>
    </div>
  );
}

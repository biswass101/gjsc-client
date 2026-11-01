import React from "react";
import { ChevronRight, Plus, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaqsHeaderProps {
  onCreateFaq: () => void;
}

export function FaqsHeader({ onCreateFaq }: FaqsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          <span>Customer Knowledge Base</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary font-bold">Frequently Asked Questions</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1 flex items-center gap-2.5">
          <HelpCircle className="h-7 w-7 text-primary" />
          <span>Storefront FAQ Management</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Empower customers with self-service answers on Tokyo direct shipments, bKash payments,
          product authenticity, and returns.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={onCreateFaq}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Add New FAQ</span>
        </Button>
      </div>
    </div>
  );
}

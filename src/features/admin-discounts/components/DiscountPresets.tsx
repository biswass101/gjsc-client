"use client";

import { Sparkles, Percent, Truck, DollarSign } from "lucide-react";
import { DISCOUNT_TEMPLATES } from "../data/discountTemplates";
import type { DiscountTemplate } from "../types";

export interface DiscountPresetsProps {
  onApplyTemplate: (tmpl: DiscountTemplate) => void;
}

export function DiscountPresets({ onApplyTemplate }: DiscountPresetsProps) {
  const getIcon = (type: DiscountTemplate["type"]) => {
    switch (type) {
      case "percentage":
        return <Percent className="h-3 w-3 text-primary" />;
      case "free_shipping":
        return <Truck className="h-3 w-3 text-blue-600" />;
      case "fixed":
        return <DollarSign className="h-3 w-3 text-emerald-600" />;
    }
  };

  return (
    <div className="surface-card p-4 space-y-3">
      <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-primary" /> One-Click Campaign Presets
      </p>

      <div className="flex flex-wrap gap-2.5">
        {DISCOUNT_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.code}
            type="button"
            onClick={() => onApplyTemplate(tmpl)}
            className="flex items-center gap-2 rounded-full border border-border/80 bg-secondary/30 px-3 py-1.5 text-xs text-foreground hover:bg-secondary transition-all cursor-pointer"
          >
            {getIcon(tmpl.type)}
            <span>{tmpl.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}


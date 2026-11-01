"use client";

import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface ProductRitualTabProps {
  short: string;
  onShortChange: (val: string) => void;
  howTo: string;
  onHowToChange: (val: string) => void;
  desc: string;
  onDescChange: (val: string) => void;
}

export function ProductRitualTab({
  short,
  onShortChange,
  howTo,
  onHowToChange,
  desc,
  onDescChange,
}: ProductRitualTabProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Short Synopsis */}
      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs font-bold text-foreground">
            Short Merchandising Hook / Tagline
          </Label>
          <span className="text-[10px] text-muted-foreground">
            Card preview & SEO meta description
          </span>
        </div>
        <Input
          value={short}
          onChange={(e) => onShortChange(e.target.value)}
          placeholder="e.g. Fermented Japanese botanicals for deep moisture barrier restoration and calm, luminous skin."
          className="mt-1.5 h-10 rounded-xl text-xs font-medium"
        />
      </div>

      {/* Application Ritual */}
      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Application Ritual (How to Use Instructions)
          </Label>
          <button
            type="button"
            onClick={() =>
              onHowToChange(
                "Dispense 2-3 drops onto clean fingertips. Gently press into face and neck with upward sweeping motions until fully absorbed. Follow with moisturizer and daytime SPF.",
              )
            }
            className="text-[10.5px] text-primary hover:underline font-semibold cursor-pointer"
          >
            Insert Standard 4-Step Japanese Ritual
          </button>
        </div>
        <Textarea
          rows={3}
          value={howTo}
          onChange={(e) => onHowToChange(e.target.value)}
          placeholder="Step-by-step instructions for morning and evening skincare ritual..."
          className="mt-1.5 rounded-xl text-xs leading-relaxed"
        />
      </div>

      {/* Full Description */}
      <div>
        <Label className="text-xs font-bold text-foreground">
          Complete Editorial Story & Formula Description
        </Label>
        <Textarea
          rows={6}
          value={desc}
          onChange={(e) => onDescChange(e.target.value)}
          placeholder="Detailed explanation of the product formulation, clinical testing results, botanical heritage, and daily benefits..."
          className="mt-1.5 rounded-xl text-xs leading-relaxed"
        />
      </div>
    </div>
  );
}

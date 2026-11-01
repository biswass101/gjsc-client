"use client";

import { Check, Sun } from "lucide-react";
import { Label } from "@/components/ui/label";
import { POPULAR_TEXTURES } from "../../../data/productConstants";

export interface ProductFormulaCharacteristicsProps {
  texture: string;
  onTextureChange: (val: string) => void;
  spf: string;
  onSpfChange: (val: string) => void;
  pao: string;
  onPaoChange: (val: string) => void;
}

export function ProductFormulaCharacteristics({
  texture,
  onTextureChange,
  spf,
  onSpfChange,
  pao,
  onPaoChange,
}: ProductFormulaCharacteristicsProps) {
  return (
    <>
      {/* Formulation Characteristics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className="text-xs font-bold text-foreground">Formula Texture</Label>
          <select
            value={texture}
            onChange={(e) => onTextureChange(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            {POPULAR_TEXTURES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label className="text-xs font-bold text-foreground flex items-center gap-1">
            <Sun className="h-3.5 w-3.5 text-amber-500" /> SPF & PA Protection
          </Label>
          <select
            value={spf}
            onChange={(e) => onSpfChange(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            <option value="None">None / Non-UV Formula</option>
            <option value="SPF30 PA+++">SPF30 PA+++</option>
            <option value="SPF50+ PA++++">SPF50+ PA++++ (Japanese Gold Standard)</option>
            <option value="SPF50+ PA+++">SPF50+ PA+++</option>
          </select>
        </div>

        <div>
          <Label className="text-xs font-bold text-foreground">Period After Opening (PAO)</Label>
          <select
            value={pao}
            onChange={(e) => onPaoChange(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            <option value="6M">6 Months (6M)</option>
            <option value="12M">12 Months (12M - Standard)</option>
            <option value="24M">24 Months (24M)</option>
            <option value="36M">36 Months (36M)</option>
          </select>
        </div>
      </div>

      {/* Pure Standard Guarantee */}
      <div className="rounded-xl border border-border/70 bg-secondary/10 p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">
          Standard J-Beauty Formulation Guarantees:
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <Check className="h-3.5 w-3.5" /> Paraben-Free
          </span>
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <Check className="h-3.5 w-3.5" /> Mineral Oil-Free
          </span>
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <Check className="h-3.5 w-3.5" /> Cruelty-Free
          </span>
        </div>
      </div>
    </>
  );
}

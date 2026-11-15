import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Palette, Sparkles, Check, Info } from "lucide-react";
import { BANNER_GRADIENT_PRESETS, GradientPreset } from "../../constants";

interface BannerModalGradientFieldsProps {
  gradient: string;
  setGradient: (val: string) => void;
  customStart: string;
  setCustomStart: (val: string) => void;
  customEnd: string;
  setCustomEnd: (val: string) => void;
  customOpacity: number;
  setCustomOpacity: (val: number) => void;
  hasText: boolean;
}

export function BannerModalGradientFields({
  gradient,
  setGradient,
  customStart,
  setCustomStart,
  customEnd,
  setCustomEnd,
  customOpacity,
  setCustomOpacity,
  hasText,
}: BannerModalGradientFieldsProps) {
  const isCustom = gradient === "custom";

  return (
    <div className="space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary" />
          <Label className="text-xs font-bold text-foreground">
            Banner Gradient Overlay & Atmosphere
          </Label>
        </div>
        <span className="text-[11px] font-medium text-muted-foreground">
          {hasText ? (
            <span className="text-primary font-semibold">Active with Text Overlay</span>
          ) : (
            <span className="text-muted-foreground/80 italic">Disabled (No text headline)</span>
          )}
        </span>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/15 p-2.5 text-[11px] text-muted-foreground">
        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <p>
          {hasText
            ? "Since you entered a headline or subtitle, this gradient will be overlaid to ensure comfortable text legibility and aesthetic mood."
            : "When headline and subtitle are left blank, NO gradient is applied at all — the clean, full-color designer artwork is displayed untouched."}
        </p>
      </div>

      {/* Demo Preset Cards */}
      <div className="space-y-1.5">
        <Label className="text-[11px] font-semibold text-muted-foreground">
          Demo Color Presets
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BANNER_GRADIENT_PRESETS.map((preset: GradientPreset) => {
            const isSelected = gradient === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setGradient(preset.id)}
                className={`relative flex flex-col items-start gap-1 p-2 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary"
                    : "border-border/60 bg-card hover:border-border hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-semibold text-foreground">
                    {preset.name}
                  </span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
                </div>

                {/* Preview color swatch */}
                <div
                  className={`h-4 w-full rounded-sm ${preset.previewClass}`}
                  style={preset.css !== "none" ? { background: preset.css } : undefined}
                />

                <span className="text-[10px] text-muted-foreground line-clamp-1">
                  {preset.description}
                </span>
              </button>
            );
          })}

          {/* Custom Option Button */}
          <button
            type="button"
            onClick={() => setGradient("custom")}
            className={`relative flex flex-col items-start gap-1 p-2 rounded-lg border text-left transition-all cursor-pointer ${
              isCustom
                ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary"
                : "border-border/60 bg-card hover:border-border hover:bg-muted/40"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-semibold text-foreground">
                🎨 Custom Colors
              </span>
              {isCustom && <Check className="h-3.5 w-3.5 text-primary" />}
            </div>

            {/* Custom live gradient swatch */}
            <div
              className="h-4 w-full rounded-sm border border-border/50"
              style={{
                background: `linear-gradient(to right, ${customStart}, ${customEnd} 60%, transparent)`,
              }}
            />

            <span className="text-[10px] text-muted-foreground line-clamp-1">
              Pick your own hex colors & opacity
            </span>
          </button>
        </div>
      </div>

      {/* Custom Color Controls (when custom is selected) */}
      {isCustom && (
        <div className="pt-2 border-t border-border/60 space-y-3 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Start Color */}
            <div className="space-y-1.5">
              <Label htmlFor="custom-gradient-start" className="text-xs font-semibold">
                Gradient Left / Primary Color
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="custom-gradient-start"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border border-border bg-background p-0.5"
                />
                <Input
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  placeholder="#1e1b4b"
                  className="h-8 text-xs font-mono uppercase"
                />
              </div>
            </div>

            {/* End Color */}
            <div className="space-y-1.5">
              <Label htmlFor="custom-gradient-end" className="text-xs font-semibold">
                Mid / Accent Color
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="custom-gradient-end"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border border-border bg-background p-0.5"
                />
                <Input
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  placeholder="#000000"
                  className="h-8 text-xs font-mono uppercase"
                />
              </div>
            </div>
          </div>

          {/* Opacity Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">
                Gradient Density / Opacity: {customOpacity}%
              </Label>
              <span className="text-[10px] text-muted-foreground">
                Higher = darker text backing
              </span>
            </div>
            <Slider
              value={[customOpacity]}
              min={25}
              max={95}
              step={5}
              onValueChange={(val) => setCustomOpacity(val[0] ?? 75)}
              className="py-1 cursor-pointer"
            />
          </div>

          {/* Live Preview Bar */}
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Live Gradient Result
            </span>
            <div
              className="h-8 w-full rounded-md border border-border shadow-inner"
              style={{
                background: `linear-gradient(to right, ${customStart}, ${customEnd} 55%, transparent)`,
                opacity: customOpacity / 100,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}


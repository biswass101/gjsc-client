import React from "react";
import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface HeroSettingsCardProps {
  heroHeadline: string;
  setHeroHeadline: (val: string) => void;
  heroSubheadline: string;
  setHeroSubheadline: (val: string) => void;
  freeShippingThreshold: string;
  setFreeShippingThreshold: (val: string) => void;
}

export function HeroSettingsCard({
  heroHeadline,
  setHeroHeadline,
  heroSubheadline,
  setHeroSubheadline,
  freeShippingThreshold,
  setFreeShippingThreshold,
}: HeroSettingsCardProps) {
  return (
    <div className="surface-card p-5 space-y-4">
      <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">
            Homepage Hero Headline & Copy
          </h3>
          <p className="text-[11px] text-muted-foreground">
            The first impression text seen by incoming buyers
          </p>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <Label className="text-xs font-semibold">Hero Main Headline</Label>
          <Input
            value={heroHeadline}
            onChange={(e) => setHeroHeadline(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold">Hero Subtitle Copy</Label>
          <Textarea
            value={heroSubheadline}
            onChange={(e) => setHeroSubheadline(e.target.value)}
            rows={2}
            className="mt-1 rounded-xl text-xs"
          />
        </div>

        <div className="max-w-xs">
          <Label className="text-xs font-semibold">Free Delivery Incentive Minimum (৳)</Label>
          <Input
            type="number"
            value={freeShippingThreshold}
            onChange={(e) => setFreeShippingThreshold(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs"
          />
        </div>
      </div>
    </div>
  );
}


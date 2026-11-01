import React from "react";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FlashSaleCardProps {
  flashSaleActive: boolean;
  setFlashSaleActive: (val: boolean) => void;
  flashSaleTitle: string;
  setFlashSaleTitle: (val: string) => void;
  flashSaleEndsAt: string;
  setFlashSaleEndsAt: (val: string) => void;
}

export function FlashSaleCard({
  flashSaleActive,
  setFlashSaleActive,
  flashSaleTitle,
  setFlashSaleTitle,
  flashSaleEndsAt,
  setFlashSaleEndsAt,
}: FlashSaleCardProps) {
  return (
    <div className="surface-card p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              Flash Sale Countdown Engine
            </h3>
            <p className="text-[11px] text-muted-foreground">Homepage flash sale countdown clock</p>
          </div>
        </div>
        <Switch checked={flashSaleActive} onCheckedChange={setFlashSaleActive} />
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <Label className="text-xs font-semibold">Flash Sale Campaign Title</Label>
          <Input
            value={flashSaleTitle}
            onChange={(e) => setFlashSaleTitle(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs font-semibold"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold">Sale Expiration Timestamp (ISO / Date)</Label>
          <Input
            value={flashSaleEndsAt}
            onChange={(e) => setFlashSaleEndsAt(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs font-mono"
          />
        </div>
      </div>
    </div>
  );
}


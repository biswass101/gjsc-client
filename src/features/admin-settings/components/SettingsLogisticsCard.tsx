import React from "react";
import { Truck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface SettingsLogisticsCardProps {
  insideDhakaRate: string;
  setInsideDhakaRate: (val: string) => void;
  outsideDhakaRate: string;
  setOutsideDhakaRate: (val: string) => void;
  expressDeliveryRate: string;
  setExpressDeliveryRate: (val: string) => void;
  freeShippingMin: string;
  setFreeShippingMin: (val: string) => void;
  defaultCourier: string;
  setDefaultCourier: (val: string) => void;
  autoAssignCourier: boolean;
  setAutoAssignCourier: (val: boolean) => void;
  pathaoApiKey: string;
  setPathaoApiKey: (val: string) => void;
  steadfastApiKey: string;
  setSteadfastApiKey: (val: string) => void;
}

export function SettingsLogisticsCard({
  insideDhakaRate,
  setInsideDhakaRate,
  outsideDhakaRate,
  setOutsideDhakaRate,
  expressDeliveryRate,
  setExpressDeliveryRate,
  freeShippingMin,
  setFreeShippingMin,
  defaultCourier,
  setDefaultCourier,
  autoAssignCourier,
  setAutoAssignCourier,
  pathaoApiKey,
  setPathaoApiKey,
  steadfastApiKey,
  setSteadfastApiKey,
}: SettingsLogisticsCardProps) {
  return (
    <div className="surface-card p-5 space-y-4">
      <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500/10 text-blue-600">
          <Truck className="h-4 w-4" />
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-foreground">
            Bangladesh Logistics Tariffs & Courier API
          </h2>
          <p className="text-[11px] text-muted-foreground">
            Automated Pathao Express & Steadfast dispatch configurations
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <Label className="text-xs font-semibold">Inside Dhaka Delivery (৳)</Label>
          <Input
            type="number"
            value={insideDhakaRate}
            onChange={(e) => setInsideDhakaRate(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs font-semibold"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold">Outside Dhaka Delivery (৳)</Label>
          <Input
            type="number"
            value={outsideDhakaRate}
            onChange={(e) => setOutsideDhakaRate(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs font-semibold"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold">Express Same-Day Dhaka (৳)</Label>
          <Input
            type="number"
            value={expressDeliveryRate}
            onChange={(e) => setExpressDeliveryRate(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs font-semibold"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold">Free Shipping Threshold (৳)</Label>
          <Input
            type="number"
            value={freeShippingMin}
            onChange={(e) => setFreeShippingMin(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs font-semibold"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-border/50">
        <div>
          <Label className="text-xs font-semibold">Default Courier Partner</Label>
          <select
            value={defaultCourier}
            onChange={(e) => setDefaultCourier(e.target.value)}
            className="mt-1 h-9 w-full rounded-full border border-input bg-background px-3 text-xs"
          >
            <option value="Pathao Express">Pathao Express</option>
            <option value="Steadfast">Steadfast Courier</option>
            <option value="RedX">RedX Logistics</option>
            <option value="Paperfly">Paperfly</option>
          </select>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border/80 p-3 bg-secondary/15 mt-1">
          <div>
            <p className="font-semibold text-foreground text-xs">Auto-Assign Courier on Checkout</p>
            <p className="text-[11px] text-muted-foreground">
              Directly generate consignment upon order
            </p>
          </div>
          <Switch checked={autoAssignCourier} onCheckedChange={setAutoAssignCourier} />
        </div>

        <div>
          <Label className="text-xs font-semibold">Pathao API Secret Key</Label>
          <Input
            type="password"
            value={pathaoApiKey}
            onChange={(e) => setPathaoApiKey(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs font-mono"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold">Steadfast Client API Key</Label>
          <Input
            type="password"
            value={steadfastApiKey}
            onChange={(e) => setSteadfastApiKey(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs font-mono"
          />
        </div>
      </div>
    </div>
  );
}

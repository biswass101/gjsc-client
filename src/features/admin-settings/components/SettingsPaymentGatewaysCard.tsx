import React from "react";
import { CreditCard } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface SettingsPaymentGatewaysCardProps {
  codEnabled: boolean;
  setCodEnabled: (val: boolean) => void;
  bkashEnabled: boolean;
  setBkashEnabled: (val: boolean) => void;
  bkashMerchantNumber: string;
  setBkashMerchantNumber: (val: string) => void;
  nagadEnabled: boolean;
  setNagadEnabled: (val: boolean) => void;
  nagadMerchantNumber: string;
  setNagadMerchantNumber: (val: string) => void;
}

export function SettingsPaymentGatewaysCard({
  codEnabled,
  setCodEnabled,
  bkashEnabled,
  setBkashEnabled,
  bkashMerchantNumber,
  setBkashMerchantNumber,
  nagadEnabled,
  setNagadEnabled,
  nagadMerchantNumber,
  setNagadMerchantNumber,
}: SettingsPaymentGatewaysCardProps) {
  return (
    <div className="surface-card p-5 space-y-4">
      <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600">
          <CreditCard className="h-4 w-4" />
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-foreground">
            Payment Gateways & Mobile Wallets (MFS)
          </h2>
          <p className="text-[11px] text-muted-foreground">
            Cash on Delivery, bKash Merchant, Nagad settings
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-border/80 p-3 bg-secondary/10">
          <div>
            <p className="font-semibold text-foreground">Enable Cash on Delivery (COD)</p>
            <p className="text-[11px] text-muted-foreground">
              Buyers pay courier upon receiving Japanese parcel
            </p>
          </div>
          <Switch checked={codEnabled} onCheckedChange={setCodEnabled} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 rounded-xl border border-border/80 p-3 bg-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">bKash Merchant Gateway</p>
              <p className="text-[11px] text-muted-foreground">
                Online MFS Checkout & TrxID verification
              </p>
            </div>
            <Switch checked={bkashEnabled} onCheckedChange={setBkashEnabled} />
          </div>
          <div>
            <Label className="text-[11px] font-semibold">bKash Merchant Account Number</Label>
            <Input
              value={bkashMerchantNumber}
              onChange={(e) => setBkashMerchantNumber(e.target.value)}
              className="mt-1 h-8 rounded-full text-xs font-mono"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 rounded-xl border border-border/80 p-3 bg-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Nagad Mobile Payment</p>
              <p className="text-[11px] text-muted-foreground">
                Direct Nagad Payment URL & QR Code
              </p>
            </div>
            <Switch checked={nagadEnabled} onCheckedChange={setNagadEnabled} />
          </div>
          <div>
            <Label className="text-[11px] font-semibold">Nagad Merchant Account Number</Label>
            <Input
              value={nagadMerchantNumber}
              onChange={(e) => setNagadMerchantNumber(e.target.value)}
              className="mt-1 h-8 rounded-full text-xs font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


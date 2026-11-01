import React from "react";
import { Bell } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface SettingsAlertsNotificationsCardProps {
  lowStockWarningQty: string;
  setLowStockWarningQty: (val: string) => void;
  enableSmsAlerts: boolean;
  setEnableSmsAlerts: (val: boolean) => void;
  enableWhatsappUpdates: boolean;
  setEnableWhatsappUpdates: (val: boolean) => void;
}

export function SettingsAlertsNotificationsCard({
  lowStockWarningQty,
  setLowStockWarningQty,
  enableSmsAlerts,
  setEnableSmsAlerts,
  enableWhatsappUpdates,
  setEnableWhatsappUpdates,
}: SettingsAlertsNotificationsCardProps) {
  return (
    <div className="surface-card p-5 space-y-4">
      <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
          <Bell className="h-4 w-4" />
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-foreground">
            Alerts, Customer SMS & System Flags
          </h2>
          <p className="text-[11px] text-muted-foreground">
            Low-stock notifications and transactional SMS triggers
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label className="text-xs font-semibold">Low-Stock Alert Threshold (Units)</Label>
          <Input
            type="number"
            value={lowStockWarningQty}
            onChange={(e) => setLowStockWarningQty(e.target.value)}
            className="mt-1 h-9 rounded-full text-xs"
          />
          <p className="text-[10px] text-muted-foreground mt-1">
            Triggers admin alert when stock reaches this level
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border/80 p-3 bg-secondary/10">
          <div>
            <p className="font-semibold text-foreground">Courier Dispatch SMS</p>
            <p className="text-[10px] text-muted-foreground">
              Notify customer via SMS when rider assigned
            </p>
          </div>
          <Switch checked={enableSmsAlerts} onCheckedChange={setEnableSmsAlerts} />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border/80 p-3 bg-secondary/10">
          <div>
            <p className="font-semibold text-foreground">WhatsApp Order Updates</p>
            <p className="text-[10px] text-muted-foreground">
              Send direct live tracking link on WhatsApp
            </p>
          </div>
          <Switch checked={enableWhatsappUpdates} onCheckedChange={setEnableWhatsappUpdates} />
        </div>
      </div>
    </div>
  );
}

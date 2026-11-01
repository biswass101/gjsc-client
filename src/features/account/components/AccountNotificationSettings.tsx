"use client";

import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export interface AccountNotificationSettingsProps {
  notifSms: boolean;
  onNotifSmsChange: (val: boolean) => void;
  notifWhatsapp: boolean;
  onNotifWhatsappChange: (val: boolean) => void;
  notifPromos: boolean;
  onNotifPromosChange: (val: boolean) => void;
  onSignOut: () => void;
}

export function AccountNotificationSettings({
  notifSms,
  onNotifSmsChange,
  notifWhatsapp,
  onNotifWhatsappChange,
  notifPromos,
  onNotifPromosChange,
  onSignOut,
}: AccountNotificationSettingsProps) {
  return (
    <>
      {/* Notifications */}
      <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
        <h3 className="font-semibold text-sm text-foreground flex items-center gap-2 border-b border-border/40 pb-3">
          <Bell className="h-4 w-4 text-primary" />
          Order & Tracking Notifications
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">SMS Delivery Alerts</p>
              <p className="text-muted-foreground text-[11px]">
                Receive instant SMS when your parcel is out for delivery.
              </p>
            </div>
            <Switch checked={notifSms} onCheckedChange={onNotifSmsChange} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">WhatsApp Dispatch Notice</p>
              <p className="text-muted-foreground text-[11px]">
                Direct live rider tracking link sent to your registered WhatsApp.
              </p>
            </div>
            <Switch checked={notifWhatsapp} onCheckedChange={onNotifWhatsappChange} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Tokyo Seasonal Launches & Promos</p>
              <p className="text-muted-foreground text-[11px]">
                Member-exclusive discount drops & Japanese holiday flash sales.
              </p>
            </div>
            <Switch checked={notifPromos} onCheckedChange={onNotifPromosChange} />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-rose/30 bg-rose/5 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-sm text-rose">Sign Out of Account</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Safely disconnect this device from your Glorious Japan skincare sanctuary.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onSignOut}
          className="rounded-full text-xs text-rose border-rose/40 hover:bg-rose/10 cursor-pointer shrink-0"
        >
          <LogOut className="h-3.5 w-3.5 mr-1.5" />
          Sign Out
        </Button>
      </div>
    </>
  );
}


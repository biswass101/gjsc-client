import React from "react";
import { Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsHeaderProps {
  onExport: () => void;
  onSave: () => void;
}

export function SettingsHeader({ onExport, onSave }: SettingsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="eyebrow text-primary">System Administration</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
            Enterprise v2.6
          </span>
        </div>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-foreground">
          Store Logistics, Courier Gateways & System Settings
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Configure delivery tariffs across Bangladesh, bKash Merchant credentials, automated SMS
          dispatch, and warehouse addresses.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="rounded-full text-xs h-8 px-3.5 gap-1.5"
        >
          <Download className="h-3.5 w-3.5 text-primary" />
          Backup Database
        </Button>

        <Button
          size="sm"
          onClick={onSave}
          className="rounded-full text-xs h-8 px-5 gap-1.5 shadow-2xs font-semibold"
        >
          <Save className="h-3.5 w-3.5" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}

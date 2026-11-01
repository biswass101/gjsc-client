import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsDisasterRecoveryCardProps {
  onReset: () => void;
}

export function SettingsDisasterRecoveryCard({ onReset }: SettingsDisasterRecoveryCardProps) {
  return (
    <div className="surface-card p-5 space-y-4 border border-rose/30">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-rose/10 text-rose">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display text-base font-semibold text-foreground">
              Database Management & Factory Reset
            </h2>
            <p className="text-[11px] text-muted-foreground">
              Backup entire system dataset or restore default factory demonstration state
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onReset}
          className="rounded-full text-xs h-8 px-4 text-rose border-rose/30 hover:bg-rose/10 gap-1.5"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset Factory State
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        All modifications made across Products, Orders, Customers, Coupons, and Settings are
        persisted in your browser&apos;s persistent storage. You can backup your database to JSON
        anytime or reinitialize to the clean factory state.
      </p>
    </div>
  );
}

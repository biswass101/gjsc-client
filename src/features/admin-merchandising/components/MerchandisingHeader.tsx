import React from "react";
import { Eye, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MerchandisingHeaderProps {
  onSave: (e: React.FormEvent) => void;
}

export function MerchandisingHeader({ onSave }: MerchandisingHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="eyebrow text-primary">Storefront Content Control</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
            Live Store Broadcast
          </span>
        </div>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-foreground">
          Merchandising, Announcement Banners & Hero Campaigns
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Dynamically broadcast top tickers, seasonal Tokyo festival alerts, and countdown sales
          across the customer storefront.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="rounded-full text-xs h-8 px-3.5 gap-1.5"
        >
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Eye className="h-3.5 w-3.5 text-primary" />
            Preview Live Store
          </a>
        </Button>

        <Button
          size="sm"
          onClick={onSave}
          className="rounded-full text-xs h-8 px-5 gap-1.5 shadow-2xs font-semibold"
        >
          <Save className="h-3.5 w-3.5" />
          Publish Changes
        </Button>
      </div>
    </div>
  );
}


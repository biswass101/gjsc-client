import React from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomersHeaderProps {
  totalAccounts: number;
  onExportCsv: () => void;
  onOpenAdd: () => void;
}

export function CustomersHeader({ totalAccounts, onExportCsv, onOpenAdd }: CustomersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="eyebrow text-primary">Customer Relationship Management</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
            {totalAccounts} Accounts
          </span>
        </div>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-foreground">
          Customer Profiles & Japanese Skincare CRM
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Lifetime value analysis, skin diagnostic history, repeat order velocity, and direct
          WhatsApp engagement.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={onExportCsv}
          className="rounded-full text-xs h-8 px-3.5 gap-1.5"
        >
          <Download className="h-3.5 w-3.5 text-primary" />
          Export CSV
        </Button>

        <Button
          size="sm"
          onClick={onOpenAdd}
          className="rounded-full text-xs h-8 px-4 gap-1.5 shadow-2xs font-semibold"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Customer
        </Button>
      </div>
    </div>
  );
}

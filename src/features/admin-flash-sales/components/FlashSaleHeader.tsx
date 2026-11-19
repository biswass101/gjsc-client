"use client";

import React from "react";
import { Zap, Plus, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FlashSaleHeaderProps {
  onOpenCreate: () => void;
  activeCount: number;
}

export function FlashSaleHeader({ onOpenCreate, activeCount }: FlashSaleHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-rose-500/10 text-rose-600">
            <Zap className="h-4 w-4 fill-rose-500" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Flash Sales & Drops Engine
          </h1>
          {activeCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-600 border border-rose-500/20">
              <Flame className="h-3 w-3 fill-rose-500 animate-pulse" />
              {activeCount} Live Now
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Schedule limited-time Tokyo flash drops, configure special flash prices, and allocate urgency stock quotas for the customer homepage.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={onOpenCreate}
          className="gap-2 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 px-5 text-xs font-semibold text-white shadow-md hover:from-rose-500 hover:to-amber-500"
        >
          <Plus className="h-4 w-4" />
          Create Flash Sale
        </Button>
      </div>
    </div>
  );
}


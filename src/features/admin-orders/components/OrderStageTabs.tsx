"use client";

import type { AdminOrder } from "@/context/admin-context";
import { PIPELINE_STAGES } from "../data/orderConstants";
import type { PipelineStage } from "../types";

interface OrderStageTabsProps {
  orders: AdminOrder[];
  activeStage: PipelineStage;
  onSelectStage: (stage: PipelineStage) => void;
}

export function OrderStageTabs({ orders, activeStage, onSelectStage }: OrderStageTabsProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      {PIPELINE_STAGES.map((stage) => {
        const count =
          stage === "All"
            ? orders.length
            : orders.filter((o) => o.fulfillmentStatus === stage).length;
        const isActive = activeStage === stage;

        return (
          <button
            key={stage}
            type="button"
            onClick={() => onSelectStage(stage)}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              isActive
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <span>{stage}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                isActive
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-card text-foreground"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

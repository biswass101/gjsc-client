import type { PipelineStage, CourierOption } from "../types";

export const PIPELINE_STAGES: readonly PipelineStage[] = [
  "All",
  "Pending",
  "Processing",
  "Quality Checked",
  "Dispatched",
  "In Transit",
  "Delivered",
  "Cancelled",
] as const;

export const STATUS_STYLES: Record<string, string> = {
  Delivered:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300",
  "In Transit": "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300",
  Dispatched:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-300",
  "Quality Checked":
    "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300",
  Processing:
    "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300",
  Pending:
    "bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-300",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-300",
};

export const COURIER_OPTIONS: readonly CourierOption[] = [
  "Pathao Express",
  "Steadfast",
  "RedX",
  "Paperfly",
  "In-House",
  "None",
] as const;

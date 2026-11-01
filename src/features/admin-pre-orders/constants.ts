import type { BatchStatusConfig } from "./types";

export const BATCH_STATUSES: BatchStatusConfig[] = [
  {
    status: "Booking Open",
    label: "Booking Open",
    color: "text-emerald-700 dark:text-emerald-300",
    bgColor:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800",
  },
  {
    status: "Tokyo Sourcing",
    label: "Tokyo Sourcing",
    color: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800",
  },
  {
    status: "Air-Freight",
    label: "Air-Freight in Transit",
    color: "text-indigo-700 dark:text-indigo-300",
    bgColor:
      "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-800",
  },
  {
    status: "Customs Cleared",
    label: "Dhaka Customs Cleared",
    color: "text-amber-700 dark:text-amber-300",
    bgColor:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800",
  },
  {
    status: "Ready for Delivery",
    label: "Ready for Delivery",
    color: "text-purple-700 dark:text-purple-300",
    bgColor:
      "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:border-purple-800",
  },
];

export const DEFAULT_PREORDER_IMAGES = [
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1608248597359-299318b7623a?w=800&auto=format&fit=crop&q=80",
];

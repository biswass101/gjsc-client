import type { LucideIcon } from "lucide-react";
import type { AdminProduct } from "@/context/admin-context";

export type ProductFormTab = "identity" | "pricing" | "science" | "ritual" | "media";

export interface FormTabConfig {
  id: ProductFormTab;
  label: string;
  icon: LucideIcon;
}

export interface StockStatusInfo {
  label: string;
  className: string;
}

export interface ComputedMarginMetrics {
  profit: number;
  percent: number;
  discount: number;
}

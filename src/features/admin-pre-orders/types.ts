import type { AdminPreOrder } from "@/types";

export interface BatchStatusConfig {
  status: AdminPreOrder["batchStatus"];
  label: string;
  color: string;
  bgColor: string;
}

export interface PreOrderFormData {
  productName: string;
  japaneseName: string;
  brand: string;
  category: string;
  price: string;
  depositPercent: string;
  estimatedArrival: string;
  slotsTotal: string;
  slotsBooked: string;
  batchStatus: AdminPreOrder["batchStatus"];
  image: string;
  active: boolean;
  notes: string;
}


import type { AdminDiscount } from "@/context/admin-context";

export interface DiscountTemplate {
  code: string;
  type: AdminDiscount["type"];
  val: string;
  min: string;
  limit: string;
  label: string;
}

export interface CreateDiscountFormState {
  code: string;
  type: AdminDiscount["type"];
  value: string;
  minSpend: string;
  usageLimit: string;
  endDate: string;
}


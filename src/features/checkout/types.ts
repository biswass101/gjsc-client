import type { Product } from "@/types";

export type DeliveryZone = "dhaka_metro" | "dhaka_suburbs" | "outside_dhaka";
export type PaymentMethod = "cod" | "bkash" | "nagad" | "card";

export interface CheckoutCartItem {
  product: Product;
  qty: number;
  size: string;
}

export interface CouponRule {
  type: "percent" | "fixed" | "free_shipping";
  value: number;
  label: string;
}

export interface OrderConfirmationData {
  orderId: string;
  total: number;
  shippingFee: number;
  discount: number;
  zone: DeliveryZone;
  address: string;
  phone: string;
  payment: PaymentMethod;
  date: string;
  items: CheckoutCartItem[];
}

/**
 * Storefront Order & Address Types for Glorious Japan Skin Care Platform
 */

export type DeliveryZone = "dhaka_metro" | "dhaka_suburbs" | "outside_dhaka";

export type PaymentMethod = "cod" | "bkash" | "nagad" | "card";

export interface SavedAddress {
  id: string;
  label: "Home" | "Office" | "Other";
  isDefault: boolean;
  name: string;
  phone: string;
  division: string;
  city: string;
  area: string;
  street: string;
}

export interface BuyerOrderItem {
  slug: string;
  name: string;
  brand: string;
  size: string;
  qty: number;
  price: number;
  image: string;
}

export interface BuyerOrder {
  id: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing" | "Quality Checked";
  total: number;
  paymentMethod: string;
  courier: string;
  consignmentId: string;
  items: BuyerOrderItem[];
}


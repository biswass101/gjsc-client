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

export type FulfillmentStatus =
  | "Pending"
  | "Processing"
  | "Quality Checked"
  | "Dispatched"
  | "In Transit"
  | "Delivered"
  | "Cancelled";

export interface BuyerOrder {
  id: string;
  date: string;
  status: FulfillmentStatus;
  total: number;
  subtotal?: number | undefined;
  shippingFee?: number | undefined;
  discountAmount?: number | undefined;
  paymentMethod: string;
  paymentStatus?: string | undefined;
  courier: string;
  consignmentId: string;
  customerName?: string | undefined;
  customerEmail?: string | undefined;
  customerPhone?: string | undefined;
  address?: string | undefined;
  area?: string | undefined;
  city?: string | undefined;
  division?: string | undefined;
  estimatedDelivery?: string | undefined;
  items: BuyerOrderItem[];
}


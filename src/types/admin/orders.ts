export interface AdminOrderItem {
  slug: string;
  name: string;
  brand: string;
  price: number;
  qty: number;
  size: string;
  image: string;
}

export interface AdminOrderTimelineEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  by: string;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  area: string;
  city: string;
  division: string;
  deliveryZone?: "dhaka_metro" | "outside_dhaka" | string;
  date: string;
  dateFormatted: string;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  paymentMethod: "COD" | "bKash" | "Nagad" | "Card";
  paymentStatus: "Paid" | "Pending" | "Refunded";
  trxId?: string | undefined;
  fulfillmentStatus:
    | "Pending"
    | "Processing"
    | "Quality Checked"
    | "Dispatched"
    | "In Transit"
    | "Delivered"
    | "Cancelled";
  courier: "Pathao Express" | "Steadfast" | "RedX" | "Paperfly" | "In-House" | "None";
  consignmentId?: string | undefined;
  trackingUrl?: string | undefined;
  items: AdminOrderItem[];
  notes?: string | undefined;
  timeline: AdminOrderTimelineEvent[];
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  division: string;
  ordersCount: number;
  totalSpent: number;
  avgOrderValue: number;
  tier: "Standard" | "VIP" | "Platinum" | "At Risk";
  status: "Active" | "Inactive" | "Blocked";
  joinedDate: string;
  lastOrderDate?: string | undefined;
  skinType: string;
  skinConcerns: string[];
  notes: string;
}


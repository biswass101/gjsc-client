/**
 * Order Tracking Types for Glorious Japan Skin Care Platform
 */

export interface TrackingEvent {
  title: string;
  location: string;
  timestamp: string;
  description: string;
  completed: boolean;
  active?: boolean;
}

export interface TrackingItem {
  name: string;
  size: string;
  qty: number;
  price: number;
  image: string;
}

export interface OrderTrackingData {
  orderId: string;
  customerName: string;
  phone: string;
  destination: string;
  zone: string;
  courier: string;
  consignmentId: string;
  riderName?: string;
  riderPhone?: string;
  paymentMethod: string;
  paymentStatus: "Paid via bKash" | "Cash on Delivery (Unpaid)" | "Paid via Card";
  estimatedDelivery: string;
  statusText: string;
  currentStepIndex: number;
  items: TrackingItem[];
  timeline: TrackingEvent[];
}


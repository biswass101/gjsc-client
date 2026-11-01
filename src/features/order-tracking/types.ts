export interface TrackingEvent {
  title: string;
  location: string;
  timestamp: string;
  description: string;
  completed: boolean;
  active?: boolean;
}

export interface TrackingParcelItem {
  name: string;
  brand: string;
  image: string;
  slug: string;
  size: string;
  qty: number;
  price: number;
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
  items: TrackingParcelItem[];
  events: TrackingEvent[];
}


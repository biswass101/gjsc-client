import { PRODUCTS } from "@/lib/catalog";
import type { OrderTrackingData } from "../types";

export function createDynamicTrackingOrder(orderId: string, phone: string): OrderTrackingData {
  return {
    orderId: orderId.startsWith("GJ-") ? orderId : `GJ-2026-${orderId}`,
    customerName: "Valued Skincare Customer",
    phone: phone.trim() || "017XXXXXXXX",
    destination: "Dhaka Central Delivery Hub",
    zone: "Inside Dhaka Metropolitan",
    courier: "Pathao Express",
    consignmentId: `PT-${Math.floor(1000000 + Math.random() * 9000000)}`,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Cash on Delivery (Unpaid)",
    estimatedDelivery: "Within 24–48 Hours",
    statusText: "Processing & Quality Inspection in Dhaka Hub",
    currentStepIndex: 1,
    items: [
      {
        name: PRODUCTS[0]?.name || "Authentic Japanese Skincare Formulation",
        brand: PRODUCTS[0]?.brand || "Glorious Japan",
        image: PRODUCTS[0]?.image || "",
        slug: PRODUCTS[0]?.slug || "sakura-radiance-serum",
        size: "50ml",
        qty: 1,
        price: PRODUCTS[0]?.price || 4850,
      },
    ],
    events: [
      {
        title: "Order Placed & Confirmed",
        location: "Glorious Japan Dispatch Queue",
        timestamp: "Today · Recent",
        description: "Order received in system and queued for Tokyo authenticity batch scan.",
        completed: true,
      },
      {
        title: "Inspection & Furoshiki Packaging",
        location: "Dhaka Central Temperature-Controlled Hub",
        timestamp: "In Progress",
        description: "Items being packed with shock-resistant cushioning and genuine import seal.",
        completed: false,
        active: true,
      },
      {
        title: "Courier Transfer",
        location: "Pathao / Steadfast Sorting Center",
        timestamp: "Scheduled for Today",
        description: "Consignment barcode generation and dispatch manifest creation.",
        completed: false,
      },
      {
        title: "Out for Delivery",
        location: "Local Delivery Hub",
        timestamp: "Expected Tomorrow Morning",
        description: "Rider assignment and final doorstep delivery route.",
        completed: false,
      },
      {
        title: "Delivered to Customer",
        location: "Customer Destination",
        timestamp: "Expected Tomorrow",
        description: "Parcel inspection and COD settlement.",
        completed: false,
      },
    ],
  };
}


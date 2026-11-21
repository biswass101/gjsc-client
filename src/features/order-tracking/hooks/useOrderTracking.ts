"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import type { OrderTrackingData } from "../types";
import { DEMO_ORDERS, createDynamicTrackingOrder } from "../data/demoOrders";
import { ordersApi } from "@/lib/api";

function formatApiTrackingData(liveData: any): OrderTrackingData {
  const events = (liveData.events || liveData.timeline || []).map((ev: any, idx: number, arr: any[]) => ({
    title: String(ev.title || "Status Updated"),
    location: String(ev.location || "Dhaka Logistics Hub"),
    timestamp: String(ev.timestamp || ev.time || "Recently"),
    description: String(ev.description || ""),
    completed: Boolean(ev.completed ?? true),
    active: Boolean(ev.active ?? idx === arr.length - 1),
  }));

  const items = (liveData.items || []).map((it: any) => ({
    name: String(it.name || "Product"),
    brand: String(it.brand || "Authentic Japan"),
    image: String(it.image || ""),
    slug: String(it.slug || ""),
    size: String(it.size || "Standard"),
    qty: Number(it.qty || 1),
    price: Number(it.price || 0),
  }));

  return {
    orderId: String(liveData.orderId || ""),
    customerName: String(liveData.customerName || "Customer"),
    phone: String(liveData.phone || ""),
    destination: String(liveData.destination || "Dhaka"),
    zone: String(liveData.zone || "Dhaka Metro Express"),
    courier: String(liveData.courier || "Pending Assignment"),
    consignmentId: String(liveData.consignmentId || "Pending Assignment"),
    ...(liveData.riderName ? { riderName: String(liveData.riderName) } : {}),
    ...(liveData.riderPhone ? { riderPhone: String(liveData.riderPhone) } : {}),
    paymentMethod: String(liveData.paymentMethod || "COD"),
    paymentStatus: (liveData.paymentStatus || "Cash on Delivery (Unpaid)") as any,
    estimatedDelivery: String(liveData.estimatedDelivery || "Within 24-48 Hours"),
    statusText: String(liveData.statusText || `${liveData.fulfillmentStatus || "Pending"} · Authentic Tokyo Sourcing`),
    currentStepIndex: typeof liveData.currentStepIndex === "number" ? liveData.currentStepIndex : 0,
    items,
    events,
  };
}

export function useOrderTracking() {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date | null>(null);
  const [activeOrder, setActiveOrder] = useState<OrderTrackingData | null>(
    DEMO_ORDERS["GJ-2026-4821"] || null,
  );
  const currentTrackingIdRef = useRef<string | null>(null);

  const fetchTracking = useCallback(async (key: string, isSilent = false) => {
    const cleanKey = key.trim().toUpperCase().replace("#", "");
    if (!cleanKey) return;

    if (!isSilent) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      const liveData = await ordersApi.trackOrder(cleanKey);
      if (liveData?.orderId) {
        const formatted = formatApiTrackingData(liveData);
        setActiveOrder(formatted);
        currentTrackingIdRef.current = formatted.orderId;
        setLastRefreshedAt(new Date());
        if (!isSilent) {
          toast.success("Live parcel tracking loaded", {
            description: `Tracking details for order #${formatted.orderId}`,
          });
        }
        return formatted;
      }
    } catch {
      // If not in database, check demo presets
      if (DEMO_ORDERS[cleanKey]) {
        setActiveOrder(DEMO_ORDERS[cleanKey]);
        currentTrackingIdRef.current = cleanKey;
        setLastRefreshedAt(new Date());
        if (!isSilent) {
          toast.success("Parcel tracking loaded", {
            description: `Tracking details for sample order #${cleanKey}`,
          });
        }
        return DEMO_ORDERS[cleanKey];
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
    return null;
  }, []);

  // On mount: inspect query params for orderId / order / number / id / key
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const paramKey = (
      params.get("orderId") ||
      params.get("order") ||
      params.get("number") ||
      params.get("id") ||
      params.get("key") ||
      ""
    ).trim().replace("#", "");

    if (!paramKey) return;

    setOrderIdInput(paramKey);
    fetchTracking(paramKey);
  }, [fetchTracking]);

  // Auto-refresh live tracking every 25 seconds for in-progress orders
  useEffect(() => {
    const trackingId = currentTrackingIdRef.current;
    if (!trackingId || trackingId.startsWith("GJ-2026-48") || trackingId.startsWith("GJ-2026-54")) {
      return; // Skip polling demo presets
    }

    if (activeOrder?.statusText.includes("Delivered") || activeOrder?.currentStepIndex === -1) {
      return; // Terminal states do not need polling
    }

    const interval = setInterval(() => {
      fetchTracking(trackingId, true);
    }, 25000);

    return () => clearInterval(interval);
  }, [activeOrder?.statusText, activeOrder?.currentStepIndex, fetchTracking]);

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = orderIdInput.trim().toUpperCase().replace("#", "");
    const cleanPhone = phoneInput.trim();

    if (!cleanId && !cleanPhone) {
      toast.error("Please enter an Order ID or Phone number", {
        description: "Example: GJ-2026-4821 or 017XXXXXXXX",
      });
      return;
    }

    const searchKey = cleanId || cleanPhone;
    const result = await fetchTracking(searchKey);

    if (!result) {
      const dynamicOrder = createDynamicTrackingOrder(cleanId || "GJ-PENDING", cleanPhone);
      setActiveOrder(dynamicOrder);
      currentTrackingIdRef.current = dynamicOrder.orderId;
      setLastRefreshedAt(new Date());
      toast.info("Parcel tracking located", {
        description: `Order #${dynamicOrder.orderId}`,
      });
    }
  };

  const handleSelectPreset = (id: string) => {
    setOrderIdInput(id);
    if (DEMO_ORDERS[id]) {
      setActiveOrder(DEMO_ORDERS[id]);
      currentTrackingIdRef.current = id;
      setLastRefreshedAt(new Date());
      toast.info(`Viewing sample parcel #${id}`);
    }
  };

  const refreshTracking = useCallback(() => {
    const target = currentTrackingIdRef.current || orderIdInput.trim().toUpperCase().replace("#", "");
    if (!target) return;
    fetchTracking(target, false);
  }, [fetchTracking, orderIdInput]);

  const whatsappHelpUrl = useMemo(() => {
    if (!activeOrder) return "https://wa.me/8801700000000";
    const text = encodeURIComponent(
      `Hello Glorious Japan! I'm checking the delivery status of order #${activeOrder.orderId} (${activeOrder.statusText}). Could you please update me?`,
    );
    return `https://wa.me/8801700000000?text=${text}`;
  }, [activeOrder]);

  return {
    orderIdInput,
    setOrderIdInput,
    phoneInput,
    setPhoneInput,
    isLoading,
    isRefreshing,
    lastRefreshedAt,
    activeOrder,
    handleTrackSubmit,
    handleSelectPreset,
    refreshTracking,
    whatsappHelpUrl,
  };
}


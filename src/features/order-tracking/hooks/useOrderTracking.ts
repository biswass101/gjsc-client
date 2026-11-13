"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { OrderTrackingData } from "../types";
import { DEMO_ORDERS, createDynamicTrackingOrder } from "../data/demoOrders";
import { ordersApi } from "@/lib/api";

export function useOrderTracking() {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeOrder, setActiveOrder] = useState<OrderTrackingData | null>(
    DEMO_ORDERS["GJ-2026-4821"] || null,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const paramKey = (params.get("orderId") || params.get("key") || "").trim().replace("#", "");
    if (!paramKey) return;

    setOrderIdInput(paramKey);
    setIsLoading(true);
    ordersApi
      .trackOrder(paramKey)
      .then((liveData) => {
        if (liveData?.orderId) {
          setActiveOrder(liveData);
        }
      })
      .catch(() => {
        if (DEMO_ORDERS[paramKey]) {
          setActiveOrder(DEMO_ORDERS[paramKey]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = orderIdInput.trim().toUpperCase().replace("#", "");

    if (!cleanId) {
      toast.error("Please enter an Order ID", {
        description: "Example: GJ-2026-4821 or GJ-2026-5431",
      });
      return;
    }

    setIsLoading(true);

    try {
      const liveData = await ordersApi.trackOrder(cleanId);
      if (liveData?.orderId) {
        setActiveOrder(liveData);
        toast.success("Live parcel tracking loaded", {
          description: `Tracking details for order #${liveData.orderId}`,
        });
        setIsLoading(false);
        return;
      }
    } catch (err: any) {
      // If not in database or database offline, check demo orders
    }

    if (DEMO_ORDERS[cleanId]) {
      setActiveOrder(DEMO_ORDERS[cleanId]);
      toast.success("Parcel tracking loaded", {
        description: `Tracking details for order #${cleanId}`,
      });
    } else {
      const dynamicOrder = createDynamicTrackingOrder(cleanId, phoneInput);
      setActiveOrder(dynamicOrder);
      toast.success("Parcel tracking found", {
        description: `Tracking details for order #${dynamicOrder.orderId}`,
      });
    }
    setIsLoading(false);
  };

  const handleSelectPreset = (id: string) => {
    setOrderIdInput(id);
    if (DEMO_ORDERS[id]) {
      setActiveOrder(DEMO_ORDERS[id]);
      toast.info(`Viewing sample parcel #${id}`);
    }
  };

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
    activeOrder,
    handleTrackSubmit,
    handleSelectPreset,
    whatsappHelpUrl,
  };
}


import { useState, useCallback, useEffect } from "react";
import type { AdminOrder, AdminCustomer, AdminOrderTimelineEvent } from "@/types";
import { INITIAL_ORDERS, INITIAL_CUSTOMERS } from "../admin-seed";
import type { AddActivityLogFn } from "./types";
import { adminApi } from "@/lib/api";

export function useOrderSlice(addActivityLog: AddActivityLogFn) {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<AdminCustomer[]>(INITIAL_CUSTOMERS);

  // Sync orders with backend MySQL database on mount
  useEffect(() => {
    adminApi
      .getOrders()
      .then((res) => {
        if (res?.orders && res.orders.length > 0) {
          const formatted: AdminOrder[] = res.orders.map((o: any) => ({
            id: o.orderNumber,
            customerName: o.customerName,
            customerEmail: o.customerEmail,
            customerPhone: o.customerPhone,
            date: (o.createdAt || "").slice(0, 10),
            dateFormatted: new Date(o.createdAt || Date.now()).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            total: Number(o.total),
            subtotal: Number(o.subtotal),
            shippingFee: Number(o.deliveryFee),
            discount: Number(o.discountAmount || 0),
            paymentMethod: o.paymentMethod,
            paymentStatus: o.paymentStatus,
            fulfillmentStatus: o.fulfillmentStatus,
            deliveryZone: o.deliveryZone,
            address: o.address,
            city: o.city,
            area: o.area,
            division: o.division,
            courier: o.courier || "None",
            consignmentId: o.consignmentId || undefined,
            timeline: (o.timeline || []).map((t: any, idx: number) => ({
              id: `tl-${idx}`,
              title: t.title,
              description: t.description,
              time: t.time,
              by: "System",
            })),
            items: (o.items || []).map((it: any) => ({
              name: it.name,
              brand: it.brand,
              size: it.size,
              price: Number(it.price),
              qty: Number(it.qty),
              image: it.image,
              slug: it.slug,
            })),
          }));
          setOrders(formatted);
        }
      })
      .catch(() => {
        /* fallback to INITIAL_ORDERS */
      });
  }, []);

  const addOrder = useCallback(
    (input: Omit<AdminOrder, "id" | "timeline" | "date" | "dateFormatted">): AdminOrder => {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      const dateFormatted =
        now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) +
        `, ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
      const id = `GJ-2026-${Math.floor(5500 + Math.random() * 500)}`;
      const newOrder: AdminOrder = {
        ...input,
        id,
        date: dateStr,
        dateFormatted,
        timeline: [
          {
            id: `tl-${Date.now()}`,
            title: "Order Placed",
            description: `Manual order created by Admin via ${input.paymentMethod}.`,
            time: dateFormatted,
            by: "Admin",
          },
        ],
      };
      setOrders((prev) => [newOrder, ...prev]);
      addActivityLog(
        "Created Manual Order",
        id,
        `Customer: ${newOrder.customerName}, Total: ৳${newOrder.total}`,
      );
      return newOrder;
    },
    [addActivityLog],
  );

  const updateOrderStatus = useCallback(
    (orderId: string, status: AdminOrder["fulfillmentStatus"], note?: string) => {
      const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setOrders((prev) =>
        prev.map((o) => {
          if (o.id === orderId) {
            const newTimelineEvent: AdminOrderTimelineEvent = {
              id: `tl-${Date.now()}`,
              title: `Status Changed to ${status}`,
              description: note || `Status updated from ${o.fulfillmentStatus} to ${status}.`,
              time: `Today, ${timeNow}`,
              by: "Admin",
            };
            return {
              ...o,
              fulfillmentStatus: status,
              timeline: [...o.timeline, newTimelineEvent],
            };
          }
          return o;
        }),
      );
      addActivityLog("Updated Order Status", orderId, `New status: ${status}`);
      adminApi.updateOrderStatus(orderId, { fulfillmentStatus: status, notes: note }).catch(() => {});
    },
    [addActivityLog],
  );

  const updateOrderPayment = useCallback(
    (orderId: string, status: AdminOrder["paymentStatus"], trxId?: string) => {
      setOrders((prev) =>
        prev.map((o) => {
          if (o.id === orderId) {
            return { ...o, paymentStatus: status, ...(trxId ? { trxId } : {}) };
          }
          return o;
        }),
      );
      addActivityLog("Updated Payment Status", orderId, `Status set to ${status}`);
    },
    [addActivityLog],
  );

  const assignCourier = useCallback(
    (orderId: string, courier: AdminOrder["courier"], consignmentId?: string) => {
      const trackingUrl =
        courier === "Pathao Express"
          ? `https://pathao.com/track/${consignmentId || "DEMO"}`
          : courier === "Steadfast"
            ? `https://steadfast.com.bd/track/${consignmentId || "DEMO"}`
            : undefined;

      setOrders((prev) =>
        prev.map((o) => {
          if (o.id === orderId) {
            return {
              ...o,
              courier,
              consignmentId: consignmentId ?? o.consignmentId,
              trackingUrl: trackingUrl ?? o.trackingUrl,
              fulfillmentStatus:
                o.fulfillmentStatus === "Pending" ? "Processing" : o.fulfillmentStatus,
            };
          }
          return o;
        }),
      );
      addActivityLog("Assigned Courier", orderId, `${courier} (${consignmentId || "Pending"})`);
      adminApi.assignCourier(orderId, { courier, consignmentId }).catch(() => {});
    },
    [addActivityLog],
  );

  const addOrderNote = useCallback((orderId: string, note: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, notes: note } : o)));
  }, []);

  const deleteOrder = useCallback(
    (orderId: string) => {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      addActivityLog("Deleted Order", orderId);
    },
    [addActivityLog],
  );

  const addCustomer = useCallback(
    (
      input: Omit<
        AdminCustomer,
        "id" | "joinedDate" | "ordersCount" | "totalSpent" | "avgOrderValue"
      >,
    ): AdminCustomer => {
      const id = `cust-${Date.now()}`;
      const newCustomer: AdminCustomer = {
        ...input,
        id,
        joinedDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        lastOrderDate: input.lastOrderDate || "Never",
        ordersCount: 0,
        totalSpent: 0,
        avgOrderValue: 0,
      };
      setCustomers((prev) => [newCustomer, ...prev]);
      addActivityLog("Added Customer", newCustomer.name, newCustomer.phone);
      return newCustomer;
    },
    [addActivityLog],
  );

  const updateCustomer = useCallback(
    (id: string, updates: Partial<AdminCustomer>) => {
      setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
      addActivityLog("Updated Customer", id);
    },
    [addActivityLog],
  );

  const deleteCustomer = useCallback(
    (id: string) => {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      addActivityLog("Deleted Customer", id);
    },
    [addActivityLog],
  );

  const resetOrders = useCallback(() => {
    setOrders(INITIAL_ORDERS);
  }, []);

  const resetCustomers = useCallback(() => {
    setCustomers(INITIAL_CUSTOMERS);
  }, []);

  return {
    orders,
    setOrders,
    customers,
    setCustomers,
    addOrder,
    updateOrderStatus,
    updateOrderPayment,
    assignCourier,
    addOrderNote,
    deleteOrder,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    resetOrders,
    resetCustomers,
  };
}

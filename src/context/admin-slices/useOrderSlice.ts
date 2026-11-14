import { useState, useCallback, useEffect } from "react";
import type { AdminOrder, AdminCustomer, AdminOrderItem, AdminOrderTimelineEvent } from "@/types";
import { INITIAL_ORDERS, INITIAL_CUSTOMERS } from "../admin-seed";
import type { AddActivityLogFn } from "./types";
import { adminApi } from "@/lib/api";

function toSafeTimeline(raw: any): AdminOrderTimelineEvent[] {
  let list = raw;
  if (typeof list === "string") {
    try {
      list = JSON.parse(list);
    } catch {
      list = [];
    }
  }
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map((t: any, idx: number) => ({
    id: t.id || `tl-${idx}`,
    title: t.title || "Order Event",
    description: t.description || "",
    time: t.time || "",
    by: t.by || "System",
  }));
}

function toSafeItems(raw: any): AdminOrderItem[] {
  let list = raw;
  if (typeof list === "string") {
    try {
      list = JSON.parse(list);
    } catch {
      list = [];
    }
  }
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map((it: any) => ({
    name: it.name || "Product",
    brand: it.brand || "Authentic Japan",
    size: it.size || "Standard",
    price: Number(it.price || 0),
    qty: Number(it.qty || 1),
    image: it.image || "",
    slug: it.slug || "",
  }));
}

function formatApiOrderToAdminOrder(o: any): AdminOrder {
  const createdAt = o.createdAt || "";
  const now = new Date();
  const orderDate = createdAt ? new Date(createdAt) : now;
  const dateFormatted = !isNaN(orderDate.getTime())
    ? orderDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) + `, ${orderDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`
    : "Recently";

  return {
    id: o.orderNumber || String(o.id),
    customerName: o.customerName || "Customer",
    customerEmail: o.customerEmail || "",
    customerPhone: o.customerPhone || "",
    date: createdAt ? String(createdAt).slice(0, 10) : now.toISOString().slice(0, 10),
    dateFormatted,
    total: Number(o.total || 0),
    subtotal: Number(o.subtotal || 0),
    shippingFee: Number(o.shippingFee ?? o.deliveryFee ?? 60),
    discountAmount: Number(o.discountAmount || 0),
    paymentMethod: o.paymentMethod || "COD",
    paymentStatus: o.paymentStatus || "Pending",
    fulfillmentStatus: o.fulfillmentStatus || "Pending",
    deliveryZone: o.deliveryZone || "dhaka_metro",
    address: o.address || "",
    city: o.city || "Dhaka",
    area: o.area || "",
    division: o.division || "Dhaka",
    courier: o.courier || "None",
    consignmentId: o.consignmentId || undefined,
    trackingUrl: o.trackingUrl || undefined,
    timeline: toSafeTimeline(o.timeline),
    items: toSafeItems(o.items),
    notes: o.notes || undefined,
  };
}

export function useOrderSlice(addActivityLog: AddActivityLogFn) {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<AdminCustomer[]>(INITIAL_CUSTOMERS);

  // Sync orders & customers with backend MySQL database on mount
  useEffect(() => {
    adminApi
      .getOrders({ limit: 100 })
      .then((res) => {
        const orderList = Array.isArray(res) ? res : res?.orders;
        if (Array.isArray(orderList)) {
          const formatted: AdminOrder[] = orderList.map(formatApiOrderToAdminOrder);
          setOrders(formatted);
        }
      })
      .catch((err) => {
        console.warn("Could not sync orders from backend API:", err);
      });

    adminApi
      .getCustomers()
      .then((res) => {
        if (res?.customers && Array.isArray(res.customers)) {
          setCustomers(res.customers);
        }
      })
      .catch((err) => {
        console.warn("Could not sync customers from backend API:", err);
      });
  }, []);

  const addOrder = useCallback(
    async (input: Omit<AdminOrder, "id" | "timeline" | "date" | "dateFormatted">): Promise<AdminOrder> => {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      const dateFormatted =
        now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) +
        `, ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;

      const payload = {
        customerName: input.customerName,
        customerEmail: input.customerEmail || "customer@gloriousjapan.com",
        customerPhone: input.customerPhone,
        address: input.address,
        area: input.area || "Area",
        city: input.city || "Dhaka",
        division: input.division || "Dhaka",
        deliveryZone: input.deliveryZone || (input.city?.toLowerCase() === "dhaka" ? "dhaka_metro" : "outside_dhaka"),
        paymentMethod: input.paymentMethod || "COD",
        paymentStatus: input.paymentStatus || "Pending",
        fulfillmentStatus: input.fulfillmentStatus || "Pending",
        courier: input.courier || "None",
        consignmentId: input.consignmentId || null,
        shippingFee: Number(input.shippingFee || 60),
        discountAmount: Number(input.discountAmount || 0),
        notes: input.notes || "Manual order placed via admin console.",
        items: input.items.map((it) => ({
          slug: it.slug,
          qty: it.qty,
          size: it.size || "Standard",
          price: it.price,
        })),
      };

      try {
        const savedOrder = await adminApi.createOrder(payload);
        const newOrder = formatApiOrderToAdminOrder({
          ...savedOrder,
          notes: savedOrder.notes || input.notes,
        });

        setOrders((prev) => [newOrder, ...prev.filter((o) => o.id !== newOrder.id)]);
        addActivityLog(
          "Created Manual Order",
          newOrder.id,
          `Customer: ${newOrder.customerName}, Total: ৳${newOrder.total} (${newOrder.items.length} items)`,
        );
        return newOrder;
      } catch (err: any) {
        console.error("Database order creation failed:", err);
        throw err;
      }
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
              timeline: [...(Array.isArray(o.timeline) ? o.timeline : []), newTimelineEvent],
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
      adminApi.updateOrderPayment(orderId, { paymentStatus: status, trxId }).catch(() => {});
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

  const addOrderNote = useCallback(
    (orderId: string, note: string) => {
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, notes: note } : o)));
      addActivityLog("Added Order Note", orderId, note);
      adminApi.addOrderNote(orderId, note).catch(() => {});
    },
    [addActivityLog],
  );

  const deleteOrder = useCallback(
    (orderId: string) => {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      addActivityLog("Deleted Order", orderId);
      adminApi.deleteOrder(orderId).catch(() => {});
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

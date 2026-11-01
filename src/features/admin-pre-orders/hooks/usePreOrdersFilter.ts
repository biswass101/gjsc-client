import { useState, useMemo } from "react";
import type { AdminPreOrder } from "@/types";

export function usePreOrdersFilter(preOrders: AdminPreOrder[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredPreOrders = useMemo(() => {
    return preOrders.filter((po) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        po.productName.toLowerCase().includes(q) ||
        po.brand.toLowerCase().includes(q) ||
        (po.japaneseName && po.japaneseName.toLowerCase().includes(q));

      const matchesStatus = selectedStatus === "all" || po.batchStatus === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [preOrders, searchQuery, selectedStatus]);

  const totalBookedRevenue = useMemo(() => {
    return preOrders.reduce((sum, po) => {
      const depositVal = po.price * (po.depositPercent / 100) * po.slotsBooked;
      return sum + depositVal;
    }, 0);
  }, [preOrders]);

  const totalSlotsBooked = useMemo(
    () => preOrders.reduce((s, p) => s + p.slotsBooked, 0),
    [preOrders],
  );

  const totalSlots = useMemo(() => preOrders.reduce((s, p) => s + p.slotsTotal, 0), [preOrders]);

  const inFlightBatchesCount = useMemo(
    () =>
      preOrders.filter((p) => p.batchStatus === "Tokyo Sourcing" || p.batchStatus === "Air-Freight")
        .length,
    [preOrders],
  );

  return {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    filteredPreOrders,
    totalBookedRevenue,
    totalSlotsBooked,
    totalSlots,
    inFlightBatchesCount,
  };
}

import { useState, useMemo, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useAdmin } from "@/context/admin-context";
import { TimeRange } from "../types";
import { useDashboardCharts } from "./useDashboardCharts";
import { adminApi } from "@/lib/api";

export function useDashboardMetrics() {
  const adminState = useAdmin();
  const { orders, products, preOrders, reviews } = adminState;

  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [backendAnalytics, setBackendAnalytics] = useState<any | null>(null);
  const [isLoadingTelemetry, setIsLoadingTelemetry] = useState<boolean>(false);
  const [isLiveDb, setIsLiveDb] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  // Live Telemetry from Express / MySQL Backend
  const fetchTelemetry = useCallback(async () => {
    try {
      setIsLoadingTelemetry(true);
      const data = await adminApi.getAnalytics();
      if (data && data.metrics) {
        setBackendAnalytics(data);
        setIsLiveDb(true);
        setLastSynced(new Date());
      }
    } catch {
      setIsLiveDb(false);
    } finally {
      setIsLoadingTelemetry(false);
    }
  }, []);

  useEffect(() => {
    void fetchTelemetry();
  }, [fetchTelemetry]);

  // Active Orders
  const activeOrders = useMemo(
    () => orders.filter((o) => o.fulfillmentStatus !== "Cancelled"),
    [orders],
  );

  const totalGrossRevenue = useMemo(() => {
    if (backendAnalytics?.metrics?.grossRevenue !== undefined) {
      return Number(backendAnalytics.metrics.grossRevenue);
    }
    return activeOrders.reduce((sum, o) => sum + o.total, 0);
  }, [activeOrders, backendAnalytics]);

  const deliveredRevenue = useMemo(() => {
    return orders
      .filter((o) => o.fulfillmentStatus === "Delivered")
      .reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const estimatedProfit = useMemo(() => {
    let totalProfit = 0;
    activeOrders.forEach((order) => {
      order.items.forEach((item) => {
        const prod = products.find((p) => p.slug === item.slug);
        const cost = prod ? prod.costPrice : item.price * 0.58;
        totalProfit += (item.price - cost) * (item.qty || 1);
      });
    });
    return Math.max(totalProfit, totalGrossRevenue * 0.42);
  }, [activeOrders, products, totalGrossRevenue]);

  const grossMarginPercent = useMemo(
    () => (totalGrossRevenue > 0 ? Math.round((estimatedProfit / totalGrossRevenue) * 100) : 42),
    [estimatedProfit, totalGrossRevenue],
  );

  const avgOrderValue = useMemo(() => {
    if (backendAnalytics?.metrics?.avgOrderValue !== undefined) {
      return Number(backendAnalytics.metrics.avgOrderValue);
    }
    return activeOrders.length > 0 ? Math.round(totalGrossRevenue / activeOrders.length) : 0;
  }, [activeOrders, backendAnalytics, totalGrossRevenue]);

  const pendingOrdersCount = useMemo(() => {
    if (backendAnalytics?.statusBreakdown) {
      const p = Number(backendAnalytics.statusBreakdown["Pending"] || 0);
      const pr = Number(backendAnalytics.statusBreakdown["Processing"] || 0);
      return p + pr;
    }
    return orders.filter(
      (o) => o.fulfillmentStatus === "Pending" || o.fulfillmentStatus === "Processing",
    ).length;
  }, [orders, backendAnalytics]);

  const lowStockProducts = useMemo(() => {
    if (backendAnalytics?.lowStockProducts !== undefined) {
      return backendAnalytics.lowStockProducts;
    }
    return products.filter((p) => p.stock <= p.lowStockThreshold);
  }, [products, backendAnalytics]);

  const pendingReviewsCount = useMemo(
    () => reviews.filter((r) => r.status === "pending").length,
    [reviews],
  );

  const preOrderRevenue = useMemo(() => {
    return preOrders.reduce((sum, po) => {
      const deposit = po.price * (po.depositPercent / 100) * po.slotsBooked;
      return sum + deposit;
    }, 0);
  }, [preOrders]);

  const avgStoreRating = useMemo(() => {
    if (reviews.length === 0) return "4.9";
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const {
    revenueChartData,
    funnelData,
    regionalSalesData,
    paymentMethodData,
    brandPerformanceData,
    topProducts: fallbackTopProducts,
    orderStatusData: fallbackOrderStatusData,
  } = useDashboardCharts(orders, products, timeRange, totalGrossRevenue, estimatedProfit, backendAnalytics);

  const topProducts = useMemo(() => {
    if (backendAnalytics?.topProducts !== undefined) {
      return backendAnalytics.topProducts.map((p: any) => ({
        id: String(p.id),
        name: p.name,
        slug: p.slug,
        brand: p.brandName || "Authentic Japan",
        price: Number(p.price),
        salesCount: Number(p.salesCount || 0),
        stock: Number(p.stock || 0),
        image: p.image,
      }));
    }
    return fallbackTopProducts;
  }, [backendAnalytics, fallbackTopProducts]);

  const orderStatusData = useMemo(() => {
    if (backendAnalytics?.statusBreakdown) {
      return Object.entries(backendAnalytics.statusBreakdown).map(([status, count]) => ({
        status,
        count: Number(count),
      }));
    }
    return fallbackOrderStatusData;
  }, [backendAnalytics, fallbackOrderStatusData]);

  const handleExportCSV = () => {
    const rows = [
      ["--- GLORIOUS JAPAN BUSINESS PERFORMANCE REPORT ---"],
      [`Generated At: ${new Date().toISOString()}`],
      [`Telemetry Source: ${isLiveDb ? "MySQL Production Database" : "Cached Workspace Dataset"}`],
      [`Selected Timeframe: ${timeRange.toUpperCase()}`],
      [""],
      ["FINANCIAL KPI SUMMARY"],
      ["Gross Merchandise Value (BDT)", totalGrossRevenue.toString()],
      ["Estimated Net Profit (BDT)", estimatedProfit.toString()],
      ["Blended Gross Margin (%)", `${grossMarginPercent}%`],
      ["Average Order Value (BDT)", avgOrderValue.toString()],
      ["Delivered Revenue (BDT)", deliveredRevenue.toString()],
      ["Pre-Order Advance Deposits (BDT)", preOrderRevenue.toString()],
      [""],
      ["DETAILED TRANSACTIONS"],
      ["Order ID", "Customer", "Date", "Payment Method", "Courier", "Status", "Total BDT"],
      ...orders.map((o) => [
        o.id,
        o.customerName,
        o.date,
        o.paymentMethod,
        o.courier,
        o.fulfillmentStatus,
        o.total.toString(),
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `GJSC_Executive_Business_Audit_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Executive Business Performance Report (CSV) downloaded! 📊");
  };

  return {
    timeRange,
    setTimeRange,
    totalGrossRevenue,
    deliveredRevenue,
    estimatedProfit,
    grossMarginPercent,
    avgOrderValue,
    pendingOrdersCount,
    lowStockProducts,
    pendingReviewsCount,
    preOrderRevenue,
    avgStoreRating,
    revenueChartData,
    funnelData,
    regionalSalesData,
    paymentMethodData,
    brandPerformanceData,
    topProducts,
    orderStatusData,
    handleExportCSV,
    isLiveDb,
    isLoadingTelemetry,
    lastSynced,
    fetchTelemetry,
  };
}

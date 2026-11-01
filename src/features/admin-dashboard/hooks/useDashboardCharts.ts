import { useMemo } from "react";
import { AdminOrder, AdminProduct } from "@/context/admin-context";
import { TimeRange } from "../types";

export function useDashboardCharts(
  orders: AdminOrder[],
  products: AdminProduct[],
  timeRange: TimeRange,
  totalGrossRevenue: number,
  estimatedProfit: number,
) {
  const revenueChartData = useMemo(() => {
    if (timeRange === "today") {
      return [
        { time: "06:00", revenue: 8500, profit: 3600, orders: 3 },
        { time: "09:00", revenue: 24200, profit: 10400, orders: 8 },
        { time: "12:00", revenue: 58400, profit: 25100, orders: 19 },
        { time: "15:00", revenue: 89600, profit: 38500, orders: 28 },
        { time: "18:00", revenue: 134200, profit: 57700, orders: 42 },
        { time: "21:00", revenue: 178500, profit: 76800, orders: 56 },
        {
          time: "Now",
          revenue: totalGrossRevenue,
          profit: estimatedProfit,
          orders: orders.length,
        },
      ];
    }
    if (timeRange === "7d") {
      return [
        { time: "Mon", revenue: 42000, profit: 18100, orders: 14 },
        { time: "Tue", revenue: 68000, profit: 29200, orders: 22 },
        { time: "Wed", revenue: 89000, profit: 38300, orders: 29 },
        { time: "Thu", revenue: 112000, profit: 48200, orders: 36 },
        { time: "Fri", revenue: 165000, profit: 71000, orders: 52 },
        { time: "Sat", revenue: 210000, profit: 90300, orders: 67 },
        {
          time: "Sun",
          revenue: totalGrossRevenue,
          profit: estimatedProfit,
          orders: orders.length,
        },
      ];
    }
    if (timeRange === "90d") {
      return [
        { time: "Month -2", revenue: 480000, profit: 206000, orders: 154 },
        { time: "Month -1", revenue: 620000, profit: 267000, orders: 198 },
        {
          time: "Current Month",
          revenue: totalGrossRevenue,
          profit: estimatedProfit,
          orders: orders.length,
        },
      ];
    }
    if (timeRange === "ytd") {
      return [
        { time: "Q1 Tokyo Spring", revenue: 1250000, profit: 538000, orders: 395 },
        { time: "Q2 Sakura Bloom", revenue: 1840000, profit: 791000, orders: 580 },
        { time: "Q3 Summer UV Care", revenue: 2310000, profit: 993000, orders: 725 },
        {
          time: "Q4 Autumn Glow (YTD)",
          revenue: 2940000 + totalGrossRevenue,
          profit: 1264000 + estimatedProfit,
          orders: 920 + orders.length,
        },
      ];
    }
    return [
      { time: "Week 1", revenue: 145000, profit: 62400, orders: 46 },
      { time: "Week 2", revenue: 210000, profit: 90300, orders: 68 },
      { time: "Week 3", revenue: 285000, profit: 122600, orders: 91 },
      { time: "Week 4", revenue: 362000, profit: 155700, orders: 114 },
      {
        time: "Current Pace",
        revenue: totalGrossRevenue,
        profit: estimatedProfit,
        orders: orders.length,
      },
    ];
  }, [timeRange, totalGrossRevenue, estimatedProfit, orders.length]);

  const funnelData = useMemo(() => {
    const visits = 28450;
    const productViews = 18620;
    const cartAdds = 5420;
    const checkouts = 2150;
    const paidOrders = orders.length;

    return [
      { stage: "Store Visits", count: visits, percent: 100, color: "#6366f1" },
      {
        stage: "Product Views",
        count: productViews,
        percent: Math.round((productViews / visits) * 100),
        color: "#3b82f6",
      },
      {
        stage: "Added to Bag",
        count: cartAdds,
        percent: Math.round((cartAdds / visits) * 100),
        color: "#06b6d4",
      },
      {
        stage: "Initiated Checkout",
        count: checkouts,
        percent: Math.round((checkouts / visits) * 100),
        color: "#10b981",
      },
      {
        stage: "Paid Orders",
        count: paidOrders,
        percent: Math.round((paidOrders / visits) * 100),
        color: "#e11d48",
      },
    ];
  }, [orders.length]);

  const regionalSalesData = useMemo(() => {
    return [
      {
        division: "Dhaka Metro",
        share: 62,
        revenue: Math.round(totalGrossRevenue * 0.62),
        color: "var(--primary)",
      },
      {
        division: "Chittagong",
        share: 18,
        revenue: Math.round(totalGrossRevenue * 0.18),
        color: "#3b82f6",
      },
      {
        division: "Sylhet",
        share: 8,
        revenue: Math.round(totalGrossRevenue * 0.08),
        color: "#10b981",
      },
      {
        division: "Rajshahi",
        share: 5,
        revenue: Math.round(totalGrossRevenue * 0.05),
        color: "#f59e0b",
      },
      {
        division: "Khulna & Others",
        share: 7,
        revenue: Math.round(totalGrossRevenue * 0.07),
        color: "#8b5cf6",
      },
    ];
  }, [totalGrossRevenue]);

  const paymentMethodData = useMemo(() => {
    let bkash = 0;
    let cod = 0;
    let card = 0;
    orders.forEach((o) => {
      if (o.paymentMethod === "bKash") bkash += o.total;
      else if (o.paymentMethod === "COD") cod += o.total;
      else card += o.total;
    });
    return [
      { name: "bKash MFS (Instant)", value: Math.max(1, bkash), color: "#e2136e" },
      { name: "Cash on Delivery", value: Math.max(1, cod), color: "var(--primary)" },
      { name: "Visa / Mastercard", value: Math.max(1, card), color: "#3b82f6" },
    ];
  }, [orders]);

  const brandPerformanceData = useMemo(() => {
    const brandMap: Record<string, { count: number; revenue: number }> = {};
    orders.forEach((o) => {
      o.items.forEach((item) => {
        const bName = item.brand || "Shiseido";
        const quantity = item.qty || 1;
        if (!brandMap[bName]) brandMap[bName] = { count: 0, revenue: 0 };
        brandMap[bName].count += quantity;
        brandMap[bName].revenue += item.price * quantity;
      });
    });

    const list = Object.entries(brandMap).map(([brand, data]) => ({
      brand,
      revenue: data.revenue,
      units: data.count,
    }));
    return list.sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [orders]);

  const topProducts = useMemo(() => {
    return [...products].sort((a, b) => b.salesCount - a.salesCount).slice(0, 5);
  }, [products]);

  const orderStatusData = useMemo(() => {
    const counts: Record<string, number> = {
      Delivered: 0,
      "In Transit": 0,
      Dispatched: 0,
      Processing: 0,
      Pending: 0,
    };
    orders.forEach((o) => {
      const current = counts[o.fulfillmentStatus];
      if (typeof current === "number") {
        counts[o.fulfillmentStatus] = current + 1;
      }
    });
    return Object.entries(counts).map(([status, count]) => ({ status, count }));
  }, [orders]);

  return {
    revenueChartData,
    funnelData,
    regionalSalesData,
    paymentMethodData,
    brandPerformanceData,
    topProducts,
    orderStatusData,
  };
}

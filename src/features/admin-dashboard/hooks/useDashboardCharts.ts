import { useMemo } from "react";
import { AdminOrder, AdminProduct } from "@/context/admin-context";
import { TimeRange } from "../types";

export function useDashboardCharts(
  orders: AdminOrder[],
  products: AdminProduct[],
  timeRange: TimeRange,
  totalGrossRevenue: number,
  estimatedProfit: number,
  backendAnalytics?: any,
) {
  // 1. Dynamic Revenue Chart Data
  const revenueChartData = useMemo(() => {
    const activeOrders = orders.filter((o) => o.fulfillmentStatus !== "Cancelled");

    // Helper: calculate margin for an order
    const getOrderProfit = (o: AdminOrder) => {
      let profit = 0;
      o.items.forEach((item) => {
        const prod = products.find((p) => p.slug === item.slug);
        const cost = prod ? prod.costPrice : item.price * 0.58;
        profit += (item.price - cost) * (item.qty || 1);
      });
      return profit > 0 ? profit : o.total * 0.42;
    };

    if (timeRange === "today") {
      const todaySlots = [
        { time: "00:00", hourMax: 4 },
        { time: "04:00", hourMax: 8 },
        { time: "08:00", hourMax: 12 },
        { time: "12:00", hourMax: 16 },
        { time: "16:00", hourMax: 20 },
        { time: "20:00", hourMax: 24 },
      ];

      const now = new Date();
      const todayStr = now.toISOString().slice(0, 10);
      const ordersToday = activeOrders.filter((o) => o.date === todayStr);

      const slotData = todaySlots.map((slot, idx) => {
        const hourMin = idx === 0 ? 0 : todaySlots[idx - 1]?.hourMax ?? 0;
        const matchingOrders = ordersToday.filter((o) => {
          const itemTime = o.timeline?.[0]?.time || "";
          const match = itemTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
          if (match && match[1] && match[3]) {
            let hour = parseInt(match[1], 10);
            const period = match[3].toUpperCase();
            if (period === "PM" && hour !== 12) hour += 12;
            if (period === "AM" && hour === 12) hour = 0;
            return hour >= hourMin && hour < slot.hourMax;
          }
          return false;
        });

        const rev = matchingOrders.reduce((sum, o) => sum + o.total, 0);
        const prof = matchingOrders.reduce((sum, o) => sum + getOrderProfit(o), 0);
        return {
          time: slot.time,
          revenue: rev,
          profit: Math.round(prof),
          orders: matchingOrders.length,
        };
      });

      return [
        ...slotData,
        {
          time: "Now",
          revenue: ordersToday.reduce((sum, o) => sum + o.total, 0),
          profit: Math.round(ordersToday.reduce((sum, o) => sum + getOrderProfit(o), 0)),
          orders: ordersToday.length,
        },
      ];
    }

    if (timeRange === "7d") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const result: Array<{ time: string; revenue: number; profit: number; orders: number }> = [];

      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(0, 10);
        const dayLabel = days[d.getDay()] || "Day";

        const matching = activeOrders.filter((o) => o.date === dateStr);
        const rev = matching.reduce((sum, o) => sum + o.total, 0);
        const prof = matching.reduce((sum, o) => sum + getOrderProfit(o), 0);

        result.push({
          time: dayLabel,
          revenue: rev,
          profit: Math.round(prof),
          orders: matching.length,
        });
      }

      return result;
    }

    if (timeRange === "90d") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const result: Array<{ time: string; revenue: number; profit: number; orders: number }> = [];

      for (let i = 2; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const year = d.getFullYear();
        const month = d.getMonth();
        const label = i === 0 ? "Current Month" : `${months[month]} ${year}`;

        const matching = activeOrders.filter((o) => {
          if (!o.date) return false;
          const od = new Date(o.date);
          return od.getFullYear() === year && od.getMonth() === month;
        });

        const rev = matching.reduce((sum, o) => sum + o.total, 0);
        const prof = matching.reduce((sum, o) => sum + getOrderProfit(o), 0);

        result.push({
          time: label,
          revenue: rev,
          profit: Math.round(prof),
          orders: matching.length,
        });
      }

      return result;
    }

    if (timeRange === "ytd") {
      const currentYear = new Date().getFullYear();
      const quarters = [
        { label: "Q1 Spring Rituals", months: [0, 1, 2] },
        { label: "Q2 Sakura Summer", months: [3, 4, 5] },
        { label: "Q3 UV Defense", months: [6, 7, 8] },
        { label: "Q4 Autumn Glow", months: [9, 10, 11] },
      ];

      return quarters.map((q) => {
        const matching = activeOrders.filter((o) => {
          if (!o.date) return false;
          const od = new Date(o.date);
          return od.getFullYear() === currentYear && q.months.includes(od.getMonth());
        });

        const rev = matching.reduce((sum, o) => sum + o.total, 0);
        const prof = matching.reduce((sum, o) => sum + getOrderProfit(o), 0);

        return {
          time: q.label,
          revenue: rev,
          profit: Math.round(prof),
          orders: matching.length,
        };
      });
    }

    // Default: 30d (segmented into 4 weeks)
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Current Pace"];
    const nowMs = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    return weeks.map((w, idx) => {
      if (idx === 4) {
        return {
          time: "Current Pace",
          revenue: totalGrossRevenue,
          profit: Math.round(estimatedProfit),
          orders: activeOrders.length,
        };
      }

      const startOffset = (4 - idx) * 7 * dayMs;
      const endOffset = (3 - idx) * 7 * dayMs;
      const startTime = nowMs - startOffset;
      const endTime = nowMs - endOffset;

      const matching = activeOrders.filter((o) => {
        if (!o.date) return false;
        const t = new Date(o.date).getTime();
        return t >= startTime && t < endTime;
      });

      const rev = matching.reduce((sum, o) => sum + o.total, 0);
      const prof = matching.reduce((sum, o) => sum + getOrderProfit(o), 0);

      return {
        time: w,
        revenue: rev,
        profit: Math.round(prof),
        orders: matching.length,
      };
    });
  }, [orders, products, timeRange, totalGrossRevenue, estimatedProfit]);

  // 2. Conversion Funnel Data
  const funnelData = useMemo(() => {
    const paidOrders = orders.filter((o) => o.fulfillmentStatus !== "Cancelled").length;

    if (paidOrders === 0) {
      return [
        { stage: "Store Visits", count: 0, percent: 0, color: "#6366f1" },
        { stage: "Product Views", count: 0, percent: 0, color: "#3b82f6" },
        { stage: "Added to Bag", count: 0, percent: 0, color: "#06b6d4" },
        { stage: "Initiated Checkout", count: 0, percent: 0, color: "#10b981" },
        { stage: "Paid Orders", count: 0, percent: 0, color: "#e11d48" },
      ];
    }

    const checkouts = Math.max(paidOrders, Math.round(paidOrders * 1.35));
    const cartAdds = Math.max(checkouts, Math.round(checkouts * 2.5));
    const productViews = Math.max(cartAdds, Math.round(cartAdds * 3.4));
    const visits = Math.max(productViews, Math.round(productViews * 1.5));

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
  }, [orders]);

  // 3. Geographic Regional Distribution
  const regionalSalesData = useMemo(() => {
    if (backendAnalytics?.regionalBreakdown && backendAnalytics.regionalBreakdown.length > 0) {
      const colors = ["var(--primary)", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6"];
      return backendAnalytics.regionalBreakdown.map((r: any, idx: number) => ({
        division: r.division,
        share: Number(r.share || 0),
        revenue: Number(r.revenue || 0),
        color: colors[idx % colors.length],
      }));
    }

    const divisionMap: Record<string, number> = {};
    orders
      .filter((o) => o.fulfillmentStatus !== "Cancelled")
      .forEach((o) => {
        const div = o.division || "Dhaka";
        divisionMap[div] = (divisionMap[div] || 0) + o.total;
      });

    const standardDivisions = [
      { name: "Dhaka", color: "var(--primary)" },
      { name: "Chittagong", color: "#3b82f6" },
      { name: "Sylhet", color: "#10b981" },
      { name: "Rajshahi", color: "#f59e0b" },
      { name: "Khulna & Others", color: "#8b5cf6" },
    ];

    if (totalGrossRevenue === 0) {
      return standardDivisions.map((d) => ({
        division: d.name,
        share: 0,
        revenue: 0,
        color: d.color,
      }));
    }

    const result = Object.entries(divisionMap).map(([division, revenue], idx) => {
      const color = standardDivisions[idx % standardDivisions.length]?.color || "var(--primary)";
      return {
        division,
        share: Math.round((revenue / totalGrossRevenue) * 100),
        revenue,
        color,
      };
    });

    return result.sort((a, b) => b.revenue - a.revenue);
  }, [orders, totalGrossRevenue, backendAnalytics]);

  // 4. Payment Method Channel Share
  const paymentMethodData = useMemo(() => {
    if (backendAnalytics?.paymentBreakdown) {
      const bkash = Number(backendAnalytics.paymentBreakdown["bKash"] || 0);
      const cod = Number(backendAnalytics.paymentBreakdown["COD"] || 0);
      const card = Number(backendAnalytics.paymentBreakdown["Card"] || 0);
      return [
        { name: "bKash MFS (Instant)", value: bkash, color: "#e2136e" },
        { name: "Cash on Delivery", value: cod, color: "var(--primary)" },
        { name: "Visa / Mastercard", value: card, color: "#3b82f6" },
      ];
    }

    let bkash = 0;
    let cod = 0;
    let card = 0;

    orders
      .filter((o) => o.fulfillmentStatus !== "Cancelled")
      .forEach((o) => {
        if (o.paymentMethod === "bKash") bkash += o.total;
        else if (o.paymentMethod === "COD") cod += o.total;
        else card += o.total;
      });

    return [
      { name: "bKash MFS (Instant)", value: bkash, color: "#e2136e" },
      { name: "Cash on Delivery", value: cod, color: "var(--primary)" },
      { name: "Visa / Mastercard", value: card, color: "#3b82f6" },
    ];
  }, [orders, backendAnalytics]);

  // 5. Japanese Brand Performance
  const brandPerformanceData = useMemo(() => {
    if (backendAnalytics?.brandPerformance && backendAnalytics.brandPerformance.length > 0) {
      return backendAnalytics.brandPerformance.map((b: any) => ({
        brand: b.brand,
        revenue: Number(b.revenue || 0),
        units: Number(b.units || 0),
      }));
    }

    const brandMap: Record<string, { count: number; revenue: number }> = {};
    orders
      .filter((o) => o.fulfillmentStatus !== "Cancelled")
      .forEach((o) => {
        o.items.forEach((item) => {
          const bName = item.brand || "Authentic Japan";
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
  }, [orders, backendAnalytics]);

  // 6. Top Products
  const topProducts = useMemo(() => {
    return [...products].sort((a, b) => b.salesCount - a.salesCount).slice(0, 5);
  }, [products]);

  // 7. Order Fulfillment Status
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

"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Package,
  Repeat,
  ShoppingBag,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatBDT, PRODUCTS } from "@/lib/catalog";

const MONTHLY_REVENUE_DATA = [
  { month: "Feb", revenue: 185000, orders: 120, avgOrder: 1541 },
  { month: "Mar", revenue: 220000, orders: 145, avgOrder: 1517 },
  { month: "Apr", revenue: 265000, orders: 178, avgOrder: 1488 },
  { month: "May", revenue: 290000, orders: 195, avgOrder: 1487 },
  { month: "Jun", revenue: 315000, orders: 220, avgOrder: 1431 },
  { month: "Jul", revenue: 342850, orders: 247, avgOrder: 1388 },
];

const CATEGORY_DISTRIBUTION = [
  { name: "Serums & Ampoules", value: 38, color: "var(--primary)" },
  { name: "Sunscreens", value: 24, color: "#e07a93" },
  { name: "Cleansers & Oils", value: 18, color: "#cfa85e" },
  { name: "Essences & Lotions", value: 12, color: "#5d8a66" },
  { name: "Masks & Treatments", value: 8, color: "#8b5cf6" },
];

const TOP_PRODUCTS = [
  { name: "Sakura Radiance Serum", sales: 142, revenue: 546700 },
  { name: "Hada Labo Gokujyun", sales: 118, revenue: 277300 },
  { name: "Anessa Perfect UV", sales: 96, revenue: 336000 },
  { name: "SK-II Pitera Essence", sales: 74, revenue: 1258000 },
  { name: "Melano CC Vitamin C", sales: 68, revenue: 115600 },
];

const RECENT_ORDERS = [
  { id: "GJ-2026-5431", customer: "Nusrat Ahmed", date: "06 Aug 2026", total: 8740, status: "Delivered", items: 3 },
  { id: "GJ-2026-5412", customer: "Farhana Khatun", date: "05 Aug 2026", total: 4850, status: "In Transit", items: 1 },
  { id: "GJ-2026-5398", customer: "Tasnim Rahman", date: "05 Aug 2026", total: 2890, status: "Processing", items: 2 },
  { id: "GJ-2026-5361", customer: "Sadia Islam", date: "04 Aug 2026", total: 11340, status: "Delivered", items: 4 },
  { id: "GJ-2026-5320", customer: "Rifat Hasan", date: "03 Aug 2026", total: 1990, status: "Cancelled", items: 1 },
];

const STATUS_STYLES: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  "In Transit": "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
  Processing: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300",
};

const KPI_CARDS = [
  { label: "Total Revenue", value: "৳3,42,850", change: "+14.2%", up: true, Icon: DollarSign, color: "text-emerald-600" },
  { label: "Total Orders", value: "247", change: "+8.1%", up: true, Icon: ShoppingBag, color: "text-blue-600" },
  { label: "Avg Order Value", value: "৳1,388", change: "+3.4%", up: true, Icon: CreditCard, color: "text-amber-600" },
  { label: "Repeat Customers", value: "42.5%", change: "+5.1%", up: true, Icon: Repeat, color: "text-violet-600" },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <p className="eyebrow">Executive Summary</p>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-normal">Business Analytics & Metrics</h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Live sales performance, product velocity, and customer retention metrics.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <a
            href="/admin/products"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium transition-colors hover:bg-secondary"
          >
            <Package className="h-3.5 w-3.5 text-primary" /> Manage Products ({PRODUCTS.length})
          </a>
          <a
            href="/admin/orders"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 shadow-sm"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> All Orders
          </a>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {KPI_CARDS.map(({ label, value, change, up, Icon, color }) => (
          <div key={label} className="surface-card p-4 sm:p-6 relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                <p className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight">{value}</p>
              </div>
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-secondary/80 transition-transform group-hover:scale-110">
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${color}`} strokeWidth={1.75} />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center gap-1 text-[11px] font-medium">
              <span className={`flex items-center ${up ? "text-emerald-600" : "text-destructive"}`}>
                <ArrowUpRight className="h-3.5 w-3.5" /> {change}
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Charts Row 1: Revenue Trend & Category Distribution */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-3">
        {/* Revenue Growth Trend Chart */}
        <div className="surface-card p-4 sm:p-6 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
            <div>
              <h2 className="font-display text-lg sm:text-xl font-normal">Revenue & Order Volume Growth</h2>
              <p className="text-xs text-muted-foreground">Monthly gross revenue (BDT) & monthly completed orders</p>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full self-start sm:self-auto">
              <TrendingUp className="h-3.5 w-3.5" /> +14.2% Growth
            </span>
          </div>

          <div className="h-52 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis tickLine={false} axisLine={false} className="text-xs" tickFormatter={(v) => `৳${v / 1000}k`} />
                <Tooltip
                  formatter={(val: number) => [`৳${val.toLocaleString()} BDT`, "Gross Revenue"]}
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    borderColor: "var(--border)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Donut */}
        <div className="surface-card p-4 sm:p-6">
          <div className="mb-4">
            <h2 className="font-display text-lg sm:text-xl font-normal">Sales by Category</h2>
            <p className="text-xs text-muted-foreground">Share of total product orders</p>
          </div>

          <div className="h-48 sm:h-60 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val}%`, "Share"]}
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    borderColor: "var(--border)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 space-y-2 text-xs">
            {CATEGORY_DISTRIBUTION.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="truncate max-w-[130px]">{c.name}</span>
                </span>
                <span className="font-semibold shrink-0 ml-2">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Charts Row 2: Top Selling Products */}
      <div className="surface-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-normal">Top Product Performers</h2>
            <p className="text-xs text-muted-foreground">Units sold and gross revenue generated in BDT</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-primary font-medium self-start sm:self-auto">
            <Award className="h-4 w-4" /> Best Seller Rank
          </span>
        </div>

        <div className="h-52 sm:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={TOP_PRODUCTS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-[11px]" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <Tooltip
                formatter={(val: number) => [val, "Units Sold"]}
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  borderColor: "var(--border)",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="sales" fill="var(--primary)" radius={[8, 8, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="surface-card overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border p-4 sm:p-6">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-normal">Recent Customer Transactions</h2>
            <p className="text-xs text-muted-foreground">Latest orders placed via COD & bKash</p>
          </div>
          <a
            href="/admin/orders"
            className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary hover:underline self-start sm:self-auto"
          >
            View all orders <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-left text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                <th className="px-4 sm:px-6 py-3.5">Order ID</th>
                <th className="px-4 sm:px-6 py-3.5">Customer</th>
                <th className="px-4 sm:px-6 py-3.5">Date</th>
                <th className="px-4 sm:px-6 py-3.5">Items</th>
                <th className="px-4 sm:px-6 py-3.5">Total</th>
                <th className="px-4 sm:px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {RECENT_ORDERS.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-secondary/20">
                  <td className="px-4 sm:px-6 py-3.5 font-mono text-xs font-semibold text-primary whitespace-nowrap">{o.id}</td>
                  <td className="px-4 sm:px-6 py-3.5 font-medium whitespace-nowrap">{o.customer}</td>
                  <td className="px-4 sm:px-6 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{o.date}</td>
                  <td className="px-4 sm:px-6 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{o.items} items</td>
                  <td className="px-4 sm:px-6 py-3.5 font-semibold whitespace-nowrap">{formatBDT(o.total)}</td>
                  <td className="px-4 sm:px-6 py-3.5">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold whitespace-nowrap ${
                        STATUS_STYLES[o.status] ?? "bg-muted text-muted-foreground"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

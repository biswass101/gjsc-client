import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardPaymentChannelCard } from "../charts/DashboardPaymentChannelCard";
import { DashboardRegionalSalesCard } from "../charts/DashboardRegionalSalesCard";

interface DashboardFinancialTabProps {
  revenueChartData: Array<{ time: string; revenue: number; profit: number; orders: number }>;
  paymentMethodData: Array<{ name: string; value: number; color: string }>;
  regionalSalesData: Array<{ division: string; share: number; revenue: number; color: string }>;
  orderStatusData: Array<{ status: string; count: number }>;
}

export function DashboardFinancialTab({
  revenueChartData,
  paymentMethodData,
  regionalSalesData,
  orderStatusData,
}: DashboardFinancialTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Revenue & Profit Trajectory Area Chart */}
        <div className="rounded-xl border border-border/80 bg-card p-5 lg:col-span-2 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
            <div>
              <h2 className="font-display text-base font-bold text-foreground">
                Sales Revenue vs Gross Profit Margin
              </h2>
              <p className="text-xs text-muted-foreground">
                Historical revenue velocity against import margin yield in Bangladeshi Taka (৳)
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span>Gross Sales</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                <span>Net Margin</span>
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueChartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis dataKey="time" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                  tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val: number, name: string) => [
                    `৳${val.toLocaleString("en-BD")} BDT`,
                    name === "revenue" ? "Gross Sales" : "Estimated Margin",
                  ]}
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    borderColor: "var(--border)",
                    borderRadius: "10px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#profitGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods Split */}
        <DashboardPaymentChannelCard paymentMethodData={paymentMethodData} />
      </div>

      {/* Regional Sales Breakdown & Courier Pipeline */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Bangladesh Geographic Distribution */}
        <DashboardRegionalSalesCard regionalSalesData={regionalSalesData} />

        {/* Courier Pipeline Status */}
        <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
          <div className="border-b border-border/60 pb-3 flex items-center justify-between">
            <div>
              <h2 className="font-display text-base font-bold text-foreground">
                Courier Dispatch Stages
              </h2>
              <p className="text-xs text-muted-foreground">
                Active parcels handled by Pathao & Steadfast
              </p>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
              API Connected
            </span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={orderStatusData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                  opacity={0.5}
                />
                <XAxis dataKey="status" tickLine={false} axisLine={false} className="text-[10px]" />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                  allowDecimals={false}
                />
                <Tooltip
                  formatter={(val: number) => [val, "Parcels"]}
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                    fontSize: "11px",
                  }}
                />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

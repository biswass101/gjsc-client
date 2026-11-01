import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface DashboardPaymentChannelCardProps {
  paymentMethodData: Array<{ name: string; value: number; color: string }>;
}

export function DashboardPaymentChannelCard({
  paymentMethodData,
}: DashboardPaymentChannelCardProps) {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
      <div className="border-b border-border/60 pb-3">
        <h2 className="font-display text-base font-bold text-foreground">Payment Channel Share</h2>
        <p className="text-xs text-muted-foreground">bKash MFS vs Cash on Delivery vs Cards</p>
      </div>

      <div className="h-52 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={paymentMethodData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {paymentMethodData.map((entry, index) => (
                <Cell key={`pay-cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: number) => [`৳${val.toLocaleString("en-BD")} BDT`, "Volume"]}
              contentStyle={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "8px",
                fontSize: "11px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2 pt-2 border-t border-border/50 text-xs">
        {paymentMethodData.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">{item.name}</span>
            </span>
            <span className="font-semibold text-foreground">
              ৳{item.value.toLocaleString("en-BD")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

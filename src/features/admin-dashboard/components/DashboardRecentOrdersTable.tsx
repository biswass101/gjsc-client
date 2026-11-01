import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminOrder } from "@/context/admin-context";
import { STATUS_STYLES } from "../constants";

interface DashboardRecentOrdersTableProps {
  orders: AdminOrder[];
  onUpdateStatus: (orderId: string, status: AdminOrder["fulfillmentStatus"]) => void;
}

export function DashboardRecentOrdersTable({
  orders,
  onUpdateStatus,
}: DashboardRecentOrdersTableProps) {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">Recent Customer Orders</h2>
          <p className="text-xs text-muted-foreground">
            Latest transactions across Dhaka and all Bangladesh divisions
          </p>
        </div>
        <Button asChild size="sm" className="rounded-full text-xs px-4">
          <Link href="/admin/orders">View All {orders.length} Orders →</Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border/60 text-muted-foreground font-semibold">
              <th className="py-2.5 px-3">Order ID</th>
              <th className="py-2.5 px-3">Customer</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Payment</th>
              <th className="py-2.5 px-3">Courier</th>
              <th className="py-2.5 px-3 text-right">Total</th>
              <th className="py-2.5 px-3 text-right">Fulfillment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {orders.slice(0, 6).map((order) => (
              <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                <td className="py-3 px-3 font-semibold font-mono text-primary">
                  <Link href={`/admin/orders?q=${order.id}`} className="hover:underline">
                    {order.id}
                  </Link>
                </td>
                <td className="py-3 px-3">
                  <p className="font-semibold text-foreground">{order.customerName}</p>
                  <p className="text-[11px] text-muted-foreground">{order.city}</p>
                </td>
                <td className="py-3 px-3 text-muted-foreground">{order.date}</td>
                <td className="py-3 px-3">
                  <span className="inline-block rounded-md border border-border/70 px-2 py-0.5 text-[10px] font-medium">
                    {order.paymentMethod} • {order.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-3 text-muted-foreground">
                  {order.courier !== "None" ? order.courier : "Unassigned"}
                </td>
                <td className="py-3 px-3 text-right font-semibold text-foreground font-mono">
                  ৳{order.total.toLocaleString("en-BD")}
                </td>
                <td className="py-3 px-3 text-right">
                  <select
                    value={order.fulfillmentStatus}
                    onChange={(e) =>
                      onUpdateStatus(order.id, e.target.value as AdminOrder["fulfillmentStatus"])
                    }
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold border-0 cursor-pointer ${
                      STATUS_STYLES[order.fulfillmentStatus] || "bg-secondary text-foreground"
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Quality Checked">Quality Checked</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

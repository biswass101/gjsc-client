"use client";

import { Button } from "@/components/ui/button";
import type { AdminOrder } from "@/context/admin-context";
import { STATUS_STYLES } from "../data/orderConstants";

interface OrderTableProps {
  orders: AdminOrder[];
  onOpenDetails: (order: AdminOrder) => void;
  onUpdateStatus: (id: string, status: AdminOrder["fulfillmentStatus"]) => void;
}

export function OrderTable({ orders, onOpenDetails, onUpdateStatus }: OrderTableProps) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border/70 bg-secondary/30 text-muted-foreground font-semibold">
              <th className="py-3 px-4">Order Reference</th>
              <th className="py-3 px-4">Customer & Location</th>
              <th className="py-3 px-4">Items / SKUs</th>
              <th className="py-3 px-4">Payment & Trx</th>
              <th className="py-3 px-4">Courier Partner</th>
              <th className="py-3 px-4 text-right">Total Amount</th>
              <th className="py-3 px-4 text-center">Fulfillment Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-muted-foreground">
                  No orders found matching the selected filter criteria.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const itemsCount = order.items.reduce((acc, i) => acc + i.qty, 0);

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-secondary/20 transition-colors cursor-pointer"
                    onClick={() => onOpenDetails(order)}
                  >
                    {/* Order Reference & Date */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-primary text-xs">{order.id}</span>
                      <span className="block text-[11px] text-muted-foreground mt-0.5">
                        {order.dateFormatted || order.date}
                      </span>
                    </td>

                    {/* Customer Info */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-foreground text-xs">{order.customerName}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {order.customerPhone} • {order.city}
                      </p>
                    </td>

                    {/* Items */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold text-foreground">
                          {itemsCount} {itemsCount === 1 ? "unit" : "units"}
                        </span>
                        <span className="text-[11px] text-muted-foreground truncate max-w-[150px]">
                          {order.items[0]?.name || "Skincare product"}
                        </span>
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="inline-block rounded border border-border/80 px-2 py-0.2 text-[10px] font-semibold">
                          {order.paymentMethod}
                        </span>
                        <span
                          className={`block text-[10px] font-bold ${
                            order.paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-600"
                          }`}
                        >
                          ● {order.paymentStatus}
                        </span>
                      </div>
                    </td>

                    {/* Courier */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-foreground text-xs">
                        {order.courier !== "None" ? order.courier : "Not Booked"}
                      </p>
                      {order.consignmentId && (
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {order.consignmentId}
                        </span>
                      )}
                    </td>

                    {/* Total */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-foreground text-sm">
                      ৳{order.total.toLocaleString()}
                    </td>

                    {/* Fulfillment Status Selector */}
                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={order.fulfillmentStatus}
                        onChange={(e) =>
                          onUpdateStatus(
                            order.id,
                            e.target.value as AdminOrder["fulfillmentStatus"],
                          )
                        }
                        className={`rounded-full px-3 py-1 text-[11px] font-bold border cursor-pointer ${
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

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpenDetails(order)}
                        className="rounded-full text-xs h-7 px-3 text-primary hover:bg-primary/10 cursor-pointer"
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

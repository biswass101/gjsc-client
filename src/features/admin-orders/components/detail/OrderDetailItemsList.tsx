"use client";

import type { AdminOrder } from "@/context/admin-context";

interface OrderDetailItemsListProps {
  order: AdminOrder;
}

export function OrderDetailItemsList({ order }: OrderDetailItemsListProps) {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-4 space-y-3">
      <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
        Itemized Japanese Skincare Products ({order.items.length})
      </h4>

      <div className="divide-y divide-border/50">
        {order.items.map((item, idx) => (
          <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="h-10 w-10 rounded-lg object-cover border border-border/70"
              />
              <div>
                <p className="font-semibold text-foreground text-xs">{item.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {item.brand} • Size: {item.size} • Qty: {item.qty}
                </p>
              </div>
            </div>

            <div className="text-right font-mono">
              <p className="font-semibold text-foreground">
                ৳{(item.price * item.qty).toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground">
                ৳{item.price.toLocaleString()} each
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60 pt-3 space-y-1 text-right">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal:</span>
          <span className="font-mono">৳{order.subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Delivery Fee:</span>
          <span className="font-mono">৳{order.shippingFee}</span>
        </div>
        {order.discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 font-semibold">
            <span>Voucher Discount:</span>
            <span className="font-mono">-৳{order.discountAmount}</span>
          </div>
        )}
        <div className="flex justify-between text-foreground font-bold text-sm pt-1 border-t border-border/50">
          <span>Total Amount (BDT):</span>
          <span className="font-mono text-primary">৳{order.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

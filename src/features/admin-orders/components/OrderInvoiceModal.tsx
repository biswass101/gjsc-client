"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import type { AdminOrder } from "@/context/admin-context";

interface OrderInvoiceModalProps {
  order: AdminOrder | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderInvoiceModal({ order, isOpen, onOpenChange }: OrderInvoiceModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white text-black p-8 font-sans">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-black">
                GLORIOUS JAPAN
              </h2>
              <p className="text-[11px] text-gray-500">
                Premium Tokyo Skincare • Banani Hub, Dhaka
              </p>
              <p className="text-[11px] text-gray-500">Hotline: +880 1700-000000</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-black text-white text-xs font-bold px-2 py-0.5 rounded">
                PACKING SLIP
              </span>
              <p className="font-mono font-bold mt-1 text-sm">{order.id}</p>
              <p className="text-[11px] text-gray-500">{order.date}</p>
            </div>
          </div>

          {/* Recipient & Courier */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-bold uppercase tracking-wider text-gray-500">Deliver To:</p>
              <p className="font-bold text-sm mt-0.5">{order.customerName}</p>
              <p>{order.address}</p>
              <p>
                {order.city}, {order.division}
              </p>
              <p className="font-semibold mt-1">Phone: {order.customerPhone}</p>
            </div>

            <div className="text-right">
              <p className="font-bold uppercase tracking-wider text-gray-500">Logistics Courier:</p>
              <p className="font-bold text-sm mt-0.5">{order.courier}</p>
              <p className="font-mono">Consignment: {order.consignmentId || "N/A"}</p>
              <p className="font-semibold mt-1">
                Payment: {order.paymentMethod} ({order.paymentStatus})
              </p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-black text-black font-bold">
                <th className="py-2">Item Description</th>
                <th className="py-2">Brand</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Unit Price</th>
                <th className="py-2 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items.map((it, idx) => (
                <tr key={idx}>
                  <td className="py-2 font-semibold">
                    {it.name} ({it.size})
                  </td>
                  <td className="py-2 text-gray-600">{it.brand}</td>
                  <td className="py-2 text-center font-bold">{it.qty}</td>
                  <td className="py-2 text-right">৳{it.price.toLocaleString()}</td>
                  <td className="py-2 text-right font-bold">
                    ৳{(it.price * it.qty).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="border-t pt-3 space-y-1 text-right text-xs">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>৳{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee:</span>
              <span>৳{order.shippingFee}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-green-700 font-semibold">
                <span>Discount:</span>
                <span>-৳{order.discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm border-t pt-1">
              <span>TOTAL AMOUNT:</span>
              <span>৳{order.total.toLocaleString()} BDT</span>
            </div>
          </div>

          <div className="border-t pt-4 text-center text-[10px] text-gray-500">
            Thank you for choosing authentic Japanese Skincare. 🌸 • www.gloriousjapan.com
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="rounded-full text-xs cursor-pointer"
          >
            Send to Printer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

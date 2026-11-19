"use client";

import { Truck, ExternalLink, DollarSign, RefreshCw, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { paymentApi } from "@/lib/api";
import type { AdminOrder } from "@/context/admin-context";
import { COURIER_OPTIONS } from "../../data/orderConstants";
import { useState } from "react";

interface OrderDetailLogisticsPaymentProps {
  order: AdminOrder;
  modalCourier: AdminOrder["courier"];
  setModalCourier: (c: AdminOrder["courier"]) => void;
  modalConsignment: string;
  setModalConsignment: (v: string) => void;
  onSaveCourier: () => void;
  onTogglePayment: (order: AdminOrder) => void;
}

export function OrderDetailLogisticsPayment({
  order,
  modalCourier,
  setModalCourier,
  modalConsignment,
  setModalConsignment,
  onSaveCourier,
  onTogglePayment,
}: OrderDetailLogisticsPaymentProps) {
  const isPaid = order.paymentStatus === "Paid";
  const [isReconciling, setIsReconciling] = useState(false);
  const [isRefunding, setIsRefunding] = useState(false);

  const handleBkashReconcile = async () => {
    try {
      setIsReconciling(true);
      toast.loading("Querying bKash Payment Gateway...", { id: "bkash-rec" });
      const numericId = Number(order.id.replace(/\D/g, "")) || 0;
      const paymentInfo = await paymentApi.getPaymentByOrder(numericId);
      if (!paymentInfo?.id) {
        toast.error("No bKash gateway record found for this order", { id: "bkash-rec" });
        return;
      }
      const res = await paymentApi.reconcilePayment(paymentInfo.id);
      toast.success(res.message || "bKash payment reconciled successfully", { id: "bkash-rec" });
      window.dispatchEvent(new CustomEvent("gjsc_order_updated"));
    } catch (err: any) {
      toast.error(err?.message || "Failed to reconcile with bKash", { id: "bkash-rec" });
    } finally {
      setIsReconciling(false);
    }
  };

  const handleBkashRefund = async () => {
    const amountStr = prompt(`Enter refund amount in BDT (Max: ৳${order.total}):`, String(order.total));
    if (!amountStr) return;
    const amount = Number(amountStr);
    if (isNaN(amount) || amount <= 0 || amount > order.total) {
      toast.error("Invalid refund amount entered");
      return;
    }
    const reason = prompt("Enter reason for refund:", "Customer requested cancellation / return");
    if (!reason) return;

    try {
      setIsRefunding(true);
      toast.loading("Processing refund with bKash...", { id: "bkash-ref" });
      const numericId = Number(order.id.replace(/\D/g, "")) || 0;
      const paymentInfo = await paymentApi.getPaymentByOrder(numericId);
      if (!paymentInfo?.id) {
        toast.error("No payment record found for this order", { id: "bkash-ref" });
        return;
      }
      await paymentApi.refundPayment(paymentInfo.id, amount, reason);
      toast.success(`৳${amount} refunded successfully via bKash!`, { id: "bkash-ref" });
      window.dispatchEvent(new CustomEvent("gjsc_order_updated"));
    } catch (err: any) {
      toast.error(err?.message || "bKash refund failed", { id: "bkash-ref" });
    } finally {
      setIsRefunding(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Courier Assignment */}
      <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-primary" /> Courier Integration
          </span>
          {order.trackingUrl && (
            <a
              href={order.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-primary hover:underline flex items-center gap-0.5"
            >
              Track Live <ExternalLink className="h-2.5 w-2.5" />
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-[11px] font-medium text-muted-foreground">Courier</Label>
            <select
              value={modalCourier}
              onChange={(e) => setModalCourier(e.target.value as AdminOrder["courier"])}
              className="mt-1 h-8 w-full rounded-md border border-input bg-background px-2 text-xs"
            >
              {COURIER_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-[11px] font-medium text-muted-foreground">Consignment ID</Label>
            <Input
              value={modalConsignment}
              onChange={(e) => setModalConsignment(e.target.value)}
              placeholder="e.g. PTH-982104"
              className="mt-1 h-8 rounded-md text-xs font-mono"
            />
          </div>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onSaveCourier}
          className="w-full rounded-full text-xs h-7 cursor-pointer"
        >
          Assign / Book Courier Rider
        </Button>
      </div>

      {/* Payment Verification */}
      <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-primary" /> Payment Ledger
          </span>
          <span className="font-semibold">{order.paymentMethod}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-muted-foreground">Status</p>
            <span
              className={`inline-block font-bold text-xs ${
                isPaid ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              ● {order.paymentStatus}
            </span>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-muted-foreground">Transaction ID</p>
            <span className="font-mono font-semibold text-foreground">
              {order.trxId || "COD Settlement"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant={isPaid ? "outline" : "default"}
              onClick={() => onTogglePayment(order)}
              className="flex-1 rounded-full text-xs h-7 cursor-pointer"
            >
              {isPaid ? "Mark Pending" : "Mark as Paid"}
            </Button>

            {order.paymentMethod === "bKash" && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isReconciling}
                onClick={handleBkashReconcile}
                className="rounded-full text-xs h-7 border-[#E2136E]/40 text-[#E2136E] hover:bg-[#E2136E]/10 cursor-pointer"
                title="Verify authoritative status from bKash server"
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${isReconciling ? "animate-spin" : ""}`} />
                Reconcile
              </Button>
            )}
          </div>

          {order.paymentMethod === "bKash" && isPaid && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isRefunding}
              onClick={handleBkashRefund}
              className="w-full rounded-full text-xs h-7 border-rose-300 text-rose-600 hover:bg-rose-50 cursor-pointer"
            >
              <Undo2 className="h-3 w-3 mr-1" />
              Process bKash Refund
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}


"use client";

import { Truck, ExternalLink, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AdminOrder } from "@/context/admin-context";
import { COURIER_OPTIONS } from "../../data/orderConstants";

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

        <div className="flex items-center gap-2 pt-1">
          <Button
            type="button"
            size="sm"
            variant={isPaid ? "outline" : "default"}
            onClick={() => onTogglePayment(order)}
            className="flex-1 rounded-full text-xs h-7 cursor-pointer"
          >
            {isPaid ? "Mark Pending" : "Mark as Paid"}
          </Button>
        </div>
      </div>
    </div>
  );
}


"use client";

import { ShoppingBag, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { AdminOrder } from "@/context/admin-context";
import { OrderDetailCustomerInfo } from "./detail/OrderDetailCustomerInfo";
import { OrderDetailLogisticsPayment } from "./detail/OrderDetailLogisticsPayment";
import { OrderDetailItemsList } from "./detail/OrderDetailItemsList";
import { OrderDetailTimeline } from "./detail/OrderDetailTimeline";

interface OrderDetailModalProps {
  order: AdminOrder | null;
  onClose: () => void;
  onOpenInvoice: () => void;
  modalCourier: AdminOrder["courier"];
  setModalCourier: (c: AdminOrder["courier"]) => void;
  modalConsignment: string;
  setModalConsignment: (v: string) => void;
  modalNote: string;
  setModalNote: (v: string) => void;
  onSaveCourier: () => void;
  onSaveNote: () => void;
  onTogglePayment: (order: AdminOrder) => void;
}

export function OrderDetailModal({
  order,
  onClose,
  onOpenInvoice,
  modalCourier,
  setModalCourier,
  modalConsignment,
  setModalConsignment,
  modalNote,
  setModalNote,
  onSaveCourier,
  onSaveNote,
  onTogglePayment,
}: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <Dialog open={Boolean(order)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-border/60 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Order #{order.id}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenInvoice}
                className="rounded-full text-xs h-7 px-3 gap-1.5 cursor-pointer"
              >
                <Printer className="h-3 w-3 text-primary" />
                Print Packing Slip
              </Button>
            </div>
          </div>
          <DialogDescription className="text-xs">
            Placed on {order.dateFormatted || order.date} • Recorded by System
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-3 text-xs">
          {/* Row 1: Customer Contact & Delivery Details */}
          <OrderDetailCustomerInfo order={order} />

          {/* Row 2: Courier Dispatch & Payment Controls */}
          <OrderDetailLogisticsPayment
            order={order}
            modalCourier={modalCourier}
            setModalCourier={setModalCourier}
            modalConsignment={modalConsignment}
            setModalConsignment={setModalConsignment}
            onSaveCourier={onSaveCourier}
            onTogglePayment={onTogglePayment}
          />

          {/* Row 3: Itemized Breakdown */}
          <OrderDetailItemsList order={order} />

          {/* Row 4: Chronological Audit Trail Timeline */}
          <OrderDetailTimeline timeline={order.timeline} />

          {/* Row 5: Internal Warehouse Notes */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Internal Warehouse / Courier Notes</Label>
            <div className="flex gap-2">
              <Input
                value={modalNote}
                onChange={(e) => setModalNote(e.target.value)}
                placeholder="e.g. Call recipient 30 mins prior to delivery."
                className="h-8 rounded-md text-xs flex-1"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={onSaveNote}
                className="rounded-md text-xs h-8 px-3 cursor-pointer"
              >
                Save Note
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-border/60">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="rounded-full text-xs cursor-pointer"
          >
            Close Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


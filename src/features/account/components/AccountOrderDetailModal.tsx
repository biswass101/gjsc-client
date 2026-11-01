"use client";

import { CheckCircle2, Download, ExternalLink, Package } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatBDT } from "@/lib/catalog";
import type { BuyerOrder } from "../types";

export interface AccountOrderDetailModalProps {
  order: BuyerOrder | null;
  onClose: () => void;
  onDownloadInvoice: (orderId: string) => void;
}

export function AccountOrderDetailModal({
  order,
  onClose,
  onDownloadInvoice,
}: AccountOrderDetailModalProps) {
  if (!order) return null;

  return (
    <Dialog open={Boolean(order)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-6">
        <DialogHeader className="border-b border-border/40 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="font-display text-xl font-medium">
                Order #{order.id}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Placed on {order.date} • Courier: {order.courier}
              </DialogDescription>
            </div>

            <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
              {order.status}
            </span>
          </div>
        </DialogHeader>

        {/* Order Details Body */}
        <div className="space-y-4 py-2 text-xs">
          {/* Tracking Bar */}
          <div className="rounded-xl border border-border/60 bg-secondary/20 p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-muted-foreground">Tracking Number (CN)</span>
              <p className="font-mono font-bold text-foreground text-xs mt-0.5">
                {order.consignmentId}
              </p>
            </div>
            <Button size="sm" asChild className="rounded-full text-xs h-8 cursor-pointer">
              <Link to="/track">
                Track Live
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Items */}
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Items Ordered
            </span>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 p-2 rounded-lg bg-secondary/10"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-9 rounded-md border border-border overflow-hidden bg-cream shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground truncate max-w-[240px]">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {item.size} • Qty: {item.qty}
                    </p>
                  </div>
                </div>

                <span className="font-semibold text-foreground text-xs">
                  {formatBDT(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>

          <Separator className="my-2" />

          {/* Price Breakdown */}
          <div className="space-y-1.5 text-muted-foreground">
            <div className="flex justify-between">
              <span>Payment Method</span>
              <span className="font-medium text-foreground">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Express Shipping</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400 font-semibold">
                FREE
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-border/40 text-sm font-semibold text-foreground">
              <span>Total Paid:</span>
              <span className="font-display text-primary">{formatBDT(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-border/40">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownloadInvoice(order.id)}
            className="rounded-full text-xs gap-1.5 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Download VAT Invoice
          </Button>

          <Button size="sm" onClick={onClose} className="rounded-full text-xs px-5 cursor-pointer">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

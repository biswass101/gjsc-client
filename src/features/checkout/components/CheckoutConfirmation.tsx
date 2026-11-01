"use client";

import { CheckCircle2, ExternalLink, MessageSquare, Phone, Sparkles } from "lucide-react";
import { Link } from "@/lib/navigation";
import { formatBDT } from "@/lib/catalog";
import type { OrderConfirmationData } from "../types";

export interface CheckoutConfirmationProps {
  order: OrderConfirmationData;
}

export function CheckoutConfirmation({ order }: CheckoutConfirmationProps) {
  const isDhaka = order.zone === "dhaka_metro" || order.zone === "dhaka_suburbs";
  const estimatedDelivery = isDhaka
    ? "Within 24–48 Hours (Tomorrow or Day After)"
    : "Within 48–72 Hours via Steadfast / Pathao";

  const whatsappMessage = encodeURIComponent(
    `Hello Glorious Japan! I just placed order #${order.orderId} for ৳${order.total.toLocaleString("en-BD")}. My phone is ${order.phone}. Please confirm tracking updates.`,
  );

  const paymentLabel =
    order.payment === "cod"
      ? "Cash on Delivery (COD)"
      : order.payment === "bkash"
        ? "bKash Mobile Payment"
        : order.payment === "nagad"
          ? "Nagad Mobile Payment"
          : "Debit / Credit Card";

  return (
    <div className="container-lux py-12 sm:py-16">
      <div className="mx-auto max-w-2xl rounded-xl border border-border/80 bg-card p-6 sm:p-10 shadow-sm text-center">
        {/* Success icon */}
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <span className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
          Order Confirmed · 注文完了
        </span>

        <h1 className="mt-1 font-display text-3xl sm:text-4xl font-medium tracking-tight">
          Thank You for Your Order!
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Your Japanese skincare ritual order{" "}
          <strong className="text-foreground font-semibold">#{order.orderId}</strong> has been
          successfully placed and received by our dispatch team.
        </p>

        {/* Notification alert */}
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-left space-y-2">
          <p className="font-semibold text-foreground flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-primary" />
            Confirmation Call & WhatsApp Notice
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our representative will contact your phone{" "}
            <strong className="text-foreground font-medium">{order.phone}</strong> before shipping.
            You will also receive SMS and WhatsApp tracking as soon as the package is handed over to
            our delivery partner.
          </p>
        </div>

        {/* Order snapshot summary */}
        <div className="mt-6 rounded-xl border border-border/70 bg-secondary/30 p-5 text-left text-xs space-y-3">
          <div className="flex justify-between border-b border-border/40 pb-2.5">
            <span className="text-muted-foreground">Order Date:</span>
            <span className="font-medium text-foreground">{order.date}</span>
          </div>
          <div className="flex justify-between border-b border-border/40 pb-2.5">
            <span className="text-muted-foreground">Payment Method:</span>
            <span className="font-medium text-foreground capitalize">{paymentLabel}</span>
          </div>
          <div className="flex justify-between border-b border-border/40 pb-2.5">
            <span className="text-muted-foreground">Delivery Timeline:</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              {estimatedDelivery}
            </span>
          </div>
          <div className="flex justify-between border-b border-border/40 pb-2.5">
            <span className="text-muted-foreground">Delivery Destination:</span>
            <span className="font-medium text-foreground text-right max-w-[280px]">
              {order.address}
            </span>
          </div>
          <div className="flex justify-between pt-1 text-sm font-semibold">
            <span>Total Amount Paid / Payable:</span>
            <span className="font-display text-base text-primary">{formatBDT(order.total)}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/8801700000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-xs font-bold text-white hover:bg-[#20ba59] transition-all shadow-sm"
          >
            <MessageSquare className="h-4 w-4" />
            Notify on WhatsApp
          </a>

          <Link
            to="/track"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-xs font-semibold hover:bg-secondary transition-colors"
          >
            Track Order Live
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
          </Link>

          <Link
            to="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
          >
            Continue Shopping
            <Sparkles className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

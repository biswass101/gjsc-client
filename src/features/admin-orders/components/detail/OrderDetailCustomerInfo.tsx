"use client";

import { User, MapPin, Phone, MessageCircle } from "lucide-react";
import type { AdminOrder } from "@/context/admin-context";

interface OrderDetailCustomerInfoProps {
  order: AdminOrder;
}

export function OrderDetailCustomerInfo({ order }: OrderDetailCustomerInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Customer card */}
      <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-2">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-primary" /> Customer Info
          </span>
          <span className="text-[10px] text-muted-foreground">ID: Verified Buyer</span>
        </div>

        <p className="font-bold text-foreground text-sm">{order.customerName}</p>
        <p className="text-muted-foreground">{order.customerEmail}</p>

        <div className="flex items-center gap-2 pt-1">
          <a
            href={`tel:${order.customerPhone}`}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground hover:bg-secondary transition-colors"
          >
            <Phone className="h-3 w-3 text-emerald-600" />
            {order.customerPhone}
          </a>

          <a
            href={`https://wa.me/88${order.customerPhone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-emerald-700 transition-colors"
          >
            <MessageCircle className="h-3 w-3" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Delivery Address & Hub */}
      <div className="rounded-xl border border-border/80 bg-secondary/15 p-4 space-y-2">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" /> Delivery Destination
          </span>
          <span className="text-[10px] text-muted-foreground font-semibold">
            {order.city}, {order.division}
          </span>
        </div>

        <p className="text-foreground leading-relaxed mt-1 font-medium">{order.address}</p>
        <p className="text-[11px] text-muted-foreground">
          Area Hub: {order.area || order.city} • Bangladesh
        </p>
      </div>
    </div>
  );
}

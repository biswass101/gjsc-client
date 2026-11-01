import React from "react";
import { Droplets, Phone, MessageCircle } from "lucide-react";
import type { AdminCustomer } from "@/types";
import { TIER_STYLES } from "../constants";

interface CustomerTableRowProps {
  customer: AdminCustomer;
  onSelect: (customer: AdminCustomer) => void;
}

export function CustomerTableRow({ customer: cust, onSelect }: CustomerTableRowProps) {
  return (
    <tr
      onClick={() => onSelect(cust)}
      className="hover:bg-secondary/20 transition-colors cursor-pointer"
    >
      {/* Customer Name & Email */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0">
            {cust.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-foreground text-xs">{cust.name}</p>
            <p className="text-[11px] text-muted-foreground">{cust.email}</p>
          </div>
        </div>
      </td>

      {/* Location */}
      <td className="py-3.5 px-4">
        <span className="font-medium text-foreground">{cust.city}</span>
        <span className="block text-[11px] text-muted-foreground">{cust.division}</span>
      </td>

      {/* Skin Profile */}
      <td className="py-3.5 px-4">
        <span className="inline-flex items-center gap-1 rounded-md bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-foreground">
          <Droplets className="h-2.5 w-2.5 text-primary" />
          {cust.skinType}
        </span>
      </td>

      {/* Orders count */}
      <td className="py-3.5 px-4 text-center font-bold text-foreground font-mono">
        {cust.ordersCount}
      </td>

      {/* Total Spent */}
      <td className="py-3.5 px-4 text-right font-mono font-bold text-foreground">
        ৳{cust.totalSpent.toLocaleString()}
      </td>

      {/* Tier Badge */}
      <td className="py-3.5 px-4 text-center">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
            TIER_STYLES[cust.tier] || "bg-secondary"
          }`}
        >
          {cust.tier}
        </span>
      </td>

      {/* Contact Actions */}
      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end gap-1.5">
          <a
            href={`tel:${cust.phone}`}
            title="Call Mobile"
            className="h-7 w-7 rounded-lg grid place-items-center border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
          </a>

          <a
            href={`https://wa.me/88${cust.phone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Message on WhatsApp"
            className="h-7 w-7 rounded-lg grid place-items-center bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
          </a>
        </div>
      </td>
    </tr>
  );
}

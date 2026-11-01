import React from "react";
import { User } from "lucide-react";
import type { AdminCustomer, AdminOrder } from "@/types";
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
import { TIER_STYLES } from "../constants";

interface CustomerProfileDrawerProps {
  customer: AdminCustomer | null;
  onClose: () => void;
  customerOrders: AdminOrder[];
  editNote: string;
  onEditNoteChange: (val: string) => void;
  onSaveNote: () => void;
}

export function CustomerProfileDrawer({
  customer,
  onClose,
  customerOrders,
  editNote,
  onEditNoteChange,
  onSaveNote,
}: CustomerProfileDrawerProps) {
  if (!customer) return null;

  return (
    <Dialog open={Boolean(customer)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-border/60 pb-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {customer.name}
            </DialogTitle>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                TIER_STYLES[customer.tier]
              }`}
            >
              {customer.tier} Member
            </span>
          </div>
          <DialogDescription className="text-xs">
            Customer since {customer.joinedDate} • {customer.city}, Bangladesh
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2 text-xs">
          {/* LTV & Metric Strip */}
          <div className="grid grid-cols-3 gap-3 rounded-xl border border-border/80 bg-secondary/15 p-4 text-center">
            <div>
              <p className="text-[10px] uppercase font-semibold text-muted-foreground">
                Total Spend
              </p>
              <p className="text-base font-bold text-foreground mt-0.5">
                ৳{customer.totalSpent.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-muted-foreground">
                Orders Count
              </p>
              <p className="text-base font-bold text-foreground mt-0.5">
                {customer.ordersCount} Completed
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-muted-foreground">
                Avg Basket
              </p>
              <p className="text-base font-bold text-foreground mt-0.5">
                ৳{customer.avgOrderValue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Contact & Diagnostics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Contact Phone & WhatsApp</Label>
              <p className="font-mono text-foreground font-semibold">{customer.phone}</p>
              <div className="flex gap-2 pt-1">
                <a
                  href={`tel:${customer.phone}`}
                  className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold hover:bg-secondary"
                >
                  Call Now
                </a>
                <a
                  href={`https://wa.me/88${customer.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-emerald-700"
                >
                  Chat WhatsApp
                </a>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Skin Type & Diagnostics</Label>
              <p className="text-foreground font-medium">{customer.skinType}</p>
              <p className="text-[11px] text-muted-foreground">
                Concerns: {customer.skinConcerns?.join(", ") || "Hydration"}
              </p>
            </div>
          </div>

          {/* Order History */}
          <div className="rounded-xl border border-border/80 bg-card p-4 space-y-2">
            <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
              Order History for this Customer ({customerOrders.length})
            </h4>

            {customerOrders.length === 0 ? (
              <p className="text-muted-foreground text-xs py-2">
                No orders linked to this profile yet.
              </p>
            ) : (
              <div className="divide-y divide-border/40">
                {customerOrders.map((o) => (
                  <div key={o.id} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-primary">{o.id}</span>
                      <span className="text-muted-foreground ml-2">({o.date})</span>
                      <p className="text-[11px] text-muted-foreground">
                        {o.items.length} items • {o.courier}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-foreground">
                        ৳{o.total.toLocaleString()}
                      </span>
                      <span className="block text-[10px] text-emerald-600 font-semibold">
                        {o.fulfillmentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Internal Notes */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Staff Internal CRM Notes</Label>
            <div className="flex gap-2">
              <Input
                value={editNote}
                onChange={(e) => onEditNoteChange(e.target.value)}
                placeholder="e.g. Sensitive skin. Prefers fragrance-free formulas."
                className="h-8 rounded-md text-xs flex-1"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={onSaveNote}
                className="rounded-md text-xs h-8 px-3"
              >
                Update
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
            className="rounded-full text-xs"
          >
            Close Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


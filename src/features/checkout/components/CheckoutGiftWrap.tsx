"use client";

import { Gift } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export interface CheckoutGiftWrapProps {
  giftWrap: boolean;
  onGiftWrapChange: (val: boolean) => void;
  giftMessage: string;
  onGiftMessageChange: (val: string) => void;
}

export function CheckoutGiftWrap({
  giftWrap,
  onGiftWrapChange,
  giftMessage,
  onGiftMessageChange,
}: CheckoutGiftWrapProps) {
  return (
    <section className="rounded-xl border border-border/80 bg-card p-6 shadow-xs">
      <div className="flex items-start gap-3">
        <Checkbox
          id="gift"
          checked={giftWrap}
          onCheckedChange={(v) => onGiftWrapChange(Boolean(v))}
          className="mt-0.5"
        />
        <div className="flex-1 text-xs">
          <label
            htmlFor="gift"
            className="font-semibold text-foreground cursor-pointer flex items-center gap-1.5"
          >
            <Gift className="h-3.5 w-3.5 text-primary" />
            Add Luxury Japanese Gift Wrapping & Card (+৳150)
          </label>
          <p className="mt-0.5 text-muted-foreground">
            Presented in traditional Japanese washi gift wrap with a gold seal and handwritten
            personalized card.
          </p>

          {giftWrap && (
            <div className="mt-3">
              <Input
                value={giftMessage}
                onChange={(e) => onGiftMessageChange(e.target.value)}
                placeholder="Write your personal gift message for the card..."
                className="rounded-full text-xs"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

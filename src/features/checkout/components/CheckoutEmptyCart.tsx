"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";

export function CheckoutEmptyCart() {
  return (
    <div className="mt-10 rounded-xl border border-border/80 bg-card p-12 text-center max-w-lg mx-auto space-y-4">
      <p className="font-display text-2xl font-medium">Your shopping bag is empty</p>
      <p className="text-xs text-muted-foreground">
        Please add at least one Japanese skincare product to proceed with checkout.
      </p>
      <Button asChild className="rounded-full px-8">
        <Link to="/shop">Explore Skincare Shop</Link>
      </Button>
    </div>
  );
}


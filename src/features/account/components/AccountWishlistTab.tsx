"use client";

import { Heart } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/features/products";
import type { Product } from "@/types";

export interface AccountWishlistTabProps {
  products: Product[];
}

export function AccountWishlistTab({ products }: AccountWishlistTabProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-medium text-foreground">
            Saved Wishlist ({products.length})
          </h2>
          <p className="text-xs text-muted-foreground">
            Keep track of your favorite Tokyo serums, essences, and Japanese beauty grails.
          </p>
        </div>

        <Button variant="outline" size="sm" asChild className="rounded-full text-xs cursor-pointer">
          <Link to="/wishlist">Manage Full Wishlist</Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-border/80 bg-card p-12 text-center max-w-md mx-auto space-y-3">
          <Heart className="h-8 w-8 text-muted-foreground mx-auto" />
          <h4 className="font-display text-lg font-medium">Your Wishlist is Empty</h4>
          <p className="text-xs text-muted-foreground">
            Explore authentic Japanese formulas and click the heart icon on any product to save it
            here.
          </p>
          <Button asChild size="sm" className="rounded-full text-xs mt-2 cursor-pointer">
            <Link to="/shop">Explore J-Beauty Shop</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

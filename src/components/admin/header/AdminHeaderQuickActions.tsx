import React from "react";
import { useRouter } from "next/navigation";
import { Plus, Package, ShoppingBag, Tag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminHeaderQuickActionsProps {
  onOpenQuickNewProduct: () => void;
  onOpenQuickNewOrder: () => void;
  onOpenQuickNewDiscount: () => void;
}

export function AdminHeaderQuickActions({
  onOpenQuickNewProduct,
  onOpenQuickNewOrder,
  onOpenQuickNewDiscount,
}: AdminHeaderQuickActionsProps) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          className="rounded-full text-xs h-8 px-3 gap-1.5 shadow-2xs font-semibold"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Create</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="text-xs font-semibold">Quick Store Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onOpenQuickNewProduct} className="cursor-pointer gap-2 text-xs">
          <Package className="h-4 w-4 text-primary" />
          <span>Add New Product</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onOpenQuickNewOrder} className="cursor-pointer gap-2 text-xs">
          <ShoppingBag className="h-4 w-4 text-primary" />
          <span>Create Manual Order</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onOpenQuickNewDiscount} className="cursor-pointer gap-2 text-xs">
          <Tag className="h-4 w-4 text-primary" />
          <span>Create Promo Coupon</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/admin/merchandising")}
          className="cursor-pointer gap-2 text-xs"
        >
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>Manage Announcements</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import React from "react";
import { ShoppingBag, Package, Users, Video } from "lucide-react";
import { CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command";
import { AdminOrder, AdminProduct, AdminCustomer, AdminFeaturedVideo } from "@/types/admin";

interface AdminCommandEntityGroupsProps {
  orders: AdminOrder[];
  products: AdminProduct[];
  customers: AdminCustomer[];
  featuredVideos?: AdminFeaturedVideo[] | undefined;
  onSelectRoute: (path: string) => void;
}

export function AdminCommandEntityGroups({
  orders,
  products,
  customers,
  featuredVideos,
  onSelectRoute,
}: AdminCommandEntityGroupsProps) {
  return (
    <>
      <CommandSeparator />
      <CommandGroup heading="Featured Videos & Reels">
        {(featuredVideos || []).slice(0, 5).map((v) => (
          <CommandItem
            key={v.id}
            onSelect={() => onSelectRoute(`/admin/videos?q=${encodeURIComponent(v.title)}`)}
            className="cursor-pointer flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <Video className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-medium line-clamp-1">{v.title}</span>
            </div>
            <span className="text-muted-foreground text-[11px] shrink-0">{v.creatorHandle}</span>
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandSeparator />
      <CommandGroup heading="Recent Orders">
        {orders.slice(0, 5).map((o) => (
          <CommandItem
            key={o.id}
            onSelect={() => onSelectRoute(`/admin/orders?q=${o.id}`)}
            className="cursor-pointer flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-semibold">{o.id}</span>
              <span className="text-muted-foreground">— {o.customerName}</span>
            </div>
            <span className="text-muted-foreground font-mono">৳{o.total.toLocaleString()}</span>
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandSeparator />
      <CommandGroup heading="Top Products">
        {products.slice(0, 5).map((p) => (
          <CommandItem
            key={p.id}
            onSelect={() => onSelectRoute(`/admin/products?q=${encodeURIComponent(p.name)}`)}
            className="cursor-pointer flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <Package className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-medium line-clamp-1">{p.name}</span>
            </div>
            <span className="text-muted-foreground text-[11px] shrink-0">
              {p.brand} • ৳{p.price}
            </span>
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandSeparator />
      <CommandGroup heading="VIP Customers">
        {customers.slice(0, 4).map((c) => (
          <CommandItem
            key={c.id}
            onSelect={() => onSelectRoute(`/admin/customers?q=${encodeURIComponent(c.name)}`)}
            className="cursor-pointer flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-medium">{c.name}</span>
              <span className="text-muted-foreground">({c.phone})</span>
            </div>
            <span className="text-muted-foreground text-[11px]">{c.city}</span>
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  );
}


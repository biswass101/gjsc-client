"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Tag,
  Megaphone,
  Plane,
  FolderTree,
  Sparkles,
  Award,
  Image as ImageIcon,
  FileText,
  Star,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { useAdmin } from "@/context/admin-context";

interface AdminCommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminCommandPalette({ open, onOpenChange }: AdminCommandPaletteProps) {
  const router = useRouter();
  const { products, orders, customers } = useAdmin();

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command, page, product, order #, or customer..." />
      <CommandList className="max-h-[380px] overflow-y-auto">
        <CommandEmpty>No matching admin results found.</CommandEmpty>

        <CommandGroup heading="Catalog & Fulfillment">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin"))}
            className="cursor-pointer gap-2"
          >
            <LayoutDashboard className="h-4 w-4 text-primary" />
            <span>Executive Dashboard & Analytics</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/orders"))}
            className="cursor-pointer gap-2"
          >
            <ShoppingBag className="h-4 w-4 text-primary" />
            <span>Orders & Bangladesh Courier Fulfillment</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/products"))}
            className="cursor-pointer gap-2"
          >
            <Package className="h-4 w-4 text-primary" />
            <span>Products & Tokyo Inventory Catalog</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/pre-orders"))}
            className="cursor-pointer gap-2"
          >
            <Plane className="h-4 w-4 text-primary" />
            <span>Pre-Orders & Tokyo Air-Cargo Batches</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/categories"))}
            className="cursor-pointer gap-2"
          >
            <FolderTree className="h-4 w-4 text-primary" />
            <span>Categories & Subcategory Hierarchy</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/collections"))}
            className="cursor-pointer gap-2"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Curated Themed Collections</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/brands"))}
            className="cursor-pointer gap-2"
          >
            <Award className="h-4 w-4 text-primary" />
            <span>Japanese Brand House & Origins</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/customers"))}
            className="cursor-pointer gap-2"
          >
            <Users className="h-4 w-4 text-primary" />
            <span>Customers & Skincare CRM</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Marketing, Content & Atomic Control">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/banners"))}
            className="cursor-pointer gap-2"
          >
            <ImageIcon className="h-4 w-4 text-primary" />
            <span>Site-Wide Page Banners Manager</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/pages"))}
            className="cursor-pointer gap-2"
          >
            <FileText className="h-4 w-4 text-primary" />
            <span>Page Content, Hero Headlines & SEO</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/merchandising"))}
            className="cursor-pointer gap-2"
          >
            <Megaphone className="h-4 w-4 text-primary" />
            <span>Store Merchandising & Live Announcements</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/discounts"))}
            className="cursor-pointer gap-2"
          >
            <Tag className="h-4 w-4 text-primary" />
            <span>Discounts, Coupons & Flash Offers</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/reviews"))}
            className="cursor-pointer gap-2"
          >
            <Star className="h-4 w-4 text-primary" />
            <span>Product Reviews Moderation</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/faqs"))}
            className="cursor-pointer gap-2"
          >
            <HelpCircle className="h-4 w-4 text-primary" />
            <span>FAQ Knowledge Base Manager</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/admin/settings"))}
            className="cursor-pointer gap-2"
          >
            <Settings className="h-4 w-4 text-primary" />
            <span>Store Logistics & Courier Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Recent Orders">
          {orders.slice(0, 5).map((o) => (
            <CommandItem
              key={o.id}
              onSelect={() => runCommand(() => router.push(`/admin/orders?q=${o.id}`))}
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
              onSelect={() => runCommand(() => router.push(`/admin/products?q=${encodeURIComponent(p.name)}`))}
              className="cursor-pointer flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <Package className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-medium line-clamp-1">{p.name}</span>
              </div>
              <span className="text-muted-foreground text-[11px] shrink-0">{p.brand} • ৳{p.price}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="VIP Customers">
          {customers.slice(0, 4).map((c) => (
            <CommandItem
              key={c.id}
              onSelect={() => runCommand(() => router.push(`/admin/customers?q=${encodeURIComponent(c.name)}`))}
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

        <CommandSeparator />

        <CommandGroup heading="External">
          <CommandItem
            onSelect={() => runCommand(() => window.open("/", "_blank"))}
            className="cursor-pointer gap-2 text-primary"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open Customer Storefront (New Tab)</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

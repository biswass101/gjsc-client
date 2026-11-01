"use client";

import {
  Droplets,
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export interface AccountSidebarProps {
  ordersCount: number;
  wishlistCount: number;
  onSignOut: () => void;
}

export function AccountSidebar({ ordersCount, wishlistCount, onSignOut }: AccountSidebarProps) {
  return (
    <aside className="lg:col-span-3">
      <div className="rounded-xl border border-border/80 bg-card p-4 shadow-xs sticky top-24 space-y-4">
        <TabsList className="flex flex-col w-full h-auto bg-transparent p-0 gap-1.5">
          <TabsTrigger
            value="overview"
            className="w-full justify-start rounded-lg px-3.5 py-2.5 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all gap-2.5 cursor-pointer"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Dashboard Overview</span>
          </TabsTrigger>

          <TabsTrigger
            value="orders"
            className="w-full justify-between rounded-lg px-3.5 py-2.5 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Package className="h-4 w-4" />
              <span>My Orders</span>
            </div>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-foreground data-[state=active]:bg-primary-foreground data-[state=active]:text-primary">
              {ordersCount}
            </span>
          </TabsTrigger>

          <TabsTrigger
            value="addresses"
            className="w-full justify-start rounded-lg px-3.5 py-2.5 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all gap-2.5 cursor-pointer"
          >
            <MapPin className="h-4 w-4" />
            <span>Address Book</span>
          </TabsTrigger>

          <TabsTrigger
            value="wishlist"
            className="w-full justify-between rounded-lg px-3.5 py-2.5 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Heart className="h-4 w-4" />
              <span>Saved Wishlist</span>
            </div>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-foreground">
              {wishlistCount}
            </span>
          </TabsTrigger>

          <TabsTrigger
            value="skincare"
            className="w-full justify-start rounded-lg px-3.5 py-2.5 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all gap-2.5 cursor-pointer"
          >
            <Droplets className="h-4 w-4" />
            <span>Skin Diagnostics</span>
          </TabsTrigger>

          <TabsTrigger
            value="settings"
            className="w-full justify-start rounded-lg px-3.5 py-2.5 text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all gap-2.5 cursor-pointer"
          >
            <Settings className="h-4 w-4" />
            <span>Settings & Security</span>
          </TabsTrigger>
        </TabsList>

        <div className="pt-2 border-t border-border/50">
          <Button
            variant="ghost"
            onClick={onSignOut}
            className="w-full justify-start rounded-lg px-3.5 text-xs font-semibold text-rose hover:bg-rose/10 hover:text-rose gap-2.5 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}

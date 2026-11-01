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
import { ExternalLink } from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { CATALOG_NAV_ITEMS, MARKETING_NAV_ITEMS } from "./command-palette/navItems";
import { AdminCommandEntityGroups } from "./command-palette/AdminCommandEntityGroups";

interface AdminCommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminCommandPalette({ open, onOpenChange }: AdminCommandPaletteProps) {
  const router = useRouter();
  const { products, orders, customers, featuredVideos } = useAdmin();

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

  const navigateTo = (path: string) => {
    runCommand(() => router.push(path));
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command, page, product, order #, or customer..." />
      <CommandList className="max-h-[380px] overflow-y-auto custom-scrollbar">
        <CommandEmpty>No matching admin results found.</CommandEmpty>

        <CommandGroup heading="Catalog & Fulfillment">
          {CATALOG_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.path}
                onSelect={() => navigateTo(item.path)}
                className="cursor-pointer gap-2"
              >
                <Icon className="h-4 w-4 text-primary" />
                <span>{item.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Marketing, Content & Atomic Control">
          {MARKETING_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.path}
                onSelect={() => navigateTo(item.path)}
                className="cursor-pointer gap-2"
              >
                <Icon className="h-4 w-4 text-primary" />
                <span>{item.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <AdminCommandEntityGroups
          orders={orders}
          products={products}
          customers={customers}
          featuredVideos={featuredVideos}
          onSelectRoute={navigateTo}
        />

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

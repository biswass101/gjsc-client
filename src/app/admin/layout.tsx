"use client";

import React, { useState } from "react";
import {
  AdminSidebar,
  AdminHeader,
  AdminCommandPalette,
  AdminQuickModals,
} from "@/components/admin";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Quick modals
  const [quickProductOpen, setQuickProductOpen] = useState(false);
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);
  const [quickDiscountOpen, setQuickDiscountOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex shrink-0">
        <AdminSidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-[270px]">
          <AdminSidebar
            collapsed={false}
            onToggleCollapse={() => setMobileMenuOpen(false)}
            onNavigateMobile={() => setMobileMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main Admin Content Canvas */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <AdminHeader
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenQuickNewProduct={() => setQuickProductOpen(true)}
          onOpenQuickNewOrder={() => setQuickOrderOpen(true)}
          onOpenQuickNewDiscount={() => setQuickDiscountOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Command Palette */}
      <AdminCommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />

      {/* Quick Action Modals (Product, Order, Discount) */}
      <AdminQuickModals
        productOpen={quickProductOpen}
        onProductOpenChange={setQuickProductOpen}
        orderOpen={quickOrderOpen}
        onOrderOpenChange={setQuickOrderOpen}
        discountOpen={quickDiscountOpen}
        onDiscountOpenChange={setQuickDiscountOpen}
      />
    </div>
  );
}


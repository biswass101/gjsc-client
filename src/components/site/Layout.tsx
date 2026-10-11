"use client";

import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { FloatingChat } from "./FloatingChat";
import { PaletteSwitcher } from "./PaletteSwitcher";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <FloatingChat />
      <PaletteSwitcher variant="floating" />
    </div>
  );
}

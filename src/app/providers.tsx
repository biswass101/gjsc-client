"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { ShopProvider, AdminProvider } from "@/context";
import { Toaster } from "@/components/ui/sonner";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ShopProvider>
        <AdminProvider>
          {children}
          <Toaster position="bottom-right" />
        </AdminProvider>
      </ShopProvider>
    </QueryClientProvider>
  );
}
"use client";

import React from "react";
import { QuickAddProductModal, QuickAddOrderModal, QuickAddDiscountModal } from "./quick-modals";

interface QuickModalsProps {
  productOpen: boolean;
  onProductOpenChange: (open: boolean) => void;
  orderOpen: boolean;
  onOrderOpenChange: (open: boolean) => void;
  discountOpen: boolean;
  onDiscountOpenChange: (open: boolean) => void;
}

export function AdminQuickModals({
  productOpen,
  onProductOpenChange,
  orderOpen,
  onOrderOpenChange,
  discountOpen,
  onDiscountOpenChange,
}: QuickModalsProps) {
  return (
    <>
      <QuickAddProductModal open={productOpen} onOpenChange={onProductOpenChange} />
      <QuickAddOrderModal open={orderOpen} onOpenChange={onOrderOpenChange} />
      <QuickAddDiscountModal open={discountOpen} onOpenChange={onDiscountOpenChange} />
    </>
  );
}

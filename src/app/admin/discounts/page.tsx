"use client";

import React, { useMemo } from "react";
import { toast } from "sonner";
import { useAdmin } from "@/context/admin-context";
import {
  DiscountHeader,
  DiscountAnalytics,
  DiscountPresets,
  DiscountTable,
  CreateDiscountModal,
  useDiscountForm,
} from "@/features/admin-discounts";

export default function AdminDiscountsPage() {
  const { discounts, addDiscount, toggleDiscount, deleteDiscount } = useAdmin();

  const {
    isOpen,
    setIsOpen,
    code,
    setCode,
    type,
    setType,
    value,
    setValue,
    minSpend,
    setMinSpend,
    usageLimit,
    setUsageLimit,
    endDate,
    setEndDate,
    copiedId,
    handleCopy,
    handleCreate,
    applyTemplate,
    openCreateModal,
  } = useDiscountForm(addDiscount);

  const activeDiscounts = useMemo(
    () => discounts.filter((d) => d.status === "active"),
    [discounts],
  );

  const totalRedemptions = useMemo(
    () => discounts.reduce((sum, d) => sum + d.usageCount, 0),
    [discounts],
  );

  const handleToggle = (id: string, discountCode: string) => {
    toggleDiscount(id);
    toast.info(`Toggled status of ${discountCode}`);
  };

  const handleDelete = (id: string, discountCode: string) => {
    if (window.confirm(`Delete coupon ${discountCode}?`)) {
      deleteDiscount(id);
      toast.info(`Deleted ${discountCode}`);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <DiscountHeader activeCount={activeDiscounts.length} onOpenCreate={openCreateModal} />

      <DiscountAnalytics
        totalDiscounts={discounts.length}
        activeCount={activeDiscounts.length}
        totalRedemptions={totalRedemptions}
        topDiscount={discounts[0]}
      />

      <DiscountPresets onApplyTemplate={applyTemplate} />

      <DiscountTable
        discounts={discounts}
        copiedId={copiedId}
        onCopy={handleCopy}
        onToggleStatus={handleToggle}
        onDelete={handleDelete}
      />

      <CreateDiscountModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        code={code}
        onCodeChange={setCode}
        type={type}
        onTypeChange={setType}
        value={value}
        onValueChange={setValue}
        minSpend={minSpend}
        onMinSpendChange={setMinSpend}
        usageLimit={usageLimit}
        onUsageLimitChange={setUsageLimit}
        endDate={endDate}
        onEndDateChange={setEndDate}
        onSubmit={handleCreate}
      />
    </div>
  );
}

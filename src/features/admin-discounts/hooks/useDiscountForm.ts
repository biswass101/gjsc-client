"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { AdminDiscount } from "@/context/admin-context";
import type { DiscountTemplate } from "../types";

export function useDiscountForm(
  addDiscount: (d: Omit<AdminDiscount, "id" | "usageCount">) => void,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [type, setType] = useState<AdminDiscount["type"]>("percentage");
  const [value, setValue] = useState("10");
  const [minSpend, setMinSpend] = useState("2000");
  const [usageLimit, setUsageLimit] = useState("500");
  const [endDate, setEndDate] = useState("2026-12-31");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (coupon: AdminDiscount) => {
    navigator.clipboard.writeText(coupon.code);
    setCopiedId(coupon.id);
    toast.success(`Copied code ${coupon.code} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }

    addDiscount({
      code: code.trim().toUpperCase(),
      type,
      value: parseFloat(value) || 10,
      minSpend: parseFloat(minSpend) || 0,
      usageLimit: parseInt(usageLimit, 10) || 100,
      status: "active",
      startDate: new Date().toISOString().slice(0, 10),
      endDate: endDate || "2026-12-31",
    });

    toast.success(`Coupon code "${code.toUpperCase()}" created and active! 🌸`);
    setIsOpen(false);
    setCode("");
  };

  const applyTemplate = (tmpl: DiscountTemplate) => {
    setCode(tmpl.code);
    setType(tmpl.type);
    setValue(tmpl.val);
    setMinSpend(tmpl.min);
    setUsageLimit(tmpl.limit);
    setIsOpen(true);
  };

  const openCreateModal = () => {
    setCode("");
    setValue("10");
    setMinSpend("2000");
    setUsageLimit("500");
    setIsOpen(true);
  };

  return {
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
  };
}

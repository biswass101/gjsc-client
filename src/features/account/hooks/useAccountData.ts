"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "@/lib/navigation";
import { useShop } from "@/context";
import { PRODUCTS } from "@/lib/catalog";
import type { BuyerOrder } from "../types";
import { INITIAL_ORDERS } from "../data/accountConstants";
import { useAccountAddresses } from "./useAccountAddresses";
import { useAccountProfile } from "./useAccountProfile";

export function useAccountData() {
  const navigate = useNavigate();
  const { user, logout, wishlist, addToCart, updateUserProfile } = useShop();

  const [activeTab, setActiveTab] = useState("overview");

  const profile = useAccountProfile(user, updateUserProfile);
  const address = useAccountAddresses(profile.name, profile.phone);

  // Orders State
  const [orders] = useState<BuyerOrder[]>(INITIAL_ORDERS);
  const [orderFilter, setOrderFilter] = useState<"all" | "In Transit" | "Delivered">("all");
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState<BuyerOrder | null>(null);

  // Skincare Profile Diagnostics
  const [skinType, setSkinType] = useState("Combination");
  const [concerns, setConcerns] = useState<string[]>([
    "Hydration",
    "Brightening",
    "Barrier Repair",
  ]);

  // Notification Preferences
  const [notifSms, setNotifSms] = useState(true);
  const [notifWhatsapp, setNotifWhatsapp] = useState(true);
  const [notifPromos, setNotifPromos] = useState(true);

  // Security password state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // Wishlist mapped products
  const wishlistProducts = useMemo(() => {
    return wishlist
      .map((slug) => PRODUCTS.find((p) => p.slug === slug))
      .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p));
  }, [wishlist]);

  const handleBuyAgain = (order: BuyerOrder) => {
    order.items.forEach((item) => {
      addToCart(item.slug, item.qty, item.size);
    });
    toast.success(`Items from #${order.id} added to bag!`, {
      action: {
        label: "View Bag",
        onClick: () => navigate({ to: "/cart" }),
      },
    });
  };

  const handleToggleConcern = (concern: string) => {
    setConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern],
    );
  };

  const handleSaveSkincareProfile = () => {
    toast.success("Skincare diagnostics profile saved!", {
      description: "Our recommendations across the shop are now personalized for your barrier.",
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      toast.error("Please enter both current and new password.");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("New passwords do not match.");
      return;
    }
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    toast.success("Password changed successfully!");
  };

  const handleSignOut = () => {
    logout();
    toast.info("Signed out of your account.");
    navigate({ to: "/auth" });
  };

  const handleDownloadInvoice = (orderId: string) => {
    toast.success(`Downloading official VAT invoice for #${orderId}...`);
  };

  return {
    user,
    activeTab,
    setActiveTab,
    ...profile,
    ...address,
    orders,
    orderFilter,
    setOrderFilter,
    selectedOrderReceipt,
    setSelectedOrderReceipt,
    skinType,
    setSkinType,
    concerns,
    handleToggleConcern,
    handleSaveSkincareProfile,
    notifSms,
    setNotifSms,
    notifWhatsapp,
    setNotifWhatsapp,
    notifPromos,
    setNotifPromos,
    currentPass,
    setCurrentPass,
    newPass,
    setNewPass,
    confirmPass,
    setConfirmPass,
    wishlistProducts,
    handleBuyAgain,
    handleChangePassword,
    handleSignOut,
    handleDownloadInvoice,
  };
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "@/lib/navigation";
import { useShop } from "@/context";
import { PRODUCTS, formatBDT } from "@/lib/catalog";
import { redirectToGoogleOAuth } from "@/lib/oauth/google";
import { redirectToFacebookOAuth } from "@/lib/oauth/facebook";
import type { BuyerOrder, FulfillmentStatus, Product } from "@/types";
import {
  authApi,
  customerApi,
  ordersApi,
  tokenStorage,
  type CustomerDashboardResponse,
} from "@/lib/api";
import { useAccountAddresses } from "./useAccountAddresses";
import { useAccountProfile } from "./useAccountProfile";

export type OrderFilterValue = "all" | "Active" | "Delivered" | "Cancelled";

const ACCOUNT_TAB_VALUES = [
  "overview",
  "orders",
  "addresses",
  "wishlist",
  "skincare",
  "settings",
] as const;

type AccountTabValue = (typeof ACCOUNT_TAB_VALUES)[number];

function isValidAccountTab(tab: string | null): tab is AccountTabValue {
  return Boolean(tab && (ACCOUNT_TAB_VALUES as readonly string[]).includes(tab));
}

function formatOrderDate(value: string | Date | undefined): string {
  if (!value) return "—";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(dt);
}

function mapBackendOrder(raw: any): BuyerOrder {
  const items = Array.isArray(raw.items)
    ? raw.items.map((it: any) => ({
        slug: String(it.slug || ""),
        name: String(it.name || "Product"),
        brand: String(it.brand || "Glorious Japan"),
        size: String(it.size || "Standard"),
        qty: Number(it.qty || 1),
        price: Number(it.price || 0),
        image: String(it.image || ""),
      }))
    : [];

  return {
    id: String(raw.orderNumber || raw.id || ""),
    date: formatOrderDate(raw.createdAt),
    status: (raw.fulfillmentStatus || "Pending") as FulfillmentStatus,
    total: Number(raw.total || 0),
    subtotal: raw.subtotal !== undefined ? Number(raw.subtotal) : undefined,
    shippingFee: raw.shippingFee !== undefined ? Number(raw.shippingFee) : undefined,
    discountAmount: raw.discountAmount !== undefined ? Number(raw.discountAmount) : undefined,
    paymentMethod: String(raw.paymentMethod || "COD"),
    paymentStatus: raw.paymentStatus ? String(raw.paymentStatus) : undefined,
    courier: raw.courier && raw.courier !== "None" ? String(raw.courier) : "Pending Assignment",
    consignmentId: raw.consignmentId ? String(raw.consignmentId) : "Pending Assignment",
    customerName: raw.customerName ? String(raw.customerName) : undefined,
    customerEmail: raw.customerEmail ? String(raw.customerEmail) : undefined,
    customerPhone: raw.customerPhone ? String(raw.customerPhone) : undefined,
    address: raw.address ? String(raw.address) : undefined,
    area: raw.area ? String(raw.area) : undefined,
    city: raw.city ? String(raw.city) : undefined,
    division: raw.division ? String(raw.division) : undefined,
    estimatedDelivery: raw.estimatedDelivery ? String(raw.estimatedDelivery) : undefined,
    items,
  };
}

function mapBackendProduct(raw: any): Product {
  return {
    id: String(raw.id || raw.slug),
    slug: String(raw.slug),
    name: String(raw.name || ""),
    japaneseName: raw.japaneseName ?? undefined,
    brand: String(raw.brand || raw.brandName || "Glorious Japan"),
    category: String(raw.category || raw.categoryName || "Skincare"),
    price: Number(raw.price || 0),
    compareAt: raw.compareAt ? Number(raw.compareAt) : undefined,
    rating: Number(raw.rating || 5),
    reviews: Number(raw.reviews ?? raw.reviewsCount ?? 0),
    image: String(raw.image || ""),
    images: Array.isArray(raw.images) ? raw.images : undefined,
    short: String(raw.short || ""),
    description: String(raw.description || ""),
    ingredients: Array.isArray(raw.ingredients) ? raw.ingredients : [],
    benefits: Array.isArray(raw.benefits) ? raw.benefits : [],
    howTo: String(raw.howTo || ""),
    skinTypes: Array.isArray(raw.skinTypes) ? raw.skinTypes : [],
    concerns: Array.isArray(raw.concerns) ? raw.concerns : [],
    stock: Number(raw.stock ?? 0),
    badge: raw.badge ?? undefined,
    sizes: Array.isArray(raw.sizes) ? raw.sizes : ["Standard"],
    type: raw.type ?? raw.productType ?? undefined,
    origin: raw.origin ?? undefined,
    texture: raw.texture ?? undefined,
    pao: raw.pao ?? undefined,
    spf: raw.spf ?? undefined,
    barcode: raw.barcode ?? undefined,
    sku: raw.sku ?? undefined,
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function useAccountData() {
  const navigate = useNavigate();
  const { user, isAuthLoading, logout, wishlist, addToCart, updateUserProfile, refreshUserProfile } =
    useShop();

  const [activeTab, setActiveTabState] = useState<AccountTabValue>("overview");
  const [dashboard, setDashboard] = useState<CustomerDashboardResponse | null>(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);

  // Orders State
  const [orders, setOrders] = useState<BuyerOrder[]>([]);
  const [orderFilter, setOrderFilter] = useState<OrderFilterValue>("all");
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState<BuyerOrder | null>(null);

  // Wishlist DB Products State
  const [dbWishlistProducts, setDbWishlistProducts] = useState<Product[]>([]);

  // Skincare Profile Diagnostics (synced with MySQL via /customer/preferences)
  const [skinType, setSkinType] = useState<string>(user?.skinType || "");
  const [concerns, setConcerns] = useState<string[]>(user?.skinConcerns || []);
  const [isSavingSkincare, setIsSavingSkincare] = useState(false);

  // Notification Preferences (synced with MySQL via /customer/preferences)
  const [notifSms, setNotifSms] = useState<boolean>(user?.notifSms ?? true);
  const [notifWhatsapp, setNotifWhatsapp] = useState<boolean>(user?.notifWhatsapp ?? true);
  const [notifPromos, setNotifPromos] = useState<boolean>(user?.notifPromos ?? true);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);

  // Security password & OAuth linking state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isConnectingGoogle, setIsConnectingGoogle] = useState(false);
  const [isConnectingFacebook, setIsConnectingFacebook] = useState(false);

  // Sync active tab with URL ?tab= query parameter so page reloads stay on the selected section
  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncFromUrl = () => {
      const tab = new URLSearchParams(window.location.search).get("tab");
      setActiveTabState(isValidAccountTab(tab) ? tab : "overview");
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const setActiveTab = useCallback((nextTab: string) => {
    const resolvedTab: AccountTabValue = isValidAccountTab(nextTab) ? nextTab : "overview";
    setActiveTabState(resolvedTab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (resolvedTab === "overview") {
        url.searchParams.delete("tab");
      } else {
        url.searchParams.set("tab", resolvedTab);
      }
      window.history.replaceState(
        window.history.state,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
    }
  }, []);

  const loadAccountData = useCallback(async () => {
    if (!tokenStorage.get() || !user) {
      setDashboard(null);
      setOrders([]);
      setDbWishlistProducts([]);
      return;
    }

    setIsLoadingDashboard(true);
    try {
      const [dashRes, ordersRes, wishlistRes] = await Promise.allSettled([
        customerApi.getDashboard(),
        ordersApi.getMyOrders(),
        customerApi.getWishlist(),
      ]);

      if (dashRes.status === "fulfilled" && dashRes.value) {
        setDashboard(dashRes.value);
        setSkinType(dashRes.value.preferences.skinType || "");
        setConcerns(
          Array.isArray(dashRes.value.preferences.skinConcerns)
            ? dashRes.value.preferences.skinConcerns
            : [],
        );
        setNotifSms(dashRes.value.preferences.notifSms);
        setNotifWhatsapp(dashRes.value.preferences.notifWhatsapp);
        setNotifPromos(dashRes.value.preferences.notifPromos);
      }

      if (ordersRes.status === "fulfilled" && Array.isArray(ordersRes.value)) {
        setOrders(ordersRes.value.map(mapBackendOrder));
      }

      if (wishlistRes.status === "fulfilled" && Array.isArray(wishlistRes.value)) {
        setDbWishlistProducts(wishlistRes.value.map(mapBackendProduct));
      }
    } finally {
      setIsLoadingDashboard(false);
    }
  }, [user]);

  useEffect(() => {
    void loadAccountData();
  }, [loadAccountData]);

  // Keep loyalty wishlist criteria live when user toggles hearts anywhere in UI
  useEffect(() => {
    if (!tokenStorage.get() || !user) return;
    const timer = setTimeout(() => {
      customerApi
        .getDashboard()
        .then((dash) => setDashboard(dash))
        .catch(() => {
          /* ignore */
        });
      customerApi
        .getWishlist()
        .then((list) => {
          if (Array.isArray(list)) setDbWishlistProducts(list.map(mapBackendProduct));
        })
        .catch(() => {
          /* ignore */
        });
    }, 250);
    return () => clearTimeout(timer);
  }, [wishlist, user]);

  const refreshDashboardOnly = useCallback(() => {
    if (!tokenStorage.get()) return;
    customerApi
      .getDashboard()
      .then((dash) => setDashboard(dash))
      .catch(() => {
        /* ignore */
      });
  }, []);

  const profile = useAccountProfile(user, updateUserProfile, refreshDashboardOnly);
  const address = useAccountAddresses(profile.name, profile.phone, user?.email, refreshDashboardOnly);

  // Wishlist mapped products (prefers live DB product objects, falls back to local catalog metadata)
  const wishlistProducts = useMemo(() => {
    if (wishlist.length > 0) {
      return wishlist
        .map(
          (slug) =>
            dbWishlistProducts.find((p) => p.slug === slug) ||
            PRODUCTS.find((p) => p.slug === slug),
        )
        .filter((p): p is Product => Boolean(p));
    }
    return dbWishlistProducts;
  }, [wishlist, dbWishlistProducts]);

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

  const handleSaveSkincareProfile = async () => {
    if (!skinType) {
      toast.error("Please select your primary skin type first.");
      return;
    }

    setIsSavingSkincare(true);
    try {
      const updated = await customerApi.updatePreferences({
        skinType: skinType as "Dry" | "Oily" | "Combination" | "Sensitive" | "Normal",
        skinConcerns: concerns,
      });
      setDashboard(updated);
      setSkinType(updated.preferences.skinType || skinType);
      setConcerns(updated.preferences.skinConcerns);
      await refreshUserProfile?.();
      toast.success("Skincare diagnostics profile saved!", {
        description:
          concerns.length > 0
            ? "Your Tokyo ritual & +150 Skin Diagnostics Ritual Points are synced with your account."
            : "Add at least 1 skin concern too to unlock the +150 Ritual Points milestone!",
      });
    } catch (err: any) {
      toast.error("Failed to save skincare profile", {
        description: err?.message || "Please try again.",
      });
    } finally {
      setIsSavingSkincare(false);
    }
  };

  const handleNotificationToggle = async (
    key: "notifSms" | "notifWhatsapp" | "notifPromos",
    nextValue: boolean,
  ) => {
    const prevValue =
      key === "notifSms" ? notifSms : key === "notifWhatsapp" ? notifWhatsapp : notifPromos;

    if (key === "notifSms") setNotifSms(nextValue);
    if (key === "notifWhatsapp") setNotifWhatsapp(nextValue);
    if (key === "notifPromos") setNotifPromos(nextValue);

    setIsSavingNotifications(true);
    try {
      const updated = await customerApi.updatePreferences({ [key]: nextValue });
      setDashboard(updated);
      toast.success("Notification preference saved.");
    } catch (err: any) {
      if (key === "notifSms") setNotifSms(prevValue);
      if (key === "notifWhatsapp") setNotifWhatsapp(prevValue);
      if (key === "notifPromos") setNotifPromos(prevValue);
      toast.error("Could not update notification preference", {
        description: err?.message || "Please try again.",
      });
    } finally {
      setIsSavingNotifications(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const requiresCurrent = user?.hasPassword !== false;

    if (requiresCurrent && !currentPass) {
      toast.error("Please enter your current password.");
      return;
    }
    if (!newPass || newPass.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("New passwords do not match.");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const payload = requiresCurrent
        ? { currentPassword: currentPass, newPassword: newPass }
        : { newPassword: newPass };
      const res = await authApi.changePassword(payload);
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
      await refreshUserProfile?.();
      toast.success(res.message || "Password updated successfully!");
    } catch (err: any) {
      toast.error("Failed to update password", {
        description: err?.message || "Please check your current password and try again.",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    toast.info("Signed out of your account.");
    navigate({ to: "/auth" });
  };

  const handleConnectGoogle = () => {
    const clientId = process.env["NEXT_PUBLIC_GOOGLE_CLIENT_ID"];
    if (!clientId) {
      toast.error("Google Sign-In Not Configured", {
        description: "Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID environment configuration.",
      });
      return;
    }
    setIsConnectingGoogle(true);
    redirectToGoogleOAuth(clientId, "link");
  };

  const handleConnectFacebook = () => {
    const appId = process.env["NEXT_PUBLIC_FACEBOOK_APP_ID"];
    if (!appId) {
      toast.error("Facebook Login Not Configured", {
        description: "Missing NEXT_PUBLIC_FACEBOOK_APP_ID environment configuration.",
      });
      return;
    }
    setIsConnectingFacebook(true);
    redirectToFacebookOAuth(appId, "link");
  };

  const handleDownloadInvoice = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId) || selectedOrderReceipt;
    if (!order) {
      toast.error("Order invoice data not found.");
      return;
    }

    const subtotal =
      order.subtotal ?? order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shippingFee = order.shippingFee ?? Math.max(0, order.total - subtotal);
    const discountAmount = order.discountAmount ?? 0;

    const itemRowsHtml = order.items
      .map(
        (it) => `
          <tr>
            <td style="padding: 10px 8px; border-bottom: 1px solid #eee;">
              <strong>${escapeHtml(it.name)}</strong><br />
              <span style="color:#666;font-size:12px;">${escapeHtml(it.brand)} &bull; ${escapeHtml(it.size)}</span>
            </td>
            <td style="padding: 10px 8px; border-bottom: 1px solid #eee; text-align:center;">${it.qty}</td>
            <td style="padding: 10px 8px; border-bottom: 1px solid #eee; text-align:right;">${escapeHtml(formatBDT(it.price))}</td>
            <td style="padding: 10px 8px; border-bottom: 1px solid #eee; text-align:right;">${escapeHtml(formatBDT(it.price * it.qty))}</td>
          </tr>
        `,
      )
      .join("");

    const addressLine = [order.address, order.area, order.city, order.division]
      .filter(Boolean)
      .join(", ");

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>VAT Invoice - #${escapeHtml(order.id)} | Glorious Japan Skin Care</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 720px; margin: 32px auto; color: #1f2937; line-height: 1.5; padding: 0 16px;">
  <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom: 2px solid #c93d56; padding-bottom: 16px; margin-bottom: 24px;">
    <div>
      <h1 style="margin:0; color:#c93d56; font-size:22px;">Glorious Japan Skin Care</h1>
      <p style="margin:4px 0 0; color:#6b7280; font-size:12px;">Authentic Tokyo J-Beauty &bull; Official Customer Receipt</p>
    </div>
    <div style="text-align:right; font-size:12px;">
      <p style="margin:0; font-weight:bold; font-size:15px;">INVOICE #${escapeHtml(order.id)}</p>
      <p style="margin:2px 0; color:#6b7280;">Date: ${escapeHtml(order.date)}</p>
      <p style="margin:2px 0; color:#6b7280;">Status: ${escapeHtml(order.status)}</p>
    </div>
  </div>
  <div style="display:flex; justify-content:space-between; gap:16px; background:#fdf2f4; padding:14px 16px; border-radius:8px; margin-bottom:24px; font-size:13px;">
    <div>
      <strong style="display:block; margin-bottom:4px;">Billed / Shipped To</strong>
      <div>${escapeHtml(order.customerName || user?.name || "Customer")}</div>
      ${order.customerPhone ? `<div>${escapeHtml(order.customerPhone)}</div>` : ""}
      ${addressLine ? `<div>${escapeHtml(addressLine)}</div>` : ""}
    </div>
    <div style="text-align:right;">
      <strong style="display:block; margin-bottom:4px;">Payment & Dispatch</strong>
      <div>Method: ${escapeHtml(order.paymentMethod)}${order.paymentStatus ? ` (${escapeHtml(order.paymentStatus)})` : ""}</div>
      <div>Courier: ${escapeHtml(order.courier)}</div>
      <div>CN: ${escapeHtml(order.consignmentId)}</div>
    </div>
  </div>
  <table style="width:100%; border-collapse:collapse; font-size:13px; margin-bottom:24px;">
    <thead>
      <tr style="background:#f9fafb; border-bottom:1px solid #e5e7eb;">
        <th style="text-align:left; padding:10px 8px;">Item</th>
        <th style="text-align:center; padding:10px 8px;">Qty</th>
        <th style="text-align:right; padding:10px 8px;">Unit Price</th>
        <th style="text-align:right; padding:10px 8px;">Line Total</th>
      </tr>
    </thead>
    <tbody>${itemRowsHtml}</tbody>
  </table>
  <div style="max-width:280px; margin-left:auto; font-size:13px;">
    <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Subtotal:</span><span>${escapeHtml(formatBDT(subtotal))}</span></div>
    <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Delivery Fee:</span><span>${shippingFee === 0 ? "FREE" : escapeHtml(formatBDT(shippingFee))}</span></div>
    ${discountAmount > 0 ? `<div style="display:flex; justify-content:space-between; padding:4px 0; color:#059669;"><span>Discount:</span><span>-${escapeHtml(formatBDT(discountAmount))}</span></div>` : ""}
    <div style="display:flex; justify-content:space-between; padding:10px 0 0; margin-top:6px; border-top:2px solid #111827; font-weight:bold; font-size:15px;">
      <span>Total:</span><span>${escapeHtml(formatBDT(order.total))}</span>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gjsc-invoice-${order.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Invoice #${order.id} downloaded!`);
  };

  return {
    user,
    isAuthLoading,
    activeTab,
    setActiveTab,
    dashboard,
    isLoadingDashboard,
    refreshAccountData: loadAccountData,
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
    isSavingSkincare,
    handleToggleConcern,
    handleSaveSkincareProfile,
    notifSms,
    setNotifSms: (v: boolean) => void handleNotificationToggle("notifSms", v),
    notifWhatsapp,
    setNotifWhatsapp: (v: boolean) => void handleNotificationToggle("notifWhatsapp", v),
    notifPromos,
    setNotifPromos: (v: boolean) => void handleNotificationToggle("notifPromos", v),
    isSavingNotifications,
    currentPass,
    setCurrentPass,
    newPass,
    setNewPass,
    confirmPass,
    setConfirmPass,
    isUpdatingPassword,
    isConnectingGoogle,
    isConnectingFacebook,
    handleConnectGoogle,
    handleConnectFacebook,
    wishlistProducts,
    handleBuyAgain,
    handleChangePassword,
    handleSignOut,
    handleDownloadInvoice,
  };
}

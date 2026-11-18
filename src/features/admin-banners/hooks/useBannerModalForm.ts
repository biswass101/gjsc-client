import { useState } from "react";
import { toast } from "sonner";
import { AdminBanner, useAdmin } from "@/context/admin-context";
import { PAGE_KEYS, DEFAULT_BANNER_PRESETS } from "../constants";
import { resolveBannerImageUrl } from "../utils/bannerImageHelper";

function hexToRgba(hex: string, alpha: number) {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
}

export function useBannerModalForm() {
  const { banners, addBanner, updateBanner } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<AdminBanner | null>(null);

  const [pageKey, setPageKey] = useState<AdminBanner["pageKey"]>("home_hero");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [badge, setBadge] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [mobileImageUrl, setMobileImageUrl] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("/shop");
  const [active, setActive] = useState(true);
  const [order, setOrder] = useState("1");

  // Gradient Overlay configuration
  const [gradient, setGradient] = useState<string>("none");
  const [customStart, setCustomStart] = useState<string>("#1e1b4b");
  const [customEnd, setCustomEnd] = useState<string>("#000000");
  const [customOpacity, setCustomOpacity] = useState<number>(75);

  const handleSelectPageKey = (newKey: AdminBanner["pageKey"]) => {
    setPageKey(newKey);
    // When creating a new banner, automatically set index to the next available index for this page
    if (!editingBanner) {
      const pageBanners = banners.filter((b) => b.pageKey === newKey);
      setOrder(String(pageBanners.length + 1));
    }
  };

  const openCreateModal = () => {
    setEditingBanner(null);
    setPageKey("home_hero");
    setTitle("");
    setSubtitle("");
    setBadge("");
    setImageUrl("");
    setMobileImageUrl("");
    setCtaText("");
    setCtaLink("/shop");
    setActive(true);
    // Auto-calculate independent per-page index for home_hero
    const homeBanners = banners.filter((b) => b.pageKey === "home_hero");
    setOrder(String(homeBanners.length + 1));
    setGradient("none");
    setCustomStart("#1e1b4b");
    setCustomEnd("#000000");
    setCustomOpacity(75);
    setIsModalOpen(true);
  };

  const openEditModal = (banner: AdminBanner) => {
    setEditingBanner(banner);
    setPageKey(banner.pageKey);
    setTitle(banner.title || "");
    setSubtitle(banner.subtitle || "");
    setBadge(banner.badge || "");
    setImageUrl(banner.imageUrl ? resolveBannerImageUrl(banner.imageUrl) : "");
    setMobileImageUrl(banner.mobileImageUrl ? resolveBannerImageUrl(banner.mobileImageUrl) : "");
    setCtaText(banner.ctaText || "");
    setCtaLink(banner.ctaLink || "");
    setActive(banner.active);
    setOrder(String(banner.order || 1));

    const bGrad = banner.gradient || "none";
    if (bGrad.startsWith("linear-gradient")) {
      setGradient("custom");
    } else {
      setGradient(bGrad);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      toast.error("Banner image URL is required.");
      return;
    }

    const pageMeta = PAGE_KEYS.find((p) => p.key === pageKey);
    const pageTitle = pageMeta?.label || "Storefront Banner";

    let finalGradient: string | undefined = undefined;
    if (gradient === "custom") {
      finalGradient = `linear-gradient(to right, ${hexToRgba(customStart, customOpacity / 100)}, ${hexToRgba(customEnd, (customOpacity / 100) * 0.45)}, transparent)`;
    } else if (gradient && gradient !== "none") {
      finalGradient = gradient;
    } else {
      finalGradient = "none";
    }

    const payload = {
      pageKey,
      pageTitle,
      title: title.trim() || "",
      subtitle: subtitle.trim() ? subtitle.trim() : null,
      badge: badge.trim() ? badge.trim() : null,
      imageUrl: resolveBannerImageUrl(imageUrl.trim()),
      mobileImageUrl: mobileImageUrl.trim() ? resolveBannerImageUrl(mobileImageUrl.trim()) : null,
      ctaText: ctaText.trim() ? ctaText.trim() : null,
      ctaLink: ctaLink.trim() ? ctaLink.trim() : null,
      active,
      order: parseInt(order, 10) || 1,
      gradient: finalGradient,
    };

    if (editingBanner) {
      await updateBanner(editingBanner.id, payload);
      toast.success(title.trim() ? `Banner "${title}" updated! 🌸` : "Banner updated! 🌸");
    } else {
      await addBanner(payload);
      toast.success(title.trim() ? `Banner "${title}" published! 🌸` : `Banner published to ${pageTitle}! 🌸`);
    }

    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    editingBanner,
    pageKey,
    setPageKey: handleSelectPageKey,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    badge,
    setBadge,
    imageUrl,
    setImageUrl,
    mobileImageUrl,
    setMobileImageUrl,
    ctaText,
    setCtaText,
    ctaLink,
    setCtaLink,
    active,
    setActive,
    order,
    setOrder,
    gradient,
    setGradient,
    customStart,
    setCustomStart,
    customEnd,
    setCustomEnd,
    customOpacity,
    setCustomOpacity,
    openCreateModal,
    openEditModal,
    handleSave,
  };
}

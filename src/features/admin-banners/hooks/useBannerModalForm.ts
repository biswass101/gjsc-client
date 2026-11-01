import { useState } from "react";
import { toast } from "sonner";
import { AdminBanner, useAdmin } from "@/context/admin-context";
import { PAGE_KEYS, DEFAULT_BANNER_PRESETS } from "../constants";

export function useBannerModalForm() {
  const { banners, addBanner, updateBanner } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<AdminBanner | null>(null);

  const [pageKey, setPageKey] = useState<AdminBanner["pageKey"]>("home_hero");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [badge, setBadge] = useState("");
  const [imageUrl, setImageUrl] = useState(DEFAULT_BANNER_PRESETS[0] || "");
  const [mobileImageUrl, setMobileImageUrl] = useState("");
  const [ctaText, setCtaText] = useState("Shop Now");
  const [ctaLink, setCtaLink] = useState("/shop");
  const [active, setActive] = useState(true);
  const [order, setOrder] = useState("1");

  const openCreateModal = () => {
    setEditingBanner(null);
    setPageKey("home_hero");
    setTitle("");
    setSubtitle("");
    setBadge("🌸 Tokyo Exclusive");
    setImageUrl(
      DEFAULT_BANNER_PRESETS[Math.floor(Math.random() * DEFAULT_BANNER_PRESETS.length)] || "",
    );
    setMobileImageUrl("");
    setCtaText("Explore Now");
    setCtaLink("/shop");
    setActive(true);
    setOrder(String(banners.length + 1));
    setIsModalOpen(true);
  };

  const openEditModal = (banner: AdminBanner) => {
    setEditingBanner(banner);
    setPageKey(banner.pageKey);
    setTitle(banner.title);
    setSubtitle(banner.subtitle || "");
    setBadge(banner.badge || "");
    setImageUrl(banner.imageUrl);
    setMobileImageUrl(banner.mobileImageUrl || "");
    setCtaText(banner.ctaText || "Shop Now");
    setCtaLink(banner.ctaLink || "/shop");
    setActive(banner.active);
    setOrder(String(banner.order));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Banner headline title is required.");
      return;
    }
    if (!imageUrl.trim()) {
      toast.error("Desktop banner image URL is required.");
      return;
    }

    const pageMeta = PAGE_KEYS.find((p) => p.key === pageKey);
    const pageTitle = pageMeta?.label || "Storefront Banner";

    const payload = {
      pageKey,
      pageTitle,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      badge: badge.trim() || undefined,
      imageUrl: imageUrl.trim(),
      mobileImageUrl: mobileImageUrl.trim() || undefined,
      ctaText: ctaText.trim() || undefined,
      ctaLink: ctaLink.trim() || undefined,
      active,
      order: parseInt(order, 10) || 1,
    };

    if (editingBanner) {
      updateBanner(editingBanner.id, payload);
      toast.success(`Banner "${title}" updated! 🌸`);
    } else {
      addBanner(payload);
      toast.success(`Banner published to ${pageTitle}! 🌸`);
    }

    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    editingBanner,
    pageKey,
    setPageKey,
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
    openCreateModal,
    openEditModal,
    handleSave,
  };
}

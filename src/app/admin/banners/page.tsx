"use client";

import React, { useState, useMemo } from "react";
import {
  Image as ImageIcon,
  Plus,
  Search,
  Edit2,
  Trash2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Eye,
  Layers,
  Smartphone,
  Monitor,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useAdmin, AdminBanner } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const PAGE_KEYS: Array<{
  key: AdminBanner["pageKey"];
  label: string;
  route: string;
}> = [
  { key: "home_hero", label: "Home Page (Hero Carousel)", route: "/" },
  { key: "home_middle", label: "Home Page (Mid-Page Promotion)", route: "/" },
  { key: "shop", label: "Shop Catalog Header", route: "/shop" },
  { key: "collections", label: "Collections Header", route: "/collections" },
  { key: "brands", label: "Brands Directory Banner", route: "/brands" },
  { key: "categories", label: "Categories Hub Header", route: "/categories" },
  { key: "offers", label: "Offers & Deals Header", route: "/offers" },
  { key: "pre_order", label: "Pre-Order Flight Banner", route: "/pre-order" },
  { key: "checkout", label: "Checkout Trust Strip", route: "/checkout" },
];

const DEFAULT_BANNER_PRESETS = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1600&auto=format&fit=crop&q=80",
];

export default function AdminBannersPage() {
  const { banners, addBanner, updateBanner, deleteBanner } = useAdmin();

  const [selectedPageFilter, setSelectedPageFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<AdminBanner | null>(null);

  // Form Fields
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

  // Delete Alert
  const [bannerToDelete, setBannerToDelete] = useState<AdminBanner | null>(null);

  // Filtered list
  const filteredBanners = useMemo(() => {
    return banners.filter((b) => {
      const matchesPage =
        selectedPageFilter === "all" || b.pageKey === selectedPageFilter;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        b.title.toLowerCase().includes(q) ||
        (b.subtitle && b.subtitle.toLowerCase().includes(q)) ||
        b.pageTitle.toLowerCase().includes(q);

      return matchesPage && matchesSearch;
    });
  }, [banners, selectedPageFilter, searchQuery]);

  // Statistics
  const activeCount = useMemo(
    () => banners.filter((b) => b.active).length,
    [banners]
  );
  const coveredPagesCount = useMemo(
    () => new Set(banners.map((b) => b.pageKey)).size,
    [banners]
  );

  const openCreateModal = () => {
    setEditingBanner(null);
    setPageKey("home_hero");
    setTitle("");
    setSubtitle("");
    setBadge("🌸 Tokyo Exclusive");
    setImageUrl(DEFAULT_BANNER_PRESETS[Math.floor(Math.random() * DEFAULT_BANNER_PRESETS.length)] || "");
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

    if (editingBanner) {
      updateBanner(editingBanner.id, {
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
      });
      toast.success(`Banner "${title}" updated! 🌸`);
    } else {
      addBanner({
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
      });
      toast.success(`Banner published to ${pageTitle}! 🌸`);
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!bannerToDelete) return;
    deleteBanner(bannerToDelete.id);
    toast.success(`Banner "${bannerToDelete.title}" removed.`);
    setBannerToDelete(null);
  };

  const handleToggleActive = (banner: AdminBanner) => {
    updateBanner(banner.id, { active: !banner.active });
    toast.success(
      `Banner "${banner.title}" is now ${!banner.active ? "LIVE on storefront" : "hidden/inactive"}.`
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            <span>Visual Merchandising</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-primary font-bold">Page Promotional Banners</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1 flex items-center gap-2.5">
            <ImageIcon className="h-7 w-7 text-primary" />
            <span>Site-Wide Page Banners Manager</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Complete atomic control over hero carousels, promotion strips, and responsive visual banners across every page of the website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={openCreateModal}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Banner</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Total Banners</span>
            <ImageIcon className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {banners.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Configured storefront banners
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Active Live Banners</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {activeCount}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Currently rendering on website
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Pages Covered</span>
            <Layers className="h-4 w-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {coveredPagesCount} / {PAGE_KEYS.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Distinct storefront routes
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Responsive Mobile Ready</span>
            <Smartphone className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {banners.filter((b) => b.mobileImageUrl).length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            With custom mobile aspect ratio
          </p>
        </div>
      </div>

      {/* Page Key Tabs & Search Bar */}
      <div className="flex flex-col gap-3 bg-card p-4 rounded-xl border border-border/70">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search banner headlines, subtitles, or page targets..."
              className="pl-9 bg-background/60"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            Displaying <strong>{filteredBanners.length}</strong> banners
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1">
          <Button
            variant={selectedPageFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPageFilter("all")}
            className="text-xs shrink-0"
          >
            All Pages ({banners.length})
          </Button>
          {PAGE_KEYS.map((p) => {
            const count = banners.filter((b) => b.pageKey === p.key).length;
            return (
              <Button
                key={p.key}
                variant={selectedPageFilter === p.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPageFilter(p.key)}
                className="text-xs shrink-0"
              >
                {p.label.split("(")[0]?.trim()} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Banner Cards Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBanners.map((banner) => {
          const pageConfig = PAGE_KEYS.find((p) => p.key === banner.pageKey);

          return (
            <div
              key={banner.id}
              className={`rounded-xl border overflow-hidden bg-card shadow-xs transition-all duration-200 flex flex-col justify-between ${
                banner.active
                  ? "border-border/80 hover:border-primary/40 hover:shadow-md"
                  : "border-border/40 opacity-75"
              }`}
            >
              {/* Live Preview Container (Simulating Desktop Banner) */}
              <div className="relative h-56 w-full overflow-hidden bg-muted">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

                {/* Status & Page Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Badge className="bg-background/90 text-foreground font-semibold text-[10px] backdrop-blur-xs shadow-xs">
                    {pageConfig?.label || banner.pageTitle}
                  </Badge>
                  {banner.badge && (
                    <Badge className="bg-primary text-primary-foreground border-none text-[10px] shadow-xs">
                      {banner.badge}
                    </Badge>
                  )}
                </div>

                {/* Active switch & order badge in preview top-right */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white font-mono">
                    Order #{banner.order}
                  </span>
                  <div className="rounded-full bg-black/60 backdrop-blur-md p-1 px-2 flex items-center gap-1.5">
                    <span className="text-[10px] text-white">Live:</span>
                    <Switch
                      checked={banner.active}
                      onCheckedChange={() => handleToggleActive(banner)}
                    />
                  </div>
                </div>

                {/* Banner Text Overlay */}
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <h3 className="text-xl font-bold text-white drop-shadow-sm leading-tight max-w-lg">
                    {banner.title}
                  </h3>
                  {banner.subtitle && (
                    <p className="text-xs text-white/90 line-clamp-2 max-w-md drop-shadow-2xs">
                      {banner.subtitle}
                    </p>
                  )}

                  {banner.ctaText && (
                    <div className="pt-1 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-xs">
                        <span>{banner.ctaText}</span>
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      <span className="text-[11px] text-white/70 font-mono">
                        Target: {banner.ctaLink || "/"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Information & Action Footer */}
              <div className="p-4 bg-card/60 flex items-center justify-between gap-4 border-t border-border/60">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Monitor className="h-3.5 w-3.5 text-primary" />
                    <span>Desktop Ready</span>
                  </div>
                  {banner.mobileImageUrl ? (
                    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <Smartphone className="h-3.5 w-3.5" />
                      <span>Custom Mobile Asset</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Smartphone className="h-3.5 w-3.5" />
                      <span>Auto Responsive</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(banner)}
                    className="h-8 gap-1.5 text-xs"
                  >
                    <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBannerToDelete(banner)}
                    className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBanners.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
          <h3 className="font-bold text-foreground text-lg">No Banners Found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            Create promotional banners for your storefront pages to guide customer conversion.
          </p>
          <Button onClick={openCreateModal} className="mt-4 gap-2">
            <Plus className="h-4 w-4" />
            <span>Create Promotional Banner</span>
          </Button>
        </div>
      )}

      {/* Add / Edit Banner Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-display text-xl">
                <ImageIcon className="h-5 w-5 text-primary" />
                <span>{editingBanner ? "Edit Promotional Banner" : "Design New Storefront Banner"}</span>
              </DialogTitle>
              <DialogDescription>
                Configure page placement, marketing headline, responsive graphics, and conversion CTA button.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Target Page Placement */}
              <div className="space-y-1.5">
                <Label htmlFor="banner-page" className="text-xs font-semibold">
                  Target Storefront Page Placement <span className="text-rose-500">*</span>
                </Label>
                <Select
                  value={pageKey}
                  onValueChange={(val) => setPageKey(val as AdminBanner["pageKey"])}
                >
                  <SelectTrigger id="banner-page">
                    <SelectValue placeholder="Select target page" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_KEYS.map((p) => (
                      <SelectItem key={p.key} value={p.key}>
                        {p.label} ({p.route})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <Label htmlFor="banner-title" className="text-xs font-semibold">
                    Banner Main Headline <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="banner-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Ginza Tokyo Direct: Authentic Skincare Arrival"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="banner-badge" className="text-xs font-semibold">
                    Promotional Badge
                  </Label>
                  <Input
                    id="banner-badge"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. 🌸 Spring 2026"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className="space-y-1.5">
                <Label htmlFor="banner-subtitle" className="text-xs font-semibold">
                  Supporting Subtitle / Value Proposition
                </Label>
                <Textarea
                  id="banner-subtitle"
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. 100% Genuine formulas air-shipped weekly. Fast courier dispatch across all 64 districts in Bangladesh."
                />
              </div>

              {/* Desktop Image URL */}
              <div className="space-y-2">
                <Label htmlFor="banner-desktop-img" className="text-xs font-semibold">
                  Desktop Banner Image URL (16:9 or Widescreen) <span className="text-rose-500">*</span>
                </Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="banner-desktop-img"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    required
                    className="flex-1"
                  />
                  {imageUrl && (
                    <div className="relative h-10 w-20 rounded-md border border-border overflow-hidden bg-muted shrink-0">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <span className="text-[10px] text-muted-foreground">Presets:</span>
                  {DEFAULT_BANNER_PRESETS.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageUrl(preset)}
                      className="text-[10px] text-primary hover:underline"
                    >
                      Image {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Image URL */}
              <div className="space-y-1.5">
                <Label htmlFor="banner-mobile-img" className="text-xs font-semibold">
                  Mobile Banner Image URL (Optional - Portrait / 4:5 ratio)
                </Label>
                <Input
                  id="banner-mobile-img"
                  value={mobileImageUrl}
                  onChange={(e) => setMobileImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... (leave blank to auto-scale desktop)"
                />
              </div>

              {/* CTA Button Text & Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="banner-cta-text" className="text-xs font-semibold">
                    CTA Button Label
                  </Label>
                  <Input
                    id="banner-cta-text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="e.g. Shop Now, View Pre-Orders"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="banner-cta-link" className="text-xs font-semibold">
                    CTA Destination URL
                  </Label>
                  <Input
                    id="banner-cta-link"
                    value={ctaLink}
                    onChange={(e) => setCtaLink(e.target.value)}
                    placeholder="e.g. /shop, /pre-order, /collections"
                  />
                </div>
              </div>

              {/* Display Order & Active Switch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="banner-order" className="text-xs font-semibold">
                    Display Order Index
                  </Label>
                  <Input
                    id="banner-order"
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    min={1}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    Lower number displays first in carousels
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <Label htmlFor="banner-active" className="text-xs font-semibold">
                      Live on Storefront
                    </Label>
                    <p className="text-[11px] text-muted-foreground">
                      Enable to immediately publish banner
                    </p>
                  </div>
                  <Switch
                    id="banner-active"
                    checked={active}
                    onCheckedChange={setActive}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
                {editingBanner ? "Save Banner Changes" : "Publish Banner"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog
        open={!!bannerToDelete}
        onOpenChange={(open) => !open && setBannerToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              <span>Delete Promotional Banner</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete banner &quot;{bannerToDelete?.title}&quot;?
              This will remove the visual banner from the {bannerToDelete?.pageTitle} page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}


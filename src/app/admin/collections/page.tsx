"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Plus,
  Search,
  Edit2,
  Trash2,
  Palette,
  Tag,
  ChevronRight,
  X,
  ExternalLink,
  Layers,
  Flame,
} from "lucide-react";
import { useAdmin, AdminCollection } from "@/context/admin-context";
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
import { toast } from "sonner";

const THEME_COLORS = [
  { name: "Sakura Pink", hex: "#e11d48" },
  { name: "Tokyo Slate", hex: "#0f172a" },
  { name: "Matcha Green", hex: "#059669" },
  { name: "Golden Yuzu", hex: "#d97706" },
  { name: "Kyoto Lavender", hex: "#7c3aed" },
  { name: "Ocean Indigo", hex: "#0284c7" },
  { name: "Rose Silk", hex: "#be185d" },
];

const DEFAULT_BANNERS = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=80",
];

export default function AdminCollectionsPage() {
  const { collections, addCollection, updateCollection, deleteCollection } = useAdmin();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<AdminCollection | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [japaneseTitle, setJapaneseTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [badgeText, setBadgeText] = useState("");
  const [bannerImage, setBannerImage] = useState(DEFAULT_BANNERS[0] || "");
  const [themeColor, setThemeColor] = useState(THEME_COLORS[0]?.hex || "#e11d48");
  const [featured, setFeatured] = useState(false);
  const [itemCount, setItemCount] = useState("12");

  // Frequently searched pills
  const [frequentlySearched, setFrequentlySearched] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState("");

  // Delete Alert
  const [collectionToDelete, setCollectionToDelete] = useState<AdminCollection | null>(null);

  // Filtered collections
  const filteredCollections = useMemo(() => {
    return collections.filter((col) => {
      const q = searchQuery.toLowerCase();
      return (
        col.title.toLowerCase().includes(q) ||
        col.tagline.toLowerCase().includes(q) ||
        (col.japaneseTitle && col.japaneseTitle.toLowerCase().includes(q)) ||
        col.frequentlySearched.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [collections, searchQuery]);

  // Statistics
  const featuredCount = useMemo(
    () => collections.filter((c) => c.featured).length,
    [collections]
  );
  const totalKeywords = useMemo(
    () => collections.reduce((sum, c) => sum + c.frequentlySearched.length, 0),
    [collections]
  );

  const openCreateModal = () => {
    setEditingCollection(null);
    setTitle("");
    setSlug("");
    setJapaneseTitle("");
    setTagline("");
    setDescription("");
    setBadgeText("Curated Ritual");
    setBannerImage(DEFAULT_BANNERS[Math.floor(Math.random() * DEFAULT_BANNERS.length)] || "");
    setThemeColor(THEME_COLORS[0]?.hex || "#e11d48");
    setFeatured(false);
    setItemCount("12");
    setFrequentlySearched(["Glass Skin", "Hyaluronic Acid", "Essence"]);
    setIsModalOpen(true);
  };

  const openEditModal = (col: AdminCollection) => {
    setEditingCollection(col);
    setTitle(col.title);
    setSlug(col.slug);
    setJapaneseTitle(col.japaneseTitle || "");
    setTagline(col.tagline);
    setDescription(col.description);
    setBadgeText(col.badgeText || "");
    setBannerImage(col.bannerImage);
    setThemeColor(col.themeColor || "#e11d48");
    setFeatured(col.featured);
    setItemCount(String(col.itemCount));
    setFrequentlySearched([...col.frequentlySearched]);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingCollection) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      );
    }
  };

  const handleAddTag = () => {
    const trimmed = newTagInput.trim();
    if (!trimmed) return;
    if (frequentlySearched.includes(trimmed)) {
      toast.error("Tag keyword already added!");
      return;
    }
    setFrequentlySearched([...frequentlySearched, trimmed]);
    setNewTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setFrequentlySearched(frequentlySearched.filter((t) => t !== tag));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Collection title is required.");
      return;
    }
    if (!slug.trim()) {
      toast.error("Slug identifier is required.");
      return;
    }

    if (editingCollection) {
      updateCollection(editingCollection.id, {
        title: title.trim(),
        slug: slug.trim(),
        japaneseTitle: japaneseTitle.trim() || undefined,
        tagline: tagline.trim() || "Exclusive Japanese Beauty Curation",
        description: description.trim() || "Authentic skincare regimens directly from Tokyo.",
        badgeText: badgeText.trim() || undefined,
        bannerImage: bannerImage.trim() || DEFAULT_BANNERS[0] || "",
        themeColor,
        frequentlySearched,
        featured,
        itemCount: parseInt(itemCount, 10) || 0,
      });
      toast.success(`Collection "${title}" updated! 🌸`);
    } else {
      addCollection({
        title: title.trim(),
        slug: slug.trim(),
        japaneseTitle: japaneseTitle.trim() || undefined,
        tagline: tagline.trim() || "Exclusive Japanese Beauty Curation",
        description: description.trim() || "Authentic skincare regimens directly from Tokyo.",
        badgeText: badgeText.trim() || undefined,
        bannerImage: bannerImage.trim() || DEFAULT_BANNERS[0] || "",
        themeColor,
        frequentlySearched,
        featured,
        itemCount: parseInt(itemCount, 10) || 0,
      });
      toast.success(`Collection "${title}" created and published! 🌸`);
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!collectionToDelete) return;
    deleteCollection(collectionToDelete.id);
    toast.success(`Collection "${collectionToDelete.title}" deleted.`);
    setCollectionToDelete(null);
  };

  const handleToggleFeatured = (col: AdminCollection) => {
    updateCollection(col.id, { featured: !col.featured });
    toast.success(
      `Collection "${col.title}" ${!col.featured ? "highlighted as Featured" : "removed from Featured"}.`
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            <span>Store Merchandising</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-primary font-bold">Curated Collections</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">
            Themed Skincare Collections
          </h1>
          <p className="text-sm text-muted-foreground">
            Curate multi-step Japanese routines, seasonal rituals, promotional themes, and SEO search keyword associations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={openCreateModal}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Create Collection</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Active Collections</span>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {collections.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Storefront themed landing pages
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Featured on Home</span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {featuredCount}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Homepage hero showcase
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Search Keywords</span>
            <Tag className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {totalKeywords}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Search auto-suggest tags
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Total Bundled SKUs</span>
            <Layers className="h-4 w-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {collections.reduce((sum, c) => sum + c.itemCount, 0)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Cross-sell product links
          </p>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-card p-3 rounded-xl border border-border/70">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search collections, Japanese kanji, SEO tags..."
            className="pl-9 bg-background/60"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Showing <strong>{filteredCollections.length}</strong> of {collections.length} collections
        </p>
      </div>

      {/* Collection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCollections.map((col) => (
          <div
            key={col.id}
            className="group relative flex flex-col rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200"
          >
            {/* Color Accent Bar */}
            <div
              className="h-1.5 w-full"
              style={{ backgroundColor: col.themeColor || "#e11d48" }}
            />

            {/* Banner Image */}
            <div className="relative h-44 w-full overflow-hidden bg-muted">
              <img
                src={col.bannerImage}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              {/* Badge Pills */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                {col.badgeText && (
                  <Badge
                    style={{ backgroundColor: col.themeColor || "#e11d48" }}
                    className="text-white border-none text-[10px] font-bold shadow-xs"
                  >
                    {col.badgeText}
                  </Badge>
                )}
                {col.featured && (
                  <Badge className="bg-amber-500/90 text-white border-none text-[10px] gap-1 shadow-xs">
                    <Sparkles className="h-2.5 w-2.5" />
                    Featured
                  </Badge>
                )}
              </div>

              {/* Japanese Kanji Tag */}
              {col.japaneseTitle && (
                <div className="absolute top-3 right-3 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-white tracking-widest font-mono">
                  {col.japaneseTitle}
                </div>
              )}

              {/* Title & Items */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground leading-tight">
                    {col.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {col.tagline}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-semibold bg-background/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-border">
                  {col.itemCount} Items
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-4 flex flex-col justify-between gap-4">
              <p className="text-xs text-muted-foreground line-clamp-2">
                {col.description}
              </p>

              {/* Search Keywords */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Associated Keywords ({col.frequentlySearched.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {col.frequentlySearched.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                  {col.frequentlySearched.length === 0 && (
                    <span className="text-[11px] italic text-muted-foreground">
                      No search tags attached
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-border/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Featured:</span>
                  <Switch
                    checked={col.featured}
                    onCheckedChange={() => handleToggleFeatured(col)}
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(col)}
                    className="h-8 gap-1.5 text-xs"
                  >
                    <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCollectionToDelete(col)}
                    className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCollections.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
          <Sparkles className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
          <h3 className="font-bold text-foreground text-lg">No Collections Found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            Try a different search query or launch a new skincare collection routine.
          </p>
          <Button onClick={openCreateModal} className="mt-4 gap-2">
            <Plus className="h-4 w-4" />
            <span>Create First Collection</span>
          </Button>
        </div>
      )}

      {/* Add / Edit Collection Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-display text-xl">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>{editingCollection ? "Edit Collection" : "Create Themed Collection"}</span>
              </DialogTitle>
              <DialogDescription>
                Configure collection banner visuals, Japanese theme branding, search keywords, and storefront badge.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Title & Japanese Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="col-title" className="text-xs font-semibold">
                    Collection Title <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="col-title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Glass Skin Ritual"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="col-japanese" className="text-xs font-semibold">
                    Japanese Title (Kanji/Kana)
                  </Label>
                  <Input
                    id="col-japanese"
                    value={japaneseTitle}
                    onChange={(e) => setJapaneseTitle(e.target.value)}
                    placeholder="e.g. ガラス肌・透明感"
                  />
                </div>
              </div>

              {/* Slug & Badge */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="col-slug" className="text-xs font-semibold">
                    URL Slug Identifier <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="col-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. glass-skin-ritual"
                    required
                  />
                  <span className="text-[10px] text-muted-foreground">
                    Storefront route: /collections/{slug || "slug"}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="col-badge" className="text-xs font-semibold">
                    Storefront Badge Text
                  </Label>
                  <Input
                    id="col-badge"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    placeholder="e.g. Most Popular, Seasonal Limited, Best Seller"
                  />
                </div>
              </div>

              {/* Theme Color Selector */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold flex items-center justify-between">
                  <span>Theme Accent Color</span>
                  <span className="font-mono text-xs">{themeColor}</span>
                </Label>
                <div className="flex items-center gap-2 flex-wrap">
                  {THEME_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setThemeColor(c.hex)}
                      className={`h-8 px-3 rounded-lg flex items-center gap-2 text-xs font-medium border transition-all ${
                        themeColor === c.hex
                          ? "ring-2 ring-primary ring-offset-2 border-transparent text-foreground"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full shrink-0 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-1.5">
                <Label htmlFor="col-tagline" className="text-xs font-semibold">
                  Collection Tagline
                </Label>
                <Input
                  id="col-tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. 5-step hydration ritual for porcelain luminosity"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="col-desc" className="text-xs font-semibold">
                  Editorial Description
                </Label>
                <Textarea
                  id="col-desc"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe why this curated ritual is special and how to use the products in sequence..."
                />
              </div>

              {/* Banner Image URL */}
              <div className="space-y-2">
                <Label htmlFor="col-banner" className="text-xs font-semibold">
                  Banner Image URL <span className="text-rose-500">*</span>
                </Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="col-banner"
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    required
                    className="flex-1"
                  />
                  {bannerImage && (
                    <div className="relative h-10 w-16 rounded-md border border-border overflow-hidden bg-muted shrink-0">
                      <img
                        src={bannerImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Associated Search Tags */}
              <div className="space-y-2 rounded-xl border border-border/80 bg-secondary/30 p-3.5">
                <Label className="text-xs font-semibold flex items-center justify-between">
                  <span>Frequently Searched Keywords ({frequentlySearched.length})</span>
                  <span className="text-[10px] font-normal text-muted-foreground">
                    Connects search bar queries to this collection
                  </span>
                </Label>

                <div className="flex gap-2">
                  <Input
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    placeholder="e.g. Hyaluronic Acid, Glow, Sunscreen..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="bg-background text-xs"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={handleAddTag}
                    className="text-xs shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {frequentlySearched.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-2.5 py-1 text-xs font-medium text-foreground shadow-2xs"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-muted-foreground hover:text-rose-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Options: Featured & Stock count */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <Label htmlFor="col-feat" className="text-xs font-semibold">
                      Featured Collection
                    </Label>
                    <p className="text-[11px] text-muted-foreground">
                      Display in prominent homepage carousels
                    </p>
                  </div>
                  <Switch
                    id="col-feat"
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="col-count" className="text-xs font-semibold">
                    Product Count
                  </Label>
                  <Input
                    id="col-count"
                    type="number"
                    value={itemCount}
                    onChange={(e) => setItemCount(e.target.value)}
                    min={0}
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
                {editingCollection ? "Save Collection Changes" : "Create & Publish Collection"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog
        open={!!collectionToDelete}
        onOpenChange={(open) => !open && setCollectionToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              <span>Delete Collection</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{collectionToDelete?.title}</strong>?
              This will remove the collection landing page from the storefront.
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


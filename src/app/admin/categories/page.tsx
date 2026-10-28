"use client";

import React, { useState, useMemo } from "react";
import {
  FolderTree,
  Plus,
  Search,
  Edit2,
  Trash2,
  Sparkles,
  Layers,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Filter,
  Eye,
} from "lucide-react";
import { useAdmin, AdminCategory } from "@/context/admin-context";
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

const PARENT_CATEGORIES = [
  "Skincare",
  "Sun Care & UV",
  "Hair Care",
  "Body Care",
  "Makeup",
  "Gifts & Sets",
];

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1608248597359-299318b7623a?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
];

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdmin();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParent, setSelectedParent] = useState<string>("all");

  // Create / Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [japaneseTitle, setJapaneseTitle] = useState("");
  const [parentCategory, setParentCategory] = useState(PARENT_CATEGORIES[0] || "Skincare");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(DEFAULT_IMAGES[0] || "");
  const [bannerImage, setBannerImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [itemCount, setItemCount] = useState("12");

  // Subcategories tagging
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [newSubcatInput, setNewSubcatInput] = useState("");

  // Delete confirmation
  const [categoryToDelete, setCategoryToDelete] = useState<AdminCategory | null>(null);

  // Filtered list
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch =
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cat.japaneseTitle && cat.japaneseTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        cat.subcategories.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesParent =
        selectedParent === "all" || cat.parentCategory.toLowerCase() === selectedParent.toLowerCase();

      return matchesSearch && matchesParent;
    });
  }, [categories, searchQuery, selectedParent]);

  // Statistics
  const totalSubcats = useMemo(
    () => categories.reduce((sum, c) => sum + c.subcategories.length, 0),
    [categories]
  );
  const featuredCount = useMemo(
    () => categories.filter((c) => c.featured).length,
    [categories]
  );

  const openCreateModal = () => {
    setEditingCategory(null);
    setTitle("");
    setSlug("");
    setJapaneseTitle("");
    setParentCategory(PARENT_CATEGORIES[0] || "Skincare");
    setTagline("");
    setDescription("");
    setImage(DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)] || "");
    setBannerImage("");
    setFeatured(false);
    setItemCount("10");
    setSubcategories(["Daily Essentials", "Hydration", "Brightening"]);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: AdminCategory) => {
    setEditingCategory(cat);
    setTitle(cat.title);
    setSlug(cat.slug);
    setJapaneseTitle(cat.japaneseTitle || "");
    setParentCategory(cat.parentCategory);
    setTagline(cat.tagline);
    setDescription(cat.description);
    setImage(cat.image);
    setBannerImage(cat.bannerImage || "");
    setFeatured(cat.featured);
    setItemCount(String(cat.itemCount));
    setSubcategories([...cat.subcategories]);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingCategory) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      );
    }
  };

  const handleAddSubcat = () => {
    const trimmed = newSubcatInput.trim();
    if (!trimmed) return;
    if (subcategories.includes(trimmed)) {
      toast.error("Subcategory already added!");
      return;
    }
    setSubcategories([...subcategories, trimmed]);
    setNewSubcatInput("");
  };

  const handleRemoveSubcat = (sub: string) => {
    setSubcategories(subcategories.filter((s) => s !== sub));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Category title is required.");
      return;
    }
    if (!slug.trim()) {
      toast.error("Slug identifier is required.");
      return;
    }

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        title: title.trim(),
        slug: slug.trim(),
        japaneseTitle: japaneseTitle.trim() || undefined,
        parentCategory,
        tagline: tagline.trim() || "Authentic Japanese Skincare Formula",
        description: description.trim() || "Carefully curated Japanese beauty formulation.",
        image: image.trim() || DEFAULT_IMAGES[0] || "",
        bannerImage: bannerImage.trim() || undefined,
        subcategories,
        featured,
        itemCount: parseInt(itemCount, 10) || 0,
      });
      toast.success(`Category "${title}" updated successfully! 🌸`);
    } else {
      addCategory({
        title: title.trim(),
        slug: slug.trim(),
        japaneseTitle: japaneseTitle.trim() || undefined,
        parentCategory,
        tagline: tagline.trim() || "Authentic Japanese Skincare Formula",
        description: description.trim() || "Carefully curated Japanese beauty formulation.",
        image: image.trim() || DEFAULT_IMAGES[0] || "",
        bannerImage: bannerImage.trim() || undefined,
        subcategories,
        featured,
        itemCount: parseInt(itemCount, 10) || 0,
      });
      toast.success(`Category "${title}" created and published! 🌸`);
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!categoryToDelete) return;
    deleteCategory(categoryToDelete.id);
    toast.success(`Category "${categoryToDelete.title}" removed.`);
    setCategoryToDelete(null);
  };

  const handleToggleFeatured = (cat: AdminCategory) => {
    updateCategory(cat.id, { featured: !cat.featured });
    toast.success(
      `Category "${cat.title}" ${!cat.featured ? "marked as Featured" : "removed from Featured"}.`
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            <span>Catalog Architecture</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-primary font-bold">Categories & Subcategories</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">
            Category & Subcategory Hierarchy
          </h1>
          <p className="text-sm text-muted-foreground">
            Complete atomic control over product groupings, Japanese naming, subcategory tagging, and storefront discovery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={openCreateModal}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Category</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Total Categories</span>
            <FolderTree className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {categories.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Across {PARENT_CATEGORIES.length} parent groups
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Active Subcategories</span>
            <Layers className="h-4 w-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {totalSubcats}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Deep-link navigation tags
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Featured on Home</span>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {featuredCount}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Highlighted in storefront grid
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Avg Products / Cat</span>
            <Layers className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {categories.length > 0
              ? Math.round(
                  categories.reduce((s, c) => s + c.itemCount, 0) / categories.length
                )
              : 0}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Tokyo inventory distribution
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-card p-3 rounded-xl border border-border/70">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories, Japanese kanji, subcategories..."
            className="pl-9 bg-background/60"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Button
            variant={selectedParent === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedParent("all")}
            className="text-xs shrink-0"
          >
            All Groups ({categories.length})
          </Button>
          {PARENT_CATEGORIES.map((group) => {
            const count = categories.filter(
              (c) => c.parentCategory.toLowerCase() === group.toLowerCase()
            ).length;
            return (
              <Button
                key={group}
                variant={selectedParent.toLowerCase() === group.toLowerCase() ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedParent(group)}
                className="text-xs shrink-0"
              >
                {group} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="group relative flex flex-col rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200"
          >
            {/* Image Header with Japanese Tag */}
            <div className="relative h-44 w-full overflow-hidden bg-muted">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

              {/* Parent category & featured pill */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                <Badge variant="secondary" className="bg-background/90 backdrop-blur-xs font-semibold text-[10px]">
                  {category.parentCategory}
                </Badge>
                {category.featured && (
                  <Badge className="bg-amber-500/90 text-white border-none text-[10px] gap-1 shadow-xs">
                    <Sparkles className="h-2.5 w-2.5" />
                    Featured
                  </Badge>
                )}
              </div>

              {/* Japanese Kanji / Hiragana Stamp */}
              {category.japaneseTitle && (
                <div className="absolute top-3 right-3 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-white tracking-widest font-mono">
                  {category.japaneseTitle}
                </div>
              )}

              {/* Bottom Title Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {category.tagline}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {category.itemCount} SKUs
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 p-4 flex flex-col justify-between gap-4">
              {/* Description */}
              <p className="text-xs text-muted-foreground line-clamp-2">
                {category.description}
              </p>

              {/* Subcategories Tags */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Subcategories ({category.subcategories.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {category.subcategories.map((sub, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length === 0 && (
                    <span className="text-[11px] italic text-muted-foreground">
                      No subcategories configured
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-border/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Featured:</span>
                  <Switch
                    checked={category.featured}
                    onCheckedChange={() => handleToggleFeatured(category)}
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(category)}
                    className="h-8 gap-1.5 text-xs"
                  >
                    <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCategoryToDelete(category)}
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

      {filteredCategories.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
          <FolderTree className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
          <h3 className="font-bold text-foreground text-lg">No Categories Found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            Try adjusting your search query or create a new category to populate your catalog.
          </p>
          <Button onClick={openCreateModal} className="mt-4 gap-2">
            <Plus className="h-4 w-4" />
            <span>Create First Category</span>
          </Button>
        </div>
      )}

      {/* Add / Edit Category Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-display text-xl">
                <FolderTree className="h-5 w-5 text-primary" />
                <span>{editingCategory ? "Edit Category & Subcategories" : "Add New Category"}</span>
              </DialogTitle>
              <DialogDescription>
                Configure category taxonomy, Japanese kanji naming, media imagery, and subcategory navigation pills.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Category Name & Japanese Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cat-title" className="text-xs font-semibold">
                    Category Title <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="cat-title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Cleansers & Washes"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cat-japanese" className="text-xs font-semibold">
                    Japanese Title (Kanji/Kana)
                  </Label>
                  <Input
                    id="cat-japanese"
                    value={japaneseTitle}
                    onChange={(e) => setJapaneseTitle(e.target.value)}
                    placeholder="e.g. 洗顔・クレンジング"
                  />
                </div>
              </div>

              {/* Slug & Parent Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cat-slug" className="text-xs font-semibold">
                    URL Slug Identifier <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="cat-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. cleansers-washes"
                    required
                  />
                  <span className="text-[10px] text-muted-foreground">
                    Storefront route: /categories/{slug || "slug"}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cat-parent" className="text-xs font-semibold">
                    Parent Group
                  </Label>
                  <Select value={parentCategory} onValueChange={setParentCategory}>
                    <SelectTrigger id="cat-parent">
                      <SelectValue placeholder="Select parent category" />
                    </SelectTrigger>
                    <SelectContent>
                      {PARENT_CATEGORIES.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-1.5">
                <Label htmlFor="cat-tagline" className="text-xs font-semibold">
                  Storefront Tagline
                </Label>
                <Input
                  id="cat-tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Double cleansing rituals for ultra-pure Japanese glass skin"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="cat-desc" className="text-xs font-semibold">
                  Detailed Description (SEO & Storefront Header)
                </Label>
                <Textarea
                  id="cat-desc"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the skin benefits, Japanese formulations, and usage advice..."
                />
              </div>

              {/* Image URL & Live Preview */}
              <div className="space-y-2">
                <Label htmlFor="cat-img" className="text-xs font-semibold">
                  Category Card Image URL <span className="text-rose-500">*</span>
                </Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="cat-img"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    required
                    className="flex-1"
                  />
                  {image && (
                    <div className="relative h-10 w-14 rounded-md border border-border overflow-hidden bg-muted shrink-0">
                      <img
                        src={image}
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
                  <span className="text-[10px] text-muted-foreground">Quick Presets:</span>
                  {DEFAULT_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImage(img)}
                      className="text-[10px] text-primary hover:underline"
                    >
                      Preset {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategories Tag Builder */}
              <div className="space-y-2 rounded-xl border border-border/80 bg-secondary/30 p-3.5">
                <Label className="text-xs font-semibold flex items-center justify-between">
                  <span>Subcategories Pills ({subcategories.length})</span>
                  <span className="text-[10px] font-normal text-muted-foreground">
                    Type name and click Add
                  </span>
                </Label>

                <div className="flex gap-2">
                  <Input
                    value={newSubcatInput}
                    onChange={(e) => setNewSubcatInput(e.target.value)}
                    placeholder="e.g. Foam Cleansers, Oil Cleansers..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSubcat();
                      }
                    }}
                    className="bg-background text-xs"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={handleAddSubcat}
                    className="text-xs shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {subcategories.map((sub, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-2.5 py-1 text-xs font-medium text-foreground shadow-2xs"
                    >
                      <span>{sub}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubcat(sub)}
                        className="text-muted-foreground hover:text-rose-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {subcategories.length === 0 && (
                    <p className="text-xs italic text-muted-foreground">
                      No subcategories yet. Add specific filters like &quot;Balm Cleanser&quot;, &quot;Foam&quot;, &quot;Gel&quot;.
                    </p>
                  )}
                </div>
              </div>

              {/* Options: Featured & Stock count */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <Label htmlFor="cat-feat" className="text-xs font-semibold">
                      Featured Category
                    </Label>
                    <p className="text-[11px] text-muted-foreground">
                      Display prominently in homepage grid
                    </p>
                  </div>
                  <Switch
                    id="cat-feat"
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cat-count" className="text-xs font-semibold">
                    Product Count
                  </Label>
                  <Input
                    id="cat-count"
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
                {editingCategory ? "Save Category Changes" : "Create & Publish Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              <span>Delete Category</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{categoryToDelete?.title}</strong>?
              This action cannot be undone and will detach {categoryToDelete?.subcategories.length} subcategories.
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


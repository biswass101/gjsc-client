"use client";

import React, { useState, useMemo } from "react";
import {
  Award,
  Plus,
  Search,
  Edit2,
  Trash2,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useAdmin, AdminBrand } from "@/context/admin-context";
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

const ORIGIN_CITIES = [
  "Tokyo, Japan",
  "Osaka, Japan",
  "Kyoto, Japan",
  "Kobe, Japan",
  "Yokohama, Japan",
  "Nagoya, Japan",
];

const BRAND_CATEGORIES = [
  "Prestige Skincare",
  "Dermatological / Medical",
  "Everyday Sun Care",
  "Luxury Anti-Aging",
  "Clean Herbal",
  "Salon Hair Care",
];

const DEFAULT_LOGOS = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1608248597359-299318b7623a?w=300&auto=format&fit=crop&q=80",
];

export default function AdminBrandsPage() {
  const { brands, addBrand, updateBrand, deleteBrand } = useAdmin();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<AdminBrand | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [kanji, setKanji] = useState("");
  const [origin, setOrigin] = useState(ORIGIN_CITIES[0] || "Tokyo, Japan");
  const [established, setEstablished] = useState("1980");
  const [category, setCategory] = useState(BRAND_CATEGORIES[0] || "Prestige Skincare");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(DEFAULT_LOGOS[0] || "");
  const [bannerImage, setBannerImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [itemCount, setItemCount] = useState("15");

  // Delete Alert
  const [brandToDelete, setBrandToDelete] = useState<AdminBrand | null>(null);

  // Filtered brands
  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        brand.name.toLowerCase().includes(q) ||
        (brand.kanji && brand.kanji.toLowerCase().includes(q)) ||
        brand.tagline.toLowerCase().includes(q) ||
        brand.origin.toLowerCase().includes(q);

      const matchesOrigin =
        selectedOrigin === "all" ||
        brand.origin.toLowerCase().includes(selectedOrigin.toLowerCase());

      return matchesSearch && matchesOrigin;
    });
  }, [brands, searchQuery, selectedOrigin]);

  // Statistics
  const featuredCount = useMemo(
    () => brands.filter((b) => b.featured).length,
    [brands]
  );
  const tokyoBrandsCount = useMemo(
    () => brands.filter((b) => b.origin.toLowerCase().includes("tokyo")).length,
    [brands]
  );
  const totalProducts = useMemo(
    () => brands.reduce((sum, b) => sum + b.itemCount, 0),
    [brands]
  );

  const openCreateModal = () => {
    setEditingBrand(null);
    setName("");
    setSlug("");
    setKanji("");
    setOrigin(ORIGIN_CITIES[0] || "Tokyo, Japan");
    setEstablished("1980");
    setCategory(BRAND_CATEGORIES[0] || "Prestige Skincare");
    setTagline("");
    setDescription("");
    setLogo(DEFAULT_LOGOS[Math.floor(Math.random() * DEFAULT_LOGOS.length)] || "");
    setBannerImage("");
    setFeatured(false);
    setItemCount("12");
    setIsModalOpen(true);
  };

  const openEditModal = (brand: AdminBrand) => {
    setEditingBrand(brand);
    setName(brand.name);
    setSlug(brand.slug);
    setKanji(brand.kanji || "");
    setOrigin(brand.origin);
    setEstablished(brand.established || "1980");
    setCategory(brand.category);
    setTagline(brand.tagline);
    setDescription(brand.description);
    setLogo(brand.logo);
    setBannerImage(brand.bannerImage || "");
    setFeatured(brand.featured);
    setItemCount(String(brand.itemCount));
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingBrand) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      );
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Brand name is required.");
      return;
    }
    if (!slug.trim()) {
      toast.error("Slug identifier is required.");
      return;
    }

    if (editingBrand) {
      updateBrand(editingBrand.id, {
        name: name.trim(),
        slug: slug.trim(),
        kanji: kanji.trim() || undefined,
        origin,
        established: established.trim() || undefined,
        category,
        tagline: tagline.trim() || "Pioneering Japanese Skincare Science",
        description: description.trim() || "Authentic Tokyo formulation and clinical research.",
        logo: logo.trim() || DEFAULT_LOGOS[0] || "",
        bannerImage: bannerImage.trim() || undefined,
        featured,
        itemCount: parseInt(itemCount, 10) || 0,
      });
      toast.success(`Brand "${name}" updated successfully! 🌸`);
    } else {
      addBrand({
        name: name.trim(),
        slug: slug.trim(),
        kanji: kanji.trim() || undefined,
        origin,
        established: established.trim() || undefined,
        category,
        tagline: tagline.trim() || "Pioneering Japanese Skincare Science",
        description: description.trim() || "Authentic Tokyo formulation and clinical research.",
        logo: logo.trim() || DEFAULT_LOGOS[0] || "",
        bannerImage: bannerImage.trim() || undefined,
        featured,
        itemCount: parseInt(itemCount, 10) || 0,
      });
      toast.success(`Brand "${name}" added to brand house! 🌸`);
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!brandToDelete) return;
    deleteBrand(brandToDelete.id);
    toast.success(`Brand "${brandToDelete.name}" deleted.`);
    setBrandToDelete(null);
  };

  const handleToggleFeatured = (brand: AdminBrand) => {
    updateBrand(brand.id, { featured: !brand.featured });
    toast.success(
      `Brand "${brand.name}" ${!brand.featured ? "highlighted as Featured" : "removed from Featured"}.`
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
            <span className="text-primary font-bold">Japanese Brand House</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">
            Brand Directory & Heritage
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage official Japanese brand partners, Tokyo origins, Kanji typography, authenticity badges, and catalog counts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={openCreateModal}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Add Brand Profile</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Total Brands</span>
            <Award className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {brands.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Official Japanese cosmetics houses
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Tokyo Origins</span>
            <MapPin className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {tokyoBrandsCount}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Tokyo prefecture headquarters
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Featured Brands</span>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {featuredCount}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Highlighted on homepage carousel
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Total Catalog SKUs</span>
            <Layers className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {totalProducts}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Verified authentic products
          </p>
        </div>
      </div>

      {/* Search & Origin Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-card p-3 rounded-xl border border-border/70">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search brand name, kanji, origin city..."
            className="pl-9 bg-background/60"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Button
            variant={selectedOrigin === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedOrigin("all")}
            className="text-xs shrink-0"
          >
            All Origins ({brands.length})
          </Button>
          {["Tokyo", "Osaka", "Kyoto"].map((city) => {
            const count = brands.filter((b) =>
              b.origin.toLowerCase().includes(city.toLowerCase())
            ).length;
            return (
              <Button
                key={city}
                variant={selectedOrigin.toLowerCase() === city.toLowerCase() ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedOrigin(city)}
                className="text-xs shrink-0"
              >
                {city} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Brands Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            className="group relative flex flex-col rounded-xl border border-border/80 bg-card p-5 shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200"
          >
            {/* Header with Logo and Kanji */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 rounded-xl border border-border/80 overflow-hidden bg-muted p-1 shrink-0 shadow-2xs">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80";
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">
                      {brand.name}
                    </h3>
                    {brand.featured && (
                      <span title="Featured Brand" className="text-amber-500">
                        <Sparkles className="h-3.5 w-3.5 fill-amber-500" />
                      </span>
                    )}
                  </div>
                  {brand.kanji && (
                    <span className="font-mono text-xs font-semibold text-muted-foreground tracking-wider">
                      {brand.kanji}
                    </span>
                  )}
                </div>
              </div>

              <Badge variant="outline" className="text-[11px] font-semibold bg-muted/50 shrink-0">
                {brand.itemCount} SKUs
              </Badge>
            </div>

            {/* Origin & Est info pills */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-4 pt-3 border-t border-border/60">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate">{brand.origin}</span>
              </div>
              {brand.established && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span>Est. {brand.established}</span>
                </div>
              )}
            </div>

            {/* Tagline & Description */}
            <div className="my-3 space-y-1 flex-1">
              <p className="text-xs font-semibold text-primary line-clamp-1">
                {brand.tagline}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {brand.description}
              </p>
            </div>

            {/* Category tag */}
            <div className="mb-4">
              <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                {brand.category}
              </span>
            </div>

            {/* Footer with Featured toggle & Action Buttons */}
            <div className="pt-3 border-t border-border/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Featured:</span>
                <Switch
                  checked={brand.featured}
                  onCheckedChange={() => handleToggleFeatured(brand)}
                />
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(brand)}
                  className="h-8 gap-1.5 text-xs"
                >
                  <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Edit</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBrandToDelete(brand)}
                  className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBrands.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
          <Award className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
          <h3 className="font-bold text-foreground text-lg">No Brands Found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            Try adjusting your search query or add a new Japanese cosmetic brand.
          </p>
          <Button onClick={openCreateModal} className="mt-4 gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Brand Profile</span>
          </Button>
        </div>
      )}

      {/* Add / Edit Brand Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-display text-xl">
                <Award className="h-5 w-5 text-primary" />
                <span>{editingBrand ? "Edit Brand Profile" : "Register Japanese Brand"}</span>
              </DialogTitle>
              <DialogDescription>
                Manage authentic Japanese skincare manufacturers, logos, origins, and heritage descriptions.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Brand Name & Kanji */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="brand-name" className="text-xs font-semibold">
                    Brand Name <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="brand-name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Shiseido, Hada Labo, Rohto"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="brand-kanji" className="text-xs font-semibold">
                    Japanese Kanji / Kana
                  </Label>
                  <Input
                    id="brand-kanji"
                    value={kanji}
                    onChange={(e) => setKanji(e.target.value)}
                    placeholder="e.g. 資生堂, 肌ラボ"
                  />
                </div>
              </div>

              {/* Slug & Origin */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="brand-slug" className="text-xs font-semibold">
                    URL Slug Identifier <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="brand-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. shiseido"
                    required
                  />
                  <span className="text-[10px] text-muted-foreground">
                    Storefront route: /brands/{slug || "slug"}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="brand-origin" className="text-xs font-semibold">
                    City / Prefecture of Origin
                  </Label>
                  <Select value={origin} onValueChange={setOrigin}>
                    <SelectTrigger id="brand-origin">
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORIGIN_CITIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Category & Established Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="brand-cat" className="text-xs font-semibold">
                    Primary Brand Category
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="brand-cat">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {BRAND_CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="brand-est" className="text-xs font-semibold">
                    Year Established
                  </Label>
                  <Input
                    id="brand-est"
                    value={established}
                    onChange={(e) => setEstablished(e.target.value)}
                    placeholder="e.g. 1872 or 2004"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-1.5">
                <Label htmlFor="brand-tagline" className="text-xs font-semibold">
                  Official Brand Motto / Tagline
                </Label>
                <Input
                  id="brand-tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. 150 Years of Ginza Tokyo Skincare Excellence"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="brand-desc" className="text-xs font-semibold">
                  Brand Heritage & Description
                </Label>
                <Textarea
                  id="brand-desc"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the company's patent formulations, active ingredients, and dermatological standards..."
                />
              </div>

              {/* Logo URL & Live Preview */}
              <div className="space-y-2">
                <Label htmlFor="brand-logo" className="text-xs font-semibold">
                  Brand Logo Image URL <span className="text-rose-500">*</span>
                </Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="brand-logo"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    required
                    className="flex-1"
                  />
                  {logo && (
                    <div className="relative h-10 w-14 rounded-md border border-border overflow-hidden bg-muted shrink-0">
                      <img
                        src={logo}
                        alt="Preview"
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Options: Featured & Stock count */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <Label htmlFor="brand-feat" className="text-xs font-semibold">
                      Featured Brand
                    </Label>
                    <p className="text-[11px] text-muted-foreground">
                      Feature on storefront brand strip
                    </p>
                  </div>
                  <Switch
                    id="brand-feat"
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="brand-count" className="text-xs font-semibold">
                    Product Catalog Count
                  </Label>
                  <Input
                    id="brand-count"
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
                {editingBrand ? "Save Brand Changes" : "Register Brand"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog
        open={!!brandToDelete}
        onOpenChange={(open) => !open && setBrandToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-rose-600 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              <span>Delete Brand</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{brandToDelete?.name}</strong>?
              This brand will be removed from storefront directories and product listings.
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


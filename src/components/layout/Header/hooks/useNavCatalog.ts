"use client";

import { useMemo } from "react";
import {
  Gem,
  Sparkles,
  Leaf,
  Star,
  Shield,
  Globe,
  Scissors,
  Baby,
  Package,
  Search,
  Home,
  Gift,
  Truck,
  Grid,
  type LucideIcon,
} from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import type { DropdownItem } from "../DesktopNav/shared/DropdownColumn";
import {
  categories as fallbackCategories,
  featured as fallbackFeatured,
  brands as fallbackBrands,
  featuredBrands as fallbackFeaturedBrands,
} from "../DesktopNav/dropdownData";
import {
  collections as fallbackCollections,
  moreCollections as fallbackMoreCollections,
} from "../DesktopNav/DropDowns/CollectionsDropdown";
import { slugify } from "@/lib/catalog";

function getCategoryIcon(name: string): LucideIcon {
  const lower = name.toLowerCase();
  if (lower.includes("sun") || lower.includes("uv") || lower.includes("shield")) return Shield;
  if (lower.includes("hair")) return Scissors;
  if (lower.includes("body") || lower.includes("baby")) return Baby;
  if (lower.includes("clean") || lower.includes("wash")) return Search;
  if (lower.includes("serum") || lower.includes("essence")) return Package;
  if (lower.includes("cream") || lower.includes("moistur")) return Sparkles;
  if (lower.includes("mask")) return Gem;
  if (lower.includes("toner")) return Home;
  return Leaf;
}

function getCollectionIcon(name: string): LucideIcon {
  const lower = name.toLowerCase();
  if (lower.includes("best") || lower.includes("star")) return Star;
  if (lower.includes("new") || lower.includes("glow")) return Sparkles;
  if (lower.includes("gift") || lower.includes("set") || lower.includes("combo")) return Gift;
  if (lower.includes("concern") || lower.includes("skin")) return Search;
  if (lower.includes("shein") || lower.includes("shield")) return Shield;
  if (lower.includes("order") || lower.includes("japan") || lower.includes("tokyo")) return Globe;
  if (lower.includes("travel") || lower.includes("air")) return Truck;
  return Package;
}

export function useNavCatalog() {
  const { categories: adminCategories, collections: adminCollections, brands: adminBrands } =
    useAdmin();

  // 1. Categories
  const { categories, featuredCategories } = useMemo(() => {
    if (!adminCategories || adminCategories.length === 0) {
      return {
        categories: fallbackCategories,
        featuredCategories: fallbackFeatured,
      };
    }

    const catItems: DropdownItem[] = adminCategories.map((c) => ({
      label: c.title,
      category: c.slug || slugify(c.title),
      icon: getCategoryIcon(c.title),
      image: c.image || undefined,
      iconClassName: "text-primary",
    }));

    // Featured column: either categories with featured=true or distinct subcategories
    const featuredList = adminCategories.filter((c) => c.featured);
    const subcats = Array.from(new Set(adminCategories.flatMap((c) => c.subcategories || [])));

    let featItems: DropdownItem[] = [];
    if (featuredList.length > 0) {
      featItems = featuredList.map((c) => ({
        label: c.title,
        category: c.slug || slugify(c.title),
        icon: Sparkles,
        image: c.image || undefined,
        iconClassName: "text-primary",
      }));
    }

    if (featItems.length < 6 && subcats.length > 0) {
      const needed = 6 - featItems.length;
      const extraSubcats = subcats.slice(0, needed).map((sub) => ({
        label: sub,
        category: slugify(sub),
        icon: getCategoryIcon(sub),
        iconClassName: "text-primary",
      }));
      featItems = [...featItems, ...extraSubcats];
    }

    return {
      categories: catItems.length > 0 ? catItems : fallbackCategories,
      featuredCategories: featItems.length > 0 ? featItems : fallbackFeatured,
    };
  }, [adminCategories]);

  // 2. Collections
  const { collections, moreCollections, allCollections } = useMemo(() => {
    if (!adminCollections || adminCollections.length === 0) {
      return {
        collections: fallbackCollections,
        moreCollections: fallbackMoreCollections,
        allCollections: [...fallbackCollections, ...fallbackMoreCollections],
      };
    }

    const items: DropdownItem[] = adminCollections.map((col) => ({
      label: col.title,
      category: col.slug || slugify(col.title),
      icon: getCollectionIcon(col.title),
      image: col.bannerImage || undefined,
      iconClassName: "text-primary",
    }));

    const midpoint = Math.ceil(items.length / 2);
    const primary = items.slice(0, Math.max(midpoint, 4));
    const secondary = items.slice(Math.max(midpoint, 4));

    return {
      collections: primary.length > 0 ? primary : fallbackCollections,
      moreCollections: secondary.length > 0 ? secondary : fallbackMoreCollections,
      allCollections: items,
    };
  }, [adminCollections]);

  // 3. Brands
  const { brands, featuredBrands, allBrands } = useMemo(() => {
    if (!adminBrands || adminBrands.length === 0) {
      return {
        brands: fallbackBrands,
        featuredBrands: fallbackFeaturedBrands,
        allBrands: fallbackBrands,
      };
    }

    const allMapped: DropdownItem[] = adminBrands.map((b) => ({
      label: b.name,
      category: b.slug || slugify(b.name),
      icon: Gem,
      image: b.logo || b.bannerImage || undefined,
      iconClassName: "text-primary",
    }));

    const featured = adminBrands.filter((b) => b.featured);
    const featuredMapped: DropdownItem[] =
      featured.length > 0
        ? featured.map((b) => ({
            label: b.name,
            category: b.slug || slugify(b.name),
            icon: Sparkles,
            image: b.logo || b.bannerImage || undefined,
            iconClassName: "text-primary",
          }))
        : allMapped.slice(0, 5);

    return {
      brands: allMapped,
      featuredBrands: featuredMapped,
      allBrands: allMapped,
    };
  }, [adminBrands]);

  return {
    categories,
    featuredCategories,
    rawCategories: adminCategories,
    collections,
    moreCollections,
    allCollections,
    rawCollections: adminCollections,
    brands,
    featuredBrands,
    allBrands,
    rawBrands: adminBrands,
  };
}


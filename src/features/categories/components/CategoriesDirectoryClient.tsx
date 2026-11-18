"use client";

import { useMemo, useState } from "react";
import { Link } from "@/lib/navigation";
import { Layout, GoToTop } from "@/components/layout";
import { useAdmin } from "@/context/admin-context";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_DIRECTORY } from "../data/categoryDirectoryData";
import { CategoryDirectoryHero } from "./CategoryDirectoryHero";
import { LayeringRitualRibbon } from "./LayeringRitualRibbon";
import { CategoryDirectoryCard, type UnifiedCategoryCardItem } from "./CategoryDirectoryCard";
import { CategoryAssuranceBanner } from "./CategoryAssuranceBanner";

export function CategoriesDirectoryClient() {
  const { categories: adminCategories } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");

  const displayCategories: UnifiedCategoryCardItem[] = useMemo(() => {
    if (adminCategories && adminCategories.length > 0) {
      return adminCategories.map((c) => ({
        id: c.id,
        name: c.title,
        title: c.title,
        slug: c.slug,
        kanji: c.japaneseTitle || "",
        japaneseTitle: c.japaneseTitle || "",
        department: c.parentCategory || "Skincare",
        parentCategory: c.parentCategory || "Skincare",
        tagline: c.tagline || c.description || "",
        description: c.description || "",
        icon: c.icon || "Sparkles",
        image: c.image || "",
        bannerImage: c.bannerImage || "",
        popularTags: c.popularTags || [],
        ritualStep: c.ritualStep || null,
        featured: c.featured,
        itemCount: c.itemCount,
      }));
    }
    return [];
  }, [adminCategories]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      map[cat] = PRODUCTS.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
    });
    displayCategories.forEach((c) => {
      const name = c.name || c.title || "";
      if (!map[name]) {
        map[name] = (c as any).itemCount || 4;
      }
    });
    return map;
  }, [displayCategories]);

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return displayCategories.filter((item) => {
      const dept = item.department || (item as any).parentCategory || "";
      if (selectedDepartment !== "All" && dept !== selectedDepartment) {
        return false;
      }

      if (query) {
        const name = (item.name || item.title || "").toLowerCase();
        const kanji = (item.kanji || item.japaneseTitle || "").toLowerCase();
        const tagline = (item.tagline || item.description || "").toLowerCase();
        const matchesTags = (item.popularTags || []).some((t) => t.toLowerCase().includes(query));
        const matchesDept = dept.toLowerCase().includes(query);
        if (!name.includes(query) && !kanji.includes(query) && !tagline.includes(query) && !matchesTags && !matchesDept) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedDepartment, displayCategories]);

  const departments = useMemo(() => {
    const set = new Set<string>();
    displayCategories.forEach((c) => {
      const dept = c.department || (c as any).parentCategory;
      if (dept) set.add(dept);
    });
    return ["All", ...Array.from(set)];
  }, [displayCategories]);

  return (
    <Layout>
      <CategoryDirectoryHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <LayeringRitualRibbon />

      {/* Sticky Department Filter Tabs */}
      <div className="sticky top-16 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md shadow-2xs py-2.5 sm:py-3 transition-all">
        <div className="container-lux">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mr-1 hidden sm:inline shrink-0">
              Department:
            </span>

            {departments.map((dept) => {
              const active = selectedDepartment === dept;
              const deptCount =
                dept === "All"
                  ? CATEGORY_DIRECTORY.length
                  : CATEGORY_DIRECTORY.filter((c) => c.department === dept).length;

              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDepartment(dept)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                    active
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {dept}
                  <span
                    className={cn(
                      "ml-1.5 text-[10px]",
                      active ? "text-primary-foreground/80" : "text-muted-foreground",
                    )}
                  >
                    ({deptCount})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Category Cards Grid */}
      <main className="container-lux py-10 sm:py-16">
        <div className="mb-6 sm:mb-8 flex items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">{filteredCategories.length}</span>{" "}
            Japanese categories
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <span>View All Regular Products</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border border-border p-8">
            <Search className="mx-auto h-12 w-12 text-muted-foreground/60" />
            <h3 className="mt-4 font-display text-xl font-semibold">No Categories Found</h3>
            <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
              We couldn't find any Japanese category matching "{searchQuery}". Try searching for
              another term or reset your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedDepartment("All");
              }}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredCategories.map((item) => {
              const catKey = item.name || item.title || "Category";
              return (
                <CategoryDirectoryCard
                  key={item.slug || catKey}
                  item={item}
                  count={counts[catKey] ?? 4}
                />
              );
            })}
          </div>
        )}

        <CategoryAssuranceBanner />
      </main>

      <GoToTop />
    </Layout>
  );
}

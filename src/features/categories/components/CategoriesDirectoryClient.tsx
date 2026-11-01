"use client";

import { useMemo, useState } from "react";
import { Link } from "@/lib/navigation";
import { Layout, GoToTop } from "@/components/layout";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_DIRECTORY } from "../data/categoryDirectoryData";
import { CategoryDirectoryHero } from "./CategoryDirectoryHero";
import { LayeringRitualRibbon } from "./LayeringRitualRibbon";
import { CategoryDirectoryCard } from "./CategoryDirectoryCard";
import { CategoryAssuranceBanner } from "./CategoryAssuranceBanner";

export function CategoriesDirectoryClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      map[cat] = PRODUCTS.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
    });
    CATEGORY_DIRECTORY.forEach((c) => {
      if (!map[c.name]) map[c.name] = 4;
    });
    return map;
  }, []);

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return CATEGORY_DIRECTORY.filter((item) => {
      if (selectedDepartment !== "All" && item.department !== selectedDepartment) {
        return false;
      }

      if (query) {
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesKanji = item.kanji.toLowerCase().includes(query);
        const matchesTagline = item.tagline.toLowerCase().includes(query);
        const matchesTags = item.popularTags.some((t) => t.toLowerCase().includes(query));
        const matchesDept = item.department.toLowerCase().includes(query);
        if (!matchesName && !matchesKanji && !matchesTagline && !matchesTags && !matchesDept) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedDepartment]);

  const departments = useMemo(() => {
    const set = new Set<string>();
    CATEGORY_DIRECTORY.forEach((c) => set.add(c.department));
    return ["All", ...Array.from(set)];
  }, []);

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
            {filteredCategories.map((item) => (
              <CategoryDirectoryCard
                key={item.name}
                item={item}
                count={counts[item.name] ?? 4}
              />
            ))}
          </div>
        )}

        <CategoryAssuranceBanner />
      </main>

      <GoToTop />
    </Layout>
  );
}

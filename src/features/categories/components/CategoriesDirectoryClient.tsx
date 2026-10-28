"use client";

import { useMemo, useState } from "react";
import { Link } from "@/lib/navigation";
import { Layout, GoToTop } from "@/components/layout";
import {
  CATEGORIES,
  CATEGORY_GROUPS,
  PRODUCTS,
  PRODUCT_IMAGES,
  slugify,
} from "@/lib/catalog";
import {
  Beaker,
  Droplets,
  Eye,
  Gift,
  Layers,
  Leaf,
  Package,
  Palette,
  Scissors,
  Shield,
  ShoppingBag,
  Smile,
  Sparkles,
  Sunrise,
  Wind,
  Zap,
  Search,
  ArrowRight,
  Sparkle,
  Compass,
  CheckCircle2,
  ChevronRight,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryDetail {
  name: string;
  kanji: string;
  department: string;
  tagline: string;
  icon: React.ElementType;
  image: string;
  popularTags: string[];
  ritualStep?: {
    step: string;
    label: string;
  };
}

const CATEGORY_DIRECTORY: CategoryDetail[] = [
  {
    name: "Serum",
    kanji: "美容液",
    department: "Skincare",
    tagline: "Concentrated bioactive formulas delivering glass-skin radiance and dark spot correction.",
    icon: Zap,
    image: PRODUCT_IMAGES[0]!,
    popularTags: ["Sakura Serum", "Niacinamide", "Vitamin C", "Peptides"],
    ritualStep: { step: "Step 04", label: "Treat & Brighten" },
  },
  {
    name: "Sunscreen",
    kanji: "日焼け止め",
    department: "Skincare",
    tagline: "Japan's #1 SPF50+ PA++++ weightless watery defense with zero white cast or grease.",
    icon: Sunrise,
    image: PRODUCT_IMAGES[5]!,
    popularTags: ["Water Gel SPF50", "Mermaid Gel", "Thermo Booster"],
    ritualStep: { step: "Step 05", label: "UV Barrier Shield" },
  },
  {
    name: "Toner",
    kanji: "化粧水",
    department: "Skincare",
    tagline: "Japan's signature watery lotions that drench the skin barrier and balance pH.",
    icon: Layers,
    image: PRODUCT_IMAGES[2]!,
    popularTags: ["Hyaluronic Lotion", "Hatomugi", "Matcha Water", "Aqua Shield"],
    ritualStep: { step: "Step 03", label: "Hydrate & Prep" },
  },
  {
    name: "Cleanser",
    kanji: "クレンジング",
    department: "Skincare",
    tagline: "Melts away waterproof makeup, excess sebum, and SPF without stripping natural lipids.",
    icon: Beaker,
    image: PRODUCT_IMAGES[4]!,
    popularTags: ["Deep Cleansing Oil", "Cleansing Balm", "Micellar Water"],
    ritualStep: { step: "Step 01", label: "Oil Cleanse" },
  },
  {
    name: "Face Wash",
    kanji: "洗顔料",
    department: "Skincare",
    tagline: "Micro-dense whipped foam cleansers that cushion skin and purify pores gently.",
    icon: Droplets,
    image: PRODUCT_IMAGES[6]!,
    popularTags: ["Dense Foam Wash", "Low-pH Wash", "Enzyme Powder"],
    ritualStep: { step: "Step 02", label: "Micro-Foam Wash" },
  },
  {
    name: "Moisturizer",
    kanji: "乳液・クリーム",
    department: "Skincare",
    tagline: "Slow-fermented rice and biomimetic ceramide creams locking in 72-hour moisture.",
    icon: Smile,
    image: PRODUCT_IMAGES[1]!,
    popularTags: ["Ceramide Cream", "Aqua Gel", "Night Emulsion"],
    ritualStep: { step: "Step 05", label: "Moisture Lock" },
  },
  {
    name: "Essence",
    kanji: "エッセンス",
    department: "Skincare",
    tagline: "Deeply penetrating fermented yeast and botanical extracts for crystal-clear skin.",
    icon: Sparkles,
    image: PRODUCT_IMAGES[3]!,
    popularTags: ["Pitera Ferment", "Yuzu Extract", "Sake Koji Water"],
  },
  {
    name: "Face Mask",
    kanji: "フェイスマスク",
    department: "Skincare",
    tagline: "15-minute intensive hydration sheet masks and brightening rice wash-off packs.",
    icon: Palette,
    image: PRODUCT_IMAGES[7]!,
    popularTags: ["Daily LuLuLun", "Rice Serum Mask", "Gold Infusion"],
  },
  {
    name: "Eye Care",
    kanji: "アイクリーム",
    department: "Skincare",
    tagline: "Delicate brightening pearl extracts and retinol eye creams for smooth contours.",
    icon: Eye,
    image: PRODUCT_IMAGES[8]!,
    popularTags: ["Pearl Eye Cream", "Retinol Care", "Hydra Depuff"],
  },
  {
    name: "Lip Care",
    kanji: "リップケア",
    department: "Skincare",
    tagline: "Nourishing cherry blossom butters, camellia oils, and melty overnight balms.",
    icon: Leaf,
    image: PRODUCT_IMAGES[9]!,
    popularTags: ["Melty Lip Balm", "Sakura Petal Butter", "Lip Scrub"],
  },
  {
    name: "Hair Care",
    kanji: "ヘアケア",
    department: "Hair",
    tagline: "Pure Oshima camellia seed oils, Fino royal jelly masks, and salon scalp tonics.",
    icon: Wind,
    image: PRODUCT_IMAGES[10]!,
    popularTags: ["Fino Hair Mask", "Tsubaki Camellia Oil", "Scalp Purifying"],
  },
  {
    name: "Body Care",
    kanji: "ボディケア",
    department: "Body",
    tagline: "Onsen thermal hot spring body washes, Hinoki cypress milks, and ceramide lotions.",
    icon: Shield,
    image: PRODUCT_IMAGES[11]!,
    popularTags: ["Bouncia Foam", "Hinoki Body Wash", "Ceramide Lotion"],
  },
  {
    name: "Makeup",
    kanji: "メイクアップ",
    department: "Makeup",
    tagline: "Breathable dewy cushions, waterproof tubing mascaras, and watercolor cheek tints.",
    icon: Package,
    image: PRODUCT_IMAGES[12]!,
    popularTags: ["Cushion Foundation", "Waterproof Mascara", "Dewy Blush"],
  },
  {
    name: "Baby Care",
    kanji: "ベビーケア",
    department: "Baby Care",
    tagline: "Pediatrician-tested hypoallergenic washes and ceramide milks for delicate infant skin.",
    icon: Smile,
    image: PRODUCT_IMAGES[13]!,
    popularTags: ["Pigeon Foam Wash", "Baby Ceramide Milk", "Tear-Free"],
  },
  {
    name: "Beauty Accessories",
    kanji: "美容小物",
    department: "Accessories",
    tagline: "Handcrafted natural Konjac sponges, jade gua sha, and 100% pure Hiroshima cotton.",
    icon: Scissors,
    image: PRODUCT_IMAGES[14]!,
    popularTags: ["Konjac Sponge", "Mulberry Silk", "Unbleached Cotton"],
  },
  {
    name: "Gift Sets",
    kanji: "ギフトセット",
    department: "Gifts & Kits",
    tagline: "Curated Japanese discovery boxes, full 4-step skincare rituals, and luxury gifts.",
    icon: Gift,
    image: PRODUCT_IMAGES[15]!,
    popularTags: ["Full Ritual Box", "Discovery Trio", "Bestseller Kit"],
  },
  {
    name: "Travel Kits",
    kanji: "トラベルキット",
    department: "Gifts & Kits",
    tagline: "TSA-approved Japanese beauty miniatures designed for on-the-go glowing skin.",
    icon: ShoppingBag,
    image: PRODUCT_IMAGES[1]!,
    popularTags: ["Travel Essentials", "Mini 4-Step Set", "Pouch Ready"],
  },
];

const J_BEAUTY_STEPS = [
  {
    step: "01",
    name: "Cleansing",
    japanese: "クレンジング",
    action: "Oil Cleanse",
    categorySlug: "cleanser",
    desc: "Dissolve waterproof SPF & makeup without friction.",
  },
  {
    step: "02",
    name: "Face Wash",
    japanese: "洗顔料",
    action: "Micro-Foam",
    categorySlug: "face-wash",
    desc: "Dense cloud-like bubbles sweep impurities from pores.",
  },
  {
    step: "03",
    name: "Lotion / Toner",
    japanese: "化粧水",
    action: "Hydrate & Prep",
    categorySlug: "toner",
    desc: "Drench the skin barrier with watery hyaluronic hydration.",
  },
  {
    step: "04",
    name: "Serum & Essence",
    japanese: "美容液",
    action: "Target & Brighten",
    categorySlug: "serum",
    desc: "Bioactive Sakura and Vitamin C for glass-skin glow.",
  },
  {
    step: "05",
    name: "Moisturizer & SPF",
    japanese: "乳液 · UV",
    action: "Seal & Protect",
    categorySlug: "sunscreen",
    desc: "Lock in moisture with ceramides & block UV rays.",
  },
];

export function CategoriesDirectoryClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");

  // Calculate live product counts per category
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      map[cat] = PRODUCTS.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
    });
    // Add defaults if low count
    CATEGORY_DIRECTORY.forEach((c) => {
      if (!map[c.name]) map[c.name] = 4;
    });
    return map;
  }, []);

  // Filtered categories
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return CATEGORY_DIRECTORY.filter((item) => {
      // Department filter
      if (selectedDepartment !== "All" && item.department !== selectedDepartment) {
        return false;
      }

      // Search query filter
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

  // Unique departments for tabs
  const departments = useMemo(() => {
    const set = new Set<string>();
    CATEGORY_DIRECTORY.forEach((c) => set.add(c.department));
    return ["All", ...Array.from(set)];
  }, []);

  return (
    <Layout>
      {/* 1. Page Header & Hero */}
      <div className="relative overflow-hidden border-b border-border bg-linear-to-b from-cream/60 via-cream/30 to-background py-10 sm:py-14">
        <div className="container-lux">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-foreground font-medium">Categories</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>JAPANESE BEAUTY DIRECTORY · カテゴリー一覧</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Shop by Category & Rituals
            </h1>

            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Explore authentic Japanese skincare, haircare, and cosmetic formulations.
              Curated by formula type, targeted skin need, and traditional J-Beauty layering steps.
            </p>

            {/* Instant Real-Time Search Bar */}
            <div className="mt-6 relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories (e.g., serum, sunscreen, cleanser)..."
                className="w-full h-11 pl-10 pr-16 rounded-xl border border-border bg-background text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. J-Beauty "The 5-Step Layering Ritual" Interactive Ribbon */}
      <section className="border-b border-border/80 bg-cream/25 py-6 sm:py-8">
        <div className="container-lux">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-1.5 text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                <Sparkle className="h-3.5 w-3.5 text-primary" />
                <span>TRADITIONAL JAPANESE METHOD</span>
              </div>
              <h2 className="mt-0.5 font-display text-lg sm:text-xl font-bold tracking-tight text-foreground">
                The 5-Step J-Beauty Layering Ritual
              </h2>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm">
              Japanese beauty emphasizes gentle layering from lightest watery lotions to protective UV barriers.
            </p>
          </div>

          {/* 5 Step Interactive Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {J_BEAUTY_STEPS.map((s) => (
              <Link
                key={s.step}
                to={`/category/${s.categorySlug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/70 bg-card p-3 sm:p-3.5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-primary tracking-wider">
                      {s.step}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {s.japanese}
                    </span>
                  </div>

                  <h3 className="font-display text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {s.name}
                  </h3>

                  <span className="inline-block mt-1 text-[9px] font-semibold text-primary uppercase tracking-wider bg-primary/10 px-1.5 py-0.2 rounded-md">
                    {s.action}
                  </span>

                  <p className="mt-1.5 text-[10.5px] text-muted-foreground leading-tight line-clamp-2">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[10.5px] font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                  <span>Explore Step</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Sticky Department Filter Tabs */}
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
                      : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {dept}
                  <span className={cn("ml-1.5 text-[10px]", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    ({deptCount})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Main Category Cards Grid */}
      <main className="container-lux py-10 sm:py-16">
        {/* Results Counter & Regular Catalog Link */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredCategories.length}
            </span>{" "}
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

        {/* Empty State */}
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
              const Icon = item.icon;
              const count = counts[item.name] ?? 4;
              const categorySlug = slugify(item.name);

              return (
                <div
                  key={item.name}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
                >
                  <div>
                    {/* Visual Card Banner Image */}
                    <div className="relative aspect-16/9 w-full overflow-hidden bg-cream/70 border-b border-border/50">
                      <Link to={`/category/${categorySlug}`} className="block h-full w-full">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </Link>

                      {/* Kanji Pill Badge */}
                      <span className="absolute top-2 right-2 rounded-full bg-background/85 backdrop-blur-xs px-2 py-0.5 text-[10px] font-semibold text-foreground border border-border/50">
                        {item.kanji}
                      </span>

                      {/* Department Tag */}
                      <span className="absolute bottom-2 left-2 rounded-full bg-primary/90 text-primary-foreground text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 backdrop-blur-xs shadow-2xs">
                        {item.department}
                      </span>

                      {/* Ritual Step Pill if available */}
                      {item.ritualStep && (
                        <span className="absolute top-2 left-2 rounded-full bg-background/90 text-foreground text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 backdrop-blur-xs border border-border/60">
                          {item.ritualStep.step}
                        </span>
                      )}
                    </div>

                    {/* Card Content Area */}
                    <div className="p-4">
                      {/* Category Icon & Title */}
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          <Icon className="h-4 w-4" strokeWidth={1.75} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                            <Link to={`/category/${categorySlug}`}>
                              {item.name}
                            </Link>
                          </h3>
                          <span className="text-[11px] text-muted-foreground font-medium">
                            {count} Products
                          </span>
                        </div>
                      </div>

                      {/* Tagline */}
                      <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {item.tagline}
                      </p>

                      {/* Sub-Pills / Popular In Category */}
                      <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-border/50">
                        {item.popularTags.slice(0, 3).map((tag) => (
                          <Link
                            key={tag}
                            to={`/category/${categorySlug}`}
                            className="rounded-md bg-secondary/80 hover:bg-primary/10 hover:text-primary border border-border/60 px-2 py-0.5 text-[10px] font-medium text-foreground transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Link */}
                  <div className="p-4 pt-0">
                    <Link
                      to={`/category/${categorySlug}`}
                      className="w-full flex items-center justify-between rounded-xl bg-muted/50 hover:bg-primary hover:text-primary-foreground px-3 py-2 text-xs font-semibold text-foreground transition-all duration-200 group/btn"
                    >
                      <span>Explore Category</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 5. Bottom J-Beauty Assurance Banner */}
        <div className="mt-16 rounded-xl border border-border bg-linear-to-r from-cream via-background to-cream p-8 sm:p-12 text-center relative overflow-hidden shadow-xs">
          <div className="max-w-xl mx-auto relative z-10">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary">
              100% AUTHENTIC JAPANESE GUARANTEE
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Looking For A Customized Routine?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every formula in our directory is imported fresh from certified partner laboratories
              in Tokyo, Kyoto, and Osaka. Use our comprehensive catalog filters to find products tailored to your exact skin concern.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground uppercase tracking-wider hover:bg-primary/90 transition-all shadow-xs"
              >
                <span>Shop Full Catalog</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <Link
                to="/collections/skin-concern"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-2.5 text-xs font-bold text-foreground uppercase tracking-wider hover:bg-muted transition-all"
              >
                <span>Shop By Skin Concern</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Go To Top */}
      <GoToTop />
    </Layout>
  );
}


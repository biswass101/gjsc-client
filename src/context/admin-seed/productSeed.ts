import { PRODUCTS } from "@/lib/catalog";
import type { AdminProduct } from "@/types";

export function generateInitialProducts(): AdminProduct[] {
  return PRODUCTS.slice(0, 36).map((p, idx) => {
    const cost = Math.round(p.price * 0.62);
    const sku = `${p.brand.slice(0, 3).toUpperCase()}-${String(100 + idx).padStart(4, "0")}`;
    return {
      id: p.id || `prod-${idx + 1}`,
      slug: p.slug,
      name: p.name,
      japaneseName: `${p.brand} 公式 プレミアム処方`,
      brand: p.brand,
      category: p.category,
      productType: (p.type as AdminProduct["productType"]) || "in-stock",
      price: p.price,
      compareAt: p.compareAt || Math.round(p.price * 1.25),
      costPrice: cost,
      stock: p.stock ?? (idx % 7 === 0 ? 3 : idx % 11 === 0 ? 0 : 28 + ((idx * 3) % 45)),
      lowStockThreshold: 5,
      sku,
      barcode: `4580${String(10000000 + idx)}`,
      badge:
        (p.badge as AdminProduct["badge"]) ??
        (idx % 4 === 0 ? "Best Seller" : idx % 6 === 0 ? "Trending" : null),
      status: "active",
      rating: p.rating || 4.8,
      reviewsCount: p.reviews || 42,
      image: p.image,
      images: [p.image],
      short: p.short || "Authentic Japanese formulation imported directly from Tokyo.",
      description:
        p.description ||
        "Formulated with pure Japanese botanicals and cutting-edge barrier technologies.",
      ingredients: p.ingredients || [
        "Sakura Extract",
        "Rice Ferment Filtrate",
        "Camellia Oil",
        "Hyaluronic Acid",
      ],
      benefits: p.benefits || [
        "Deep 72-hour hydration",
        "Moisture barrier repair",
        "Visibly brighter skin tone",
      ],
      howTo:
        p.howTo ||
        "Dispense 2-3 drops onto clean fingertips. Gently press into face and neck until fully absorbed.",
      skinTypes: p.skinTypes || ["All Skin Types"],
      concerns: p.concerns || ["Hydration", "Barrier Support"],
      sizes: p.sizes || ["50ml"],
      origin: "Tokyo, Japan",
      texture: "Lightweight Essence",
      pao: "12M",
      spf: p.category === "Sunscreen" ? "SPF50+ PA++++" : undefined,
      createdAt: "2026-01-15",
      salesCount: 120 + ((idx * 17) % 200),
    };
  });
}

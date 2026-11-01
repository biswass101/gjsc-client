import { Package, DollarSign, FlaskConical, FileText, Image as ImageIcon } from "lucide-react";
import type { FormTabConfig } from "../types";

export const FORM_TABS: FormTabConfig[] = [
  { id: "identity", label: "Identity & Sourcing", icon: Package },
  { id: "pricing", label: "Pricing & Stock", icon: DollarSign },
  { id: "science", label: "Skincare Science", icon: FlaskConical },
  { id: "ritual", label: "Ritual & Copy", icon: FileText },
  { id: "media", label: "Media & Gallery", icon: ImageIcon },
];

export const POPULAR_INGREDIENTS = [
  "Rice Ferment Filtrate",
  "Hyaluronic Acid (5 Molecular Weights)",
  "Niacinamide (5%)",
  "Camellia Japonica Seed Oil",
  "Tranexamic Acid",
  "Ceramide NP & AP",
  "Centella Asiatica (Cica)",
  "Sake Lees Extract (Kasshu)",
  "Yuzu Peel Extract (Vitamin C)",
  "Green Tea Catechins",
  "Plant Squalane",
  "Marine Collagen",
  "CoQ10",
  "Arbutin",
];

export const POPULAR_BENEFITS = [
  "Deep 72-Hour Cellular Moisture Lock",
  "Visibly Fades Melasma & Post-Acne Dark Spots",
  "Strengthens Damaged Acid Mantle & Lipid Barrier",
  "Calms Facial Redness, Heat & Rosacea Symptoms",
  "Refines Dilated Pores & Regulates Excess Sebum",
  "Promotes Luminous Glass-Skin Plump Radiance",
  "Shields from Urban Pollution & Environmental Stress",
  "Smooths Fine Dehydration Lines & Skin Texture",
];

export const POPULAR_TEXTURES = [
  "Watery Lotion / Essence",
  "Silky Emulsion / Milk",
  "Dewy Gel-Cream",
  "Rich Velvety Cream",
  "Nourishing Botanical Oil",
  "Bouncy Jelly Mask",
  "Gentle Micro-Foam Wash",
];

export const JAPAN_REGIONS = [
  "Tokyo, Japan",
  "Kyoto, Japan",
  "Osaka, Japan",
  "Hokkaido, Japan",
  "Okinawa, Japan",
  "Kobe, Japan",
];

export const PAGE_SIZE_OPTIONS = [8, 16, 24, 48];

export function stockBadge(stock: number, threshold = 5) {
  if (stock === 0)
    return {
      label: "Out of Stock",
      cls: "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200",
    };
  if (stock <= threshold)
    return {
      label: `Low: ${stock} left`,
      cls: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200",
    };
  return {
    label: `${stock} in stock`,
    cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200",
  };
}

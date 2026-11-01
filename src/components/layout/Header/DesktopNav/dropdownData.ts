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
} from "lucide-react";
import { DropdownItem } from "./shared/DropdownColumn";

// Brands
export const brands: DropdownItem[] = [
  {
    label: "Glorious Japan",
    category: "glorious-japan",
    icon: Gem,
    iconClassName: "text-primary",
  },
  {
    label: "Sakura Lab",
    category: "sakura-lab",
    icon: Sparkles,
    iconClassName: "text-primary",
  },
  {
    label: "Kyoto Botanicals",
    category: "kyoto-botanicals",
    icon: Leaf,
    iconClassName: "text-primary",
  },
  {
    label: "Yuzu No Mori",
    category: "yuzu-no-mori",
    icon: Star,
    iconClassName: "text-primary",
  },
  {
    label: "Hikari Beauty",
    category: "hikari-beauty",
    icon: Shield,
    iconClassName: "text-primary",
  },
];

// Featured Brands
export const featuredBrands: DropdownItem[] = [
  {
    label: "Best of Glorious Japan",
    category: "glorious-japan",
    icon: Star,
    iconClassName: "text-primary",
  },
  {
    label: "Sakura Lab Favorites",
    category: "sakura-lab",
    icon: Sparkles,
    iconClassName: "text-primary",
  },
  {
    label: "Kyoto Botanicals Top Picks",
    category: "kyoto-botanicals",
    icon: Leaf,
    iconClassName: "text-primary",
  },
  {
    label: "Yuzu Collection",
    category: "yuzu-no-mori",
    icon: Globe,
    iconClassName: "text-primary",
  },
  {
    label: "Hikari Beauty Essentials",
    category: "hikari-beauty",
    icon: Gem,
    iconClassName: "text-primary",
  },
];

// Categories
export const categories: DropdownItem[] = [
  {
    label: "Skincare",
    category: "Skincare",
    icon: Leaf,
    iconClassName: "text-primary",
  },
  {
    label: "Hair Care",
    category: "Hair Care",
    icon: Scissors,
    iconClassName: "text-primary",
  },
  {
    label: "Body Care",
    category: "Body Care",
    icon: Baby,
    iconClassName: "text-primary",
  },
  {
    label: "Makeup",
    category: "Makeup",
    icon: Sparkles,
    iconClassName: "text-primary",
  },
  {
    label: "Baby Care",
    category: "Baby Care",
    icon: Baby,
    iconClassName: "text-primary",
  },
  {
    label: "Accessories",
    category: "Accessories",
    icon: Gem,
    iconClassName: "text-primary",
  },
];

// Featured Subcategories
export const featured: DropdownItem[] = [
  {
    label: "Serum",
    category: "Serum",
    icon: Package,
    iconClassName: "text-primary",
  },
  {
    label: "Sunscreen",
    category: "Sunscreen",
    icon: Shield,
    iconClassName: "text-primary",
  },
  {
    label: "Cleanser",
    category: "Cleanser",
    icon: Search,
    iconClassName: "text-primary",
  },
  {
    label: "Moisturizer",
    category: "Moisturizer",
    icon: Sparkles,
    iconClassName: "text-primary",
  },
  {
    label: "Toner",
    category: "Toner",
    icon: Home,
    iconClassName: "text-primary",
  },
  {
    label: "Face Mask",
    category: "Face Mask",
    icon: Gem,
    iconClassName: "text-primary",
  },
];


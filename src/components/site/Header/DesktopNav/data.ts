import {
  Home,
  Store,
  Sparkles,
  Tag,
  Truck,
  Grid,
  Gem,
  Star,
  Gift,
  Search,
  Shield,
  Globe,
  Leaf,
  Scissors,
  Baby,
  Package,
} from "lucide-react";
import { CategoriesDropdown } from "./DropDowns/CategoriesDropdown";
import { CollectionsDropdown } from "./DropDowns/CollectionsDropdown";
import { BrandsDropdown } from "./DropDowns/BrandsDropdown";
import { DropdownItem } from "./shared/DropdownColumn";

export interface NavItemData {
  to: string;
  label: string;
  icon: React.ElementType;
  iconClassName?: string;
  dropdown?: React.ComponentType;
  fallbackRoute?: string;
}

export const navItems: NavItemData[] = [
    {
      to: "/",
      label: "Home",
      icon: Home,
    },
    {
      to: "/shop",
      label: "Shop All",
      icon: Store,
    },
    {
      to: "/categories",
      label: "Categories",
      icon: Grid,
      dropdown: CategoriesDropdown,
    },
    {
      to: "/collections",
      label: "Collections",
      icon: Sparkles,
      dropdown: CollectionsDropdown,
    },
    {
      to: "/brands",
      label: "Brands",
      icon: Gem,
      dropdown: BrandsDropdown,
    },
    {
      to: "/offers",
      label: "Offers",
      icon: Tag,
      fallbackRoute: "/coming-soon",
    },
    {
      to: "/pre-order",
      label: "Pre-Order",
      icon: Truck,
      fallbackRoute: "/coming-soon",
    },
    {
      to: "/collections?type=bestsellers",
      label: "Bestsellers",
      icon: Star,
      iconClassName: "text-yellow-500",
    },
    {
      to: "/collections?type=new-arrivals",
      label: "New Arrivals",
      icon: Sparkles,
      iconClassName: "text-purple-500",
    },
    {
      to: "/collections?type=combo-gift-sets",
      label: "Combo & Gift Sets",
      icon: Gift,
      iconClassName: "text-pink-500",
    },
    {
      to: "/collections?type=skin-concern",
      label: "Shop by Skin Concern",
      icon: Search,
      iconClassName: "text-blue-500",
    },
    {
      to: "/collections?type=shein",
      label: "SHEIN Products",
      icon: Shield,
      iconClassName: "text-indigo-500",
    },
    {
      to: "/collections?type=pre-order-japan",
      label: "Pre-Order from Japan",
      icon: Globe,
      iconClassName: "text-red-500",
    },
];

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
    iconClassName: "text-pink-500",
  },
  {
    label: "Kyoto Botanicals",
    category: "kyoto-botanicals",
    icon: Leaf,
    iconClassName: "text-green-500",
  },
  {
    label: "Yuzu No Mori",
    category: "yuzu-no-mori",
    icon: Star,
    iconClassName: "text-yellow-500",
  },
  {
    label: "Hikari Beauty",
    category: "hikari-beauty",
    icon: Shield,
    iconClassName: "text-purple-500",
  },
];

// 3. Declare featuredBrands
export const featuredBrands: DropdownItem[] = [
  {
    label: "Best of Glorious Japan",
    category: "glorious-japan",
    icon: Star,
    iconClassName: "text-yellow-500",
  },
  {
    label: "Sakura Lab Favorites",
    category: "sakura-lab",
    icon: Sparkles,
    iconClassName: "text-pink-500",
  },
  {
    label: "Kyoto Botanicals Top Picks",
    category: "kyoto-botanicals",
    icon: Leaf,
    iconClassName: "text-green-500",
  },
  {
    label: "Yuzu Collection",
    category: "yuzu-no-mori",
    icon: Globe,
    iconClassName: "text-orange-500",
  },
  {
    label: "Hikari Beauty Essentials",
    category: "hikari-beauty",
    icon: Gem,
    iconClassName: "text-purple-500",
  },
];

// categories
export const categories: DropdownItem[] = [
  {
    label: "Skincare",
    category: "Skincare",
    icon: Leaf,
    iconClassName: "text-green-500",
  },
  {
    label: "Hair Care",
    category: "Hair Care",
    icon: Scissors,
    iconClassName: "text-purple-500",
  },
  {
    label: "Body Care",
    category: "Body Care",
    icon: Baby,
    iconClassName: "text-orange-500",
  },
  {
    label: "Makeup",
    category: "Makeup",
    icon: Sparkles,
    iconClassName: "text-pink-500",
  },
  {
    label: "Baby Care",
    category: "Baby Care",
    icon: Baby,
    iconClassName: "text-blue-500",
  },
  {
    label: "Accessories",
    category: "Accessories",
    icon: Gem,
    iconClassName: "text-gray-500",
  },
];

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
    iconClassName: "text-yellow-500",
  },
  {
    label: "Cleanser",
    category: "Cleanser",
    icon: Search,
    iconClassName: "text-blue-500",
  },
  {
    label: "Moisturizer",
    category: "Moisturizer",
    icon: Sparkles,
    iconClassName: "text-pink-500",
  },
  {
    label: "Toner",
    category: "Toner",
    icon: Home,
    iconClassName: "text-green-500",
  },
  {
    label: "Face Mask",
    category: "Face Mask",
    icon: Gem,
    iconClassName: "text-purple-500",
  },
];

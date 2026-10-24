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
  dropdown?: React.ComponentType<{}>;
  fallbackRoute?: string;
}

export const navItems: NavItemData[] = [
    {
      to: "/",
      label: "Home",
      icon: Home,
      iconClassName: "text-primary",
    },
    {
      to: "/shop",
      label: "Shop All",
      icon: Store,
      iconClassName: "text-primary",
    },
    {
      to: "/categories",
      label: "Categories",
      icon: Grid,
      iconClassName: "text-primary",
      dropdown: CategoriesDropdown,
    },
    {
      to: "/collections",
      label: "Collections",
      icon: Sparkles,
      iconClassName: "text-primary",
      dropdown: CollectionsDropdown,
    },
    {
      to: "/brands",
      label: "Brands",
      icon: Gem,
      iconClassName: "text-primary",
      dropdown: BrandsDropdown,
    },
    {
      to: "/offers",
      label: "Offers",
      icon: Tag,
      iconClassName: "text-primary",
    },
    {
      to: "/pre-order",
      label: "Pre-Order",
      icon: Truck,
      iconClassName: "text-primary",
    },
    {
      to: "/collections/bestsellers",
      label: "Bestsellers",
      icon: Star,
      iconClassName: "text-primary",
    },
    {
      to: "/collections/new-arrivals",
      label: "New Arrivals",
      icon: Sparkles,
      iconClassName: "text-primary",
    },
    {
      to: "/collections/combo-gift-sets",
      label: "Combo & Gift Sets",
      icon: Gift,
      iconClassName: "text-primary",
    },
    {
      to: "/collections/skin-concern",
      label: "Shop by Skin Concern",
      icon: Search,
      iconClassName: "text-primary",
    },
    {
      to: "/collections/shein",
      label: "SHEIN Products",
      icon: Shield,
      iconClassName: "text-primary",
    },
    {
      to: "/collections/pre-order-japan",
      label: "Pre-Order from Japan",
      icon: Globe,
      iconClassName: "text-primary",
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

// 3. Declare featuredBrands
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

// categories
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

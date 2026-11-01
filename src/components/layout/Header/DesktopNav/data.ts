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
} from "lucide-react";
import { CategoriesDropdown } from "./DropDowns/CategoriesDropdown";
import { CollectionsDropdown } from "./DropDowns/CollectionsDropdown";
import { BrandsDropdown } from "./DropDowns/BrandsDropdown";

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

export { brands, featuredBrands, categories, featured } from "./dropdownData";

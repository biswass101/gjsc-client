
import {
  Gift,
  Globe,
  Package,
  Search,
  Shield,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

import {
  DropdownColumn,
  type DropdownItem,
} from "../shared/DropdownColumn";

const collections: DropdownItem[] = [
  {
    label: "Bestsellers",
    category: "bestsellers",
    icon: Star,
    iconClassName: "text-yellow-500",
  },
  {
    label: "New Arrivals",
    category: "new-arrivals",
    icon: Sparkles,
    iconClassName: "text-purple-500",
  },
  {
    label: "Combo & Gift Sets",
    category: "combo-gift-sets",
    icon: Gift,
    iconClassName: "text-pink-500",
  },
  {
    label: "Shop by Skin Concern",
    category: "skin-concern",
    icon: Search,
    iconClassName: "text-blue-500",
  },
  {
    label: "SHEIN Products",
    category: "shein",
    icon: Shield,
    iconClassName: "text-indigo-500",
  },
  {
    label: "Pre-Order from Japan",
    category: "pre-order-japan",
    icon: Globe,
    iconClassName: "text-red-500",
  },
];

const moreCollections: DropdownItem[] = [
  {
    label: "Winter Essentials",
    category: "winter-essentials",
    icon: Package,
    iconClassName: "text-blue-500",
  },
  {
    label: "Summer Glow",
    category: "summer-glow",
    icon: Star,
    iconClassName: "text-yellow-500",
  },
  {
    label: "Travel Size",
    category: "travel-size",
    icon: Truck,
    iconClassName: "text-green-500",
  },
  {
    label: "Value Sets",
    category: "value-sets",
    icon: Gift,
    iconClassName: "text-pink-500",
  },
  {
    label: "K-Beauty Picks",
    category: "k-beauty",
    icon: Globe,
    iconClassName: "text-red-500",
  },
  {
    label: "J-Beauty Picks",
    category: "j-beauty",
    icon: Globe,
    iconClassName: "text-red-500",
  },
];

export function CollectionsDropdown() {
  return (
    <div className="absolute left-0 top-full z-50 w-full min-w-3xl">
      <div className="mt-1 rounded-lg border border-border bg-popover p-4 shadow-[var(--shadow-lift)]">
        <div className="grid grid-cols-12 gap-6">
          <DropdownColumn
            title="Collections"
            items={collections}
            to="/collections"
            searchParam="type"
          />

          <DropdownColumn
            title="More"
            items={moreCollections}
            to="/collections"
            searchParam="type"
          />
        </div>
      </div>
    </div>
  );
}

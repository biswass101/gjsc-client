
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
    iconClassName: "text-primary",
  },
  {
    label: "New Arrivals",
    category: "new-arrivals",
    icon: Sparkles,
    iconClassName: "text-primary",
  },
  {
    label: "Combo & Gift Sets",
    category: "combo-gift-sets",
    icon: Gift,
    iconClassName: "text-primary",
  },
  {
    label: "Shop by Skin Concern",
    category: "skin-concern",
    icon: Search,
    iconClassName: "text-primary",
  },
  {
    label: "SHEIN Products",
    category: "shein",
    icon: Shield,
    iconClassName: "text-primary",
  },
  {
    label: "Pre-Order from Japan",
    category: "pre-order-japan",
    icon: Globe,
    iconClassName: "text-primary",
  },
];

const moreCollections: DropdownItem[] = [
  {
    label: "Winter Essentials",
    category: "winter-essentials",
    icon: Package,
    iconClassName: "text-primary",
  },
  {
    label: "Summer Glow",
    category: "summer-glow",
    icon: Star,
    iconClassName: "text-primary",
  },
  {
    label: "Travel Size",
    category: "travel-size",
    icon: Truck,
    iconClassName: "text-primary",
  },
  {
    label: "Value Sets",
    category: "value-sets",
    icon: Gift,
    iconClassName: "text-primary",
  },
  {
    label: "K-Beauty Picks",
    category: "k-beauty",
    icon: Globe,
    iconClassName: "text-primary",
  },
  {
    label: "J-Beauty Picks",
    category: "j-beauty",
    icon: Globe,
    iconClassName: "text-primary",
  },
];

export function CollectionsDropdown() {
  return (
    <div className="z-50 container-lux">
      <div className="rounded-2xl border border-border/20 bg-background/80 p-4 shadow-(--shadow-lift) backdrop-blur-2xl">
        <div className="grid grid-cols-12 gap-4">
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

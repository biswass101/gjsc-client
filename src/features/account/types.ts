import type { SavedAddress, BuyerOrder, BuyerOrderItem } from "@/types";

export type { SavedAddress, BuyerOrder, BuyerOrderItem };

export type AccountTab = "overview" | "orders" | "addresses" | "wishlist" | "skincare" | "settings";

export interface PresetAvatar {
  id: string;
  label: string;
  url: string;
}

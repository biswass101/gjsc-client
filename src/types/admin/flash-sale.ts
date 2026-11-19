export interface FlashSaleItem {
  id: string | number;
  productId: number;
  slug: string;
  name: string;
  brand: string;
  price: number; // Flash price
  compareAt: number; // Original price
  discount: number; // Discount %
  stockLeft: number;
  allocatedStock: number;
  claimedCount: number;
  claimedPercent: number;
  rating?: number | undefined;
  image: string;
  sortOrder?: number | undefined;
}

export interface AdminFlashSale {
  id: string | number;
  title: string;
  description?: string | null | undefined;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  bannerUrl?: string | null | undefined;
  dynamicStatus: "active" | "scheduled" | "ended";
  totalAllocated: number;
  totalClaimed: number;
  items: FlashSaleItem[];
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}


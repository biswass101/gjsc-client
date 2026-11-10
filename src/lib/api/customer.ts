import { apiClient } from '../api-client';

export interface BackendCartItem {
  id: number;
  productId: number;
  slug: string;
  name: string;
  brand: string;
  size: string;
  price: number;
  compareAt?: number | null;
  image: string;
  qty: number;
  lineTotal: number;
}

export interface BackendCartResponse {
  items: BackendCartItem[];
  subtotal: number;
  totalItems: number;
}

export interface CustomerAddress {
  id: number;
  label: 'Home' | 'Office' | 'Other';
  name: string;
  phone: string;
  division: string;
  city: string;
  area: string;
  street: string;
  deliveryZone?: 'dhaka_metro' | 'dhaka_suburbs' | 'outside_dhaka' | undefined;
  isDefault: boolean;
}

export interface VipTierItem {
  level: number;
  slug: 'sakura_petal' | 'sakura_member' | 'pearl_elite' | 'tokyo_imperial';
  name: string;
  badgeLabel: string;
  minSpend: number;
  multiplier: number;
  tagline: string;
  perks: string[];
  unlocked?: boolean | undefined;
  isCurrent?: boolean | undefined;
}

export interface PointCriterion {
  id: string;
  title: string;
  description: string;
  pointsLabel: string;
  pointsEarned: number;
  maxPoints: number | null;
  achieved: boolean;
  progressLabel: string;
  actionTab: 'overview' | 'orders' | 'addresses' | 'wishlist' | 'skincare' | 'settings' | null;
  actionHref: string | null;
}

export interface CustomerDashboardResponse {
  stats: {
    totalOrders: number;
    activeOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    qualifyingSpend: number;
    deliveredSpend: number;
    wishlistCount: number;
    addressesCount: number;
    reviewsCount: number;
  };
  loyalty: {
    currentTier: VipTierItem;
    nextTier: VipTierItem | null;
    tiers: Array<VipTierItem & { unlocked: boolean; isCurrent: boolean }>;
    qualifyingSpend: number;
    amountToNextTier: number;
    progressPercent: number;
  };
  points: {
    availablePoints: number;
    bdtValue: number;
    pointValueBdt: number;
    onboardingEarned: number;
    onboardingPossible: number;
    criteria: PointCriterion[];
  };
  preferences: {
    skinType: string | null;
    skinConcerns: string[];
    notifSms: boolean;
    notifWhatsapp: boolean;
    notifPromos: boolean;
  };
}

export interface UpdatePreferencesPayload {
  skinType?: 'Dry' | 'Oily' | 'Combination' | 'Sensitive' | 'Normal' | null | undefined;
  skinConcerns?: string[] | undefined;
  notifSms?: boolean | undefined;
  notifWhatsapp?: boolean | undefined;
  notifPromos?: boolean | undefined;
}

export const customerApi = {
  // Dashboard, Loyalty & Preferences
  getDashboard(): Promise<CustomerDashboardResponse> {
    return apiClient.get<CustomerDashboardResponse>('/customer/dashboard');
  },

  updatePreferences(data: UpdatePreferencesPayload): Promise<CustomerDashboardResponse> {
    return apiClient.patch<CustomerDashboardResponse>('/customer/preferences', data);
  },

  // Cart
  getCart(): Promise<BackendCartResponse> {
    return apiClient.get<BackendCartResponse>('/cart');
  },

  addToCart(data: { productId?: number; slug?: string; qty?: number; size?: string }): Promise<BackendCartResponse> {
    return apiClient.post<BackendCartResponse>('/cart', data);
  },

  updateCartQty(itemId: number, qty: number): Promise<BackendCartResponse> {
    return apiClient.patch<BackendCartResponse>(`/cart/${itemId}`, { qty });
  },

  removeFromCart(itemId: number): Promise<BackendCartResponse> {
    return apiClient.delete<BackendCartResponse>(`/cart/${itemId}`);
  },

  mergeCart(items: { slug: string; qty: number; size?: string }[]): Promise<BackendCartResponse> {
    return apiClient.post<BackendCartResponse>('/cart/merge', { items });
  },

  // Wishlist
  getWishlist(): Promise<any[]> {
    return apiClient.get<any[]>('/wishlist');
  },

  toggleWishlist(identifier: number | string): Promise<{ inWishlist: boolean; productSlug: string; message: string }> {
    const payload = typeof identifier === 'number' ? { productId: identifier } : { slug: identifier };
    return apiClient.post('/wishlist/toggle', payload);
  },

  // Addresses
  getAddresses(): Promise<CustomerAddress[]> {
    return apiClient.get<CustomerAddress[]>('/customer/addresses');
  },

  createAddress(data: Omit<CustomerAddress, 'id'>): Promise<CustomerAddress> {
    return apiClient.post<CustomerAddress>('/customer/addresses', data);
  },

  updateAddress(id: number, data: Partial<CustomerAddress>): Promise<CustomerAddress> {
    return apiClient.patch<CustomerAddress>(`/customer/addresses/${id}`, data);
  },

  setDefaultAddress(id: number): Promise<CustomerAddress> {
    return apiClient.patch<CustomerAddress>(`/customer/addresses/${id}/default`);
  },

  deleteAddress(id: number): Promise<{ success: boolean; message: string }> {
    return apiClient.delete(`/customer/addresses/${id}`);
  },
};


import type { Product, CartLine, User, Notification } from "@/types";

export interface ShopContextType {
  cart: CartLine[];
  wishlist: string[];
  recent: string[];
  user: User | null;
  notifications: Notification[];
  addToCart: (slug: string, qty?: number, size?: string) => void;
  setQty: (slug: string, qty: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  addRecent: (slug: string) => void;
  login: (email: string, password: string) => User;
  loginWithGoogle: (demoGoogleUser?: Partial<User>) => User;
  updateUserProfile: (updates: Partial<User>) => void;
  logout: () => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  subtotal: number;
  count: number;
  lines: { product: Product; qty: number; size: string }[];
}

export const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "Order Confirmed",
    body: "Your order #GJ-2026-4821 has been confirmed and is being prepared.",
    time: "2 min ago",
    read: false,
    type: "order",
  },
  {
    id: "n2",
    title: "Flash Sale — 30% Off!",
    body: "Limited-time deals on serums and essences. Ends midnight.",
    time: "1 hr ago",
    read: false,
    type: "promo",
  },
  {
    id: "n3",
    title: "Order Shipped",
    body: "Your Sakura Radiance Serum is on its way. Expected in 2 days.",
    time: "3 hr ago",
    read: false,
    type: "order",
  },
  {
    id: "n4",
    title: "New Arrivals",
    body: "6 new products from the Yuzu collection just landed.",
    time: "1 day ago",
    read: true,
    type: "promo",
  },
  {
    id: "n5",
    title: "System Update",
    body: "We've improved our checkout for a smoother experience.",
    time: "2 days ago",
    read: true,
    type: "system",
  },
];


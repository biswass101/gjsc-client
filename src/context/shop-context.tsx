"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS } from "@/lib/catalog";
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

const DEMO_NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "Order Confirmed", body: "Your order #GJ-2026-4821 has been confirmed and is being prepared.", time: "2 min ago", read: false, type: "order" },
  { id: "n2", title: "Flash Sale — 30% Off!", body: "Limited-time deals on serums and essences. Ends midnight.", time: "1 hr ago", read: false, type: "promo" },
  { id: "n3", title: "Order Shipped", body: "Your Sakura Radiance Serum is on its way. Expected in 2 days.", time: "3 hr ago", read: false, type: "order" },
  { id: "n4", title: "New Arrivals", body: "6 new products from the Yuzu collection just landed.", time: "1 day ago", read: true, type: "promo" },
  { id: "n5", title: "System Update", body: "We've improved our checkout for a smoother experience.", time: "2 days ago", read: true, type: "system" },
];

const ShopContext = createContext<ShopContextType | null>(null);
const STORAGE_KEY = "gjsc-shop-v2";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setCart(d.cart ?? []);
        setWishlist(d.wishlist ?? []);
        setRecent(d.recent ?? []);
        if (d.user) setUser(d.user);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist, recent, user }));
    } catch {
      /* ignore */
    }
  }, [cart, wishlist, recent, user]);

  const addToCart = useCallback((slug: string, qty = 1, size = "50ml") => {
    setCart((c) => {
      const found = c.find((l) => l.slug === slug);
      if (found) return c.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
      return [...c, { slug, qty, size }];
    });
    setCartOpen(true);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setCart((c) => (qty <= 0 ? c.filter((l) => l.slug !== slug) : c.map((l) => (l.slug === slug ? { ...l, qty } : l))));
  }, []);

  const removeFromCart = useCallback((slug: string) => setCart((c) => c.filter((l) => l.slug !== slug)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (slug: string) => setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug])),
    [],
  );

  const addRecent = useCallback(
    (slug: string) => setRecent((r) => [slug, ...r.filter((s) => s !== slug)].slice(0, 8)),
    [],
  );

  const login = useCallback((email: string, _password: string): User => {
    const role: User["role"] = email.toLowerCase().includes("admin") ? "admin" : "customer";
    const namePart = email.split("@")[0] ?? "User";
    const name = namePart.replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const newUser: User = { name, email, role };
    setUser(newUser);
    setNotifications((prev) => [
      { id: `login-${Date.now()}`, title: "Welcome back!", body: `Signed in as ${email}`, time: "just now", read: false, type: "system" },
      ...prev,
    ]);
    return newUser;
  }, []);

  const loginWithGoogle = useCallback((custom?: Partial<User>): User => {
    const googleUser: User = {
      name: custom?.name || "Nusrat Jahan",
      email: custom?.email || "nusrat.jahan.tokyo@gmail.com",
      role: "customer",
      avatar:
        custom?.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      authProvider: "google",
      phone: custom?.phone || "01712-849201",
    };
    setUser(googleUser);
    setNotifications((prev) => [
      {
        id: `login-google-${Date.now()}`,
        title: "Google Sign-In Successful",
        body: `Signed in as ${googleUser.email} via Google Account`,
        time: "just now",
        read: false,
        type: "system",
      },
      ...prev,
    ]);
    return googleUser;
  }, []);

  const updateUserProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      const base: User = prev ?? {
        name: updates.name || "Nusrat Jahan",
        email: updates.email || "nusrat.jahan@gmail.com",
        role: "customer",
      };
      return { ...base, ...updates };
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const markRead = useCallback((id: string) => {
    setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((ns) => ns.map((n) => ({ ...n, read: true })));
  }, []);

  const lines = useMemo(
    () =>
      cart
        .map((l) => {
          const product = PRODUCTS.find((p) => p.slug === l.slug);
          return product ? { product, qty: l.qty, size: l.size } : null;
        })
        .filter(Boolean) as { product: Product; qty: number; size: string }[],
    [cart],
  );

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.product.price * l.qty, 0), [lines]);
  const count = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);

  const value: ShopContextType = {
    cart,
    wishlist,
    recent,
    user,
    notifications,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    addRecent,
    login,
    loginWithGoogle,
    updateUserProfile,
    logout,
    markRead,
    markAllRead,
    cartOpen,
    setCartOpen,
    subtotal,
    count,
    lines,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}


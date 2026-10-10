import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./catalog";

export type CartLine = { slug: string; qty: number; size: string };

export type User = {
  name: string;
  email: string;
  role: "customer" | "admin";
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "order" | "promo" | "system";
};

const DEMO_NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "Order Confirmed", body: "Your order #GJ-2026-4821 has been confirmed and is being prepared.", time: "2 min ago", read: false, type: "order" },
  { id: "n2", title: "Flash Sale — 30% Off!", body: "Limited-time deals on serums and essences. Ends midnight.", time: "1 hr ago", read: false, type: "promo" },
  { id: "n3", title: "Order Shipped", body: "Your Sakura Radiance Serum is on its way. Expected in 2 days.", time: "3 hr ago", read: false, type: "order" },
  { id: "n4", title: "New Arrivals", body: "6 new products from the Yuzu collection just landed.", time: "1 day ago", read: true, type: "promo" },
  { id: "n5", title: "System Update", body: "We've improved our checkout for a smoother experience.", time: "2 days ago", read: true, type: "system" },
];

type ShopState = {
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
  logout: () => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  subtotal: number;
  count: number;
  lines: { product: Product; qty: number; size: string }[];
};

const Ctx = createContext<ShopState | null>(null);
const KEY = "gjsc-shop-v2";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setCart(d.cart ?? []);
        setWishlist(d.wishlist ?? []);
        setRecent(d.recent ?? []);
        if (d.user) setUser(d.user);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, recent, user }));
    } catch { /* ignore */ }
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
    // Add a welcome notification
    setNotifications((prev) => [
      { id: `login-${Date.now()}`, title: "Welcome back!", body: `Signed in as ${email}`, time: "just now", read: false, type: "system" },
      ...prev,
    ]);
    return newUser;
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

  const value: ShopState = {
    cart, wishlist, recent, user, notifications,
    addToCart, setQty, removeFromCart, clearCart,
    toggleWishlist, addRecent, login, logout, markRead, markAllRead,
    cartOpen, setCartOpen, subtotal, count, lines,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShop() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

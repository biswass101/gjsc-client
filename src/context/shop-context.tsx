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
import { DEMO_NOTIFICATIONS, ShopContextType, type ProfileUpdateInput } from "./shop-types";
import { authApi, customerApi, tokenStorage } from "@/lib/api";
import type { GoogleAuthPayload, FacebookAuthPayload } from "@/lib/api/auth";

export type { ShopContextType };

const ShopContext = createContext<ShopContextType | null>(null);
const STORAGE_KEY = "gjsc-shop-v2";

function normalizeAuthUser(raw: any): User {
  const provider = (raw.authProvider ?? "email") as "email" | "google" | "facebook";
  const linkedProviders = Array.isArray(raw.linkedProviders)
    ? (raw.linkedProviders as ("email" | "google" | "facebook")[])
    : [provider];
  return {
    name: raw.name,
    email: raw.email,
    role: raw.role,
    avatar: raw.avatar ?? undefined,
    phone: raw.phone ?? undefined,
    address: raw.address ?? undefined,
    authProvider: provider,
    linkedProviders,
    hasPassword: raw.hasPassword,
    isPlaceholderEmail: Boolean(raw.isPlaceholderEmail),
    skinType: raw.skinType ?? null,
    skinConcerns: Array.isArray(raw.skinConcerns) ? raw.skinConcerns : [],
    notifSms: raw.notifSms,
    notifWhatsapp: raw.notifWhatsapp,
    notifPromos: raw.notifPromos,
  };
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const syncWishlistFromBackend = useCallback(async (guestSlugs: string[] = []) => {
    if (!tokenStorage.get()) return;
    try {
      const dbWishlist = await customerApi.getWishlist();
      const dbSlugs = Array.isArray(dbWishlist)
        ? dbWishlist
            .map((p: any) => p?.slug || p?.productSlug)
            .filter((s: unknown): s is string => typeof s === "string" && s.length > 0)
        : [];

      // Best-effort merge of guest wishlist slugs that weren't saved yet
      const missingGuest = guestSlugs.filter((s) => !dbSlugs.includes(s));
      if (missingGuest.length > 0) {
        await Promise.allSettled(missingGuest.map((slug) => customerApi.toggleWishlist(slug)));
        const refreshed = await customerApi.getWishlist();
        if (Array.isArray(refreshed)) {
          setWishlist(
            refreshed
              .map((p: any) => p?.slug || p?.productSlug)
              .filter((s: unknown): s is string => typeof s === "string" && s.length > 0),
          );
          return;
        }
      }

      setWishlist(dbSlugs);
    } catch {
      /* keep current local wishlist if offline */
    }
  }, []);

  // 1. Initial rehydration from localStorage & Backend JWT Profile
  useEffect(() => {
    const token = tokenStorage.get();
    let initialWishlist: string[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setCart(d.cart ?? []);
        initialWishlist = Array.isArray(d.wishlist) ? d.wishlist : [];
        setWishlist(initialWishlist);
        setRecent(d.recent ?? []);
        if (d.user && token) {
          setUser(d.user);
        }
      }
    } catch {
      /* ignore */
    }

    // Verify token with backend
    if (token) {
      authApi
        .getProfile()
        .then((backendUser) => {
          if (backendUser) {
            setUser(normalizeAuthUser(backendUser));
            // Sync backend cart
            customerApi
              .getCart()
              .then((res) => {
                if (res?.items && res.items.length > 0) {
                  setCart(
                    res.items.map((i) => ({
                      slug: i.slug,
                      qty: i.qty,
                      size: i.size || "50ml",
                    })),
                  );
                }
              })
              .catch(() => {
                /* fallback to local cart if offline */
              });

            // Sync backend wishlist (no guest overwrite when rehydrating active session)
            void syncWishlistFromBackend([]);
          }
        })
        .catch((err: unknown) => {
          const status = (err as { status?: number } | null)?.status;
          if (status === 401 || status === 403 || status === 404) {
            tokenStorage.clear();
            setUser(null);
          }
        })
        .finally(() => {
          setIsAuthLoading(false);
        });
    } else {
      setIsAuthLoading(false);
    }
  }, [syncWishlistFromBackend]);

  // 2. Persist local cache
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

    // Sync to backend if authenticated
    if (tokenStorage.get()) {
      customerApi.addToCart({ slug, qty, size }).catch(() => {
        /* optimistic update remains */
      });
    }
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setCart((c) =>
      qty <= 0
        ? c.filter((l) => l.slug !== slug)
        : c.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = useCallback(
    (slug: string) => setCart((c) => c.filter((l) => l.slug !== slug)),
    [],
  );
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (slug: string) => {
      setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug]));
      if (tokenStorage.get()) {
        customerApi.toggleWishlist(slug).catch(() => {
          /* optimistic */
        });
      }
    },
    [],
  );

  const addRecent = useCallback(
    (slug: string) => setRecent((r) => [slug, ...r.filter((s) => s !== slug)].slice(0, 8)),
    [],
  );

  const login = useCallback(async (email: string, pass: string): Promise<User> => {
    try {
      const res = await authApi.login(email, pass);
      const authenticatedUser = normalizeAuthUser(res.user);
      setUser(authenticatedUser);

      // Merge existing guest cart if any
      const existingCart = cart;
      if (existingCart.length > 0) {
        try {
          await customerApi.mergeCart(existingCart);
        } catch {
          /* ignore */
        }
      }

      void syncWishlistFromBackend(wishlist);

      setNotifications((prev) => [
        {
          id: `login-${Date.now()}`,
          title: "Welcome back!",
          body: `Signed in as ${res.user.email}`,
          time: "just now",
          read: false,
          type: "system",
        },
        ...prev,
      ]);

      return authenticatedUser;
    } catch (err: any) {
      throw err;
    }
  }, [cart, wishlist, syncWishlistFromBackend]);

  const registerUser = useCallback(
    async (name: string, email: string, pass: string, phone?: string): Promise<User> => {
      const payload: { name: string; email: string; password: string; phone?: string | undefined } = {
        name,
        email,
        password: pass,
      };
      if (phone) payload.phone = phone;
      const res = await authApi.register(payload);
      const newUser = normalizeAuthUser(res.user);
      setUser(newUser);

      if (cart.length > 0) {
        try {
          await customerApi.mergeCart(cart);
        } catch {
          /* ignore */
        }
      }

      void syncWishlistFromBackend(wishlist);

      return newUser;
    },
    [cart, wishlist, syncWishlistFromBackend]
  );

  const loginWithGoogle = useCallback(
    async (payload: GoogleAuthPayload): Promise<User> => {
      const res = await authApi.loginWithGoogle(payload);

      const authedUser = normalizeAuthUser(res.user);
      setUser(authedUser);

      if (cart.length > 0) {
        try {
          await customerApi.mergeCart(cart);
        } catch {
          /* ignore */
        }
      }

      void syncWishlistFromBackend(wishlist);

      setNotifications((prev) => [
        {
          id: `login-google-${Date.now()}`,
          title: "Google Sign-In Successful",
          body: `Signed in as ${authedUser.email} via Google Account`,
          time: "just now",
          read: false,
          type: "system",
        },
        ...prev,
      ]);

      return authedUser;
    },
    [cart, wishlist, syncWishlistFromBackend]
  );

  const loginWithFacebook = useCallback(
    async (payload: FacebookAuthPayload): Promise<User> => {
      const res = await authApi.loginWithFacebook(payload);

      const authedUser = normalizeAuthUser(res.user);
      setUser(authedUser);

      if (cart.length > 0) {
        try {
          await customerApi.mergeCart(cart);
        } catch {
          /* ignore */
        }
      }

      void syncWishlistFromBackend(wishlist);

      setNotifications((prev) => [
        {
          id: `login-facebook-${Date.now()}`,
          title: "Facebook Sign-In Successful",
          body: `Signed in as ${authedUser.email} via Facebook Account`,
          time: "just now",
          read: false,
          type: "system",
        },
        ...prev,
      ]);

      return authedUser;
    },
    [cart, wishlist, syncWishlistFromBackend]
  );

  const updateUserProfile = useCallback(async (updates: ProfileUpdateInput) => {
    try {
      if (tokenStorage.get()) {
        const updated = await authApi.updateProfile(updates);
        const normalized = normalizeAuthUser(updated);
        setUser((prev) => (prev ? { ...prev, ...normalized } : normalized));
      } else {
        setUser((prev) => {
          const base: User = prev ?? {
            name: updates.name || "Customer",
            email: updates.email || "customer@example.com",
            role: "customer",
          };
          return normalizeAuthUser({ ...base, ...updates });
        });
      }
    } catch (err) {
      throw err;
    }
  }, []);

  const refreshUserProfile = useCallback(async (): Promise<User | null> => {
    if (!tokenStorage.get()) return null;
    try {
      const fresh = await authApi.getProfile();
      const normalized = normalizeAuthUser(fresh);
      setUser(normalized);
      return normalized;
    } catch {
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* ignore */
    }
    setUser(null);
    setWishlist([]);
  }, []);

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
    registerUser,
    loginWithGoogle,
    loginWithFacebook,
    updateUserProfile,
    refreshUserProfile,
    logout,
    markRead,
    markAllRead,
    cartOpen,
    setCartOpen,
    subtotal,
    count,
    lines,
    isAuthLoading,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

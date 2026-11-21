"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { PRODUCTS } from "@/lib/catalog";
import type { Product, CartLine, User, Notification } from "@/types";
import { DEMO_NOTIFICATIONS, ShopContextType, type ProfileUpdateInput } from "./shop-types";
import { authApi, catalogApi, customerApi, systemApi, tokenStorage } from "@/lib/api";
import type { GoogleAuthPayload, FacebookAuthPayload } from "@/lib/api/auth";
import type { BackendCartResponse } from "@/lib/api/customer";

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

function normalizeCatalogProduct(raw: any): Product {
  const image = String(raw.image || (Array.isArray(raw.images) ? raw.images[0] : "") || "");
  const images =
    Array.isArray(raw.images) && raw.images.length > 0
      ? raw.images.filter((u: unknown): u is string => typeof u === "string" && u.trim().length > 0)
      : image
        ? [image]
        : [];

  return {
    id: String(raw.id ?? raw.slug),
    slug: String(raw.slug),
    name: String(raw.name || ""),
    japaneseName: raw.japaneseName || undefined,
    brand: String(raw.brandName || raw.brand?.name || raw.brand || "Glorious Japan"),
    category: String(raw.categoryName || raw.category?.name || raw.category || "Skincare"),
    price: Number(raw.price || 0),
    compareAt: raw.compareAt ? Number(raw.compareAt) : undefined,
    rating: Number(raw.rating || 5),
    reviews: Number(raw.reviewsCount ?? raw.reviews ?? 0),
    image,
    images,
    short: String(raw.short || ""),
    description: String(raw.description || ""),
    ingredients: Array.isArray(raw.ingredients) ? raw.ingredients : [],
    benefits: Array.isArray(raw.benefits) ? raw.benefits : [],
    howTo: String(raw.howTo || ""),
    skinTypes: Array.isArray(raw.skinTypes) ? raw.skinTypes : [],
    concerns: Array.isArray(raw.concerns) ? raw.concerns : [],
    stock: Number(raw.stock ?? 0),
    badge: raw.badge || undefined,
    sizes: Array.isArray(raw.sizes) && raw.sizes.length > 0 ? raw.sizes : ["Standard"],
    type: raw.productType || raw.type || "in-stock",
    origin: raw.origin || "Tokyo, Japan",
    texture: raw.texture || undefined,
    pao: raw.pao || undefined,
    spf: raw.spf || undefined,
    barcode: raw.barcode || undefined,
    sku: raw.sku || undefined,
  };
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [catalogMap, setCatalogMap] = useState<Record<string, Product>>({});
  const [activeFlashSale, setActiveFlashSale] = useState<any | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Track slugs we've already attempted on-demand fetch for so we don't loop
  const fetchedSlugsRef = useRef<Set<string>>(new Set());
  // Keep latest cart ref for async handlers (setQty/removeFromCart)
  const cartRef = useRef<CartLine[]>(cart);
  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  // Cache a batch of normalized DB products keyed strictly by lowercase slug
  const upsertCatalogProducts = useCallback((items: Product[]) => {
    if (!items.length) return;
    setCatalogMap((prev) => {
      const next = { ...prev };
      for (const p of items) {
        if (p?.slug) {
          next[p.slug.toLowerCase()] = p;
        }
      }
      return next;
    });
  }, []);

  // Hydrate live DB products on mount and whenever admin creates/updates products
  const refreshCatalogCache = useCallback(() => {
    catalogApi
      .getProducts({ limit: 50 })
      .then((res: any) => {
        if (res && Array.isArray(res.products)) {
          const normalized = res.products
            .filter((p: any) => p && p.slug)
            .map(normalizeCatalogProduct);
          upsertCatalogProducts(normalized);
        }
      })
      .catch(() => {
        /* non-fatal */
      });
  }, [upsertCatalogProducts]);

  // Hydrate active flash sale deals to ensure cart always synchronizes flash sale pricing
  const refreshFlashSaleCache = useCallback(() => {
    systemApi
      .getActiveFlashSale()
      .then((sale: any) => {
        if (sale && sale.isActive !== false && Array.isArray(sale.items)) {
          setActiveFlashSale(sale);
        } else {
          setActiveFlashSale(null);
        }
      })
      .catch(() => {
        /* non-fatal */
      });
  }, []);

  useEffect(() => {
    refreshCatalogCache();
    refreshFlashSaleCache();

    const handleCatalogUpdate = () => {
      fetchedSlugsRef.current.clear();
      refreshCatalogCache();
      refreshFlashSaleCache();
    };
    window.addEventListener("gjsc_catalog_updated", handleCatalogUpdate);
    window.addEventListener("gjsc_flash_sale_updated", handleCatalogUpdate);
    return () => {
      window.removeEventListener("gjsc_catalog_updated", handleCatalogUpdate);
      window.removeEventListener("gjsc_flash_sale_updated", handleCatalogUpdate);
    };
  }, [refreshCatalogCache, refreshFlashSaleCache]);

  // Apply authoritative backend cart response to both cart lines & live catalogMap
  const applyBackendCart = useCallback(
    (res: BackendCartResponse | null | undefined) => {
      if (!res || !Array.isArray(res.items)) return;

      const discoveredProducts: Product[] = [];
      const mapped: CartLine[] = res.items
        .filter((item) => Boolean(item?.slug || item?.product?.slug))
        .map((item) => {
          const prod = item.product ? normalizeCatalogProduct(item.product) : undefined;
          if (prod) discoveredProducts.push(prod);
          return {
            id: item.id,
            slug: prod?.slug || item.slug,
            qty: item.qty,
            size: item.size || prod?.sizes?.[0] || "Standard",
            product: prod,
          };
        });

      if (discoveredProducts.length > 0) {
        upsertCatalogProducts(discoveredProducts);
      }
      setCart(mapped);
    },
    [upsertCatalogProducts],
  );

  // On-demand DB fetch for any cart line slug not yet in catalogMap (e.g. newly created product in guest cart)
  useEffect(() => {
    const missingSlugs = cart
      .map((l) => l.slug)
      .filter((slug) => {
        const key = slug.toLowerCase();
        return !catalogMap[key] && !fetchedSlugsRef.current.has(key);
      });

    if (missingSlugs.length === 0) return;

    missingSlugs.forEach((slug) => {
      const key = slug.toLowerCase();
      fetchedSlugsRef.current.add(key);
      catalogApi
        .getProductBySlug(slug)
        .then((res: any) => {
          const raw = res?.product || (res?.id || res?.slug ? res : null);
          if (raw?.slug) {
            upsertCatalogProducts([normalizeCatalogProduct(raw)]);
          }
        })
        .catch(() => {
          /* non-fatal */
        });
    });
  }, [cart, catalogMap, upsertCatalogProducts]);

  const syncWishlistFromBackend = useCallback(async (guestSlugs: string[] = []) => {
    if (!tokenStorage.get()) return;
    try {
      const dbWishlist = await customerApi.getWishlist();
      const dbSlugs = Array.isArray(dbWishlist)
        ? dbWishlist
            .map((p: any) => p?.slug || p?.productSlug)
            .filter((s: unknown): s is string => typeof s === "string" && s.length > 0)
        : [];

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
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (Array.isArray(d.cart)) {
          setCart(d.cart);
        }
        setWishlist(Array.isArray(d.wishlist) ? d.wishlist : []);
        setRecent(Array.isArray(d.recent) ? d.recent : []);
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
            // Sync authoritative backend cart (including full DB product objects)
            customerApi
              .getCart()
              .then((res) => {
                applyBackendCart(res);
              })
              .catch(() => {
                /* fallback to local cart if offline */
              });

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
  }, [syncWishlistFromBackend, applyBackendCart]);

  // 2. Persist local cache
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist, recent, user }));
    } catch {
      /* ignore */
    }
  }, [cart, wishlist, recent, user]);

  const addToCart = useCallback(
    (slug: string, qty = 1, size?: string, productSnapshot?: Product) => {
      const cleanSlug = slug.trim();
      if (!cleanSlug) return;

      const resolvedSize = size || productSnapshot?.sizes?.[0] || "Standard";

      // Immediately cache the real product snapshot so the bag displays the exact product right away
      if (productSnapshot) {
        upsertCatalogProducts([productSnapshot]);
      }

      setCart((c) => {
        const existingIdx = c.findIndex(
          (l) => l.slug.toLowerCase() === cleanSlug.toLowerCase() && l.size === resolvedSize,
        );
        if (existingIdx >= 0) {
          return c.map((l, idx) =>
            idx === existingIdx
              ? { ...l, qty: l.qty + qty, product: productSnapshot || l.product }
              : l,
          );
        }
        return [
          ...c,
          { slug: cleanSlug, qty, size: resolvedSize, product: productSnapshot },
        ];
      });
      setCartOpen(true);

      // Sync to backend MySQL cart if authenticated
      if (tokenStorage.get()) {
        customerApi
          .addToCart({ slug: cleanSlug, qty, size: resolvedSize })
          .then((res) => {
            applyBackendCart(res);
          })
          .catch((err: any) => {
            if (err?.status === 400 || err?.status === 404) {
              toast.error(err?.message || "Could not add item to bag");
              customerApi.getCart().then(applyBackendCart).catch(() => {});
            }
          });
      }
    },
    [upsertCatalogProducts, applyBackendCart],
  );

  const setQty = useCallback(
    (slug: string, qty: number, size?: string) => {
      const slugLower = slug.toLowerCase();
      const target = cartRef.current.find(
        (l) => l.slug.toLowerCase() === slugLower && (size ? l.size === size : true),
      );

      setCart((c) =>
        qty <= 0
          ? c.filter((l) => !(l.slug.toLowerCase() === slugLower && (size ? l.size === size : true)))
          : c.map((l) =>
              l.slug.toLowerCase() === slugLower && (size ? l.size === size : true)
                ? { ...l, qty }
                : l,
            ),
      );

      if (tokenStorage.get() && target?.id) {
        const req =
          qty <= 0
            ? customerApi.removeFromCart(target.id)
            : customerApi.updateCartQty(target.id, qty);
        req
          .then(applyBackendCart)
          .catch((err: any) => {
            if (err?.message) toast.error(err.message);
            customerApi.getCart().then(applyBackendCart).catch(() => {});
          });
      }
    },
    [applyBackendCart],
  );

  const removeFromCart = useCallback(
    (slug: string, size?: string) => {
      const slugLower = slug.toLowerCase();
      const targets = cartRef.current.filter(
        (l) => l.slug.toLowerCase() === slugLower && (size ? l.size === size : true),
      );

      setCart((c) =>
        c.filter((l) => !(l.slug.toLowerCase() === slugLower && (size ? l.size === size : true))),
      );

      if (tokenStorage.get() && targets.length > 0) {
        Promise.allSettled(
          targets.filter((t) => typeof t.id === "number").map((t) => customerApi.removeFromCart(t.id!)),
        )
          .then(() => customerApi.getCart())
          .then(applyBackendCart)
          .catch(() => {});
      }
    },
    [applyBackendCart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
    if (tokenStorage.get()) {
      customerApi.clearCart().catch(() => {});
    }
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug]));
    if (tokenStorage.get()) {
      customerApi.toggleWishlist(slug).catch(() => {
        /* optimistic */
      });
    }
  }, []);

  const addRecent = useCallback(
    (slug: string) => setRecent((r) => [slug, ...r.filter((s) => s !== slug)].slice(0, 8)),
    [],
  );

  const syncCartAfterAuth = useCallback(
    async (guestCart: CartLine[]) => {
      try {
        if (guestCart.length > 0) {
          const merged = await customerApi.mergeCart(
            guestCart.map((i) => ({ slug: i.slug, qty: i.qty, size: i.size || "Standard" })),
          );
          applyBackendCart(merged);
        } else {
          const dbCart = await customerApi.getCart();
          applyBackendCart(dbCart);
        }
      } catch {
        /* non-fatal */
      }
    },
    [applyBackendCart],
  );

  const login = useCallback(
    async (email: string, pass: string): Promise<User> => {
      const res = await authApi.login(email, pass);
      const authenticatedUser = normalizeAuthUser(res.user);
      setUser(authenticatedUser);

      await syncCartAfterAuth(cart);
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
    },
    [cart, wishlist, syncCartAfterAuth, syncWishlistFromBackend],
  );

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

      await syncCartAfterAuth(cart);
      void syncWishlistFromBackend(wishlist);

      return newUser;
    },
    [cart, wishlist, syncCartAfterAuth, syncWishlistFromBackend],
  );

  const loginWithGoogle = useCallback(
    async (payload: GoogleAuthPayload): Promise<User> => {
      const res = await authApi.loginWithGoogle(payload);
      const authedUser = normalizeAuthUser(res.user);
      setUser(authedUser);

      await syncCartAfterAuth(cart);
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
    [cart, wishlist, syncCartAfterAuth, syncWishlistFromBackend],
  );

  const loginWithFacebook = useCallback(
    async (payload: FacebookAuthPayload): Promise<User> => {
      const res = await authApi.loginWithFacebook(payload);
      const authedUser = normalizeAuthUser(res.user);
      setUser(authedUser);

      await syncCartAfterAuth(cart);
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
    [cart, wishlist, syncCartAfterAuth, syncWishlistFromBackend],
  );

  const updateUserProfile = useCallback(async (updates: ProfileUpdateInput) => {
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
    setCart([]);
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((ns) => ns.map((n) => ({ ...n, read: true })));
  }, []);

  // Pre-index flash sale items by lowercase slug for instant cart synchronization
  const flashPriceMap = useMemo(() => {
    const map: Record<string, { price: number; compareAt: number; discount: number }> = {};
    if (activeFlashSale && Array.isArray(activeFlashSale.items)) {
      for (const item of activeFlashSale.items) {
        if (item?.slug) {
          map[item.slug.toLowerCase()] = {
            price: Number(item.price),
            compareAt: Number(item.compareAt || item.price),
            discount: Number(item.discount || 0),
          };
        }
      }
    }
    return map;
  }, [activeFlashSale]);

  // Resolve cart lines strictly: Active Flash Deal price > line product snapshot > live DB catalog > static fallback
  const lines = useMemo(
    () =>
      cart
        .map((l) => {
          const slugKey = l.slug.toLowerCase();
          const baseProduct =
            l.product ||
            catalogMap[slugKey] ||
            PRODUCTS.find((p) => p.slug.toLowerCase() === slugKey);
          if (!baseProduct) return null;

          // Check if product is currently in active flash sale
          const flashDeal = flashPriceMap[slugKey];
          const product: Product = flashDeal
            ? {
                ...baseProduct,
                price: flashDeal.price,
                compareAt: flashDeal.compareAt || baseProduct.compareAt || baseProduct.price,
                badge: "Flash Sale",
              }
            : (l.product && typeof l.product.price === "number" ? l.product : baseProduct);

          return { product, qty: l.qty, size: l.size };
        })
        .filter(Boolean) as { product: Product; qty: number; size: string }[],
    [cart, catalogMap, flashPriceMap],
  );

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.product.price * l.qty, 0), [lines]);
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);

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

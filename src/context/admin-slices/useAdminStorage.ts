import { useState, useEffect } from "react";
import type {
  AdminProduct,
  AdminOrder,
  AdminCustomer,
  AdminDiscount,
  AdminCategory,
  AdminCollection,
  AdminBrand,
  AdminPreOrder,
  AdminBanner,
  AdminFeaturedVideo,
  AdminPageMeta,
  AdminReview,
  AdminFaq,
  AdminMerchandising,
  AdminSettings,
  AdminNotification,
  AdminActivityLog,
} from "@/types";

export const STORAGE_KEY = "gjsc_admin_state_v3";

interface StorageParams {
  products: AdminProduct[];
  setProducts: React.Dispatch<React.SetStateAction<AdminProduct[]>>;
  orders: AdminOrder[];
  setOrders: React.Dispatch<React.SetStateAction<AdminOrder[]>>;
  customers: AdminCustomer[];
  setCustomers: React.Dispatch<React.SetStateAction<AdminCustomer[]>>;
  discounts: AdminDiscount[];
  setDiscounts: React.Dispatch<React.SetStateAction<AdminDiscount[]>>;
  categories: AdminCategory[];
  setCategories: React.Dispatch<React.SetStateAction<AdminCategory[]>>;
  collections: AdminCollection[];
  setCollections: React.Dispatch<React.SetStateAction<AdminCollection[]>>;
  brands: AdminBrand[];
  setBrands: React.Dispatch<React.SetStateAction<AdminBrand[]>>;
  preOrders: AdminPreOrder[];
  setPreOrders: React.Dispatch<React.SetStateAction<AdminPreOrder[]>>;
  banners: AdminBanner[];
  setBanners: React.Dispatch<React.SetStateAction<AdminBanner[]>>;
  featuredVideos: AdminFeaturedVideo[];
  setFeaturedVideos: React.Dispatch<React.SetStateAction<AdminFeaturedVideo[]>>;
  pageMetas: AdminPageMeta[];
  setPageMetas: React.Dispatch<React.SetStateAction<AdminPageMeta[]>>;
  reviews: AdminReview[];
  setReviews: React.Dispatch<React.SetStateAction<AdminReview[]>>;
  faqs: AdminFaq[];
  setFaqs: React.Dispatch<React.SetStateAction<AdminFaq[]>>;
  merchandising: AdminMerchandising;
  setMerchandising: React.Dispatch<React.SetStateAction<AdminMerchandising>>;
  settings: AdminSettings;
  setSettings: React.Dispatch<React.SetStateAction<AdminSettings>>;
  notifications: AdminNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<AdminNotification[]>>;
  activityLogs: AdminActivityLog[];
  setActivityLogs: React.Dispatch<React.SetStateAction<AdminActivityLog[]>>;
}

export function useAdminStorage(params: StorageParams) {
  const [isLoaded, setIsLoaded] = useState(false);
  const {
    products,
    setProducts,
    orders,
    setOrders,
    customers,
    setCustomers,
    discounts,
    setDiscounts,
    categories,
    setCategories,
    collections,
    setCollections,
    brands,
    setBrands,
    preOrders,
    setPreOrders,
    banners,
    setBanners,
    featuredVideos,
    setFeaturedVideos,
    pageMetas,
    setPageMetas,
    reviews,
    setReviews,
    faqs,
    setFaqs,
    merchandising,
    setMerchandising,
    settings,
    setSettings,
    notifications,
    setNotifications,
    activityLogs,
    setActivityLogs,
  } = params;

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.products && Array.isArray(parsed.products)) {
          setProducts(
            parsed.products.map((prod: Partial<AdminProduct>) => ({
              ...prod,
              ingredients: Array.isArray(prod.ingredients)
                ? prod.ingredients
                : ["Sakura Extract", "Rice Ferment Filtrate", "Hyaluronic Acid"],
              benefits: Array.isArray(prod.benefits)
                ? prod.benefits
                : ["Deep 72-hour hydration", "Moisture barrier repair"],
              skinTypes: Array.isArray(prod.skinTypes) ? prod.skinTypes : ["All Skin Types"],
              concerns: Array.isArray(prod.concerns) ? prod.concerns : ["Hydration"],
              sizes: Array.isArray(prod.sizes) ? prod.sizes : ["50ml"],
              images:
                Array.isArray(prod.images) && prod.images.length > 0
                  ? prod.images
                  : [prod.image || ""],
              productType: prod.productType || "in-stock",
              origin: prod.origin || "Tokyo, Japan",
              texture: prod.texture || "Silky Essence / Milk",
              pao: prod.pao || "12M",
              lowStockThreshold:
                typeof prod.lowStockThreshold === "number" ? prod.lowStockThreshold : 5,
            })),
          );
        }
        if (parsed.orders && Array.isArray(parsed.orders)) {
          setOrders(
            parsed.orders.map((o: any) => ({
              ...o,
              shippingFee: typeof o.shippingFee === "number" && !isNaN(o.shippingFee) ? o.shippingFee : 60,
              timeline: Array.isArray(o.timeline) ? o.timeline : [],
              items: Array.isArray(o.items) ? o.items : [],
            }))
          );
        }
        if (parsed.customers) setCustomers(parsed.customers);
        if (parsed.discounts) setDiscounts(parsed.discounts);
        if (parsed.categories) setCategories(parsed.categories);
        if (parsed.collections) setCollections(parsed.collections);
        if (parsed.brands) setBrands(parsed.brands);
        if (parsed.preOrders) setPreOrders(parsed.preOrders);
        if (parsed.banners) setBanners(parsed.banners);
        if (
          parsed.featuredVideos &&
          Array.isArray(parsed.featuredVideos) &&
          parsed.featuredVideos.length > 0
        ) {
          setFeaturedVideos(parsed.featuredVideos);
        }
        if (parsed.pageMetas) setPageMetas(parsed.pageMetas);
        if (parsed.reviews) setReviews(parsed.reviews);
        if (parsed.faqs) setFaqs(parsed.faqs);
        if (parsed.merchandising) setMerchandising(parsed.merchandising);
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.activityLogs) setActivityLogs(parsed.activityLogs);
      }
    } catch (e) {
      console.warn("Could not load admin state from storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, [
    setProducts,
    setOrders,
    setCustomers,
    setDiscounts,
    setCategories,
    setCollections,
    setBrands,
    setPreOrders,
    setBanners,
    setFeaturedVideos,
    setPageMetas,
    setReviews,
    setFaqs,
    setMerchandising,
    setSettings,
    setNotifications,
    setActivityLogs,
  ]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          products,
          orders,
          customers,
          discounts,
          categories,
          collections,
          brands,
          preOrders,
          banners,
          featuredVideos,
          pageMetas,
          reviews,
          faqs,
          merchandising,
          settings,
          notifications,
          activityLogs,
        }),
      );
    } catch (e) {
      console.warn("Could not persist admin state", e);
    }
  }, [
    products,
    orders,
    customers,
    discounts,
    categories,
    collections,
    brands,
    preOrders,
    banners,
    featuredVideos,
    pageMetas,
    reviews,
    faqs,
    merchandising,
    settings,
    notifications,
    activityLogs,
    isLoaded,
  ]);

  return { isLoaded };
}

"use client";

import React, { createContext, useContext, useCallback } from "react";
import type {
  AdminProduct,
  AdminOrderItem,
  AdminOrderTimelineEvent,
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
import {
  AdminContextType,
  STORAGE_KEY,
  useActivityLogSlice,
  useProductSlice,
  useOrderSlice,
  useCatalogSlice,
  useMarketingSlice,
  useSystemSlice,
  useAdminStorage,
} from "./admin-slices";

export type {
  AdminProduct,
  AdminOrderItem,
  AdminOrderTimelineEvent,
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
  AdminContextType,
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { activityLogs, setActivityLogs, addActivityLog, resetActivityLogs } =
    useActivityLogSlice();

  const productSlice = useProductSlice(addActivityLog);
  const orderSlice = useOrderSlice(addActivityLog);
  const catalogSlice = useCatalogSlice(addActivityLog);
  const marketingSlice = useMarketingSlice(addActivityLog);
  const systemSlice = useSystemSlice(addActivityLog);

  useAdminStorage({
    products: productSlice.products,
    setProducts: productSlice.setProducts,
    orders: orderSlice.orders,
    setOrders: orderSlice.setOrders,
    customers: orderSlice.customers,
    setCustomers: orderSlice.setCustomers,
    discounts: marketingSlice.discounts,
    setDiscounts: marketingSlice.setDiscounts,
    categories: catalogSlice.categories,
    setCategories: catalogSlice.setCategories,
    collections: catalogSlice.collections,
    setCollections: catalogSlice.setCollections,
    brands: catalogSlice.brands,
    setBrands: catalogSlice.setBrands,
    preOrders: catalogSlice.preOrders,
    setPreOrders: catalogSlice.setPreOrders,
    banners: marketingSlice.banners,
    setBanners: marketingSlice.setBanners,
    featuredVideos: marketingSlice.featuredVideos,
    setFeaturedVideos: marketingSlice.setFeaturedVideos,
    pageMetas: systemSlice.pageMetas,
    setPageMetas: systemSlice.setPageMetas,
    reviews: systemSlice.reviews,
    setReviews: systemSlice.setReviews,
    faqs: systemSlice.faqs,
    setFaqs: systemSlice.setFaqs,
    merchandising: systemSlice.merchandising,
    setMerchandising: systemSlice.setMerchandising,
    settings: systemSlice.settings,
    setSettings: systemSlice.setSettings,
    notifications: systemSlice.notifications,
    setNotifications: systemSlice.setNotifications,
    activityLogs,
    setActivityLogs,
  });

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    productSlice.resetProducts();
    orderSlice.resetOrders();
    orderSlice.resetCustomers();
    marketingSlice.resetDiscounts();
    catalogSlice.resetCategories();
    catalogSlice.resetCollections();
    catalogSlice.resetBrands();
    catalogSlice.resetPreOrders();
    marketingSlice.resetBanners();
    marketingSlice.resetFeaturedVideos();
    systemSlice.resetPageMetas();
    systemSlice.resetReviews();
    systemSlice.resetFaqs();
    systemSlice.resetMerchandising();
    systemSlice.resetSettings();
    systemSlice.resetNotifications();
    resetActivityLogs();
    addActivityLog("Factory Reset", "Restored complete store demo dataset");
  }, [
    productSlice,
    orderSlice,
    catalogSlice,
    marketingSlice,
    systemSlice,
    resetActivityLogs,
    addActivityLog,
  ]);

  return (
    <AdminContext.Provider
      value={{
        // Products
        products: productSlice.products,
        addProduct: productSlice.addProduct,
        updateProduct: productSlice.updateProduct,
        deleteProduct: productSlice.deleteProduct,
        duplicateProduct: productSlice.duplicateProduct,
        bulkUpdateProducts: productSlice.bulkUpdateProducts,
        bulkDeleteProducts: productSlice.bulkDeleteProducts,
        adjustStock: productSlice.adjustStock,

        // Orders & Customers
        orders: orderSlice.orders,
        customers: orderSlice.customers,
        addOrder: orderSlice.addOrder,
        updateOrderStatus: orderSlice.updateOrderStatus,
        updateOrderPayment: orderSlice.updateOrderPayment,
        assignCourier: orderSlice.assignCourier,
        addOrderNote: orderSlice.addOrderNote,
        deleteOrder: orderSlice.deleteOrder,
        addCustomer: orderSlice.addCustomer,
        updateCustomer: orderSlice.updateCustomer,
        deleteCustomer: orderSlice.deleteCustomer,

        // Catalog (Categories, Collections, Brands, Pre-Orders)
        categories: catalogSlice.categories,
        collections: catalogSlice.collections,
        brands: catalogSlice.brands,
        preOrders: catalogSlice.preOrders,
        addCategory: catalogSlice.addCategory,
        updateCategory: catalogSlice.updateCategory,
        deleteCategory: catalogSlice.deleteCategory,
        addCollection: catalogSlice.addCollection,
        updateCollection: catalogSlice.updateCollection,
        deleteCollection: catalogSlice.deleteCollection,
        addBrand: catalogSlice.addBrand,
        updateBrand: catalogSlice.updateBrand,
        deleteBrand: catalogSlice.deleteBrand,
        addPreOrder: catalogSlice.addPreOrder,
        updatePreOrder: catalogSlice.updatePreOrder,
        deletePreOrder: catalogSlice.deletePreOrder,

        // Marketing (Discounts, Banners, Videos)
        discounts: marketingSlice.discounts,
        banners: marketingSlice.banners,
        featuredVideos: marketingSlice.featuredVideos,
        addDiscount: marketingSlice.addDiscount,
        toggleDiscount: marketingSlice.toggleDiscount,
        deleteDiscount: marketingSlice.deleteDiscount,
        addBanner: marketingSlice.addBanner,
        updateBanner: marketingSlice.updateBanner,
        deleteBanner: marketingSlice.deleteBanner,
        addFeaturedVideo: marketingSlice.addFeaturedVideo,
        updateFeaturedVideo: marketingSlice.updateFeaturedVideo,
        deleteFeaturedVideo: marketingSlice.deleteFeaturedVideo,
        toggleFeaturedVideo: marketingSlice.toggleFeaturedVideo,
        reorderFeaturedVideos: marketingSlice.reorderFeaturedVideos,

        // System & Content
        pageMetas: systemSlice.pageMetas,
        reviews: systemSlice.reviews,
        faqs: systemSlice.faqs,
        merchandising: systemSlice.merchandising,
        settings: systemSlice.settings,
        notifications: systemSlice.notifications,
        unreadNotifCount: systemSlice.unreadNotifCount,
        updatePageMeta: systemSlice.updatePageMeta,
        updateReviewStatus: systemSlice.updateReviewStatus,
        replyReview: systemSlice.replyReview,
        deleteReview: systemSlice.deleteReview,
        addFaq: systemSlice.addFaq,
        updateFaq: systemSlice.updateFaq,
        deleteFaq: systemSlice.deleteFaq,
        updateMerchandising: systemSlice.updateMerchandising,
        updateSettings: systemSlice.updateSettings,
        markNotificationRead: systemSlice.markNotificationRead,
        markAllNotificationsRead: systemSlice.markAllNotificationsRead,
        clearNotifications: systemSlice.clearNotifications,

        // Activity Logs & Reset
        activityLogs,
        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}

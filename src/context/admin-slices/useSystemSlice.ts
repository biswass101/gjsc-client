import { useState, useCallback, useEffect } from "react";
import type {
  AdminPageMeta,
  AdminReview,
  AdminFaq,
  AdminMerchandising,
  AdminSettings,
  AdminNotification,
} from "@/types";
import {
  INITIAL_PAGE_METAS,
  INITIAL_REVIEWS,
  INITIAL_FAQS,
  INITIAL_MERCHANDISING,
  INITIAL_SETTINGS,
  INITIAL_NOTIFICATIONS,
} from "../admin-seed";
import type { AddActivityLogFn } from "./types";
import { adminApi, systemApi, tokenStorage } from "@/lib/api";

export function useSystemSlice(addActivityLog: AddActivityLogFn) {
  const [pageMetas, setPageMetas] = useState<AdminPageMeta[]>(INITIAL_PAGE_METAS);
  const [reviews, setReviews] = useState<AdminReview[]>(INITIAL_REVIEWS);
  const [faqs, setFaqs] = useState<AdminFaq[]>(INITIAL_FAQS);
  const [merchandising, setMerchandising] = useState<AdminMerchandising>(INITIAL_MERCHANDISING);
  const [settings, setSettings] = useState<AdminSettings>(INITIAL_SETTINGS);
  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS);

  // Refresh settings from database
  const refreshSettings = useCallback(async () => {
    try {
      const data = tokenStorage.get()
        ? await adminApi.getSettings().catch(() => systemApi.getSettings())
        : await systemApi.getSettings();
      if (data) {
        setSettings((prev) => ({ ...prev, ...data }));
        return data as AdminSettings;
      }
    } catch {
      /* non-fatal */
    }
    return settings;
  }, [settings]);

  // Sync settings from backend MySQL database on mount
  useEffect(() => {
    let isMounted = true;
    const fetcher = tokenStorage.get()
      ? adminApi.getSettings().catch(() => systemApi.getSettings())
      : systemApi.getSettings();

    fetcher
      .then((data) => {
        if (!isMounted || !data) return;
        setSettings((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // PAGE META ACTIONS
  const updatePageMeta = useCallback(
    (id: string, updates: Partial<AdminPageMeta>) => {
      setPageMetas((prev) =>
        prev.map((pm) =>
          pm.id === id
            ? { ...pm, ...updates, lastUpdated: new Date().toISOString().slice(0, 10) }
            : pm,
        ),
      );
      addActivityLog("Updated Page SEO/Content", id);
    },
    [addActivityLog],
  );

  // REVIEWS ACTIONS
  const updateReviewStatus = useCallback(
    (id: string, status: AdminReview["status"]) => {
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      addActivityLog("Moderated Review", id, `Status: ${status}`);
    },
    [addActivityLog],
  );

  const replyReview = useCallback(
    (id: string, reply: string) => {
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, adminReply: reply } : r)));
      addActivityLog("Replied to Review", id);
    },
    [addActivityLog],
  );

  const deleteReview = useCallback(
    (id: string) => {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      addActivityLog("Deleted Review", id);
    },
    [addActivityLog],
  );

  // FAQS ACTIONS
  const addFaq = useCallback(
    (faq: Omit<AdminFaq, "id">): AdminFaq => {
      const id = `faq-${Date.now()}`;
      const newFaq: AdminFaq = { ...faq, id };
      setFaqs((prev) => [newFaq, ...prev]);
      addActivityLog("Created FAQ", newFaq.question);
      return newFaq;
    },
    [addActivityLog],
  );

  const updateFaq = useCallback(
    (id: string, updates: Partial<AdminFaq>) => {
      setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
      addActivityLog("Updated FAQ", id);
    },
    [addActivityLog],
  );

  const deleteFaq = useCallback(
    (id: string) => {
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      addActivityLog("Deleted FAQ", id);
    },
    [addActivityLog],
  );

  // MERCHANDISING & SETTINGS
  const updateMerchandising = useCallback(
    (updates: Partial<AdminMerchandising>) => {
      setMerchandising((prev) => ({ ...prev, ...updates }));
      addActivityLog("Updated Merchandising", "Banners & Tickers");
    },
    [addActivityLog],
  );

  const updateSettings = useCallback(
    async (updates: Partial<AdminSettings>) => {
      setSettings((prev) => ({ ...prev, ...updates }));
      addActivityLog("Updated Settings", "Logistics & Payments");
      try {
        const persisted = await adminApi.updateSettings(updates);
        if (persisted) {
          setSettings((prev) => ({ ...prev, ...persisted }));
        }
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("gjsc_settings_synced", { detail: updates }));
          localStorage.setItem("gjsc_settings_timestamp", Date.now().toString());
        }
      } catch (err) {
        console.warn("Could not persist settings to backend:", err);
        throw err;
      }
    },
    [addActivityLog],
  );

  const updatePaymentSettings = useCallback(
    async (updates: Record<string, any>) => {
      setSettings((prev) => ({ ...prev, ...updates }));
      addActivityLog("Updated Payment Gateways", "COD, bKash, Nagad, Card");
      try {
        const persisted = await adminApi.updatePaymentSettings(updates);
        if (persisted) {
          setSettings((prev) => ({ ...prev, ...persisted }));
        }
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("gjsc_settings_synced", { detail: updates }));
          localStorage.setItem("gjsc_settings_timestamp", Date.now().toString());
        }
        return persisted;
      } catch (err) {
        console.warn("Could not persist payment settings to backend:", err);
        throw err;
      }
    },
    [addActivityLog],
  );

  // NOTIFICATIONS
  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const resetPageMetas = useCallback(() => setPageMetas(INITIAL_PAGE_METAS), []);
  const resetReviews = useCallback(() => setReviews(INITIAL_REVIEWS), []);
  const resetFaqs = useCallback(() => setFaqs(INITIAL_FAQS), []);
  const resetMerchandising = useCallback(() => setMerchandising(INITIAL_MERCHANDISING), []);
  const resetSettings = useCallback(() => setSettings(INITIAL_SETTINGS), []);
  const resetNotifications = useCallback(() => setNotifications(INITIAL_NOTIFICATIONS), []);

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return {
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
    unreadNotifCount,
    updatePageMeta,
    updateReviewStatus,
    replyReview,
    deleteReview,
    addFaq,
    updateFaq,
    deleteFaq,
    updateMerchandising,
    updateSettings,
    updatePaymentSettings,
    refreshSettings,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    resetPageMetas,
    resetReviews,
    resetFaqs,
    resetMerchandising,
    resetSettings,
    resetNotifications,
  };
}

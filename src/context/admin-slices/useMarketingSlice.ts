import { useState, useCallback } from "react";
import type { AdminDiscount, AdminBanner, AdminFeaturedVideo } from "@/types";
import { INITIAL_DISCOUNTS, INITIAL_BANNERS, INITIAL_FEATURED_VIDEOS } from "../admin-seed";
import type { AddActivityLogFn } from "./types";

export function useMarketingSlice(addActivityLog: AddActivityLogFn) {
  const [discounts, setDiscounts] = useState<AdminDiscount[]>(INITIAL_DISCOUNTS);
  const [banners, setBanners] = useState<AdminBanner[]>(INITIAL_BANNERS);
  const [featuredVideos, setFeaturedVideos] =
    useState<AdminFeaturedVideo[]>(INITIAL_FEATURED_VIDEOS);

  // DISCOUNT ACTIONS
  const addDiscount = useCallback(
    (input: Omit<AdminDiscount, "id" | "usageCount">): AdminDiscount => {
      const id = `disc-${Date.now()}`;
      const newDiscount: AdminDiscount = {
        ...input,
        id,
        code: input.code.toUpperCase().trim(),
        usageCount: 0,
      };
      setDiscounts((prev) => [newDiscount, ...prev]);
      addActivityLog("Created Coupon", newDiscount.code, `Value: ${newDiscount.value}`);
      return newDiscount;
    },
    [addActivityLog],
  );

  const toggleDiscount = useCallback((id: string) => {
    setDiscounts((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: d.status === "active" ? "expired" : "active" } : d,
      ),
    );
  }, []);

  const deleteDiscount = useCallback(
    (id: string) => {
      setDiscounts((prev) => prev.filter((d) => d.id !== id));
      addActivityLog("Deleted Coupon", id);
    },
    [addActivityLog],
  );

  // BANNERS ACTIONS
  const addBanner = useCallback(
    (banner: Omit<AdminBanner, "id">): AdminBanner => {
      const id = `ban-${Date.now()}`;
      const newBanner: AdminBanner = { ...banner, id };
      setBanners((prev) => [newBanner, ...prev]);
      addActivityLog("Created Banner", newBanner.title);
      return newBanner;
    },
    [addActivityLog],
  );

  const updateBanner = useCallback(
    (id: string, updates: Partial<AdminBanner>) => {
      setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
      addActivityLog("Updated Banner", id);
    },
    [addActivityLog],
  );

  const deleteBanner = useCallback(
    (id: string) => {
      setBanners((prev) => prev.filter((b) => b.id !== id));
      addActivityLog("Deleted Banner", id);
    },
    [addActivityLog],
  );

  // FEATURED VIDEOS ACTIONS
  const addFeaturedVideo = useCallback(
    (video: Omit<AdminFeaturedVideo, "id" | "createdAt">): AdminFeaturedVideo => {
      const id = `vid-${Date.now()}`;
      const newVideo: AdminFeaturedVideo = {
        ...video,
        id,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setFeaturedVideos((prev) => [newVideo, ...prev]);
      addActivityLog("Created Featured Video", newVideo.title, `Creator: ${newVideo.creatorName}`);
      return newVideo;
    },
    [addActivityLog],
  );

  const updateFeaturedVideo = useCallback(
    (id: string, updates: Partial<AdminFeaturedVideo>) => {
      setFeaturedVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)));
      addActivityLog("Updated Featured Video", id);
    },
    [addActivityLog],
  );

  const deleteFeaturedVideo = useCallback(
    (id: string) => {
      setFeaturedVideos((prev) => {
        const found = prev.find((v) => v.id === id);
        if (found) addActivityLog("Deleted Featured Video", found.title);
        return prev.filter((v) => v.id !== id);
      });
    },
    [addActivityLog],
  );

  const toggleFeaturedVideo = useCallback(
    (id: string) => {
      setFeaturedVideos((prev) => prev.map((v) => (v.id === id ? { ...v, active: !v.active } : v)));
      addActivityLog("Toggled Featured Video Visibility", id);
    },
    [addActivityLog],
  );

  const reorderFeaturedVideos = useCallback(
    (orderedIds: string[]) => {
      setFeaturedVideos((prev) => {
        const map = new Map(prev.map((v) => [v.id, v]));
        const result: AdminFeaturedVideo[] = [];
        orderedIds.forEach((id, index) => {
          const item = map.get(id);
          if (item) {
            result.push({ ...item, order: index + 1 });
            map.delete(id);
          }
        });
        map.forEach((item) => {
          result.push({ ...item, order: result.length + 1 });
        });
        return result;
      });
      addActivityLog("Reordered Featured Videos", `${orderedIds.length} videos`);
    },
    [addActivityLog],
  );

  const resetDiscounts = useCallback(() => setDiscounts(INITIAL_DISCOUNTS), []);
  const resetBanners = useCallback(() => setBanners(INITIAL_BANNERS), []);
  const resetFeaturedVideos = useCallback(() => setFeaturedVideos(INITIAL_FEATURED_VIDEOS), []);

  return {
    discounts,
    setDiscounts,
    banners,
    setBanners,
    featuredVideos,
    setFeaturedVideos,
    addDiscount,
    toggleDiscount,
    deleteDiscount,
    addBanner,
    updateBanner,
    deleteBanner,
    addFeaturedVideo,
    updateFeaturedVideo,
    deleteFeaturedVideo,
    toggleFeaturedVideo,
    reorderFeaturedVideos,
    resetDiscounts,
    resetBanners,
    resetFeaturedVideos,
  };
}

import { useState, useCallback, useEffect } from "react";
import type { AdminDiscount, AdminBanner, AdminFeaturedVideo } from "@/types";
import { INITIAL_DISCOUNTS, INITIAL_BANNERS, INITIAL_FEATURED_VIDEOS } from "../admin-seed";
import type { AddActivityLogFn } from "./types";
import { adminApi, systemApi } from "@/lib/api";
import { STORAGE_KEY } from "./useAdminStorage";

export function formatApiBanner(b: any): AdminBanner {
  return {
    id: String(b.id),
    pageKey: b.pageKey,
    pageTitle: b.pageTitle || "Storefront Banner",
    title: b.title || "",
    subtitle: b.subtitle ? String(b.subtitle) : undefined,
    badge: b.badge ? String(b.badge) : undefined,
    imageUrl: b.imageUrl,
    mobileImageUrl: b.mobileImageUrl ? String(b.mobileImageUrl) : undefined,
    ctaText: b.ctaText ? String(b.ctaText) : undefined,
    ctaLink: b.ctaLink ? String(b.ctaLink) : undefined,
    active: b.active !== false,
    order: Number(b.order || 1),
    gradient: b.gradient || undefined,
  };
}

export function formatApiVideo(v: any): AdminFeaturedVideo {

  return {
    id: String(v.id),
    title: v.title || "",
    caption: v.caption || "",
    creatorName: v.creatorName || "",
    creatorHandle: v.creatorHandle || "",
    creatorAvatar: v.creatorAvatar || "/hero/hero-with-japanese-girl.png",
    duration: v.duration || "0:45",
    views: String(v.views || "10K"),
    thumbnail: v.thumbnail || "/hero/hero-with-japanese-girl.png",
    videoUrl: v.videoUrl || undefined,
    product: {
      name: v.product?.name || v.productName || "Featured Product",
      slug: v.product?.slug || v.productSlug || "",
      brand: v.product?.brand || v.productBrand || "Glorious Japan",
      price: Number(v.product?.price || v.productPrice || 0),
      compareAt:
        v.product?.compareAt !== undefined && v.product?.compareAt !== null
          ? Number(v.product.compareAt)
          : v.productCompareAt !== undefined && v.productCompareAt !== null
            ? Number(v.productCompareAt)
            : undefined,
      image:
        v.product?.image ||
        v.productImage ||
        v.thumbnail ||
        "/hero/sakura-spa-skincare-trio.png",
    },
    active: v.active !== false,
    order: Number(v.order || 0),
    featured: Boolean(v.featured),
    createdAt: v.createdAt ? String(v.createdAt).slice(0, 10) : undefined,
  };
}

export function useMarketingSlice(addActivityLog: AddActivityLogFn) {
  const [discounts, setDiscounts] = useState<AdminDiscount[]>(INITIAL_DISCOUNTS);
  const [banners, setBanners] = useState<AdminBanner[]>(INITIAL_BANNERS);
  const [featuredVideos, setFeaturedVideos] =
    useState<AdminFeaturedVideo[]>(INITIAL_FEATURED_VIDEOS);

  // Sync featured videos from backend MySQL database on mount
  useEffect(() => {
    let isMounted = true;
    adminApi
      .getVideos()
      .then((videos) => {
        if (!isMounted || !Array.isArray(videos) || videos.length === 0) return;
        const formatted = videos.map(formatApiVideo);
        setFeaturedVideos(formatted);
      })
      .catch((err) => {
        console.warn(
          "Could not fetch videos from backend, using seed fallback:",
          err?.message || err,
        );
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync banners from localStorage on client mount, then from backend MySQL database
  useEffect(() => {
    let isMounted = true;

    // 1. Immediately hydrate from localStorage after mount (client-side only, avoiding SSR hydration mismatch)
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.banners) && parsed.banners.length > 0) {
          setBanners(parsed.banners);
        }
      }
    } catch {}

    // 2. Fetch fresh data from backend MySQL database
    adminApi
      .getBanners()
      .catch(() => systemApi.getBanners())
      .then((data) => {
        if (!isMounted || !Array.isArray(data) || data.length === 0) return;
        const formatted = data.map(formatApiBanner);
        setBanners(formatted);
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          const current = raw ? JSON.parse(raw) : {};
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, banners: formatted }));
        } catch (e) {
          console.warn("Could not cache banners to storage:", e);
        }
      })
      .catch((err) => {
        console.warn(
          "Could not fetch banners from backend, using seed fallback:",
          err?.message || err,
        );
      });

    return () => {
      isMounted = false;
    };
  }, []);



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
    async (banner: Omit<AdminBanner, "id">): Promise<AdminBanner> => {
      const tempId = `ban-${Date.now()}`;
      const newBanner: AdminBanner = { ...banner, id: tempId };
      setBanners((prev) => {
        const next = [newBanner, ...prev];
        if (typeof window !== "undefined") {
          try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const current = raw ? JSON.parse(raw) : {};
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, banners: next }));
          } catch {}
        }
        return next;
      });
      addActivityLog("Created Banner", newBanner.title || newBanner.pageTitle);

      try {
        const saved = await adminApi.createBanner({
          pageKey: banner.pageKey,
          pageTitle: banner.pageTitle,
          title: banner.title,
          subtitle: banner.subtitle,
          badge: banner.badge,
          imageUrl: banner.imageUrl,
          mobileImageUrl: banner.mobileImageUrl,
          ctaText: banner.ctaText,
          ctaLink: banner.ctaLink,
          active: banner.active,
          order: banner.order,
          gradient: banner.gradient,
        });
        if (saved && (saved.id || saved.numericId)) {
          const formatted = formatApiBanner(saved);
          setBanners((prev) => {
            const next = prev.map((item) => (item.id === tempId ? formatted : item));
            if (typeof window !== "undefined") {
              try {
                const raw = localStorage.getItem(STORAGE_KEY);
                const current = raw ? JSON.parse(raw) : {};
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, banners: next }));
              } catch {}
            }
            return next;
          });
          return formatted;
        }
      } catch (err) {
        console.error("Failed to persist banner to MySQL backend:", err);
      }

      return newBanner;
    },
    [addActivityLog],
  );

  const updateBanner = useCallback(
    async (id: string, updates: Partial<AdminBanner>) => {
      // 1. Optimistically update state and localStorage immediately
      setBanners((prev) => {
        const next = prev.map((b) => (b.id === id ? { ...b, ...updates } : b));
        if (typeof window !== "undefined") {
          try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const current = raw ? JSON.parse(raw) : {};
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, banners: next }));
          } catch {}
        }
        return next;
      });
      addActivityLog("Updated Banner", id);

      const targetBanner = banners.find((b) => b.id === id);
      const merged = {
        ...(targetBanner || {}),
        ...updates,
      };

      const cleanPayload = {
        pageKey: merged.pageKey,
        pageTitle: merged.pageTitle,
        title: merged.title ?? "",
        subtitle: updates.subtitle !== undefined ? updates.subtitle : merged.subtitle ?? null,
        badge: updates.badge !== undefined ? updates.badge : merged.badge ?? null,
        imageUrl: merged.imageUrl,
        mobileImageUrl: updates.mobileImageUrl !== undefined ? updates.mobileImageUrl : merged.mobileImageUrl ?? null,
        ctaText: updates.ctaText !== undefined ? updates.ctaText : merged.ctaText ?? null,
        ctaLink: updates.ctaLink !== undefined ? updates.ctaLink : merged.ctaLink ?? null,
        active: merged.active,
        order: merged.order,
        gradient: updates.gradient !== undefined ? updates.gradient : merged.gradient ?? null,
      };

      const numericId = parseInt(id, 10);
      const apiId = !isNaN(numericId) && /^\d+$/.test(id.trim()) ? numericId : id;

      try {
        const saved = await adminApi.updateBanner(apiId, cleanPayload);
        if (saved && (saved.id || saved.numericId)) {
          const formatted = formatApiBanner(saved);
          setBanners((prev) => {
            const next = prev.map((item) => (item.id === id ? formatted : item));
            if (typeof window !== "undefined") {
              try {
                const raw = localStorage.getItem(STORAGE_KEY);
                const current = raw ? JSON.parse(raw) : {};
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, banners: next }));
              } catch {}
            }
            return next;
          });
        }
      } catch (err) {
        console.error(`Failed to update banner #${id} in backend:`, err);
      }
    },
    [banners, addActivityLog],
  );

  const deleteBanner = useCallback(
    async (id: string) => {
      setBanners((prev) => {
        const found = prev.find((b) => b.id === id);
        if (found) addActivityLog("Deleted Banner", found.title || found.pageTitle);
        const next = prev.filter((b) => b.id !== id);
        if (typeof window !== "undefined") {
          try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const current = raw ? JSON.parse(raw) : {};
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, banners: next }));
          } catch {}
        }
        return next;
      });

      const numericId = parseInt(id, 10);
      const apiId = !isNaN(numericId) && /^\d+$/.test(id.trim()) ? numericId : id;
      try {
        await adminApi.deleteBanner(apiId);
      } catch (err) {
        console.error(`Failed to delete banner #${id} in backend:`, err);
      }
    },
    [addActivityLog],
  );


  // FEATURED VIDEOS ACTIONS
  const addFeaturedVideo = useCallback(
    (video: Omit<AdminFeaturedVideo, "id" | "createdAt">): AdminFeaturedVideo => {
      const tempId = `vid-${Date.now()}`;
      const newVideo: AdminFeaturedVideo = {
        ...video,
        id: tempId,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setFeaturedVideos((prev) => [newVideo, ...prev]);
      addActivityLog("Created Featured Video", newVideo.title, `Creator: ${newVideo.creatorName}`);

      // Persist to backend database
      adminApi
        .createVideo({
          title: video.title,
          caption: video.caption,
          creatorName: video.creatorName,
          creatorHandle: video.creatorHandle,
          creatorAvatar: video.creatorAvatar,
          duration: video.duration,
          views: video.views,
          thumbnail: video.thumbnail,
          videoUrl: video.videoUrl,
          productSlug: video.product.slug,
          productName: video.product.name,
          productBrand: video.product.brand,
          productPrice: video.product.price,
          productCompareAt: video.product.compareAt,
          productImage: video.product.image,
          active: video.active,
          featured: video.featured,
          order: video.order,
        })
        .then((saved) => {
          if (saved && (saved.id || saved.numericId)) {
            const formatted = formatApiVideo(saved);
            setFeaturedVideos((prev) =>
              prev.map((item) => (item.id === tempId ? formatted : item)),
            );
          }
        })
        .catch((err) => {
          console.error("Failed to persist video to MySQL backend:", err);
        });

      return newVideo;
    },
    [addActivityLog],
  );

  const updateFeaturedVideo = useCallback(
    (id: string, updates: Partial<AdminFeaturedVideo>) => {
      setFeaturedVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)));
      addActivityLog("Updated Featured Video", id);

      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        const payload: any = {};
        if (updates.title !== undefined) payload.title = updates.title;
        if (updates.caption !== undefined) payload.caption = updates.caption;
        if (updates.creatorName !== undefined) payload.creatorName = updates.creatorName;
        if (updates.creatorHandle !== undefined) payload.creatorHandle = updates.creatorHandle;
        if (updates.creatorAvatar !== undefined) payload.creatorAvatar = updates.creatorAvatar;
        if (updates.duration !== undefined) payload.duration = updates.duration;
        if (updates.views !== undefined) payload.views = updates.views;
        if (updates.thumbnail !== undefined) payload.thumbnail = updates.thumbnail;
        if (updates.videoUrl !== undefined) payload.videoUrl = updates.videoUrl;
        if (updates.active !== undefined) payload.active = updates.active;
        if (updates.featured !== undefined) payload.featured = updates.featured;
        if (updates.order !== undefined) payload.order = updates.order;
        if (updates.product) {
          payload.productSlug = updates.product.slug;
          payload.productName = updates.product.name;
          payload.productBrand = updates.product.brand;
          payload.productPrice = updates.product.price;
          payload.productCompareAt = updates.product.compareAt;
          payload.productImage = updates.product.image;
        }

        adminApi.updateVideo(numericId, payload).catch((err) => {
          console.error(`Failed to update video #${id} in backend:`, err);
        });
      }
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

      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        adminApi.deleteVideo(numericId).catch((err) => {
          console.error(`Failed to delete video #${id} in backend:`, err);
        });
      }
    },
    [addActivityLog],
  );

  const toggleFeaturedVideo = useCallback(
    (id: string) => {
      let newActive = true;
      setFeaturedVideos((prev) =>
        prev.map((v) => {
          if (v.id === id) {
            newActive = !v.active;
            return { ...v, active: newActive };
          }
          return v;
        }),
      );
      addActivityLog("Toggled Featured Video Visibility", id);

      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        adminApi.updateVideo(numericId, { active: newActive }).catch((err) => {
          console.error(`Failed to toggle video #${id} in backend:`, err);
        });
      }
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
            const updated = { ...item, order: index + 1 };
            result.push(updated);
            map.delete(id);

            const numericId = parseInt(id, 10);
            if (!isNaN(numericId)) {
              adminApi.updateVideo(numericId, { order: index + 1 }).catch((err) => {
                console.error(`Failed to persist order for video #${id}:`, err);
              });
            }
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

  const syncBannersFromDatabase = useCallback(async (): Promise<AdminBanner[] | null> => {
    try {
      const data = await adminApi.getBanners().catch(() => systemApi.getBanners());
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map(formatApiBanner);
        setBanners(formatted);
        return formatted;
      }
      return null;
    } catch (err: any) {
      console.warn("Could not sync banners from database:", err?.message || err);
      return null;
    }
  }, []);

  // Auto-sync banners from MySQL database on initial mount
  useEffect(() => {
    syncBannersFromDatabase();
  }, [syncBannersFromDatabase]);

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
    syncBannersFromDatabase,
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

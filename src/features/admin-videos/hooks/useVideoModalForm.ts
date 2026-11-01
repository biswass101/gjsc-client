"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { AdminFeaturedVideo, AdminProduct } from "@/context/admin-context";
import { AVATAR_PRESETS, THUMBNAIL_PRESETS, SAMPLE_VIDEO_PRESETS } from "../data/videoConstants";

export function useVideoModalForm(
  products: AdminProduct[],
  addFeaturedVideo: (video: Omit<AdminFeaturedVideo, "id">) => void,
  updateFeaturedVideo: (id: string, updates: Partial<AdminFeaturedVideo>) => void,
) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<AdminFeaturedVideo | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [creatorHandle, setCreatorHandle] = useState("");
  const [creatorAvatar, setCreatorAvatar] = useState(AVATAR_PRESETS[0]?.url || "");
  const [duration, setDuration] = useState("0:45");
  const [views, setViews] = useState("50.0K");
  const [thumbnail, setThumbnail] = useState(THUMBNAIL_PRESETS[0]?.url || "");
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedProductSlug, setSelectedProductSlug] = useState("");
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productPrice, setProductPrice] = useState("4500");
  const [productCompareAt, setProductCompareAt] = useState("5500");
  const [productImage, setProductImage] = useState("");
  const [active, setActive] = useState(true);
  const [order, setOrder] = useState("1");
  const [featured, setFeatured] = useState(false);

  // Handle product dropdown selection
  const handleSelectProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    const found = products.find((p) => p.slug === slug);
    if (found) {
      setProductName(found.name);
      setProductBrand(found.brand);
      setProductPrice(String(found.price));
      setProductCompareAt(found.compareAt ? String(found.compareAt) : "");
      setProductImage(found.image);
    }
  };

  const openCreateModal = (totalCount: number) => {
    setEditingVideo(null);
    setTitle("");
    setCaption("");
    setCreatorName("Ayesha Rahman");
    setCreatorHandle("@ayesha_glows");
    setCreatorAvatar(AVATAR_PRESETS[0]?.url || "");
    setDuration("0:45");
    setViews("52.8K");
    setThumbnail(THUMBNAIL_PRESETS[0]?.url || "");
    setVideoUrl(SAMPLE_VIDEO_PRESETS[0]?.url || "");

    const firstProd = products[0];
    if (firstProd) {
      setSelectedProductSlug(firstProd.slug);
      setProductName(firstProd.name);
      setProductBrand(firstProd.brand);
      setProductPrice(String(firstProd.price));
      setProductCompareAt(firstProd.compareAt ? String(firstProd.compareAt) : "");
      setProductImage(firstProd.image);
    } else {
      setSelectedProductSlug("sakura-radiance-serum");
      setProductName("Sakura Radiance Serum");
      setProductBrand("Glorious Japan");
      setProductPrice("4850");
      setProductCompareAt("5900");
      setProductImage("/hero/sakura-spa-skincare-trio.png");
    }

    setActive(true);
    setOrder(String(totalCount + 1));
    setFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (video: AdminFeaturedVideo) => {
    setEditingVideo(video);
    setTitle(video.title);
    setCaption(video.caption);
    setCreatorName(video.creatorName);
    setCreatorHandle(video.creatorHandle);
    setCreatorAvatar(video.creatorAvatar);
    setDuration(video.duration);
    setViews(video.views);
    setThumbnail(video.thumbnail);
    setVideoUrl(video.videoUrl || "");
    setSelectedProductSlug(video.product.slug);
    setProductName(video.product.name);
    setProductBrand(video.product.brand);
    setProductPrice(String(video.product.price));
    setProductCompareAt(video.product.compareAt ? String(video.product.compareAt) : "");
    setProductImage(video.product.image);
    setActive(video.active !== false);
    setOrder(String(video.order ?? 1));
    setFeatured(!!video.featured);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a video title.");
      return;
    }
    if (!creatorName.trim()) {
      toast.error("Please enter the creator's name.");
      return;
    }
    if (!productName.trim()) {
      toast.error("Please provide a tagged product.");
      return;
    }

    const payload = {
      title: title.trim(),
      caption:
        caption.trim() || `Verified review by ${creatorName.trim()} for ${productName.trim()}`,
      creatorName: creatorName.trim(),
      creatorHandle: creatorHandle.trim().startsWith("@")
        ? creatorHandle.trim()
        : `@${creatorHandle.trim()}`,
      creatorAvatar: creatorAvatar.trim() || AVATAR_PRESETS[0]?.url || "",
      duration: duration.trim() || "0:45",
      views: views.trim() || "10.0K",
      thumbnail: thumbnail.trim() || THUMBNAIL_PRESETS[0]?.url || "",
      videoUrl: videoUrl.trim() || undefined,
      product: {
        name: productName.trim(),
        slug: selectedProductSlug.trim() || productName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        brand: productBrand.trim() || "Glorious Japan",
        price: parseInt(productPrice, 10) || 3500,
        compareAt: productCompareAt ? parseInt(productCompareAt, 10) : undefined,
        image: productImage.trim() || thumbnail.trim(),
      },
      active,
      order: parseInt(order, 10) || 1,
      featured,
    };

    if (editingVideo) {
      updateFeaturedVideo(editingVideo.id, payload);
      toast.success("Featured video reel updated! 🌸");
    } else {
      addFeaturedVideo(payload);
      toast.success("New featured video added to homepage! 🌸");
    }

    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    editingVideo,
    title,
    setTitle,
    caption,
    setCaption,
    creatorName,
    setCreatorName,
    creatorHandle,
    setCreatorHandle,
    creatorAvatar,
    setCreatorAvatar,
    duration,
    setDuration,
    views,
    setViews,
    thumbnail,
    setThumbnail,
    videoUrl,
    setVideoUrl,
    selectedProductSlug,
    productName,
    setProductName,
    productBrand,
    setProductBrand,
    productPrice,
    setProductPrice,
    productCompareAt,
    setProductCompareAt,
    productImage,
    setProductImage,
    active,
    setActive,
    order,
    setOrder,
    featured,
    setFeatured,
    handleSelectProduct,
    openCreateModal,
    openEditModal,
    handleSave,
  };
}

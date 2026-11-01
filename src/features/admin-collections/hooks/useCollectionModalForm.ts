import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { AdminCollection } from "@/types";
import { THEME_COLORS, DEFAULT_BANNERS } from "../constants";

interface UseCollectionModalFormProps {
  addCollection: (col: Omit<AdminCollection, "id">) => AdminCollection;
  updateCollection: (id: string, updates: Partial<AdminCollection>) => void;
}

export function useCollectionModalForm({
  addCollection,
  updateCollection,
}: UseCollectionModalFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<AdminCollection | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [japaneseTitle, setJapaneseTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [badgeText, setBadgeText] = useState("");
  const [bannerImage, setBannerImage] = useState(DEFAULT_BANNERS[0] || "");
  const [themeColor, setThemeColor] = useState(THEME_COLORS[0]?.hex || "#e11d48");
  const [featured, setFeatured] = useState(false);
  const [itemCount, setItemCount] = useState("12");

  const [frequentlySearched, setFrequentlySearched] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState("");

  const openCreateModal = useCallback(() => {
    setEditingCollection(null);
    setTitle("");
    setSlug("");
    setJapaneseTitle("");
    setTagline("");
    setDescription("");
    setBadgeText("Curated Ritual");
    setBannerImage(DEFAULT_BANNERS[Math.floor(Math.random() * DEFAULT_BANNERS.length)] || "");
    setThemeColor(THEME_COLORS[0]?.hex || "#e11d48");
    setFeatured(false);
    setItemCount("12");
    setFrequentlySearched(["Glass Skin", "Hyaluronic Acid", "Essence"]);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((col: AdminCollection) => {
    setEditingCollection(col);
    setTitle(col.title);
    setSlug(col.slug);
    setJapaneseTitle(col.japaneseTitle || "");
    setTagline(col.tagline);
    setDescription(col.description);
    setBadgeText(col.badgeText || "");
    setBannerImage(col.bannerImage);
    setThemeColor(col.themeColor || "#e11d48");
    setFeatured(col.featured);
    setItemCount(String(col.itemCount));
    setFrequentlySearched([...col.frequentlySearched]);
    setIsModalOpen(true);
  }, []);

  const handleTitleChange = useCallback(
    (val: string) => {
      setTitle(val);
      if (!editingCollection) {
        setSlug(
          val
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-"),
        );
      }
    },
    [editingCollection],
  );

  const handleAddTag = useCallback(() => {
    const trimmed = newTagInput.trim();
    if (!trimmed) return;
    if (frequentlySearched.includes(trimmed)) {
      toast.error("Tag keyword already added!");
      return;
    }
    setFrequentlySearched((prev) => [...prev, trimmed]);
    setNewTagInput("");
  }, [newTagInput, frequentlySearched]);

  const handleRemoveTag = useCallback((tag: string) => {
    setFrequentlySearched((prev) => prev.filter((t) => t !== tag));
  }, []);

  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim()) {
        toast.error("Collection title is required.");
        return;
      }
      if (!slug.trim()) {
        toast.error("Slug identifier is required.");
        return;
      }

      if (editingCollection) {
        updateCollection(editingCollection.id, {
          title: title.trim(),
          slug: slug.trim(),
          japaneseTitle: japaneseTitle.trim() || undefined,
          tagline: tagline.trim() || "Exclusive Japanese Beauty Curation",
          description: description.trim() || "Authentic skincare regimens directly from Tokyo.",
          badgeText: badgeText.trim() || undefined,
          bannerImage: bannerImage.trim() || DEFAULT_BANNERS[0] || "",
          themeColor,
          frequentlySearched,
          featured,
          itemCount: parseInt(itemCount, 10) || 0,
        });
        toast.success(`Collection "${title}" updated! 🌸`);
      } else {
        addCollection({
          title: title.trim(),
          slug: slug.trim(),
          japaneseTitle: japaneseTitle.trim() || undefined,
          tagline: tagline.trim() || "Exclusive Japanese Beauty Curation",
          description: description.trim() || "Authentic skincare regimens directly from Tokyo.",
          badgeText: badgeText.trim() || undefined,
          bannerImage: bannerImage.trim() || DEFAULT_BANNERS[0] || "",
          themeColor,
          frequentlySearched,
          featured,
          itemCount: parseInt(itemCount, 10) || 0,
        });
        toast.success(`Collection "${title}" created and published! 🌸`);
      }

      setIsModalOpen(false);
    },
    [
      title,
      slug,
      japaneseTitle,
      tagline,
      description,
      badgeText,
      bannerImage,
      themeColor,
      frequentlySearched,
      featured,
      itemCount,
      editingCollection,
      updateCollection,
      addCollection,
    ],
  );

  return {
    isModalOpen,
    setIsModalOpen,
    editingCollection,
    openCreateModal,
    openEditModal,
    handleTitleChange,
    handleAddTag,
    handleRemoveTag,
    handleSave,
    title,
    setTitle,
    slug,
    setSlug,
    japaneseTitle,
    setJapaneseTitle,
    tagline,
    setTagline,
    description,
    setDescription,
    badgeText,
    setBadgeText,
    bannerImage,
    setBannerImage,
    themeColor,
    setThemeColor,
    featured,
    setFeatured,
    itemCount,
    setItemCount,
    frequentlySearched,
    newTagInput,
    setNewTagInput,
  };
}

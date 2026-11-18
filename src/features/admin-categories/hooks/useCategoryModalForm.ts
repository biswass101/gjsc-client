import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { AdminCategory } from "@/types";
import { PARENT_CATEGORIES, DEFAULT_IMAGES } from "../constants";

interface UseCategoryModalFormProps {
  addCategory: (cat: Omit<AdminCategory, "id">) => Promise<AdminCategory> | AdminCategory;
  updateCategory: (id: string, updates: Partial<AdminCategory>) => Promise<void> | void;
}

export function useCategoryModalForm({ addCategory, updateCategory }: UseCategoryModalFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [japaneseTitle, setJapaneseTitle] = useState("");
  const [parentCategory, setParentCategory] = useState(PARENT_CATEGORIES[0] || "Skincare");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(DEFAULT_IMAGES[0] || "");
  const [bannerImage, setBannerImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [itemCount, setItemCount] = useState("12");

  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [newSubcatInput, setNewSubcatInput] = useState("");

  const [metaDescription, setMetaDescription] = useState("");
  const [icon, setIcon] = useState("Sparkles");
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState("");
  const [ritualStepNumber, setRitualStepNumber] = useState("");
  const [ritualStepLabel, setRitualStepLabel] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);

  const openCreateModal = useCallback(() => {
    setEditingCategory(null);
    setTitle("");
    setSlug("");
    setJapaneseTitle("");
    setParentCategory(PARENT_CATEGORIES[0] || "Skincare");
    setTagline("");
    setDescription("");
    setMetaDescription("");
    setIcon("Sparkles");
    setImage(DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)] || "");
    setBannerImage("");
    setFeatured(false);
    setItemCount("10");
    setSubcategories(["Serum", "Moisturizer", "Cleanser"]);
    setPopularTags(["Japanese Ritual", "Barrier Care"]);
    setRitualStepNumber("");
    setRitualStepLabel("");
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((cat: AdminCategory) => {
    setEditingCategory(cat);
    setTitle(cat.title);
    setSlug(cat.slug);
    setJapaneseTitle(cat.japaneseTitle || "");
    setParentCategory(cat.parentCategory);
    setTagline(cat.tagline);
    setDescription(cat.description);
    setMetaDescription(cat.metaDescription || "");
    setIcon(cat.icon || "Sparkles");
    setImage(cat.image);
    setBannerImage(cat.bannerImage || "");
    setFeatured(cat.featured);
    setItemCount(String(cat.itemCount));
    setSubcategories([...cat.subcategories]);
    setPopularTags(cat.popularTags ? [...cat.popularTags] : []);
    setRitualStepNumber(cat.ritualStep?.step || "");
    setRitualStepLabel(cat.ritualStep?.label || "");
    setIsModalOpen(true);
  }, []);

  const handleTitleChange = useCallback(
    (val: string) => {
      setTitle(val);
      if (!editingCategory) {
        setSlug(
          val
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-"),
        );
      }
    },
    [editingCategory],
  );

  const handleAddSubcat = useCallback(() => {
    const trimmed = newSubcatInput.trim();
    if (!trimmed) return;
    if (subcategories.includes(trimmed)) {
      toast.error("Subcategory already added!");
      return;
    }
    setSubcategories((prev) => [...prev, trimmed]);
    setNewSubcatInput("");
  }, [newSubcatInput, subcategories]);

  const handleRemoveSubcat = useCallback((sub: string) => {
    setSubcategories((prev) => prev.filter((s) => s !== sub));
  }, []);

  const handleAddTag = useCallback(() => {
    const trimmed = newTagInput.trim();
    if (!trimmed) return;
    if (popularTags.includes(trimmed)) {
      toast.error("Tag already added!");
      return;
    }
    setPopularTags((prev) => [...prev, trimmed]);
    setNewTagInput("");
  }, [newTagInput, popularTags]);

  const handleRemoveTag = useCallback((tag: string) => {
    setPopularTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const handleFileUpload = useCallback(
    async (file: File, target: "image" | "banner") => {
      const isBanner = target === "banner";
      if (isBanner) setIsUploadingBanner(true);
      else setIsUploadingImage(true);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/v1/uploads/image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success && data.data?.url) {
          if (isBanner) setBannerImage(data.data.url);
          else setImage(data.data.url);
          toast.success("Image uploaded to Cloudinary! ☁️");
        } else {
          toast.error(data.error?.message || "Failed to upload image");
        }
      } catch (err) {
        console.error("Upload error:", err);
        toast.error("Upload failed. Please check network connection.");
      } finally {
        if (isBanner) setIsUploadingBanner(false);
        else setIsUploadingImage(false);
      }
    },
    [],
  );

  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim()) {
        toast.error("Category title is required.");
        return;
      }
      if (!slug.trim()) {
        toast.error("Slug identifier is required.");
        return;
      }

      const ritualStep =
        ritualStepNumber.trim() || ritualStepLabel.trim()
          ? {
              step: ritualStepNumber.trim() || "Step 01",
              label: ritualStepLabel.trim() || "Daily Care",
            }
          : null;

      const categoryData = {
        title: title.trim(),
        slug: slug.trim(),
        japaneseTitle: japaneseTitle.trim() || undefined,
        parentCategory,
        tagline: tagline.trim() || "Authentic Japanese Skincare Formula",
        description: description.trim() || "Carefully curated Japanese beauty formulation.",
        metaDescription: metaDescription.trim() || undefined,
        image: image.trim() || DEFAULT_IMAGES[0] || "",
        bannerImage: bannerImage.trim() || undefined,
        icon: icon.trim() || "Sparkles",
        subcategories,
        popularTags,
        ritualStep,
        featured,
        itemCount: parseInt(itemCount, 10) || 0,
      };

      if (editingCategory) {
        updateCategory(editingCategory.id, categoryData);
        toast.success(`Category "${title}" updated successfully! 🌸`);
      } else {
        addCategory(categoryData);
        toast.success(`Category "${title}" created and published! 🌸`);
      }

      setIsModalOpen(false);
    },
    [
      title,
      slug,
      japaneseTitle,
      parentCategory,
      tagline,
      description,
      metaDescription,
      image,
      bannerImage,
      icon,
      subcategories,
      popularTags,
      ritualStepNumber,
      ritualStepLabel,
      featured,
      itemCount,
      editingCategory,
      updateCategory,
      addCategory,
    ],
  );

  return {
    isModalOpen,
    setIsModalOpen,
    editingCategory,
    openCreateModal,
    openEditModal,
    handleTitleChange,
    handleAddSubcat,
    handleRemoveSubcat,
    handleAddTag,
    handleRemoveTag,
    handleFileUpload,
    isUploadingImage,
    isUploadingBanner,
    handleSave,
    title,
    setTitle,
    slug,
    setSlug,
    japaneseTitle,
    setJapaneseTitle,
    parentCategory,
    setParentCategory,
    tagline,
    setTagline,
    description,
    setDescription,
    metaDescription,
    setMetaDescription,
    icon,
    setIcon,
    image,
    setImage,
    bannerImage,
    setBannerImage,
    featured,
    setFeatured,
    itemCount,
    setItemCount,
    subcategories,
    popularTags,
    newSubcatInput,
    setNewSubcatInput,
    newTagInput,
    setNewTagInput,
    ritualStepNumber,
    setRitualStepNumber,
    ritualStepLabel,
    setRitualStepLabel,
  };
}

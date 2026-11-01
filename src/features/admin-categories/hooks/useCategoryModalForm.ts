import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { AdminCategory } from "@/types";
import { PARENT_CATEGORIES, DEFAULT_IMAGES } from "../constants";

interface UseCategoryModalFormProps {
  addCategory: (cat: Omit<AdminCategory, "id">) => AdminCategory;
  updateCategory: (id: string, updates: Partial<AdminCategory>) => void;
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

  const openCreateModal = useCallback(() => {
    setEditingCategory(null);
    setTitle("");
    setSlug("");
    setJapaneseTitle("");
    setParentCategory(PARENT_CATEGORIES[0] || "Skincare");
    setTagline("");
    setDescription("");
    setImage(DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)] || "");
    setBannerImage("");
    setFeatured(false);
    setItemCount("10");
    setSubcategories(["Daily Essentials", "Hydration", "Brightening"]);
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
    setImage(cat.image);
    setBannerImage(cat.bannerImage || "");
    setFeatured(cat.featured);
    setItemCount(String(cat.itemCount));
    setSubcategories([...cat.subcategories]);
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

      if (editingCategory) {
        updateCategory(editingCategory.id, {
          title: title.trim(),
          slug: slug.trim(),
          japaneseTitle: japaneseTitle.trim() || undefined,
          parentCategory,
          tagline: tagline.trim() || "Authentic Japanese Skincare Formula",
          description: description.trim() || "Carefully curated Japanese beauty formulation.",
          image: image.trim() || DEFAULT_IMAGES[0] || "",
          bannerImage: bannerImage.trim() || undefined,
          subcategories,
          featured,
          itemCount: parseInt(itemCount, 10) || 0,
        });
        toast.success(`Category "${title}" updated successfully! 🌸`);
      } else {
        addCategory({
          title: title.trim(),
          slug: slug.trim(),
          japaneseTitle: japaneseTitle.trim() || undefined,
          parentCategory,
          tagline: tagline.trim() || "Authentic Japanese Skincare Formula",
          description: description.trim() || "Carefully curated Japanese beauty formulation.",
          image: image.trim() || DEFAULT_IMAGES[0] || "",
          bannerImage: bannerImage.trim() || undefined,
          subcategories,
          featured,
          itemCount: parseInt(itemCount, 10) || 0,
        });
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
      image,
      bannerImage,
      subcategories,
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
    image,
    setImage,
    bannerImage,
    setBannerImage,
    featured,
    setFeatured,
    itemCount,
    setItemCount,
    subcategories,
    newSubcatInput,
    setNewSubcatInput,
  };
}

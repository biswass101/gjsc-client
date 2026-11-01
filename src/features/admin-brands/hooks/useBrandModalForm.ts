import { useState } from "react";
import { toast } from "sonner";
import { AdminBrand, useAdmin } from "@/context/admin-context";
import { ORIGIN_CITIES, BRAND_CATEGORIES, DEFAULT_LOGOS } from "../constants";

export function useBrandModalForm() {
  const { addBrand, updateBrand } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<AdminBrand | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [kanji, setKanji] = useState("");
  const [origin, setOrigin] = useState(ORIGIN_CITIES[0] || "Tokyo, Japan");
  const [established, setEstablished] = useState("1980");
  const [category, setCategory] = useState(BRAND_CATEGORIES[0] || "Prestige Skincare");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(DEFAULT_LOGOS[0] || "");
  const [bannerImage, setBannerImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [itemCount, setItemCount] = useState("15");

  const openCreateModal = () => {
    setEditingBrand(null);
    setName("");
    setSlug("");
    setKanji("");
    setOrigin(ORIGIN_CITIES[0] || "Tokyo, Japan");
    setEstablished("1980");
    setCategory(BRAND_CATEGORIES[0] || "Prestige Skincare");
    setTagline("");
    setDescription("");
    setLogo(DEFAULT_LOGOS[Math.floor(Math.random() * DEFAULT_LOGOS.length)] || "");
    setBannerImage("");
    setFeatured(false);
    setItemCount("12");
    setIsModalOpen(true);
  };

  const openEditModal = (brand: AdminBrand) => {
    setEditingBrand(brand);
    setName(brand.name);
    setSlug(brand.slug);
    setKanji(brand.kanji || "");
    setOrigin(brand.origin);
    setEstablished(brand.established || "1980");
    setCategory(brand.category);
    setTagline(brand.tagline);
    setDescription(brand.description);
    setLogo(brand.logo);
    setBannerImage(brand.bannerImage || "");
    setFeatured(brand.featured);
    setItemCount(String(brand.itemCount));
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingBrand) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-"),
      );
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Brand name is required.");
      return;
    }
    if (!slug.trim()) {
      toast.error("Slug identifier is required.");
      return;
    }

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      kanji: kanji.trim() || undefined,
      origin,
      established: established.trim() || undefined,
      category,
      tagline: tagline.trim() || "Pioneering Japanese Skincare Science",
      description: description.trim() || "Authentic Tokyo formulation and clinical research.",
      logo: logo.trim() || DEFAULT_LOGOS[0] || "",
      bannerImage: bannerImage.trim() || undefined,
      featured,
      itemCount: parseInt(itemCount, 10) || 0,
    };

    if (editingBrand) {
      updateBrand(editingBrand.id, payload);
      toast.success(`Brand "${name}" updated successfully! 🌸`);
    } else {
      addBrand(payload);
      toast.success(`Brand "${name}" added to brand house! 🌸`);
    }

    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    editingBrand,
    name,
    setName,
    slug,
    setSlug,
    kanji,
    setKanji,
    origin,
    setOrigin,
    established,
    setEstablished,
    category,
    setCategory,
    tagline,
    setTagline,
    description,
    setDescription,
    logo,
    setLogo,
    bannerImage,
    setBannerImage,
    featured,
    setFeatured,
    itemCount,
    setItemCount,
    openCreateModal,
    openEditModal,
    handleNameChange,
    handleSave,
  };
}

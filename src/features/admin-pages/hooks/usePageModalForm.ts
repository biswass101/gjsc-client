import { useState } from "react";
import { toast } from "sonner";
import { AdminPageMeta, useAdmin } from "@/context/admin-context";

export function usePageModalForm() {
  const { updatePageMeta } = useAdmin();
  const [editingPage, setEditingPage] = useState<AdminPageMeta | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");
  const [badgeText, setBadgeText] = useState("");

  const openEditModal = (page: AdminPageMeta) => {
    setEditingPage(page);
    setTitle(page.title);
    setMetaDescription(page.metaDescription);
    setHeroHeading(page.heroHeading);
    setHeroSubheading(page.heroSubheading);
    setBadgeText(page.badgeText || "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;
    if (!title.trim()) {
      toast.error("Page SEO title is required.");
      return;
    }

    updatePageMeta(editingPage.id, {
      title: title.trim(),
      metaDescription: metaDescription.trim(),
      heroHeading: heroHeading.trim(),
      heroSubheading: heroSubheading.trim(),
      badgeText: badgeText.trim() || undefined,
      lastUpdated: new Date().toISOString().slice(0, 10),
    });

    toast.success(`Content & SEO for ${editingPage.pageName} updated! 🌸`);
    setIsModalOpen(false);
  };

  return {
    editingPage,
    isModalOpen,
    setIsModalOpen,
    title,
    setTitle,
    metaDescription,
    setMetaDescription,
    heroHeading,
    setHeroHeading,
    heroSubheading,
    setHeroSubheading,
    badgeText,
    setBadgeText,
    openEditModal,
    handleSave,
  };
}


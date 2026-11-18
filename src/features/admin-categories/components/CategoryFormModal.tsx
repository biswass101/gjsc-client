import React from "react";
import { FolderTree } from "lucide-react";
import type { AdminCategory } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CategoryModalIdentityFields } from "./form/CategoryModalIdentityFields";
import { CategoryModalMediaFields } from "./form/CategoryModalMediaFields";
import { CategoryModalSubcatFields } from "./form/CategoryModalSubcatFields";

interface CategoryFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingCategory: AdminCategory | null;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  onTitleChange: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  japaneseTitle: string;
  setJapaneseTitle: (val: string) => void;
  parentCategory: string;
  setParentCategory: (val: string) => void;
  icon: string;
  setIcon: (val: string) => void;
  ritualStepNumber: string;
  setRitualStepNumber: (val: string) => void;
  ritualStepLabel: string;
  setRitualStepLabel: (val: string) => void;
  tagline: string;
  setTagline: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  metaDescription: string;
  setMetaDescription: (val: string) => void;
  image: string;
  setImage: (val: string) => void;
  bannerImage: string;
  setBannerImage: (val: string) => void;
  handleFileUpload?: (file: File, target: "image" | "banner") => void;
  isUploadingImage?: boolean;
  isUploadingBanner?: boolean;
  featured: boolean;
  setFeatured: (val: boolean) => void;
  itemCount: string;
  setItemCount: (val: string) => void;
  subcategories: string[];
  newSubcatInput: string;
  setNewSubcatInput: (val: string) => void;
  onAddSubcat: () => void;
  onRemoveSubcat: (sub: string) => void;
  popularTags: string[];
  newTagInput: string;
  setNewTagInput: (val: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

export function CategoryFormModal({
  isOpen,
  onOpenChange,
  editingCategory,
  onSubmit,
  title,
  onTitleChange,
  slug,
  setSlug,
  japaneseTitle,
  setJapaneseTitle,
  parentCategory,
  setParentCategory,
  icon,
  setIcon,
  ritualStepNumber,
  setRitualStepNumber,
  ritualStepLabel,
  setRitualStepLabel,
  tagline,
  setTagline,
  description,
  setDescription,
  metaDescription,
  setMetaDescription,
  image,
  setImage,
  bannerImage,
  setBannerImage,
  handleFileUpload,
  isUploadingImage,
  isUploadingBanner,
  featured,
  setFeatured,
  itemCount,
  setItemCount,
  subcategories,
  newSubcatInput,
  setNewSubcatInput,
  onAddSubcat,
  onRemoveSubcat,
  popularTags,
  newTagInput,
  setNewTagInput,
  onAddTag,
  onRemoveTag,
}: CategoryFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <FolderTree className="h-5 w-5 text-primary" />
              <span>{editingCategory ? "Edit Category & Subcategories" : "Add New Category"}</span>
            </DialogTitle>
            <DialogDescription>
              Configure category taxonomy, Japanese kanji naming, media imagery, and subcategory
              navigation pills.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <CategoryModalIdentityFields
              title={title}
              onTitleChange={onTitleChange}
              japaneseTitle={japaneseTitle}
              setJapaneseTitle={setJapaneseTitle}
              slug={slug}
              setSlug={setSlug}
              parentCategory={parentCategory}
              setParentCategory={setParentCategory}
              icon={icon}
              setIcon={setIcon}
              ritualStepNumber={ritualStepNumber}
              setRitualStepNumber={setRitualStepNumber}
              ritualStepLabel={ritualStepLabel}
              setRitualStepLabel={setRitualStepLabel}
              tagline={tagline}
              setTagline={setTagline}
              description={description}
              setDescription={setDescription}
              metaDescription={metaDescription}
              setMetaDescription={setMetaDescription}
            />

            <CategoryModalMediaFields
              image={image}
              setImage={setImage}
              bannerImage={bannerImage}
              setBannerImage={setBannerImage}
              onUploadImage={(f) => handleFileUpload?.(f, "image")}
              onUploadBanner={(f) => handleFileUpload?.(f, "banner")}
              isUploadingImage={Boolean(isUploadingImage)}
              isUploadingBanner={Boolean(isUploadingBanner)}
              featured={featured}
              setFeatured={setFeatured}
              itemCount={itemCount}
              setItemCount={setItemCount}
            />

            <CategoryModalSubcatFields
              subcategories={subcategories}
              newSubcatInput={newSubcatInput}
              setNewSubcatInput={setNewSubcatInput}
              onAddSubcat={onAddSubcat}
              onRemoveSubcat={onRemoveSubcat}
              popularTags={popularTags}
              newTagInput={newTagInput}
              setNewTagInput={setNewTagInput}
              onAddTag={onAddTag}
              onRemoveTag={onRemoveTag}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
              {editingCategory ? "Save Category Changes" : "Create & Publish Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

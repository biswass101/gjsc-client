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
  tagline: string;
  setTagline: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  image: string;
  setImage: (val: string) => void;
  featured: boolean;
  setFeatured: (val: boolean) => void;
  itemCount: string;
  setItemCount: (val: string) => void;
  subcategories: string[];
  newSubcatInput: string;
  setNewSubcatInput: (val: string) => void;
  onAddSubcat: () => void;
  onRemoveSubcat: (sub: string) => void;
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
  tagline,
  setTagline,
  description,
  setDescription,
  image,
  setImage,
  featured,
  setFeatured,
  itemCount,
  setItemCount,
  subcategories,
  newSubcatInput,
  setNewSubcatInput,
  onAddSubcat,
  onRemoveSubcat,
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
              tagline={tagline}
              setTagline={setTagline}
              description={description}
              setDescription={setDescription}
            />

            <CategoryModalMediaFields
              image={image}
              setImage={setImage}
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

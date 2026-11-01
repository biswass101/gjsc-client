import React from "react";
import { Sparkles } from "lucide-react";
import type { AdminCollection } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CollectionModalIdentityFields } from "./form/CollectionModalIdentityFields";
import { CollectionModalColorBannerFields } from "./form/CollectionModalColorBannerFields";
import { CollectionModalTagsFields } from "./form/CollectionModalTagsFields";

interface CollectionFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingCollection: AdminCollection | null;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  onTitleChange: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  japaneseTitle: string;
  setJapaneseTitle: (val: string) => void;
  tagline: string;
  setTagline: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  badgeText: string;
  setBadgeText: (val: string) => void;
  bannerImage: string;
  setBannerImage: (val: string) => void;
  themeColor: string;
  setThemeColor: (val: string) => void;
  featured: boolean;
  setFeatured: (val: boolean) => void;
  itemCount: string;
  setItemCount: (val: string) => void;
  frequentlySearched: string[];
  newTagInput: string;
  setNewTagInput: (val: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

export function CollectionFormModal({
  isOpen,
  onOpenChange,
  editingCollection,
  onSubmit,
  title,
  onTitleChange,
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
  onAddTag,
  onRemoveTag,
}: CollectionFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>{editingCollection ? "Edit Collection" : "Create Themed Collection"}</span>
            </DialogTitle>
            <DialogDescription>
              Configure collection banner visuals, Japanese theme branding, search keywords, and
              storefront badge.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <CollectionModalIdentityFields
              title={title}
              onTitleChange={onTitleChange}
              japaneseTitle={japaneseTitle}
              setJapaneseTitle={setJapaneseTitle}
              slug={slug}
              setSlug={setSlug}
              badgeText={badgeText}
              setBadgeText={setBadgeText}
              tagline={tagline}
              setTagline={setTagline}
              description={description}
              setDescription={setDescription}
            />

            <CollectionModalColorBannerFields
              themeColor={themeColor}
              setThemeColor={setThemeColor}
              bannerImage={bannerImage}
              setBannerImage={setBannerImage}
            />

            <CollectionModalTagsFields
              frequentlySearched={frequentlySearched}
              newTagInput={newTagInput}
              setNewTagInput={setNewTagInput}
              onAddTag={onAddTag}
              onRemoveTag={onRemoveTag}
              featured={featured}
              setFeatured={setFeatured}
              itemCount={itemCount}
              setItemCount={setItemCount}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
              {editingCollection ? "Save Collection Changes" : "Create & Publish Collection"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

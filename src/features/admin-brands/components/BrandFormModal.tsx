import React from "react";
import { Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdminBrand } from "@/context/admin-context";
import { BrandModalIdentityFields } from "./form/BrandModalIdentityFields";
import { BrandModalDetailsFields } from "./form/BrandModalDetailsFields";

interface BrandFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingBrand: AdminBrand | null;
  name: string;
  onNameChange: (val: string) => void;
  kanji: string;
  setKanji: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  origin: string;
  setOrigin: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  established: string;
  setEstablished: (val: string) => void;
  tagline: string;
  setTagline: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  logo: string;
  setLogo: (val: string) => void;
  featured: boolean;
  setFeatured: (val: boolean) => void;
  itemCount: string;
  setItemCount: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function BrandFormModal({
  isOpen,
  onOpenChange,
  editingBrand,
  name,
  onNameChange,
  kanji,
  setKanji,
  slug,
  setSlug,
  origin,
  setOrigin,
  category,
  setCategory,
  established,
  setEstablished,
  tagline,
  setTagline,
  description,
  setDescription,
  logo,
  setLogo,
  featured,
  setFeatured,
  itemCount,
  setItemCount,
  onSubmit,
}: BrandFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <Award className="h-5 w-5 text-primary" />
              <span>{editingBrand ? "Edit Brand Profile" : "Register Japanese Brand"}</span>
            </DialogTitle>
            <DialogDescription>
              Manage authentic Japanese skincare manufacturers, logos, origins, and heritage
              descriptions.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <BrandModalIdentityFields
              name={name}
              onNameChange={onNameChange}
              kanji={kanji}
              setKanji={setKanji}
              slug={slug}
              setSlug={setSlug}
              origin={origin}
              setOrigin={setOrigin}
              category={category}
              setCategory={setCategory}
              established={established}
              setEstablished={setEstablished}
            />

            <BrandModalDetailsFields
              tagline={tagline}
              setTagline={setTagline}
              description={description}
              setDescription={setDescription}
              logo={logo}
              setLogo={setLogo}
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
              {editingBrand ? "Save Brand Changes" : "Register Brand"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

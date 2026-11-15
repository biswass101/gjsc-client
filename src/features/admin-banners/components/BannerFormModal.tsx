import React from "react";
import { Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdminBanner } from "@/context/admin-context";
import { BannerModalIdentityFields } from "./form/BannerModalIdentityFields";
import { BannerModalMediaCtaFields } from "./form/BannerModalMediaCtaFields";
import { BannerModalGradientFields } from "./form/BannerModalGradientFields";

interface BannerFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingBanner: AdminBanner | null;
  pageKey: AdminBanner["pageKey"];
  setPageKey: (val: AdminBanner["pageKey"]) => void;
  title: string;
  setTitle: (val: string) => void;
  badge: string;
  setBadge: (val: string) => void;
  subtitle: string;
  setSubtitle: (val: string) => void;
  imageUrl: string;
  setImageUrl: (val: string) => void;
  mobileImageUrl: string;
  setMobileImageUrl: (val: string) => void;
  ctaLink: string;
  setCtaLink: (val: string) => void;
  order: string;
  setOrder: (val: string) => void;
  active: boolean;
  setActive: (val: boolean) => void;
  gradient: string;
  setGradient: (val: string) => void;
  customStart: string;
  setCustomStart: (val: string) => void;
  customEnd: string;
  setCustomEnd: (val: string) => void;
  customOpacity: number;
  setCustomOpacity: (val: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function BannerFormModal({
  isOpen,
  onOpenChange,
  editingBanner,
  pageKey,
  setPageKey,
  title,
  setTitle,
  badge,
  setBadge,
  subtitle,
  setSubtitle,
  imageUrl,
  setImageUrl,
  mobileImageUrl,
  setMobileImageUrl,
  ctaLink,
  setCtaLink,
  order,
  setOrder,
  active,
  setActive,
  gradient,
  setGradient,
  customStart,
  setCustomStart,
  customEnd,
  setCustomEnd,
  customOpacity,
  setCustomOpacity,
  onSubmit,
}: BannerFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <ImageIcon className="h-5 w-5 text-primary" />
              <span>
                {editingBanner ? "Edit Promotional Banner" : "Design New Storefront Banner"}
              </span>
            </DialogTitle>
            <DialogDescription>
              Configure page placement, marketing headline, responsive graphics, custom gradient atmosphere, and conversion CTA.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <BannerModalIdentityFields
              pageKey={pageKey}
              setPageKey={setPageKey}
              title={title}
              setTitle={setTitle}
              badge={badge}
              setBadge={setBadge}
              subtitle={subtitle}
              setSubtitle={setSubtitle}
            />

            <BannerModalGradientFields
              gradient={gradient}
              setGradient={setGradient}
              customStart={customStart}
              setCustomStart={setCustomStart}
              customEnd={customEnd}
              setCustomEnd={setCustomEnd}
              customOpacity={customOpacity}
              setCustomOpacity={setCustomOpacity}
              hasText={Boolean(title.trim() || subtitle.trim())}
            />

            <BannerModalMediaCtaFields
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              mobileImageUrl={mobileImageUrl}
              setMobileImageUrl={setMobileImageUrl}
              ctaLink={ctaLink}
              setCtaLink={setCtaLink}
              order={order}
              setOrder={setOrder}
              active={active}
              setActive={setActive}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
              {editingBanner ? "Save Banner Changes" : "Publish Banner"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

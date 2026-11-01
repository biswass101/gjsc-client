"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MerchandisingHeader } from "@/features/admin-merchandising/components/MerchandisingHeader";
import { AnnouncementCard } from "@/features/admin-merchandising/components/AnnouncementCard";
import { FlashSaleCard } from "@/features/admin-merchandising/components/FlashSaleCard";
import { HeroSettingsCard } from "@/features/admin-merchandising/components/HeroSettingsCard";

export default function AdminMerchandisingPage() {
  const { merchandising, updateMerchandising } = useAdmin();

  const [announcementText, setAnnouncementText] = useState(merchandising.announcementText);
  const [announcementActive, setAnnouncementActive] = useState(merchandising.announcementActive);
  const [announcementLink, setAnnouncementLink] = useState(merchandising.announcementLink);

  const [flashSaleActive, setFlashSaleActive] = useState(merchandising.flashSaleActive);
  const [flashSaleTitle, setFlashSaleTitle] = useState(merchandising.flashSaleTitle);
  const [flashSaleEndsAt, setFlashSaleEndsAt] = useState(merchandising.flashSaleEndsAt);

  const [heroHeadline, setHeroHeadline] = useState(merchandising.heroHeadline);
  const [heroSubheadline, setHeroSubheadline] = useState(merchandising.heroSubheadline);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(
    merchandising.freeShippingThreshold.toString()
  );

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateMerchandising({
      announcementText,
      announcementActive,
      announcementLink,
      flashSaleActive,
      flashSaleTitle,
      flashSaleEndsAt,
      heroHeadline,
      heroSubheadline,
      freeShippingThreshold: parseFloat(freeShippingThreshold) || 5000,
    });
    toast.success("Storefront merchandising & banners published! 🌸");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <MerchandisingHeader onSave={handleSaveAll} />

      <form onSubmit={handleSaveAll} className="space-y-6">
        <div className="surface-card p-4 space-y-2">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Live Preview of Customer Storefront Announcement Bar:
          </Label>
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-center">
            {announcementActive ? (
              <p className="text-xs font-semibold text-primary">
                {announcementText || "Announcement text preview..."}
              </p>
            ) : (
              <p className="text-xs italic text-muted-foreground">
                [Announcement bar is currently toggled OFF]
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <AnnouncementCard
            announcementText={announcementText}
            setAnnouncementText={setAnnouncementText}
            announcementActive={announcementActive}
            setAnnouncementActive={setAnnouncementActive}
            announcementLink={announcementLink}
            setAnnouncementLink={setAnnouncementLink}
          />

          <FlashSaleCard
            flashSaleActive={flashSaleActive}
            setFlashSaleActive={setFlashSaleActive}
            flashSaleTitle={flashSaleTitle}
            setFlashSaleTitle={setFlashSaleTitle}
            flashSaleEndsAt={flashSaleEndsAt}
            setFlashSaleEndsAt={setFlashSaleEndsAt}
          />
        </div>

        <HeroSettingsCard
          heroHeadline={heroHeadline}
          setHeroHeadline={setHeroHeadline}
          heroSubheadline={heroSubheadline}
          setHeroSubheadline={setHeroSubheadline}
          freeShippingThreshold={freeShippingThreshold}
          setFreeShippingThreshold={setFreeShippingThreshold}
        />

        <div className="flex justify-end">
          <Button type="submit" size="sm" className="rounded-full text-xs px-6 gap-2">
            <Save className="h-4 w-4" />
            Publish All Merchandising Updates
          </Button>
        </div>
      </form>
    </div>
  );
}

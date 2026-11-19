"use client";

import React, { useState } from "react";
import { Save, Zap, ArrowRight } from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "@/lib/navigation";
import { toast } from "sonner";
import { MerchandisingHeader } from "@/features/admin-merchandising/components/MerchandisingHeader";
import { AnnouncementCard } from "@/features/admin-merchandising/components/AnnouncementCard";
import { HeroSettingsCard } from "@/features/admin-merchandising/components/HeroSettingsCard";

export default function AdminMerchandisingPage() {
  const { merchandising, updateMerchandising } = useAdmin();

  const [announcementText, setAnnouncementText] = useState(merchandising.announcementText);
  const [announcementActive, setAnnouncementActive] = useState(merchandising.announcementActive);
  const [announcementLink, setAnnouncementLink] = useState(merchandising.announcementLink);

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

          <div className="surface-card p-5 space-y-4 border border-rose-500/20 bg-rose-500/5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-rose-500/10 text-rose-600">
                  <Zap className="h-4 w-4 fill-rose-500" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    Dedicated Flash Sales & Drops Engine
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Active campaigns, countdown clocks & deal quotas
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Flash sales and hourly Tokyo drops have moved to their own dedicated control center. Configure Cloudinary promotional banners, campaign durations, custom deal prices, and stock allocation quotas all in one place.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/admin/flash-sales"
                className="inline-flex items-center gap-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-4 py-2 transition-colors shadow-xs"
              >
                <span>Open Flash Sales Manager</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
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

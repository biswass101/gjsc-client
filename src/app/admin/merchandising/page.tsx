"use client";

import React, { useState } from "react";
import {
  Megaphone,
  Sparkles,
  Clock,
  Layers,
  Save,
  Eye,
  CheckCircle2,
  Truck,
  Store,
  ExternalLink,
} from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-primary">Storefront Content Control</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
              Live Store Broadcast
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-foreground">
            Merchandising, Announcement Banners & Hero Campaigns
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Dynamically broadcast top tickers, seasonal Tokyo festival alerts, and countdown sales across the customer storefront.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button asChild variant="outline" size="sm" className="rounded-full text-xs h-8 px-3.5 gap-1.5">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Eye className="h-3.5 w-3.5 text-primary" />
              Preview Live Store
            </a>
          </Button>

          <Button
            size="sm"
            onClick={handleSaveAll}
            className="rounded-full text-xs h-8 px-5 gap-1.5 shadow-2xs font-semibold"
          >
            <Save className="h-3.5 w-3.5" />
            Publish Changes
          </Button>
        </div>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* Live Visual Preview Banner */}
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
          {/* Card 1: Top Announcement Bar */}
          <div className="surface-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Megaphone className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    Storewide Announcement Bar
                  </h3>
                  <p className="text-[11px] text-muted-foreground">Top ticker across all customer pages</p>
                </div>
              </div>
              <Switch checked={announcementActive} onCheckedChange={setAnnouncementActive} />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <Label className="text-xs font-semibold">Announcement Message Text</Label>
                <Textarea
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  rows={2}
                  className="mt-1 rounded-xl text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Click Destination URL / Route</Label>
                <Input
                  value={announcementLink}
                  onChange={(e) => setAnnouncementLink(e.target.value)}
                  placeholder="/shop or /offers"
                  className="mt-1 h-9 rounded-full text-xs"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Flash Sale Campaign */}
          <div className="surface-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    Flash Sale Countdown Engine
                  </h3>
                  <p className="text-[11px] text-muted-foreground">Homepage flash sale countdown clock</p>
                </div>
              </div>
              <Switch checked={flashSaleActive} onCheckedChange={setFlashSaleActive} />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <Label className="text-xs font-semibold">Flash Sale Campaign Title</Label>
                <Input
                  value={flashSaleTitle}
                  onChange={(e) => setFlashSaleTitle(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs font-semibold"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Sale Expiration Timestamp (ISO / Date)</Label>
                <Input
                  value={flashSaleEndsAt}
                  onChange={(e) => setFlashSaleEndsAt(e.target.value)}
                  className="mt-1 h-9 rounded-full text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Hero Section & Slogan */}
        <div className="surface-card p-5 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-foreground">
                Homepage Hero Headline & Copy
              </h3>
              <p className="text-[11px] text-muted-foreground">The first impression text seen by incoming buyers</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <Label className="text-xs font-semibold">Hero Main Headline</Label>
              <Input
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Hero Subtitle Copy</Label>
              <Textarea
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                rows={2}
                className="mt-1 rounded-xl text-xs"
              />
            </div>

            <div className="max-w-xs">
              <Label className="text-xs font-semibold">Free Delivery Incentive Minimum (৳)</Label>
              <Input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                className="mt-1 h-9 rounded-full text-xs"
              />
            </div>
          </div>
        </div>

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


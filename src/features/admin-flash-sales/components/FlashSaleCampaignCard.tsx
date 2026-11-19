"use client";

import React from "react";
import {
  Zap,
  Flame,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  Plus,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import type { AdminFlashSale, FlashSaleItem } from "@/types";

interface FlashSaleCampaignCardProps {
  campaign: AdminFlashSale;
  onToggleActive: (id: string | number, currentActive: boolean) => void;
  onEditCampaign: (campaign: AdminFlashSale) => void;
  onDeleteCampaign: (id: string | number, title: string) => void;
  onOpenAddProduct: (campaignId: string | number) => void;
  onRemoveItem: (campaignId: string | number, itemId: string | number) => void;
}

export function FlashSaleCampaignCard({
  campaign,
  onToggleActive,
  onEditCampaign,
  onDeleteCampaign,
  onOpenAddProduct,
  onRemoveItem,
}: FlashSaleCampaignCardProps) {
  const isLive = campaign.dynamicStatus === "active";
  const isScheduled = campaign.dynamicStatus === "scheduled";

  const startDateFormatted = new Date(campaign.startsAt).toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const endDateFormatted = new Date(campaign.endsAt).toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const items = campaign.items || [];

  return (
    <div className="surface-card rounded-2xl border border-border/70 overflow-hidden shadow-xs space-y-4">
      {/* Top Banner & Header Strip */}
      <div className="p-4 sm:p-5 border-b border-border/50 bg-gradient-to-r from-muted/30 via-background to-muted/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-lg sm:text-xl font-bold text-foreground truncate">
                {campaign.title}
              </h2>

              {isLive ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[11px] font-bold text-rose-600 border border-rose-500/30">
                  <Flame className="h-3 w-3 fill-rose-500 animate-pulse" />
                  Live Now
                </span>
              ) : isScheduled ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600 border border-blue-500/30">
                  <Clock className="h-3 w-3" />
                  Scheduled
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/60">
                  Ended
                </span>
              )}
            </div>

            {campaign.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {campaign.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <span>Starts: {startDateFormatted}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold text-rose-600">
                <Clock className="h-3.5 w-3.5" />
                <span>Ends: {endDateFormatted}</span>
              </span>
            </div>
          </div>

          {/* Quick Actions Strip */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-start sm:self-auto pt-2 sm:pt-0">
            <div className="flex items-center gap-2 pr-2 border-r border-border/60">
              <span className="text-[11px] font-medium text-muted-foreground">Active</span>
              <Switch
                checked={campaign.isActive}
                onCheckedChange={() => onToggleActive(campaign.id, campaign.isActive)}
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditCampaign(campaign)}
              className="h-8 gap-1.5 rounded-lg text-xs"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteCampaign(campaign.id, campaign.title)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Items Included Section */}
      <div className="p-4 sm:p-5 pt-0 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Deal Products Included ({items.length})
            </h3>
          </div>

          <Button
            size="sm"
            onClick={() => onOpenAddProduct(campaign.id)}
            className="h-8 gap-1.5 rounded-full bg-rose-600/10 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-500/20 text-xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Deal Product
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/80 p-6 text-center space-y-2">
            <Zap className="h-6 w-6 text-muted-foreground/40 mx-auto" />
            <p className="text-xs font-semibold text-foreground">No deal items in this flash sale yet</p>
            <p className="text-[11px] text-muted-foreground max-w-sm mx-auto">
              Add popular Tokyo skincare favorites, define their discount price, and allocate stock quotas for shoppers.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onOpenAddProduct(campaign.id)}
              className="mt-2 text-xs"
            >
              Add First Deal
            </Button>
          </div>
        ) : (
          <div className="rounded-xl border border-border/60 overflow-hidden divide-y divide-border/40">
            {items.map((item: FlashSaleItem) => {
              const claimPercentage = item.claimedPercent || 0;
              const stockRemaining = item.stockLeft !== undefined ? item.stockLeft : Math.max(0, item.allocatedStock - item.claimedCount);

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover border border-border/60 shrink-0"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0">
                        Deal
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-xs sm:text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {item.brand || "Glorious Japan"} • {item.slug}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono font-bold text-rose-600 text-xs sm:text-sm">
                          ৳{item.price.toLocaleString()}
                        </span>
                        {item.compareAt && item.compareAt > item.price && (
                          <span className="text-[11px] line-through text-muted-foreground font-mono">
                            ৳{item.compareAt.toLocaleString()}
                          </span>
                        )}
                        {item.discount > 0 && (
                          <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.2 text-[10px] font-bold text-rose-600">
                            -{item.discount}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stock Quota & Claim Progress Bar */}
                  <div className="flex items-center gap-4 sm:ml-auto">
                    <div className="w-full sm:w-44 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-muted-foreground">
                          {item.claimedCount} / {item.allocatedStock} Claimed
                        </span>
                        <span className="font-bold text-rose-600">{claimPercentage}%</span>
                      </div>
                      <Progress
                        value={claimPercentage}
                        className="h-2 bg-muted rounded-full"
                      />
                      <p className="text-[10px] text-muted-foreground">
                        {stockRemaining > 0 ? (
                          <span className="text-amber-600 font-semibold">🔥 {stockRemaining} units left</span>
                        ) : (
                          <span className="text-muted-foreground">Sold Out</span>
                        )}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(campaign.id, item.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


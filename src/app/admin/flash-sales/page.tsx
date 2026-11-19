"use client";

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useAdmin } from "@/context/admin-context";
import { adminApi } from "@/lib/api";
import type { AdminFlashSale } from "@/types";
import {
  FlashSaleHeader,
  FlashSaleStats,
  FlashSaleCampaignCard,
  CreateCampaignModal,
  AddProductModal,
} from "@/features/admin-flash-sales";
import { Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminFlashSalesPage() {
  const { products } = useAdmin();
  const [campaigns, setCampaigns] = useState<AdminFlashSale[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<AdminFlashSale | null>(null);
  const [addProductCampaignId, setAddProductCampaignId] = useState<string | number | null>(null);

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminApi.getFlashSales();
      setCampaigns(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("Failed to load flash sales from DB:", err);
      toast.error(err?.message || "Failed to load flash sales from database");
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  // Handlers
  const handleToggleActive = async (id: string | number, currentActive: boolean) => {
    const nextActive = !currentActive;
    try {
      await adminApi.updateFlashSale(id, { isActive: nextActive });
      toast.success("Flash sale visibility updated.");
      await fetchCampaigns();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to update flash sale status in database");
    }
  };

  const handleOpenEdit = (campaign: AdminFlashSale) => {
    setEditingCampaign(campaign);
    setIsCreateOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateOpen(false);
    setEditingCampaign(null);
  };

  const handleSaveCampaign = async (campaignData: Partial<AdminFlashSale>) => {
    try {
      if (editingCampaign) {
        await adminApi.updateFlashSale(editingCampaign.id, campaignData);
        toast.success(`Updated flash sale "${campaignData.title}"!`);
      } else {
        await adminApi.createFlashSale(campaignData);
        toast.success(`Created flash sale "${campaignData.title}"!`);
      }
      await fetchCampaigns();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to save flash sale campaign to database");
    }
  };

  const handleDeleteCampaign = async (id: string | number, title: string) => {
    if (!window.confirm(`Delete flash sale campaign "${title}" from the database?`)) return;

    try {
      await adminApi.deleteFlashSale(id);
      toast.success(`Deleted flash sale "${title}".`);
      await fetchCampaigns();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to delete flash sale from database");
    }
  };

  const handleOpenAddProduct = (campaignId: string | number) => {
    setAddProductCampaignId(campaignId);
  };

  const handleCloseAddProduct = () => {
    setAddProductCampaignId(null);
  };

  const handleAddProductDeal = async (deal: {
    productId: number;
    flashPrice: number;
    originalPrice: number;
    discountPercent: number;
    allocatedStock: number;
    claimedCount: number;
  }) => {
    if (!addProductCampaignId) return;

    try {
      await adminApi.addFlashSaleItem(addProductCampaignId, deal);
      toast.success("Added deal product to flash sale!");
      await fetchCampaigns();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to add deal product to database");
    }
  };

  const handleRemoveItem = async (campaignId: string | number, itemId: string | number) => {
    if (!window.confirm("Remove this deal product from the flash sale?")) return;

    try {
      await adminApi.deleteFlashSaleItem(campaignId, itemId);
      toast.success("Removed deal product from database.");
      await fetchCampaigns();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to remove deal product from database");
    }
  };

  const activeCampaignForAdd = campaigns.find((c) => c.id === addProductCampaignId);
  const existingProductIds = (activeCampaignForAdd?.items || []).map((it) => it.productId);
  const liveCount = campaigns.filter((c) => c.dynamicStatus === "active").length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <FlashSaleHeader
        onOpenCreate={() => setIsCreateOpen(true)}
        activeCount={liveCount}
      />

      <FlashSaleStats campaigns={campaigns} />

      {/* Campaigns Listing */}
      <div className="space-y-6">
        {loading ? (
          <div className="surface-card rounded-2xl border border-border/70 p-12 text-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-rose-500 mx-auto" />
            <p className="text-xs font-semibold text-foreground">
              Loading Flash Sales from Database...
            </p>
            <p className="text-[11px] text-muted-foreground">
              Connecting to MySQL to fetch live active campaigns and deal allocations.
            </p>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="surface-card rounded-2xl border border-dashed border-border/80 p-12 text-center space-y-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-rose-500/10 text-rose-600 mx-auto">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">
              No Flash Sale Campaigns in Database
            </h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Create your first Tokyo flash drop to broadcast urgency deals, stock quotas, and a live countdown to customer storefronts.
            </p>
            <Button
              size="sm"
              onClick={() => setIsCreateOpen(true)}
              className="mt-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-full px-5"
            >
              Create First Campaign
            </Button>
          </div>
        ) : (
          campaigns.map((camp) => (
            <FlashSaleCampaignCard
              key={camp.id}
              campaign={camp}
              onToggleActive={handleToggleActive}
              onEditCampaign={handleOpenEdit}
              onDeleteCampaign={handleDeleteCampaign}
              onOpenAddProduct={handleOpenAddProduct}
              onRemoveItem={handleRemoveItem}
            />
          ))
        )}
      </div>

      {/* Modals */}
      <CreateCampaignModal
        isOpen={isCreateOpen}
        onClose={handleCloseCreateModal}
        onSave={handleSaveCampaign}
        editingCampaign={editingCampaign}
      />

      <AddProductModal
        isOpen={Boolean(addProductCampaignId)}
        onClose={handleCloseAddProduct}
        onAdd={handleAddProductDeal}
        products={products}
        existingProductIds={existingProductIds}
      />
    </div>
  );
}

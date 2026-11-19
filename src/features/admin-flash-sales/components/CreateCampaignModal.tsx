"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { UploadCloud, Image as ImageIcon, X, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "@/lib/api";
import type { AdminFlashSale } from "@/types";

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaignData: Partial<AdminFlashSale>) => Promise<void>;
  editingCampaign?: AdminFlashSale | null;
}

export function CreateCampaignModal({
  isOpen,
  onClose,
  onSave,
  editingCampaign,
}: CreateCampaignModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingCampaign) {
      setTitle(editingCampaign.title || "");
      setDescription(editingCampaign.description || "");
      setStartsAt(
        editingCampaign.startsAt ? new Date(editingCampaign.startsAt).toISOString().slice(0, 16) : ""
      );
      setEndsAt(
        editingCampaign.endsAt ? new Date(editingCampaign.endsAt).toISOString().slice(0, 16) : ""
      );
      setBannerUrl(editingCampaign.bannerUrl || "");
      setIsActive(editingCampaign.isActive !== false);
      setShowManualUrl(Boolean(editingCampaign.bannerUrl));
    } else {
      const now = new Date();
      const in24h = new Date(Date.now() + 24 * 60 * 60 * 1000);
      setTitle("Tokyo Midnight Glow 24h Flash Festival");
      setDescription("Deepest limited-quantity discounts directly from Ginza and Tokyo beauty labs.");
      setStartsAt(now.toISOString().slice(0, 16));
      setEndsAt(in24h.toISOString().slice(0, 16));
      setBannerUrl("");
      setIsActive(true);
      setShowManualUrl(false);
    }
  }, [editingCampaign, isOpen]);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }

    try {
      setIsUploadingBanner(true);
      toast.info(`Uploading "${file.name}" to Cloudinary...`);
      const res = await adminApi.uploadImage(file);
      if (res?.url) {
        setBannerUrl(res.url);
        toast.success("Promotional banner uploaded to Cloudinary! 🌸");
      }
    } catch (err: any) {
      console.error("Cloudinary upload error:", err);
      toast.error(err?.message || "Failed to upload promotional banner to Cloudinary");
    } finally {
      setIsUploadingBanner(false);
    }
  };

  const handleRemoveBanner = () => {
    setBannerUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await onSave({
        ...(editingCampaign ? { id: editingCampaign.id } : {}),
        title: title.trim(),
        description: description.trim() || null,
        startsAt: new Date(startsAt).toISOString(),
        endsAt: new Date(endsAt).toISOString(),
        bannerUrl: bannerUrl.trim() || null,
        isActive,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl bg-card border-border/80 max-h-[92vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-rose-500" />
            {editingCampaign ? "Edit Flash Sale Campaign" : "Create Flash Sale Campaign"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Configure the countdown duration, Cloudinary promotional banner, and storefront visibility for this flash drop.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 py-2 text-xs pr-1">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Campaign Title *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Ginza Sakura Spring Flash Drop"
              required
              className="h-9 rounded-lg text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Description / Subtitle</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tokyo favorites at deepest discounts. Stock is limited."
              rows={2}
              className="text-xs rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Starts At *</Label>
              <Input
                type="datetime-local"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
                required
                className="h-9 rounded-lg text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Ends At (Countdown Deadline) *</Label>
              <Input
                type="datetime-local"
                value={endsAt}
                onChange={(e) => setEndsAt(e.target.value)}
                required
                className="h-9 rounded-lg text-xs font-mono"
              />
            </div>
          </div>

          {/* Cloudinary Promotional Banner Upload Section */}
          <div className="space-y-2 rounded-xl border border-border/70 bg-muted/20 p-3.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4 text-rose-500" />
                <span>Promotional Banner (Cloudinary)</span>
              </Label>
              <button
                type="button"
                onClick={() => setShowManualUrl((prev) => !prev)}
                className="text-[11px] text-primary hover:underline font-medium cursor-pointer"
              >
                {showManualUrl ? "Hide manual URL" : "Enter manual URL"}
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleBannerUpload}
              accept="image/*"
              className="hidden"
            />

            {bannerUrl ? (
              <div className="relative rounded-lg overflow-hidden border border-border/80 bg-background group">
                <img
                  src={bannerUrl}
                  alt="Promotional Banner Preview"
                  className="w-full h-36 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingBanner}
                    className="h-8 rounded-full text-xs font-semibold bg-background/90"
                  >
                    Replace Image
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={handleRemoveBanner}
                    className="h-8 rounded-full text-xs font-semibold"
                  >
                    <X className="h-3.5 w-3.5 mr-1" />
                    Remove
                  </Button>
                </div>
                <div className="p-2 bg-background border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="truncate max-w-[280px] font-mono">{bannerUrl}</span>
                  <span className="rounded bg-emerald-500/10 text-emerald-600 font-bold px-1.5 py-0.5 border border-emerald-500/20">
                    Cloudinary Ready
                  </span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => !isUploadingBanner && fileInputRef.current?.click()}
                className={`rounded-lg border-2 border-dashed border-border/80 p-5 text-center cursor-pointer transition-colors ${
                  isUploadingBanner
                    ? "bg-rose-500/5 border-rose-500/30"
                    : "hover:bg-muted/40 hover:border-rose-500/40"
                }`}
              >
                {isUploadingBanner ? (
                  <div className="space-y-2 flex flex-col items-center justify-center">
                    <Loader2 className="h-6 w-6 text-rose-500 animate-spin" />
                    <p className="text-xs font-semibold text-rose-600">
                      Uploading to Cloudinary CDN...
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Optimizing image dimensions & delivery formats
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5 flex flex-col items-center justify-center">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-rose-500/10 text-rose-600 mb-1">
                      <UploadCloud className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold text-foreground">
                      Click to upload promotional banner
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Uploads directly to Cloudinary (PNG, JPG, WEBP up to 10MB)
                    </p>
                  </div>
                )}
              </div>
            )}

            {showManualUrl && (
              <div className="pt-2">
                <Input
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  placeholder="https://res.cloudinary.com/... or custom CDN image URL"
                  className="h-8 rounded-lg text-xs font-mono"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 p-3">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-foreground">Active Visibility</span>
              <p className="text-[11px] text-muted-foreground">
                When enabled, the customer homepage Flash Sale countdown will broadcast this campaign.
              </p>
            </div>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={loading || isUploadingBanner}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={loading || isUploadingBanner}
              className="bg-rose-600 hover:bg-rose-500 text-white font-semibold"
            >
              {loading ? "Saving..." : editingCampaign ? "Save Changes" : "Create Campaign"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import React from "react";
import { FileText, Heading, Globe } from "lucide-react";
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
import { AdminPageMeta } from "@/context/admin-context";

interface PageEditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingPage: AdminPageMeta | null;
  title: string;
  setTitle: (val: string) => void;
  metaDescription: string;
  setMetaDescription: (val: string) => void;
  heroHeading: string;
  setHeroHeading: (val: string) => void;
  heroSubheading: string;
  setHeroSubheading: (val: string) => void;
  badgeText: string;
  setBadgeText: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function PageEditModal({
  isOpen,
  onOpenChange,
  editingPage,
  title,
  setTitle,
  metaDescription,
  setMetaDescription,
  heroHeading,
  setHeroHeading,
  heroSubheading,
  setHeroSubheading,
  badgeText,
  setBadgeText,
  onSubmit,
}: PageEditModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <FileText className="h-5 w-5 text-primary" />
              <span>Edit Content & SEO: {editingPage?.pageName}</span>
            </DialogTitle>
            <DialogDescription>
              Customize customer-facing headlines, hero subtitles, and Google search engine
              optimization meta tags for route: <strong>{editingPage?.route}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Storefront Hero Section */}
            <div className="space-y-3 rounded-xl border border-border/80 bg-secondary/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider">
                  <Heading className="h-4 w-4 text-primary" />
                  Storefront Hero Header Copy
                </span>
                <span className="text-[10px] text-muted-foreground">
                  What visitors see immediately
                </span>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="hero-heading" className="text-xs font-semibold">
                  Hero Headline (Large Title) <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="hero-heading"
                  value={heroHeading}
                  onChange={(e) => setHeroHeading(e.target.value)}
                  placeholder="e.g. Authentic Japanese Skincare Curations"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="hero-sub" className="text-xs font-semibold">
                  Hero Subtitle (Introductory Paragraph)
                </Label>
                <Textarea
                  id="hero-sub"
                  rows={2}
                  value={heroSubheading}
                  onChange={(e) => setHeroSubheading(e.target.value)}
                  placeholder="e.g. Sourced fresh from Tokyo Ginza and Osaka laboratories..."
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="hero-badge" className="text-xs font-semibold">
                  Hero Badge Text (Optional pill)
                </Label>
                <Input
                  id="hero-badge"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  placeholder="e.g. 🌸 Direct Tokyo Air-Freight, 100% Genuine Formula"
                />
              </div>
            </div>

            {/* SEO Meta Tags Section */}
            <div className="space-y-3 rounded-xl border border-border/80 bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider">
                  <Globe className="h-4 w-4 text-blue-500" />
                  Search Engine Optimization (SEO)
                </span>
                <span className="text-[10px] text-muted-foreground">Google SERP Snippet</span>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="seo-title"
                  className="text-xs font-semibold flex items-center justify-between"
                >
                  <span>
                    Page Title Tag (&lt;title&gt;) <span className="text-rose-500">*</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {title.length} chars
                  </span>
                </Label>
                <Input
                  id="seo-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Shop Japanese Skincare in Bangladesh | Glorious Japan"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="seo-desc"
                  className="text-xs font-semibold flex items-center justify-between"
                >
                  <span>Meta Description (Google Snippet)</span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {metaDescription.length} / 160 chars
                  </span>
                </Label>
                <Textarea
                  id="seo-desc"
                  rows={2}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Brief description summarizing page value for Google searchers..."
                />
              </div>

              {/* Google Snippet Simulator */}
              <div className="rounded-lg bg-muted/40 border border-border/80 p-3 space-y-1">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  Google SERP Preview
                </span>
                <div className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                  <span>https://gloriousjapan.com{editingPage?.route}</span>
                </div>
                <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer line-clamp-1">
                  {title || "Page Title"}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {metaDescription ||
                    "No description provided. Search engines may generate a snippet from your page copy."}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
              Save Page Content & SEO
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

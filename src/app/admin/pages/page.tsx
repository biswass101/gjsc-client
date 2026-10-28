"use client";

import React, { useState, useMemo } from "react";
import {
  FileText,
  Search,
  Edit2,
  Globe,
  Sparkles,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Layers,
  Heading,
} from "lucide-react";
import { useAdmin, AdminPageMeta } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AdminPagesContentPage() {
  const { pageMetas, updatePageMeta } = useAdmin();

  const [searchQuery, setSearchQuery] = useState("");
  const [editingPage, setEditingPage] = useState<AdminPageMeta | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");
  const [badgeText, setBadgeText] = useState("");

  const filteredPages = useMemo(() => {
    return pageMetas.filter((p) => {
      const q = searchQuery.toLowerCase();
      return (
        p.pageName.toLowerCase().includes(q) ||
        p.route.toLowerCase().includes(q) ||
        p.heroHeading.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q)
      );
    });
  }, [pageMetas, searchQuery]);

  const openEditModal = (page: AdminPageMeta) => {
    setEditingPage(page);
    setTitle(page.title);
    setMetaDescription(page.metaDescription);
    setHeroHeading(page.heroHeading);
    setHeroSubheading(page.heroSubheading);
    setBadgeText(page.badgeText || "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;
    if (!title.trim()) {
      toast.error("Page SEO title is required.");
      return;
    }

    updatePageMeta(editingPage.id, {
      title: title.trim(),
      metaDescription: metaDescription.trim(),
      heroHeading: heroHeading.trim(),
      heroSubheading: heroSubheading.trim(),
      badgeText: badgeText.trim() || undefined,
      lastUpdated: new Date().toISOString().slice(0, 10),
    });

    toast.success(`Content & SEO for ${editingPage.pageName} updated! 🌸`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            <span>Storefront Copywriting</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-primary font-bold">Page Content & SEO</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1 flex items-center gap-2.5">
            <FileText className="h-7 w-7 text-primary" />
            <span>Site-Wide Page Titles, Descriptions & SEO</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Zero-code atomic control over page titles, meta descriptions, hero headings, and intro texts across every route of the store.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Managed Routes</span>
            <Globe className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {pageMetas.length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Core storefront pages
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>SEO Indexing</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            100%
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Meta tags configured
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Custom Badges</span>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-display font-bold text-foreground mt-2">
            {pageMetas.filter((p) => p.badgeText).length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Hero promotional pills
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Last Content Sync</span>
            <Calendar className="h-4 w-4 text-indigo-500" />
          </div>
          <p className="text-lg font-display font-bold text-foreground mt-2">
            {pageMetas[0]?.lastUpdated || "Today"}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Live reactive updates
          </p>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-card p-3 rounded-xl border border-border/70">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search page route, headline, or title..."
            className="pl-9 bg-background/60"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Showing <strong>{filteredPages.length}</strong> configured pages
        </p>
      </div>

      {/* Pages List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPages.map((page) => (
          <div
            key={page.id}
            className="group relative flex flex-col rounded-xl border border-border/80 bg-card p-5 shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200 justify-between"
          >
            <div className="space-y-3">
              {/* Route & Name Header */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    {page.route}
                  </span>
                  <h3 className="text-base font-bold text-foreground">
                    {page.pageName}
                  </h3>
                </div>
                {page.badgeText && (
                  <Badge variant="outline" className="text-[10px] font-semibold bg-muted/40">
                    {page.badgeText}
                  </Badge>
                )}
              </div>

              {/* Hero Heading & Subheading */}
              <div className="space-y-1 bg-secondary/30 rounded-lg p-3 border border-border/60">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  <Heading className="h-3 w-3 text-primary" />
                  <span>Storefront Hero Display</span>
                </div>
                <h4 className="text-sm font-bold text-foreground leading-snug">
                  {page.heroHeading}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {page.heroSubheading}
                </p>
              </div>

              {/* SEO Meta Snippet Preview */}
              <div className="space-y-1 bg-background rounded-lg p-3 border border-border/70 text-xs">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="font-semibold uppercase tracking-wider">SEO Title Tag</span>
                  <span>Updated: {page.lastUpdated}</span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold line-clamp-1">
                  {page.title}
                </p>
                <p className="text-muted-foreground text-[11px] line-clamp-2">
                  {page.metaDescription}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 mt-3 border-t border-border/70 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">
                Route: gloriosjapan.com{page.route}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditModal(page)}
                className="h-8 gap-1.5 text-xs bg-primary/5 hover:bg-primary/10 text-primary border-primary/20"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span>Edit Copy & SEO</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Page Content & SEO Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-display text-xl">
                <FileText className="h-5 w-5 text-primary" />
                <span>Edit Content & SEO: {editingPage?.pageName}</span>
              </DialogTitle>
              <DialogDescription>
                Customize customer-facing headlines, hero subtitles, and Google search engine optimization meta tags for route: <strong>{editingPage?.route}</strong>
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
                  <span className="text-[10px] text-muted-foreground">
                    Google SERP Snippet
                  </span>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="seo-title" className="text-xs font-semibold flex items-center justify-between">
                    <span>Page Title Tag (&lt;title&gt;) <span className="text-rose-500">*</span></span>
                    <span className="text-[10px] text-muted-foreground font-mono">{title.length} chars</span>
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
                  <Label htmlFor="seo-desc" className="text-xs font-semibold flex items-center justify-between">
                    <span>Meta Description (Google Snippet)</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{metaDescription.length} / 160 chars</span>
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
                    {metaDescription || "No description provided. Search engines may generate a snippet from your page copy."}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground font-semibold">
                Save Page Content & SEO
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}


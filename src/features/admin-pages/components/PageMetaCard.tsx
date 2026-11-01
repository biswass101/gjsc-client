import React from "react";
import { Heading, Edit2 } from "lucide-react";
import { AdminPageMeta } from "@/context/admin-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PageMetaCardProps {
  page: AdminPageMeta;
  onEdit: (page: AdminPageMeta) => void;
}

export function PageMetaCard({ page, onEdit }: PageMetaCardProps) {
  return (
    <div className="group relative flex flex-col rounded-xl border border-border/80 bg-card p-5 shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200 justify-between">
      <div className="space-y-3">
        {/* Route & Name Header */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
              {page.route}
            </span>
            <h3 className="text-base font-bold text-foreground">{page.pageName}</h3>
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
          <h4 className="text-sm font-bold text-foreground leading-snug">{page.heroHeading}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2">{page.heroSubheading}</p>
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
          <p className="text-muted-foreground text-[11px] line-clamp-2">{page.metaDescription}</p>
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
          onClick={() => onEdit(page)}
          className="h-8 gap-1.5 text-xs bg-primary/5 hover:bg-primary/10 text-primary border-primary/20"
        >
          <Edit2 className="h-3.5 w-3.5" />
          <span>Edit Copy & SEO</span>
        </Button>
      </div>
    </div>
  );
}

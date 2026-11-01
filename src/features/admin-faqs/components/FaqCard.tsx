import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { AdminFaq } from "@/context/admin-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface FaqCardProps {
  faq: AdminFaq;
  onEdit: (faq: AdminFaq) => void;
  onDelete: (faq: AdminFaq) => void;
  onToggleActive: (faq: AdminFaq) => void;
}

export function FaqCard({ faq, onEdit, onDelete, onToggleActive }: FaqCardProps) {
  return (
    <div
      className={`rounded-xl border p-5 bg-card shadow-xs transition-all duration-200 ${
        faq.active ? "border-border/80" : "border-border/40 opacity-70"
      }`}
    >
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-[10px] font-semibold">
              {faq.category}
            </Badge>
            <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              Order #{faq.order}
            </span>
            {!faq.active && (
              <Badge variant="outline" className="text-[10px] text-muted-foreground">
                Inactive
              </Badge>
            )}
          </div>

          <h3 className="text-base font-bold text-foreground">{faq.question}</h3>

          <p className="text-sm text-muted-foreground leading-relaxed pt-1">{faq.answer}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/60 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Active:</span>
            <Switch checked={faq.active} onCheckedChange={() => onToggleActive(faq)} />
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(faq)}
              className="h-8 gap-1.5 text-xs"
            >
              <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(faq)}
              className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

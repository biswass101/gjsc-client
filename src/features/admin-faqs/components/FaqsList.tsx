import React from "react";
import { HelpCircle, Plus } from "lucide-react";
import { AdminFaq } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { FaqCard } from "./FaqCard";

interface FaqsListProps {
  faqs: AdminFaq[];
  onOpenCreate: () => void;
  onEdit: (faq: AdminFaq) => void;
  onDelete: (faq: AdminFaq) => void;
  onToggleActive: (faq: AdminFaq) => void;
}

export function FaqsList({ faqs, onOpenCreate, onEdit, onDelete, onToggleActive }: FaqsListProps) {
  if (faqs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card">
        <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-40 mb-3" />
        <h3 className="font-bold text-foreground text-lg">No FAQs Found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
          Try adjusting your search criteria or create a helpful question-and-answer pair.
        </p>
        <Button onClick={onOpenCreate} className="mt-4 gap-2">
          <Plus className="h-4 w-4" />
          <span>Create FAQ</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <FaqCard
          key={faq.id}
          faq={faq}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}

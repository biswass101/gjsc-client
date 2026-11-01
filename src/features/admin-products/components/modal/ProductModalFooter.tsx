"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FORM_TABS } from "../../data/productConstants";
import type { ProductFormTab } from "../../types";

export interface ProductModalFooterProps {
  formTab: ProductFormTab;
  isEditing: boolean;
  onClose: () => void;
  onPrevTab: () => void;
  onNextTab: () => void;
}

export function ProductModalFooter({
  formTab,
  isEditing,
  onClose,
  onPrevTab,
  onNextTab,
}: ProductModalFooterProps) {
  const currentIdx = FORM_TABS.findIndex((t) => t.id === formTab);
  const currentTab = FORM_TABS[currentIdx];

  return (
    <div className="pt-3 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">
          Tab {currentIdx + 1} of {FORM_TABS.length}:
        </span>
        <span>{currentTab?.label}</span>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClose}
          className="rounded-xl text-xs h-9 cursor-pointer"
        >
          Cancel
        </Button>

        {formTab !== "identity" && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onPrevTab}
            className="rounded-xl text-xs h-9 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back
          </Button>
        )}

        {formTab !== "media" ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onNextTab}
            className="rounded-xl text-xs h-9 cursor-pointer"
          >
            Next Step <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        ) : null}

        <Button
          type="submit"
          size="sm"
          className="rounded-xl text-xs h-9 px-6 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm cursor-pointer"
        >
          <Check className="h-3.5 w-3.5 mr-1.5" />
          {isEditing ? "Save Formulation" : "Create Product"}
        </Button>
      </div>
    </div>
  );
}

"use client";

import { Check, Droplets, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AVAILABLE_SKIN_TYPES, AVAILABLE_SKIN_CONCERNS } from "../data/accountConstants";

export interface AccountSkincareTabProps {
  skinType: string;
  onSkinTypeChange: (type: string) => void;
  concerns: string[];
  onToggleConcern: (concern: string) => void;
  onSaveProfile: () => void;
  isSaving?: boolean | undefined;
}

export function AccountSkincareTab({
  skinType,
  onSkinTypeChange,
  concerns,
  onToggleConcern,
  onSaveProfile,
  isSaving,
}: AccountSkincareTabProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-border/50 pb-4">
        <h2 className="font-display text-xl sm:text-2xl font-medium text-foreground">
          Skincare Profile & Diagnostics
        </h2>
        <p className="text-xs text-muted-foreground">
          Personalize product recommendations and customized routine steps based on your skin
          barrier.
        </p>
      </div>

      {/* Skin Type Selector */}
      <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
        <div>
          <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
            <Droplets className="h-4 w-4 text-primary" />
            1. What is your primary skin type?
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Select the condition that best describes how your skin feels 2 hours after cleansing.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {AVAILABLE_SKIN_TYPES.map((type) => {
            const active = skinType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => onSkinTypeChange(type)}
                className={cn(
                  "rounded-xl border p-3 text-xs font-semibold text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1",
                  active
                    ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30"
                    : "border-border/80 bg-secondary/20 hover:border-primary/40 text-foreground",
                )}
              >
                <span>{type}</span>
                {active && <Check className="h-3 w-3" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skin Concerns Multi-Select */}
      <div className="rounded-xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
        <div>
          <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            2. Primary Skin Concerns & Target Goals
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Choose all concerns you'd like your Japanese beauty regimen to address.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {AVAILABLE_SKIN_CONCERNS.map((con) => {
            const active = concerns.includes(con);
            return (
              <button
                key={con}
                type="button"
                onClick={() => onToggleConcern(con)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5",
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                    : "border-border/80 bg-secondary/20 text-foreground hover:border-primary/40",
                )}
              >
                {active && <Check className="h-3 w-3 stroke-[2.5]" />}
                <span>{con}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Routine Guide Callout */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-xs space-y-2">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          🌸 Your Customized 4-Step Tokyo Ritual
        </h4>
        {skinType ? (
          <p className="text-muted-foreground leading-relaxed">
            Based on your <strong>{skinType}</strong> profile
            {concerns.length > 0 ? (
              <>
                {" "}
                and focus on <strong>{concerns.join(", ")}</strong>
              </>
            ) : (
              " (select 1+ concern above to unlock +150 Ritual Points)"
            )}
            , our dermatological algorithm prioritizes fermented sake koji toners, ceramide barrier
            creams, and SPF50+ lightweight watery essences.
          </p>
        ) : (
          <p className="text-muted-foreground leading-relaxed">
            Select your primary skin type and at least 1 concern above, then click Save to store
            your diagnostics profile in your account and earn <strong>+150 Ritual Points</strong>.
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onSaveProfile}
          disabled={isSaving}
          className="rounded-full text-xs px-6 cursor-pointer gap-2"
        >
          {isSaving && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
          {isSaving ? "Saving..." : "Save Skincare Profile"}
        </Button>
      </div>
    </div>
  );
}

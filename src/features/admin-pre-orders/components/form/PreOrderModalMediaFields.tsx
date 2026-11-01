import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface PreOrderModalMediaFieldsProps {
  image: string;
  setImage: (val: string) => void;
  notes: string;
  setNotes: (val: string) => void;
  active: boolean;
  setActive: (val: boolean) => void;
}

export function PreOrderModalMediaFields({
  image,
  setImage,
  notes,
  setNotes,
  active,
  setActive,
}: PreOrderModalMediaFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="po-image" className="text-xs font-semibold">
          Pre-Order Product Image URL <span className="text-rose-500">*</span>
        </Label>
        <div className="flex gap-3 items-center">
          <Input
            id="po-image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
            className="flex-1"
          />
          {image && (
            <div className="relative h-10 w-14 rounded-md border border-border overflow-hidden bg-muted shrink-0">
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="po-notes" className="text-xs font-semibold">
          Tokyo Sourcing / Logistics Notes
        </Label>
        <Textarea
          id="po-notes"
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Sourced fresh from Ginza flagship store; comes with official batch code verification..."
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border p-3">
        <div>
          <Label htmlFor="po-active" className="text-xs font-semibold">
            Pre-Order Booking Active
          </Label>
          <p className="text-[11px] text-muted-foreground">
            When active, customers can pay advance deposit and reserve their quota slot
          </p>
        </div>
        <Switch id="po-active" checked={active} onCheckedChange={setActive} />
      </div>
    </>
  );
}

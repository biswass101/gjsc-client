"use client";

import { CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AVATAR_PRESETS } from "../../data/videoConstants";

interface VideoCreatorFieldsProps {
  creatorName: string;
  setCreatorName: (v: string) => void;
  creatorHandle: string;
  setCreatorHandle: (v: string) => void;
  creatorAvatar: string;
  setCreatorAvatar: (v: string) => void;
}

export function VideoCreatorFields({
  creatorName,
  setCreatorName,
  creatorHandle,
  setCreatorHandle,
  creatorAvatar,
  setCreatorAvatar,
}: VideoCreatorFieldsProps) {
  return (
    <div className="p-3 rounded-lg border border-border/80 bg-muted/20 space-y-3">
      <h4 className="font-semibold text-xs text-foreground flex items-center gap-1.5">
        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
        <span>Beauty Creator Profile</span>
      </h4>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="vid-cname" className="text-xs font-medium">
            Creator Name *
          </Label>
          <Input
            id="vid-cname"
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            placeholder="Tasnim Rahman"
            className="text-xs"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="vid-chandle" className="text-xs font-medium">
            Handle (@)
          </Label>
          <Input
            id="vid-chandle"
            value={creatorHandle}
            onChange={(e) => setCreatorHandle(e.target.value)}
            placeholder="@tasnim.glows"
            className="text-xs"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="vid-cavatar" className="text-xs font-medium">
          Avatar URL
        </Label>
        <Input
          id="vid-cavatar"
          value={creatorAvatar}
          onChange={(e) => setCreatorAvatar(e.target.value)}
          placeholder="Avatar image URL"
          className="text-xs"
        />
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] text-muted-foreground">Presets:</span>
          <div className="flex items-center gap-1.5">
            {AVATAR_PRESETS.map((av) => (
              <button
                key={av.name}
                type="button"
                onClick={() => {
                  setCreatorAvatar(av.url);
                  if (!creatorName || creatorName === "Ayesha Rahman") {
                    setCreatorName(av.name);
                    setCreatorHandle(
                      `@${av.name.toLowerCase().replace(/[^a-z0-9]/g, "")}_beauty`
                    );
                  }
                }}
                className={cn(
                  "relative h-6 w-6 rounded-full overflow-hidden border-2 transition-transform cursor-pointer",
                  creatorAvatar === av.url
                    ? "border-primary scale-110"
                    : "border-border hover:border-primary/50"
                )}
                title={av.name}
              >
                <img src={av.url} alt={av.name} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


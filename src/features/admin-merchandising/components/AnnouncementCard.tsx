import React from "react";
import { Megaphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface AnnouncementCardProps {
  announcementText: string;
  setAnnouncementText: (val: string) => void;
  announcementActive: boolean;
  setAnnouncementActive: (val: boolean) => void;
  announcementLink: string;
  setAnnouncementLink: (val: string) => void;
}

export function AnnouncementCard({
  announcementText,
  setAnnouncementText,
  announcementActive,
  setAnnouncementActive,
  announcementLink,
  setAnnouncementLink,
}: AnnouncementCardProps) {
  return (
    <div className="surface-card p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
            <Megaphone className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              Storewide Announcement Bar
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Top ticker across all customer pages
            </p>
          </div>
        </div>
        <Switch checked={announcementActive} onCheckedChange={setAnnouncementActive} />
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <Label className="text-xs font-semibold">Announcement Message Text</Label>
          <Textarea
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            rows={2}
            className="mt-1 rounded-xl text-xs"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold">Click Destination URL / Route</Label>
          <Input
            value={announcementLink}
            onChange={(e) => setAnnouncementLink(e.target.value)}
            placeholder="/shop or /offers"
            className="mt-1 h-9 rounded-full text-xs"
          />
        </div>
      </div>
    </div>
  );
}


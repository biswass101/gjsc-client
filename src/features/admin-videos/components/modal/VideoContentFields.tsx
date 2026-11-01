"use client";

import { Film } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { THUMBNAIL_PRESETS, SAMPLE_VIDEO_PRESETS } from "../../data/videoConstants";

interface VideoContentFieldsProps {
  title: string;
  setTitle: (v: string) => void;
  caption: string;
  setCaption: (v: string) => void;
  duration: string;
  setDuration: (v: string) => void;
  views: string;
  setViews: (v: string) => void;
  thumbnail: string;
  setThumbnail: (v: string) => void;
  videoUrl: string;
  setVideoUrl: (v: string) => void;
}

export function VideoContentFields({
  title,
  setTitle,
  caption,
  setCaption,
  duration,
  setDuration,
  views,
  setViews,
  thumbnail,
  setThumbnail,
  videoUrl,
  setVideoUrl,
}: VideoContentFieldsProps) {
  return (
    <div className="p-3 rounded-lg border border-border/80 bg-muted/20 space-y-3">
      <h4 className="font-semibold text-xs text-foreground flex items-center gap-1.5">
        <Film className="h-3.5 w-3.5 text-primary" />
        <span>Video Content & Metadata</span>
      </h4>

      <div className="space-y-1.5">
        <Label htmlFor="vid-title" className="text-xs font-medium">
          Video Reel Title *
        </Label>
        <Input
          id="vid-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. My 3-Step Glass Skin Morning Routine"
          className="text-xs"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="vid-caption" className="text-xs font-medium">
          Quote / Review Caption
        </Label>
        <Textarea
          id="vid-caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Creator's quote or experience with the product..."
          rows={2}
          className="text-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="vid-duration" className="text-xs font-medium">
            Duration
          </Label>
          <Input
            id="vid-duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="0:45"
            className="text-xs"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="vid-views" className="text-xs font-medium">
            Views Counter
          </Label>
          <Input
            id="vid-views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            placeholder="48.2K"
            className="text-xs"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="vid-thumb" className="text-xs font-medium">
            Thumbnail URL *
          </Label>
          <span className="text-[10px] text-muted-foreground">9:16 vertical poster</span>
        </div>
        <Input
          id="vid-thumb"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="URL or select from presets below"
          className="text-xs"
          required
        />
        <div className="flex flex-wrap gap-1 pt-1">
          {THUMBNAIL_PRESETS.slice(0, 5).map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setThumbnail(preset.url)}
              className={cn(
                "px-2 py-0.5 rounded text-[10px] border transition-colors cursor-pointer",
                thumbnail === preset.url
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted text-muted-foreground"
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="vid-url" className="text-xs font-medium">
            Video Playback URL (Optional)
          </Label>
          <span className="text-[10px] text-muted-foreground">MP4 or YouTube Shorts</span>
        </div>
        <Input
          id="vid-url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://.../video.mp4"
          className="text-xs"
        />
        <div className="flex flex-wrap gap-1 pt-1">
          {SAMPLE_VIDEO_PRESETS.slice(0, 3).map((v) => (
            <button
              key={v.label}
              type="button"
              onClick={() => setVideoUrl(v.url)}
              className={cn(
                "px-2 py-0.5 rounded text-[10px] border transition-colors cursor-pointer",
                videoUrl === v.url
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted text-muted-foreground"
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


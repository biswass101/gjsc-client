"use client";

import { useRef, useState } from "react";
import { Film, Upload, Cloud, Loader2, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { adminApi } from "@/lib/api";
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
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [uploadedVideoName, setUploadedVideoName] = useState<string | null>(null);

  const videoFileInputRef = useRef<HTMLInputElement | null>(null);
  const thumbFileInputRef = useRef<HTMLInputElement | null>(null);

  // Cloudinary Video Upload Handler
  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so re-selecting same file works
    e.target.value = "";

    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      toast.error("Video file size exceeds the 100MB limit.");
      return;
    }

    try {
      setIsUploadingVideo(true);
      toast.info(`Uploading "${file.name}" to Cloudinary... ☁️`);

      const res = await adminApi.uploadVideo(file);

      if (res?.url) {
        setVideoUrl(res.url);
        setUploadedVideoName(file.name);

        // Auto-fill thumbnail from Cloudinary's generated video poster if thumbnail is empty or default
        if (res.thumbnailUrl && (!thumbnail || thumbnail.includes("unsplash") || thumbnail.startsWith("/hero"))) {
          setThumbnail(res.thumbnailUrl);
        }

        // Auto-fill duration if reported by Cloudinary
        if (res.duration) {
          setDuration(res.duration);
        }

        toast.success("Video uploaded to Cloudinary storage successfully! ☁️✨");
      }
    } catch (err: any) {
      console.error("Cloudinary video upload error:", err);
      toast.error(err?.message || "Failed to upload video to Cloudinary.");
    } finally {
      setIsUploadingVideo(false);
    }
  };

  // Cloudinary Thumbnail Upload Handler
  const handleThumbFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = "";

    try {
      setIsUploadingThumb(true);
      toast.info(`Uploading poster image to Cloudinary... ☁️`);

      const res = await adminApi.uploadImage(file);

      if (res?.url) {
        setThumbnail(res.url);
        toast.success("Thumbnail image uploaded to Cloudinary! ☁️📸");
      }
    } catch (err: any) {
      console.error("Cloudinary thumbnail upload error:", err);
      toast.error(err?.message || "Failed to upload thumbnail.");
    } finally {
      setIsUploadingThumb(false);
    }
  };

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

      {/* Cloudinary Video Upload Section */}
      <div className="space-y-2 p-2.5 rounded-lg border border-dashed border-primary/40 bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Cloud className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground">
              Video Playback & Cloudinary Storage
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground">MP4, WEBM, MOV (Max 100MB)</span>
        </div>

        {/* Hidden Video File Input */}
        <input
          ref={videoFileInputRef}
          type="file"
          accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
          className="hidden"
          onChange={handleVideoFileChange}
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploadingVideo}
            onClick={() => videoFileInputRef.current?.click()}
            className="text-xs h-8 border-primary/30 hover:bg-primary/10 text-primary flex items-center gap-1.5 cursor-pointer font-medium"
          >
            {isUploadingVideo ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Uploading to Cloudinary...</span>
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5" />
                <span>Upload Video to Cloudinary</span>
              </>
            )}
          </Button>

          {videoUrl && (
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="h-3 w-3 shrink-0" />
              <span className="truncate max-w-[200px]">
                {uploadedVideoName ? `Cloudinary: ${uploadedVideoName}` : "Video URL Linked"}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="vid-url" className="text-[11px] font-medium text-muted-foreground">
              Direct Video Playback URL (or auto-filled from Cloudinary)
            </Label>
          </div>
          <Input
            id="vid-url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://res.cloudinary.com/... or paste video URL"
            className="text-xs h-8 bg-background"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 pt-0.5">
          <span className="text-[10px] text-muted-foreground mr-1">Presets:</span>
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

      {/* Thumbnail Section */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="vid-thumb" className="text-xs font-medium">
            Thumbnail URL *
          </Label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isUploadingThumb}
              onClick={() => thumbFileInputRef.current?.click()}
              className="text-[10px] text-primary hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              {isUploadingThumb ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="h-3 w-3" />
                  <span>Upload Poster Image</span>
                </>
              )}
            </button>
            <span className="text-[10px] text-muted-foreground">9:16 vertical poster</span>
          </div>
        </div>

        {/* Hidden Thumbnail File Input */}
        <input
          ref={thumbFileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          className="hidden"
          onChange={handleThumbFileChange}
        />

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
    </div>
  );
}



"use client";

import { VideoContentFields } from "./VideoContentFields";
import { VideoCreatorFields } from "./VideoCreatorFields";

interface VideoModalMediaFieldsProps {
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
  creatorName: string;
  setCreatorName: (v: string) => void;
  creatorHandle: string;
  setCreatorHandle: (v: string) => void;
  creatorAvatar: string;
  setCreatorAvatar: (v: string) => void;
}

export function VideoModalMediaFields({
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
  creatorName,
  setCreatorName,
  creatorHandle,
  setCreatorHandle,
  creatorAvatar,
  setCreatorAvatar,
}: VideoModalMediaFieldsProps) {
  return (
    <div className="space-y-4">
      <VideoContentFields
        title={title}
        setTitle={setTitle}
        caption={caption}
        setCaption={setCaption}
        duration={duration}
        setDuration={setDuration}
        views={views}
        setViews={setViews}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
      />

      <VideoCreatorFields
        creatorName={creatorName}
        setCreatorName={setCreatorName}
        creatorHandle={creatorHandle}
        setCreatorHandle={setCreatorHandle}
        creatorAvatar={creatorAvatar}
        setCreatorAvatar={setCreatorAvatar}
      />
    </div>
  );
}

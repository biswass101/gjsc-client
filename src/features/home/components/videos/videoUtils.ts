export const isYouTube = (url?: string) => !!url && /youtube\.com|youtu\.be/.test(url);

export const getYouTubeEmbedUrl = (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/)([^#&?]*).*/,
  );
  return match && match[1]
    ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=0&controls=1&rel=0`
    : url;
};


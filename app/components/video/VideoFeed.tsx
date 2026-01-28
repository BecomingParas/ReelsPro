"use client";
import { useState, useRef, useEffect } from "react";
import VideoCard from "./VideoCard";

type FeedVideo = {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  user: { name: string; username: string; avatar?: string };
  description: string;
  music: string;
  likes: number;
  comments: number;
  shares: number;
  isFollowing?: boolean;
};

function toAbsoluteUrl(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (!url.startsWith("/")) return url;

  const endpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
  if (!endpoint) return url;

  const withScheme = endpoint.startsWith("http") ? endpoint : `https://${endpoint}`;
  const base = withScheme.endsWith("/") ? withScheme.slice(0, -1) : withScheme;
  return `${base}${url}`;
}

export default function VideoFeed() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [videos, setVideos] = useState<FeedVideo[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const windowHeight = containerRef.current.clientHeight;
      const newIndex = Math.round(scrollTop / windowHeight);
      if (
        newIndex !== activeVideoIndex &&
        newIndex >= 0 &&
        newIndex < videos.length
      ) {
        setActiveVideoIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [activeVideoIndex]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        if (!res.ok) {
          if (!cancelled) setVideos([]);
          return;
        }
        const data = await res.json();
        const mapped: FeedVideo[] = Array.isArray(data)
          ? data.map((v: any) => ({
              id: String(v._id ?? v.id),
              videoUrl: toAbsoluteUrl(v.videoUrl),
              thumbnailUrl: toAbsoluteUrl(v.thumbnailUrl),
              user: {
                name: v.user?.name || "User",
                username: v.user?.username || "user",
                avatar: v.user?.avatar,
              },
              description: v.description || "",
              music: v.music || "",
              likes: Number(v.likes || 0),
              comments: Number(v.comments || 0),
              shares: Number(v.shares || 0),
            }))
          : [];

        if (!cancelled) setVideos(mapped);
      } catch {
        if (!cancelled) setVideos([]);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
    >
      {videos.map((video, index) => (
        <div key={video.id} className="w-full h-full snap-start snap-always">
          <VideoCard video={video} isActive={index === activeVideoIndex} />
        </div>
      ))}

      {videos.length === 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-3xl">🎬</span>
            </div>
            <p className="text-lg font-medium text-muted-foreground">
              कुनै भिडियो फेला परेन
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

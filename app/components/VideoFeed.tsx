// components/VideoFeed.tsx (updated to vertical scrolling snap feed like TikTok, with smooth scrolling and animations)
"use client";
import React, { useState, useRef, useEffect } from "react";
import VideoComponent from "./VideoComponent";
import { IVideo } from "@/models/Video";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / windowHeight);
      setActiveVideoIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black"
      style={{ scrollBehavior: "smooth" }}
    >
      {videos.map((video, index) => (
        <div
          key={video._id?.toString()}
          className="w-full h-full snap-start snap-always"
        >
          <VideoComponent video={video} isActive={index === activeVideoIndex} />
        </div>
      ))}
      {videos.length === 0 && (
        <div className="w-full h-full flex items-center justify-center text-white">
          <p>No videos found</p>
        </div>
      )}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// components/VideoComponent.tsx (updated to match the provided VideoCard with animations, motions, and responsive design)
"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { IKVideo } from "imagekitio-next";
import { IVideo } from "@/models/Video";

interface VideoComponentProps {
  video: IVideo;
  isActive: boolean;
}

export default function VideoComponent({
  video,
  isActive,
}: VideoComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false); // TODO: Fetch from user session/API
  const [isSaved, setIsSaved] = useState(false); // TODO: Fetch from user session/API
  const [likes, setLikes] = useState(video.likes);
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
    // TODO: Call API to update likes
  };

  const handleDoubleTap = () => {
    if (!isLiked) {
      handleLike();
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center md:max-w-xl md:mx-auto lg:max-w-2xl">
      {" "}
      {/* Centered on desktop */}
      {/* Video */}
      <IKVideo
        ref={videoRef as any} // IKVideo might need ref adjustment if not supporting HTMLVideoElement directly
        path={video.videoUrl}
        transformation={[{ height: "1920", width: "1080" }]}
        controls={false} // Managed manually
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
        onDoubleClick={handleDoubleTap}
      />
      {/* Double tap heart animation */}
      {showHeart && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <Heart
            className="text-white fill-white animate-ping"
            size={100}
            style={{ animationDuration: "0.5s" }}
          />
        </div>
      )}
      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10" />
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      {/* Play/Pause overlay */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm animate-fade-in">
            <Play className="text-white" size={48} fill="white" />
          </div>
        </button>
      )}
      {/* Bottom left info */}
      <div className="absolute bottom-0 left-0 p-4 md:p-6 z-20 max-w-[calc(100%-100px)]">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={video.user.avatar}
            alt={video.user.name}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="text-white font-semibold text-sm md:text-base">
            {video.user.name}
          </span>
          <button className="px-4 py-1 bg-red-500 text-white text-xs md:text-sm font-semibold rounded-full hover:bg-red-600 transition-colors duration-300">
            Follow
          </button>
        </div>
        <h3 className="text-white font-semibold text-base md:text-lg mb-2">
          {video.title}
        </h3>
        <p className="text-white text-sm md:text-base opacity-90">
          {video.description}
        </p>
      </div>
      {/* Right side actions */}
      <div className="absolute bottom-0 right-0 p-4 md:p-6 z-20 flex flex-col gap-4 md:gap-6">
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 md:p-3 group-hover:bg-black/50 transition-all duration-300">
            <Heart
              className={`transition-all duration-300 ${
                isLiked ? "text-red-500 fill-red-500 scale-110" : "text-white"
              }`}
              size={window.innerWidth < 768 ? 24 : 28}
            />
          </div>
          <span className="text-white text-xs md:text-sm font-semibold">
            {formatNumber(likes)}
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 group">
          <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 md:p-3 group-hover:bg-black/50 transition-all duration-300">
            <MessageCircle
              className="text-white"
              size={window.innerWidth < 768 ? 24 : 28}
            />
          </div>
          <span className="text-white text-xs md:text-sm font-semibold">
            {formatNumber(video.comments)}
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 group">
          <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 md:p-3 group-hover:bg-black/50 transition-all duration-300">
            <Share2
              className="text-white"
              size={window.innerWidth < 768 ? 24 : 28}
            />
          </div>
          <span className="text-white text-xs md:text-sm font-semibold">
            {formatNumber(video.shares)}
          </span>
        </button>
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 md:p-3 group-hover:bg-black/50 transition-all duration-300">
            <Bookmark
              className={`transition-all duration-300 ${
                isSaved ? "text-yellow-400 fill-yellow-400" : "text-white"
              }`}
              size={window.innerWidth < 768 ? 24 : 28}
            />
          </div>
        </button>
        <button className="group">
          <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 md:p-3 group-hover:bg-black/50 transition-all duration-300">
            <MoreVertical
              className="text-white"
              size={window.innerWidth < 768 ? 24 : 28}
            />
          </div>
        </button>
      </div>
      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 transition-all duration-300"
      >
        {isMuted ? (
          <VolumeX className="text-white" size={20} />
        ) : (
          <Volume2 className="text-white" size={20} />
        )}
      </button>
    </div>
  );
}

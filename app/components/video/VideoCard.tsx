"use client";
import { useState, useRef, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import CommentSheet from "./Comment";
import { useLanguage } from "@/app/context/LanguageContext";

interface Video {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  user: {
    name: string;
    username: string;
    avatar?: string;
  };
  description: string;
  music: string;
  likes: number;
  comments: number;
  shares: number;
  isFollowing?: boolean;
}

interface VideoCardProps {
  video: Video;
  isActive: boolean;
}

export default function VideoCard({ video, isActive }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(video.likes);
  const [showHeart, setShowHeart] = useState(false);
  const [isFollowing, setIsFollowing] = useState(video.isFollowing || false);
  const [showComments, setShowComments] = useState(false);
  const { t } = useLanguage();

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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    if (!isLiked) {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }
  };

  const handleDoubleTap = () => {
    if (!isLiked) {
      handleLike({ stopPropagation: () => {} } as React.MouseEvent);
    }
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="relative w-full h-full bg-background flex items-center justify-center">
      {/* Video Container */}
      <div
        className="relative w-full h-full max-w-lg mx-auto cursor-pointer"
        onClick={togglePlay}
        onDoubleClick={handleDoubleTap}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent" />

        {/* Play/Pause Indicator */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center">
              <Play
                className="w-10 h-10 text-foreground ml-1"
                fill="currentColor"
              />
            </div>
          </div>
        )}

        {/* Double Tap Heart Animation */}
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart
              className="w-32 h-32 text-primary animate-heart-burst"
              fill="currentColor"
            />
          </div>
        )}

        {/* Top Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center hover:bg-background/50 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-4 left-4 right-20 animate-slide-up">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full gradient-border p-0.5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center text-sm font-bold">
                {video.user.name[0]}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base truncate">
                  @{video.user.username}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFollowing(!isFollowing);
                  }}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300",
                    isFollowing
                      ? "bg-muted text-muted-foreground"
                      : "gradient-bg text-primary-foreground hover:opacity-90"
                  )}
                >
                  {isFollowing ? t("followed") : t("follow")}
                </button>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {video.user.name}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm mb-3 line-clamp-2">{video.description}</p>

          {/* Music */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Music className="w-4 h-4 animate-bounce-subtle" />
            <span className="truncate">{video.music}</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5">
          {/* Like */}
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                isLiked
                  ? "bg-primary/20 text-primary"
                  : "bg-background/30 backdrop-blur-sm hover:bg-background/50"
              )}
            >
              <Heart
                className={cn(
                  "w-7 h-7 transition-all duration-300",
                  isLiked ? "scale-110" : "group-hover:scale-110"
                )}
                fill={isLiked ? "currentColor" : "none"}
              />
            </div>
            <span className="text-xs font-medium">{formatNumber(likes)}</span>
          </button>

          {/* Comment */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowComments(true);
            }}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-12 h-12 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center hover:bg-background/50 transition-all">
              <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-medium">
              {formatNumber(video.comments)}
            </span>
          </button>

          {/* Share */}
          <button className="flex flex-col items-center gap-1 group">
            <div className="w-12 h-12 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center hover:bg-background/50 transition-all">
              <Share2 className="w-7 h-7 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-medium">
              {formatNumber(video.shares)}
            </span>
          </button>

          {/* Save */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                isSaved
                  ? "bg-secondary/20 text-secondary"
                  : "bg-background/30 backdrop-blur-sm hover:bg-background/50"
              )}
            >
              <Bookmark
                className={cn(
                  "w-7 h-7 transition-all duration-300",
                  isSaved ? "scale-110" : "group-hover:scale-110"
                )}
                fill={isSaved ? "currentColor" : "none"}
              />
            </div>
          </button>

          {/* More */}
          <button className="flex flex-col items-center gap-1 group">
            <div className="w-12 h-12 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center hover:bg-background/50 transition-all">
              <MoreVertical className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
          </button>

          {/* Music Disc */}
          <div className="w-11 h-11 rounded-full border-2 border-border bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center animate-spin-slow">
            <div className="w-5 h-5 rounded-full bg-background" />
          </div>
        </div>
      </div>

      {/* Comment Sheet */}
      <CommentSheet
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        comments={[]}
      />
    </div>
  );
}

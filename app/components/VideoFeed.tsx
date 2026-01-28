"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Music,
  MoreVertical,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { cn } from "@/app/lib/utils";

// Enhanced mock data with more details
const mockVideos = [
  {
    id: "1",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    user: {
      name: "सरला श्रेष्ठ",
      username: "sarala_shrestha",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80",
      verified: true,
      followers: "12.4K",
    },
    description: "नेपालको सुन्दर पहाड हेर्नुहोस् 🏔️ #nepal #mountains #nature",
    music: "Nepali Folk Song - Traditional",
    likes: 12400,
    comments: 234,
    shares: 89,
    saves: 456,
    duration: "0:45",
    location: "पोखरा, नेपाल",
    timestamp: "२ घण्टा अघि",
    tags: ["नेपाल", "पहाड", "प्रकृति", "यात्रा"],
  },
  {
    id: "2",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    user: {
      name: "राजेश गुरुङ",
      username: "rajesh_gurung",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      verified: false,
      followers: "8.9K",
    },
    description: "काठमाडौंको सडकमा 🛣️ Night vibes ✨ #kathmandu #nightlife",
    music: "Resham Firiri - Cover",
    likes: 8900,
    comments: 156,
    shares: 45,
    saves: 234,
    duration: "1:20",
    location: "काठमाडौं, नेपाल",
    timestamp: "१ दिन अघि",
    tags: ["काठमाडौं", "रात", "सडक", "भिडियो"],
    isFollowing: true,
  },
  {
    id: "3",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    user: {
      name: "माया तामाङ",
      username: "maya_tamang",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      verified: true,
      followers: "45.6K",
    },
    description: "मोमो बनाउने तरिका 🥟 #nepali #food #momo #cooking",
    music: "Kutu Ma Kutu - Original",
    likes: 45600,
    comments: 892,
    shares: 234,
    saves: 1234,
    duration: "2:15",
    location: "भोजपुर, नेपाल",
    timestamp: "३ दिन अघि",
    tags: ["खाना", "मोमो", "नेपाली", "पाककला"],
  },
  {
    id: "4",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    user: {
      name: "विकास थापा",
      username: "bikas_thapa",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      verified: true,
      followers: "23.1K",
    },
    description: "पोखराको फेवा ताल 🌊 Beautiful sunrise #pokhara #fewalake",
    music: "Timi Bina - Neetesh Jung Kunwar",
    likes: 23100,
    comments: 445,
    shares: 156,
    saves: 567,
    duration: "0:58",
    location: "फेवा ताल, पोखरा",
    timestamp: "१ हप्ता अघि",
    tags: ["पोखरा", "ताल", "सूर्योदय", "प्राकृतिक"],
  },
  {
    id: "5",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800&q=80",
    user: {
      name: "सुनिता लामा",
      username: "sunita_lama",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
      verified: true,
      followers: "67.8K",
    },
    description: "नाचौं गाऔं 💃 New dance challenge! #dance #nepali #trending",
    music: "Laure - Sathi Ma Timro",
    likes: 67800,
    comments: 1234,
    shares: 567,
    saves: 2345,
    duration: "1:30",
    location: "ललितपुर, नेपाल",
    timestamp: "२ हप्ता अघि",
    tags: ["नाच", "च्यालेन्ज", "ट्रेन्डिङ", "मनोरञ्जन"],
    isFollowing: true,
  },
];

interface VideoCardProps {
  video: (typeof mockVideos)[0];
  isActive: boolean;
}

function VideoCard({ video, isActive }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isPlaying]);

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

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {/* Video Player */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={video.videoUrl}
        loop
        muted={isMuted}
        playsInline
        poster={video.thumbnailUrl}
        onClick={togglePlay}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between p-4 md:p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-start">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={video.user.avatar}
                alt={video.user.name}
                className="w-12 h-12 rounded-full border-2 border-white/30"
              />
              {video.user.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white">{video.user.name}</h3>
                {video.isFollowing && (
                  <span className="px-2 py-0.5 text-xs bg-white/20 rounded-full">
                    Following
                  </span>
                )}
              </div>
              <p className="text-sm text-white/80">@{video.user.username}</p>
            </div>
            <button className="ml-4 px-4 py-1.5 rounded-full gradient-bg text-white text-sm font-medium hover:shadow-lg transition-all duration-300">
              Follow
            </button>
          </div>

          {/* More Options */}
          <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Video Info - Bottom Left */}
        <div className="max-w-lg">
          <p className="text-lg font-medium mb-3 leading-relaxed">
            {video.description}
          </p>

          {/* Music */}
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-4 h-4" />
            <span className="text-sm font-medium">{video.music}</span>
            <div className="w-16 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white animate-shimmer" />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {video.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Location & Time */}
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>{video.location}</span>
            <span>•</span>
            <span>{video.timestamp}</span>
          </div>
        </div>

        {/* Action Buttons - Right Side */}
        <div className="absolute right-4 bottom-1/4 flex flex-col items-center gap-6">
          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center group"
          >
            <div
              className={cn(
                "p-3 rounded-full transition-all duration-300",
                isLiked
                  ? "bg-red-500/20"
                  : "bg-white/10 group-hover:bg-white/20"
              )}
            >
              <Heart
                className={cn(
                  "w-7 h-7 transition-all duration-300",
                  isLiked && "fill-red-500 text-red-500 scale-110"
                )}
              />
            </div>
            <span className="text-sm font-medium mt-1">
              {formatNumber(video.likes + (isLiked ? 1 : 0))}
            </span>
          </button>

          {/* Comment Button */}
          <button className="flex flex-col items-center group">
            <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
              <MessageCircle className="w-7 h-7" />
            </div>
            <span className="text-sm font-medium mt-1">
              {formatNumber(video.comments)}
            </span>
          </button>

          {/* Share Button */}
          <button className="flex flex-col items-center group">
            <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
              <Share2 className="w-7 h-7" />
            </div>
            <span className="text-sm font-medium mt-1">
              {formatNumber(video.shares)}
            </span>
          </button>

          {/* Save Button */}
          <button className="flex flex-col items-center group">
            <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium mt-1">
              {formatNumber(video.saves)}
            </span>
          </button>

          {/* User Avatar Stack */}
          <div className="relative mt-4">
            <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
              <img
                src={video.user.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
              <span className="text-xs font-bold">+{video.user.followers}</span>
            </div>
          </div>
        </div>

        {/* Video Controls */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center video-controls transition-opacity duration-300",
            showControls ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <div className="flex items-center gap-6">
            <button
              onClick={togglePlay}
              className="p-4 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="p-4 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-1/2" />
        </div>
      </div>
    </div>
  );
}

export default function VideoFeed() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const windowHeight = containerRef.current.clientHeight;
      const newIndex = Math.round(scrollTop / windowHeight);
      if (
        newIndex !== activeVideoIndex &&
        newIndex >= 0 &&
        newIndex < mockVideos.length
      ) {
        setActiveVideoIndex(newIndex);
      }
    }
  }, [activeVideoIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center animate-pulse">
            <span className="text-3xl">🎬</span>
          </div>
          <p className="text-lg font-medium text-muted-foreground">
            भिडियोहरू लोड हुँदैछ...
          </p>
          <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
            <div className="h-full gradient-bg animate-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
    >
      {mockVideos.map((video, index) => (
        <div
          key={video.id}
          className="w-full h-full snap-start snap-always relative"
        >
          <VideoCard video={video} isActive={index === activeVideoIndex} />

          {/* Current video indicator */}
          {index === activeVideoIndex && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium">
              <span className="gradient-text">
                Now Playing • {index + 1}/{mockVideos.length}
              </span>
            </div>
          )}
        </div>
      ))}

      {/* End of feed message */}
      <div className="w-full h-full snap-start flex flex-col items-center justify-center p-8 text-center">
        <div className="w-32 h-32 rounded-full gradient-bg flex items-center justify-center mb-6 animate-float">
          <span className="text-5xl">✨</span>
        </div>
        <h3 className="text-2xl font-bold mb-3 gradient-text">
          तपाईंले सबै भिडियो हेरिसक्नुभयो!
        </h3>
        <p className="text-white/60 max-w-md mb-8">
          थप रोचक भिडियोहरूको लागि पछिल्लो अपडेटहरू जाँच गर्नुहोस् वा आफ्नै
          भिडियो अपलोड गर्नुहोस्।
        </p>
        <button className="px-6 py-3 rounded-xl gradient-bg text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
          थप भिडियो खोज्नुहोस्
        </button>
      </div>
    </div>
  );
}

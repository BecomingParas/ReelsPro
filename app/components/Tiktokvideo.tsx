"use client";

import { IKVideo } from "imagekitio-next";
import { IVideo } from "@/models/Video";
import {
  Heart,
  MessageCircle,
  Share2,
  Music,
  MoreVertical,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function TikTokVideo({
  video,
  isActive,
}: {
  video: IVideo;
  isActive: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(
    video.likes || Math.floor(Math.random() * 1000)
  );
  const [following, setFollowing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-md mx-auto video-container animate-fade-in">
      {/* Video */}
      <div className="relative rounded-2xl overflow-hidden">
        <IKVideo
          path={video.videoUrl}
          transformation={[
            {
              height: "1920",
              width: "1080",
              q: "80",
            },
          ]}
          controls={false}
          autoPlay={isActive}
          loop
          muted={!isActive}
          className="w-full h-[85vh] object-cover"
          ref={videoRef}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* User Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-pink-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black" />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  @{video.user?.username || "nepali_user"}
                </h3>
                <p className="text-sm text-gray-300">
                  {video.user?.name || "नेपाली प्रयोगकर्ता"}
                </p>
              </div>
              <button
                onClick={() => setFollowing(!following)}
                className={`px-4 py-1 rounded-full text-sm font-semibold transition-all ${
                  following
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-pink-500 hover:bg-pink-600"
                }`}
              >
                {following ? "फलोइंग" : "फलो गर्नुहोस्"}
              </button>
            </div>
          </div>

          {/* Caption */}
          <div className="mb-4">
            <p className="text-lg font-medium">{video.title}</p>
            <p className="text-gray-300">{video.description}</p>
          </div>

          {/* Music */}
          <div className="flex items-center space-x-2 text-sm text-gray-300 mb-6">
            <Music className="w-4 h-4" />
            <span>मूल साङ्गीत • {video.user?.username || "user"}</span>
          </div>

          {/* Action Buttons - Right Side */}
          <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
            <button
              onClick={handleLike}
              className="flex flex-col items-center group"
            >
              <div
                className={`p-3 rounded-full transition-all duration-300 ${
                  liked
                    ? "bg-pink-500/20 animate-pulse-glow"
                    : "bg-black/30 hover:bg-white/10"
                }`}
              >
                <Heart
                  className={`w-8 h-8 ${
                    liked ? "fill-pink-500 text-pink-500" : "text-white"
                  }`}
                />
              </div>
              <span className="text-sm font-semibold mt-1">
                {likes.toLocaleString()}
              </span>
            </button>

            <button className="flex flex-col items-center group">
              <div className="p-3 rounded-full bg-black/30 hover:bg-white/10 transition-colors">
                <MessageCircle className="w-8 h-8" />
              </div>
              <span className="text-sm font-semibold mt-1">
                {(
                  video.comments || Math.floor(Math.random() * 100)
                ).toLocaleString()}
              </span>
            </button>

            <button className="flex flex-col items-center group">
              <div className="p-3 rounded-full bg-black/30 hover:bg-white/10 transition-colors">
                <Share2 className="w-8 h-8" />
              </div>
              <span className="text-sm font-semibold mt-1">
                {(
                  video.shares || Math.floor(Math.random() * 50)
                ).toLocaleString()}
              </span>
            </button>

            <button className="flex flex-col items-center group">
              <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 rotate-45">
                <MoreVertical className="w-8 h-8 -rotate-45" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm">
          LIVE
        </span>
        <span className="px-3 py-1 bg-red-500/80 backdrop-blur-sm rounded-full text-sm font-semibold">
          🔥 Trending
        </span>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-1000"
          style={{
            width: videoRef.current?.duration
              ? `${
                  (videoRef.current.currentTime / videoRef.current.duration) *
                  100
                }%`
              : "0%",
          }}
        />
      </div>
    </div>
  );
}

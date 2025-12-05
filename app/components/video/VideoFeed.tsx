"use client";
import { useState, useRef, useEffect } from "react";
import VideoCard from "./VideoCard";

// Mock data for demo
const mockVideos = [
  {
    id: "1",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
    user: { name: "सरला श्रेष्ठ", username: "sarala_shrestha" },
    description: "नेपालको सुन्दर पहाड हेर्नुहोस् 🏔️ #nepal #mountains #nature",
    music: "Nepali Folk Song - Traditional",
    likes: 12400,
    comments: 234,
    shares: 89,
  },
  {
    id: "2",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400",
    user: { name: "राजेश गुरुङ", username: "rajesh_gurung" },
    description: "काठमाडौंको सडकमा 🛣️ Night vibes ✨ #kathmandu #nightlife",
    music: "Resham Firiri - Cover",
    likes: 8900,
    comments: 156,
    shares: 45,
    isFollowing: true,
  },
  {
    id: "3",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    user: { name: "माया तामाङ", username: "maya_tamang" },
    description: "मोमो बनाउने तरिका 🥟 #nepali #food #momo #cooking",
    music: "Kutu Ma Kutu - Original",
    likes: 45600,
    comments: 892,
    shares: 234,
  },
  {
    id: "4",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
    user: { name: "विकास थापा", username: "bikas_thapa" },
    description: "पोखराको फेवा ताल 🌊 Beautiful sunrise #pokhara #fewalake",
    music: "Timi Bina - Neetesh Jung Kunwar",
    likes: 23100,
    comments: 445,
    shares: 156,
  },
  {
    id: "5",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=400",
    user: { name: "सुनिता लामा", username: "sunita_lama" },
    description: "नाचौं गाऔं 💃 New dance challenge! #dance #nepali #trending",
    music: "Laure - Sathi Ma Timro",
    likes: 67800,
    comments: 1234,
    shares: 567,
    isFollowing: true,
  },
];

export default function VideoFeed() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
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
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [activeVideoIndex]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
    >
      {mockVideos.map((video, index) => (
        <div key={video.id} className="w-full h-full snap-start snap-always">
          <VideoCard video={video} isActive={index === activeVideoIndex} />
        </div>
      ))}

      {mockVideos.length === 0 && (
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

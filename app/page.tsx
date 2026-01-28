"use client";

import { Suspense } from "react";
import VideoFeed from "./components/video/VideoFeed";

// Loading component for Suspense fallback
function VideoFeedSkeleton() {
  return (
    <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center animate-pulse">
          <span className="text-3xl">🎬</span>
        </div>
        <p className="text-lg font-medium text-muted-foreground">
          भिडियोहरू लोड हुँदैछ...
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="w-full">
      <Suspense fallback={<VideoFeedSkeleton />}>
        <VideoFeed />
      </Suspense>
    </main>
  );
}

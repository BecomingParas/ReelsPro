import { Suspense } from "react";
import VideoFeed from "./components/video/VideoFeed";
function VideoFeedSkeleton() { return <div className="flex h-[calc(100vh-4rem)] items-center justify-center"><div className="glass rounded-3xl p-8 text-center"><div className="mx-auto mb-4 size-10 animate-pulse rounded-2xl bg-primary/30" /><p className="text-sm text-muted-foreground">Loading your feed...</p></div></div>; }
export default function HomePage() { return <main className="w-full"><Suspense fallback={<VideoFeedSkeleton />}><VideoFeed /></Suspense></main>; }

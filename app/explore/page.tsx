"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  Star, 
  Compass, 
  Globe, 
  MapPin,
  Video,
  Users,
  Heart,
  Eye,
  Play,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Hash,
  Music,
  Gamepad2,
  Camera,
  Lightbulb,
  Film,
  Plus,
  MoreVertical,
  CheckCircle2
} from "lucide-react";

function ExploreContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All", icon: Compass },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "new", label: "New", icon: Clock },
    { id: "popular", label: "Popular", icon: Star },
    { id: "gaming", label: "Gaming", icon: Gamepad2 },
    { id: "music", label: "Music", icon: Music },
    { id: "travel", label: "Travel", icon: Globe },
    { id: "education", label: "Education", icon: Lightbulb },
    { id: "comedy", label: "Comedy", icon: Sparkles },
  ];

  const trendingVideos = [
    {
      id: 1,
      title: "Himalayan Sunrise Timelapse",
      creator: "Mountain Explorer",
      views: "1.2M",
      likes: "45K",
      duration: "2:45",
      thumbnail: "bg-gradient-to-br from-blue-900 to-purple-900",
      category: "travel",
      trending: true
    },
    {
      id: 2,
      title: "Nepali Cooking Masterclass",
      creator: "Chef Ram",
      views: "850K",
      likes: "32K",
      duration: "12:30",
      thumbnail: "bg-gradient-to-br from-orange-900 to-red-900",
      category: "education",
      trending: true
    },
    {
      id: 3,
      title: "Pokhara Paragliding Adventure",
      creator: "Adventure Nepal",
      views: "2.1M",
      likes: "98K",
      duration: "5:20",
      thumbnail: "bg-gradient-to-br from-cyan-900 to-blue-900",
      category: "travel",
      trending: true
    },
    {
      id: 4,
      title: "Traditional Nepali Music",
      creator: "Cultural Sounds",
      views: "560K",
      likes: "28K",
      duration: "8:15",
      thumbnail: "bg-gradient-to-br from-purple-900 to-pink-900",
      category: "music",
      trending: false
    },
    {
      id: 5,
      title: "Gaming Tournament Highlights",
      creator: "Nepal eSports",
      views: "3.4M",
      likes: "156K",
      duration: "15:45",
      thumbnail: "bg-gradient-to-br from-green-900 to-blue-900",
      category: "gaming",
      trending: true
    },
    {
      id: 6,
      title: "Stand-up Comedy Special",
      creator: "Nepali Humor",
      views: "720K",
      likes: "41K",
      duration: "22:10",
      thumbnail: "bg-gradient-to-br from-yellow-900 to-orange-900",
      category: "comedy",
      trending: false
    },
  ];

  const trendingHashtags = [
    "#NepalTravel",
    "#Himalayas",
    "#NepaliCulture",
    "#Kathmandu",
    "#Pokhara",
    "#MountEverest",
    "#NepaliFood",
    "#AdventureNepal",
    "#VisitNepal"
  ];

  const suggestedCreators = [
    {
      name: "Travel Diaries",
      followers: "245K",
      category: "Travel",
      verified: true
    },
    {
      name: "Nepali Kitchen",
      followers: "189K",
      category: "Cooking",
      verified: true
    },
    {
      name: "Tech Nepal",
      followers: "156K",
      category: "Technology",
      verified: false
    },
    {
      name: "Music Fusion",
      followers: "312K",
      category: "Music",
      verified: true
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-500/5 dark:from-pink-500/10 dark:via-purple-500/10 dark:to-cyan-500/10 animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 animate-pulse" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="group flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-pink-500/20 transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="font-medium">Back to Home</p>
                <p className="text-xs text-muted-foreground/70">Return to dashboard</p>
              </div>
            </Link>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                  <Compass className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  Explore
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Discover amazing videos and creators
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/upload"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-sm font-medium"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Upload
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos, creators, or topics..."
              className="w-full pl-12 pr-24 py-4 rounded-2xl bg-background/60 backdrop-blur-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity">
              Search
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Categories</h2>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                      : "bg-muted/30 hover:bg-muted/50 border border-border/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trending Now */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold">Trending Now</h2>
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 text-xs">
                LIVE
              </div>
            </div>
            <Link
              href="/trending"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingVideos.map((video) => (
              <div
                key={video.id}
                className="group bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden hover:border-pink-500/30 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Thumbnail */}
                <div className={`relative h-48 ${video.thumbnail} overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 text-xs text-white">
                    {video.duration}
                  </div>
                  {video.trending && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-xs font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  )}
                  <button className="absolute bottom-4 right-4 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white">
                    <Play className="w-5 h-5" />
                  </button>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-pink-500 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-muted-foreground">{video.creator}</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Hash className="w-3 h-3" />
                      {video.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        {video.views}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        {video.likes}
                      </span>
                    </div>
                    <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Trending Hashtags */}
          <div className="lg:col-span-2">
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Hash className="w-6 h-6 text-cyan-500" />
                <h2 className="text-xl font-semibold">Trending Hashtags</h2>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {trendingHashtags.map((hashtag, index) => (
                  <Link
                    key={index}
                    href={`/tag/${hashtag.slice(1)}`}
                    className="group px-4 py-3 rounded-xl bg-muted/20 border border-border/50 hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-cyan-500" />
                      <span className="font-medium group-hover:text-cyan-400 transition-colors">
                        {hashtag}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.floor(Math.random() * 1000) + 100} videos
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* For You */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-pink-500" />
                  <h2 className="text-xl font-semibold">Recommended For You</h2>
                </div>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Refresh
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="group bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden hover:border-pink-500/30 transition-all duration-300"
                  >
                    <div className="flex">
                      {/* Thumbnail */}
                      <div className="w-40 h-24 bg-gradient-to-br from-muted to-muted/60 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 dark:to-black/50" />
                        <button className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-8 h-8 text-foreground/60 group-hover:text-foreground transition-colors" />
                        </button>
                      </div>

                      {/* Info */}
                      <div className="flex-1 p-4">
                        <h3 className="font-semibold mb-1 group-hover:text-pink-500 transition-colors line-clamp-2">
                          Discover Nepal&apos;s Hidden Gems
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">Travel Vlogger</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
                          <span>12:45</span>
                          <span>•</span>
                          <span>45K views</span>
                          <span>•</span>
                          <span>2 days ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Suggested Creators & Live */}
          <div className="space-y-6">
            {/* Suggested Creators */}
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-500" />
                  <h2 className="text-xl font-semibold">Suggested Creators</h2>
                </div>
                <Link
                  href="/creators"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  View all
                </Link>
              </div>
              
              <div className="space-y-4">
                {suggestedCreators.map((creator, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors border border-border/50"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Video className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{creator.name}</h3>
                        {creator.verified && (
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{creator.category}</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Now */}
            <div className="bg-gradient-to-br from-card/80 to-background/60 rounded-2xl border border-border/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping" />
                  </div>
                  <h2 className="text-xl font-semibold">Live Now</h2>
                </div>
                <span className="text-sm text-red-500 font-medium">3 LIVE</span>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="group p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-red-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-900 to-orange-900" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-background animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">Mountain Live Stream</h3>
                        <p className="text-sm text-muted-foreground">Adventure Nepal</p>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">
                        LIVE
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm">
                      <span className="text-muted-foreground">1.2K watching</span>
                      <button className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition-colors text-white">
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Based */}
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold">Near You</h2>
              </div>
              
              <div className="space-y-3">
                {[
                  "Kathmandu Events",
                  "Pokhara Adventures",
                  "Chitwan Wildlife",
                  "Bhaktapur Heritage"
                ].map((location, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors border border-border/50"
                  >
                    <span>{location}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return <ExploreContent />;
}
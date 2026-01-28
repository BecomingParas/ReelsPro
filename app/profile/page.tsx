"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  ArrowLeft,
  Edit,
  Camera,
  Settings,
  Video,
  Heart,
  MessageSquare,
  Lock,
  Users,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Instagram,
  Twitter,
  Plus,
  Grid,
  List,
  Filter,
  TrendingUp,
  Clock,
  Award,
  Star,
  Bookmark,
  MoreVertical,
  CheckCircle2,
  Eye,
  type LucideIcon
} from "lucide-react";

type ProfileStat = {
  label: string;
  value: string;
  icon: LucideIcon;
  change: string;
};

type RecentActivity = {
  icon: LucideIcon;
  action: string;
  target: string;
  time: string;
};

type AchievementBadge = {
  title: string;
  icon: LucideIcon;
  unlocked: boolean;
};

const profileStats: ProfileStat[] = [
  { label: "Followers", value: "1.2K", icon: Users, change: "+120" },
  { label: "Following", value: "356", icon: Users, change: "+45" },
  { label: "Videos", value: "48", icon: Video, change: "12 new" },
  { label: "Likes", value: "5.8K", icon: Heart, change: "+856" },
];

const recentActivities: RecentActivity[] = [
  { icon: Heart, action: "liked", target: "Mountain Adventure", time: "2 hours ago" },
  { icon: Bookmark, action: "saved", target: "Cooking Tutorial", time: "1 day ago" },
  { icon: Users, action: "followed", target: "Travel Nepal", time: "2 days ago" },
  { icon: Star, action: "featured", target: "Your video", time: "3 days ago" },
  { icon: TrendingUp, action: "trending", target: "Himalayan Trek", time: "1 week ago" },
];

const achievementBadges: AchievementBadge[] = [
  { title: "First Video", icon: Video, unlocked: true },
  { title: "100 Likes", icon: Heart, unlocked: true },
  { title: "50 Followers", icon: Users, unlocked: true },
  { title: "Top Creator", icon: Star, unlocked: false },
  { title: "Weekly Streak", icon: Clock, unlocked: true },
  { title: "Video Editor", icon: Edit, unlocked: false },
  { title: "Community Star", icon: Award, unlocked: true },
  { title: "Rising Talent", icon: TrendingUp, unlocked: true },
];

function ProfileContent() {
    const { data: session, status } = useSession();
    const isAuthenticated = status === "authenticated";
    const username = (session?.user as any)?.username as string | undefined;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-12 h-12 text-muted-foreground" />
                </div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Please Login
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Login to view your profile, upload videos, and connect with creators
                </p>
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity font-semibold"
                >
                  <span>Login to Continue</span>
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </Link>
              </div>
            </div>
        );
    }

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
                    <Users className="w-5 h-5" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    Profile
                  </h1>
                </div>
                <p className="text-sm text-muted-foreground">
                  View and manage your profile
                </p>
              </div>

              <Link
                href="/settings"
                className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8 relative z-10">
          {/* Profile Header */}
          <div className="relative mb-8">
            {/* Cover Photo */}
            <div className="h-48 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button className="absolute top-4 right-4 p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="relative px-8">
              <div className="flex items-end justify-between -mt-16 mb-6">
                <div className="flex items-end gap-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 p-1">
                      <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center text-4xl font-bold">
                        {session?.user?.name?.[0] || "U"}
                      </div>
                    </div>
                    <button className="absolute bottom-2 right-2 p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{session?.user?.name}</h1>
                      <CheckCircle2 className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-muted-foreground mb-1">@{username || "user"}</p>
                    <p className="text-muted-foreground flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      Kathmandu, Nepal • 
                      <Calendar className="w-4 h-4 ml-2" />
                      Joined December 2024
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="px-6 py-3 rounded-xl border border-border hover:border-border/80 transition-colors flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8">
                <p className="text-foreground/80 mb-4">
                  Creative video maker and content creator. Sharing moments, stories, and tutorials.
                  #NepaliCreator 🇳🇵
                </p>
                <div className="flex items-center gap-4">
                  <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-pink-500 transition-colors">
                    <LinkIcon className="w-4 h-4" />
                    portfolio.com
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-pink-500 transition-colors">
                    <Instagram className="w-4 h-4" />
                    @{username}
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-pink-500 transition-colors">
                    <Twitter className="w-4 h-4" />
                    @{username}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {profileStats.map((stat, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6 hover:border-pink-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Content Tabs */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                {["Videos", "Liked", "Saved", "Playlists"].map((tab, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      index === 0
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <Grid className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <List className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="group bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden hover:border-pink-500/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-muted to-muted/60 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 text-xs text-white">
                      10:24
                    </div>
                    <button className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-pink-500 transition-colors">
                      Amazing Mountain View in Nepal
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Beautiful landscape from the Himalayas
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          2.4K
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Heart className="w-4 h-4" />
                          145
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MessageSquare className="w-4 h-4" />
                          24
                        </span>
                      </div>
                      <span className="text-muted-foreground">2 days ago</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors border border-border/50">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-600/20">
                    <activity.icon className="w-5 h-5 text-pink-500" />
                  </div>
                  <div className="flex-1">
                    <p>
                      <span className="font-medium">You</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Achievements</h2>
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievementBadges.map((badge, index) => (
                <div key={index} className={`p-4 rounded-xl text-center ${
                  badge.unlocked 
                    ? "bg-gradient-to-br from-pink-500/10 to-purple-600/10 border border-pink-500/30"
                    : "bg-muted/20 border border-border/50"
                }`}>
                  <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    badge.unlocked 
                      ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20"
                      : "bg-muted"
                  }`}>
                    <badge.icon className={`w-6 h-6 ${
                      badge.unlocked ? "text-pink-500" : "text-muted-foreground"
                    }`} />
                  </div>
                  <p className={`font-medium ${
                    badge.unlocked ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {badge.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
}

export default function ProfilePage() {
    return <ProfileContent />;
}
"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { cn } from "@/app/lib/utils";
import {
  Home,
  Compass,
  Users,
  Tv,
  MessageSquare,
  Bell,
  Upload,
  User,
  Settings,
  Film,
  Sparkles,
  TrendingUp,
  Music,
  Gamepad2,
  Camera,
  Lightbulb,
  Hash,
  Plus,
  Bookmark,
  Heart,
  LogOut,
  MoreVertical,
  CheckCircle2,
  Zap,
  Crown,
  Award,
  Volume2,
  Eye,
  MapPin,
  Globe,
  Search,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useNotification } from "./Notification";

type SidebarUser = {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  verified?: boolean;
  isLive?: boolean;
  category?: string;
};

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { data: session, status } = useSession();
  const [usersList, setUsersList] = useState<SidebarUser[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { showNotification } = useNotification();

  const selfId = session?.user?.id;
  const fallbackInitial = useMemo(() => {
    const v = (session?.user?.name || session?.user?.email || "U").trim();
    return v.slice(0, 1).toUpperCase();
  }, [session?.user?.email, session?.user?.name]);

  const menuItems = [
    { id: 'home', icon: Home, label: t("home") || "Home", href: "/" },
    { id: 'explore', icon: Compass, label: t("explore") || "Explore", href: "/explore" },
    { id: 'friends', icon: Users, label: t("friends") || "Friends", href: "/friends" },
    { id: 'live', icon: Tv, label: t("live") || "Live", href: "/live", badge: "LIVE" },
    { id: 'messages', icon: MessageSquare, label: t("messages") || "Messages", href: "/messages", count: 3 },
    { id: 'notifications', icon: Bell, label: t("notifications") || "Notifications", href: "/notifications" },
    { id: 'upload', icon: Upload, label: t("upload") || "Upload", href: "/upload" },
    { id: 'profile', icon: User, label: t("profile") || "Profile", href: "/profile" },
    { id: 'settings', icon: Settings, label: t("settings") || "Settings", href: "/settings" },
  ];

  const categories = [
    { icon: Music, label: "Music", color: "text-pink-500", count: "1.2K" },
    { icon: Gamepad2, label: "Gaming", color: "text-purple-500", count: "856" },
    { icon: Camera, label: "Photography", color: "text-blue-500", count: "432" },
    { icon: Lightbulb, label: "Education", color: "text-yellow-500", count: "987" },
    { icon: Film, label: "Movies", color: "text-cyan-500", count: "654" },
    { icon: TrendingUp, label: "Trending", color: "text-orange-500", count: "2.1K" },
  ];

  const trendingTags = [
    "#NepaliReels", "#TravelNepal", "#Culture", "#Music", "#Comedy",
    "#Trending", "#Himalayas", "#Food", "#Dance", "#Nature"
  ];

  useEffect(() => {
    // Mock users data - replace with actual API call
    const mockUsers: SidebarUser[] = [
      { id: "1", name: "Sarala Shrestha", username: "@sarala_shrestha", verified: true, isLive: true, category: "Music" },
      { id: "2", name: "Basant Shrestha", username: "@basantashrestha", verified: true, isLive: false, category: "Travel" },
      { id: "3", name: "Maya Ehu", username: "@maya_ehu", verified: false, isLive: true, category: "Comedy" },
      { id: "4", name: "Kamal Sharif", username: "@kamal_sharif", verified: true, isLive: false, category: "Education" },
      { id: "5", name: "Anita Gurung", username: "@anita_gurung", verified: false, isLive: false, category: "Gaming" },
    ];
    setUsersList(mockUsers);
  }, [selfId]);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity"
      >
        {collapsed ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {collapsed && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setCollapsed(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative top-0 left-0 z-40 h-screen
        flex flex-col w-72 md:w-80
        bg-gradient-to-b from-gray-950/95 via-black/95 to-gray-950/95
        backdrop-blur-xl border-r border-gray-800/50
        transition-all duration-300 ease-in-out
        ${collapsed ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* Logo Section - TOP OF SIDEBAR */}
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 group-hover:from-pink-600 group-hover:to-purple-700 transition-all duration-300">
                <Film className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  NepaliReels
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Create & Share 🇳🇵</p>
              </div>
            </Link>
            <button 
              onClick={() => setCollapsed(false)}
              className="md:hidden ml-auto p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-800/50 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
          {/* Main Menu */}
          <div className="space-y-1 mb-8">
            <h3 className="px-3 text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Menu</h3>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => window.innerWidth < 768 && setCollapsed(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-l-4 border-pink-500"
                      : "hover:bg-gray-900/50 border-l-4 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${
                      isActive ? "text-pink-500" : "text-gray-400 group-hover:text-white"
                    }`} />
                    <span className={`font-medium ${
                      isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400 animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span className="w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="flex items-center justify-between px-3 mb-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Categories</h3>
              <Link 
                href="/categories" 
                className="text-xs text-pink-500 hover:text-pink-400 transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={index}
                    href={`/category/${category.label.toLowerCase()}`}
                    className="group p-3 rounded-xl bg-gray-900/30 hover:bg-gray-900/50 border border-gray-800/30 hover:border-pink-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-600/10">
                        <Icon className={`w-4 h-4 ${category.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{category.label}</p>
                        <p className="text-xs text-gray-400">{category.count} videos</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Following Users */}
          <div className="mb-8">
            <div className="flex items-center justify-between px-3 mb-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Following</h3>
              <Link 
                href="/following" 
                className="text-xs text-pink-500 hover:text-pink-400 transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="space-y-2">
              {usersList.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-900/30 hover:bg-gray-900/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-0.5">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                          <span className="font-bold text-sm">
                            {user.name[0]}
                          </span>
                        </div>
                      </div>
                      {user.isLive && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        {user.verified && (
                          <CheckCircle2 className="w-3 h-3 text-blue-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{user.username}</p>
                      <p className="text-xs text-gray-500">{user.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {user.isLive && (
                      <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded-full">
                        LIVE
                      </span>
                    )}
                    <button className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Tags */}
          <div className="mb-8">
            <h3 className="px-3 text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Trending Tags</h3>
            <div className="flex flex-wrap gap-2 px-3">
              {trendingTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${tag.slice(1)}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/50 hover:border-pink-500/30 rounded-full text-sm transition-all duration-300 group"
                >
                  <Hash className="w-3 h-3 text-gray-400 group-hover:text-pink-500" />
                  <span className="text-gray-300 group-hover:text-white">{tag}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Creator Tools */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold">Creator Tools</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Unlock premium features to grow your audience
            </p>
            <button className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-sm font-medium">
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-800/50">
          {session ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 hover:bg-gray-900/70 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <span className="font-bold text-lg">
                        {fallbackInitial}
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-black" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">
                    {session.user?.name || session.user?.email}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    @{((session.user as any)?.username) || session.user?.email?.split("@")[0]}
                  </p>
                </div>
              </div>
              <div className="relative group">
                <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
                
                {/* User Menu Dropdown */}
                <div className="absolute bottom-full right-0 mb-2 w-56 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-2">
                    <Link
                      href="/creator"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-800/50 transition-colors"
                    >
                      <Award className="w-4 h-4 text-gray-400" />
                      <span>Creator Studio</span>
                    </Link>
                    <Link
                      href="/saved"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-800/50 transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-gray-400" />
                      <span>Saved</span>
                    </Link>
                    <Link
                      href="/liked"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-800/50 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-gray-400" />
                      <span>Liked Videos</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-800/50 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span>Settings</span>
                    </Link>
                    <div className="border-t border-gray-800/50 my-2" />
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors text-gray-400"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-400 mb-4">Join the community!</p>
              <button
                onClick={() => signIn(undefined, { callbackUrl: "/" })}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity font-medium"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { 
  Search, 
  Plus, 
  Bell, 
  Film,
  Home,
  Compass,
  MessageCircle,
  TrendingUp,
  User,
  Settings,
  LogOut,
  Sparkles,
  Mic,
  Menu,
  X,
  Heart,
  Bookmark,
  Award,
  Volume2,
  Gamepad2,
  Music,
  Camera,
  Globe,
  Zap,
  Crown,
  CheckCircle2,
  MoreVertical
} from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { showNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayName = session?.user?.name || session?.user?.email || "";
  const fallbackInitial = (session?.user?.name || session?.user?.email || "U")
    .trim()
    .slice(0, 1)
    .toUpperCase();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchBar(false);
      showNotification(`Searching for: ${searchQuery}`, "info");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      showNotification("Signed out successfully", "success");
      setShowMobileMenu(false);
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  const navItems = [
    { href: "/", label: "Home", icon: Home, active: pathname === "/" },
    { href: "/explore", label: "Explore", icon: Compass, active: pathname === "/explore" },
    { href: "/trending", label: "Trending", icon: TrendingUp, active: pathname === "/trending" },
    { href: "/messages", label: "Messages", icon: MessageCircle, active: pathname === "/messages" },
    { href: "/notifications", label: "Notifications", icon: Bell, active: pathname === "/notifications" },
    { href: "/upload", label: "Upload", icon: Plus, active: pathname === "/upload" },
  ];

  const mobileNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/upload", label: "Upload", icon: Plus },
    { href: "/messages", label: "Messages", icon: MessageCircle },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const quickCategories = [
    { icon: Music, label: "Music", color: "text-pink-500" },
    { icon: Gamepad2, label: "Gaming", color: "text-purple-500" },
    { icon: Camera, label: "Photography", color: "text-blue-500" },
    { icon: Globe, label: "Travel", color: "text-green-500" },
  ];

  return (
    <>
      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/95 backdrop-blur-xl border-b border-gray-800/50" 
          : "bg-gradient-to-b from-black via-black/95 to-transparent border-b border-transparent"
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo and Navigation */}
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 group-hover:from-pink-600 group-hover:to-purple-700 transition-all duration-300">
                  <Film className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    NepaliReels
                  </span>
                  <span className="text-xs text-gray-400 -mt-1">🇳🇵 Create & Share</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.slice(0, 3).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-300 ${
                      item.active
                        ? "text-pink-500 bg-pink-500/10"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Center: Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-6">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search videos, creators, or sounds..."
                    className="w-full pl-12 pr-24 py-3 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <button
                      type="button"
                      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                      title="Voice search"
                      onClick={() => showNotification("Voice search coming soon!", "info")}
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-sm font-medium"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Right: User Actions */}
            <div className="flex items-center gap-3">
              {/* Mobile Search Button */}
              <button
                onClick={() => setShowSearchBar(!showSearchBar)}
                className="md:hidden p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Notification Bell */}
              <button 
                className="relative p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
                onClick={() => router.push("/notifications")}
              >
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-black animate-pulse" />
              </button>

              {/* Messages */}
              <button 
                className="relative p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors hidden sm:block"
                onClick={() => router.push("/messages")}
              >
                <MessageCircle className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
              </button>

              {/* Upload Button */}
              {session ? (
                <Link
                  href="/upload"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Upload</span>
                </Link>
              ) : (
                <Link
                  href="/auth"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity"
                >
                  <span className="font-medium">Login</span>
                </Link>
              )}

              {/* User Menu */}
              {session ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                      <span className="font-bold text-sm">
                        {fallbackInitial}
                      </span>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="p-4">
                      {/* User Info */}
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-800/50">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-lg font-bold">
                          {fallbackInitial}
                        </div>
                        <div>
                          <p className="font-semibold">{displayName}</p>
                          <p className="text-sm text-gray-400">
                            @{((session.user as any)?.username) || session.user?.email?.split("@")[0]}
                          </p>
                        </div>
                        <Sparkles className="w-5 h-5 text-yellow-500 ml-auto" />
                      </div>

                      {/* Menu Items */}
                      <div className="space-y-1">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-800/50 transition-colors"
                        >
                          <User className="w-5 h-5 text-gray-400" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-800/50 transition-colors"
                        >
                          <Settings className="w-5 h-5 text-gray-400" />
                          <span>Settings</span>
                        </Link>
                        <Link
                          href="/creator"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-800/50 transition-colors"
                        >
                          <TrendingUp className="w-5 h-5 text-gray-400" />
                          <span>Creator Studio</span>
                          <span className="ml-auto px-2 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-xs">
                            Pro
                          </span>
                        </Link>
                        <Link
                          href="/saved"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-800/50 transition-colors"
                        >
                          <Bookmark className="w-5 h-5 text-gray-400" />
                          <span>Saved</span>
                        </Link>
                      </div>

                      {/* Logout */}
                      <button
                        onClick={handleSignOut}
                        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-800 hover:border-red-500/30 hover:bg-red-500/10 transition-colors text-red-400"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => router.push("/auth")}
                  className="sm:hidden px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity"
                >
                  <span className="font-medium">Login</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
              >
                {showMobileMenu ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showSearchBar && (
            <div className="md:hidden mt-4 animate-fade-in">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search videos..."
                    className="w-full pl-12 pr-20 py-3 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-sm font-medium"
                  >
                    Go
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Navigation (Mobile) */}
        <div className="lg:hidden border-t border-gray-800/50">
          <div className="flex items-center justify-around py-2">
            {mobileNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                  pathname === item.href
                    ? "text-pink-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl animate-fade-in">
          <div className="container mx-auto px-4 py-8">
            {/* Close Button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* User Info */}
            {session ? (
              <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-gradient-to-r from-gray-900 to-black border border-gray-800/50">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
                  {fallbackInitial}
                </div>
                <div className="flex-1">
                  <p className="text-xl font-bold">{displayName}</p>
                  <p className="text-gray-400">@{((session.user as any)?.username) || session.user?.email?.split("@")[0]}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <span className="font-bold">1.2K</span>
                      <span className="text-gray-400">Followers</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-bold">356</span>
                      <span className="text-gray-400">Following</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-bold">48</span>
                      <span className="text-gray-400">Videos</span>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-8 text-center">
                <p className="text-gray-400 mb-4">Join the community!</p>
                <Link
                  href="/auth"
                  onClick={() => setShowMobileMenu(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity font-semibold"
                >
                  Sign In / Register
                </Link>
              </div>
            )}

            {/* Quick Categories */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">Quick Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={index}
                      href={`/category/${category.label.toLowerCase()}`}
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-gray-800">
                        <Icon className={`w-4 h-4 ${category.color}`} />
                      </div>
                      <span>{category.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="space-y-2">
              <Link
                href="/creator"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
              >
                <TrendingUp className="w-5 h-5 text-pink-500" />
                <span>Creator Studio</span>
                <span className="ml-auto px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-xs">
                  Pro
                </span>
              </Link>
              <Link
                href="/live"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
              >
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-red-500 animate-ping" />
                </div>
                <span>Go Live</span>
              </Link>
              <Link
                href="/sounds"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
              >
                <Volume2 className="w-5 h-5 text-blue-500" />
                <span>Sounds</span>
              </Link>
              <Link
                href="/effects"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
              >
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span>Effects</span>
              </Link>
              <Link
                href="/settings"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-400" />
                <span>Settings</span>
              </Link>
              <Link
                href="/help"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
              >
                <div className="w-5 h-5 text-gray-400">?</div>
                <span>Help & Support</span>
              </Link>
            </div>

            {/* Logout Button */}
            {session && (
              <button
                onClick={handleSignOut}
                className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-800 hover:border-red-500/30 hover:bg-red-500/10 transition-colors text-red-400"
              >
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            )}

            {/* App Info */}
            <div className="mt-8 pt-8 border-t border-gray-800/50 text-center">
              <p className="text-sm text-gray-500">NepaliReels v1.0.0</p>
              <p className="text-xs text-gray-600 mt-2">© 2024 All rights reserved</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
"use client";
import {
  Settings,
  Share2,
  Grid,
  Heart,
  Bookmark,
  Edit3,
  Camera,
  X,
  LogOut,
} from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import LanguageToggle from "../components/LanguageToggle";
import { cn } from "../lib/utils";
import { Input } from "../components/ui/input";

const userVideos = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300",
    views: "12.4K",
    likes: 234,
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300",
    views: "8.9K",
    likes: 156,
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300",
    views: "45.6K",
    likes: 892,
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=300",
    views: "23.1K",
    likes: 445,
  },
  {
    id: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300",
    views: "67.8K",
    likes: 1234,
  },
  {
    id: 6,
    thumbnail:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300",
    views: "5.2K",
    likes: 89,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("videos");
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useLanguage();
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
    bio: user?.bio || "",
  });

  const tabs = [
    { id: "videos", icon: Grid, label: t("videos") },
    { id: "liked", icon: Heart, label: t("liked") },
    { id: "saved", icon: Bookmark, label: t("saved") },
  ];

  const handleSaveProfile = () => {
    updateProfile(editData);
    setIsEditing(false);
    toast.success(t("profileUpdated"));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full gradient-bg mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{t("login")}</h2>
            <p className="text-muted-foreground mb-6">
              Login to view your profile
            </p>
            <Link to="/auth">
              <Button className="gradient-bg hover:opacity-90 rounded-full px-8">
                {t("login")}
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pb-24">
        {/* Cover/Header */}
        <div className="relative h-32 md:h-48 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800')] bg-cover bg-center opacity-20" />
        </div>

        {/* Profile Info */}
        <div className="relative px-4 md:px-6 -mt-16 animate-fade-in">
          <div className="max-w-2xl mx-auto">
            {/* Avatar */}
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
              <div className="relative">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full gradient-border p-1 bg-background">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center text-4xl font-bold">
                    {user?.fullName?.[0] || "U"}
                  </div>
                </div>
                <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full gradient-bg flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity">
                  <Camera className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>

              {/* Actions - Desktop */}
              <div className="hidden md:flex items-center gap-3 mb-2 ml-auto">
                <LanguageToggle />
                <Button
                  onClick={() => setIsEditing(true)}
                  className="rounded-full gradient-bg hover:opacity-90"
                >
                  {t("editProfile")}
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* User Details */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">{user?.fullName}</h1>
                <span className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center text-xs">
                  ✓
                </span>
              </div>
              <p className="text-muted-foreground mb-3">@{user?.username}</p>
              <p className="text-sm max-w-md mb-4">{user?.bio}</p>

              {/* Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-xl font-bold">{user?.videos}</p>
                  <p className="text-sm text-muted-foreground">{t("videos")}</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">
                    {formatNumber(user?.followers || 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("followers")}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{user?.following}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("following")}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">
                    {formatNumber(user?.likes || 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">{t("likes")}</p>
                </div>
              </div>
            </div>

            {/* Actions - Mobile */}
            <div className="flex md:hidden gap-3 mb-6">
              <Button
                onClick={() => setIsEditing(true)}
                className="flex-1 rounded-full gradient-bg hover:opacity-90"
              >
                {t("editProfile")}
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings className="w-4 h-4" />
              </Button>
            </div>

            {/* Language Toggle - Mobile */}
            <div className="flex md:hidden justify-center mb-6">
              <LanguageToggle />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 border-b-2 transition-all",
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-3 gap-1 md:gap-2 stagger-children">
              {userVideos.map((video) => (
                <button
                  key={video.id}
                  className="relative aspect-[9/16] rounded-lg md:rounded-xl overflow-hidden group"
                >
                  <img
                    src={video.thumbnail}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs font-medium">
                    <Heart className="w-3 h-3" />
                    {video.likes}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <>
          <div
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 animate-fade-in"
            onClick={() => setIsEditing(false)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto animate-scale-in">
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{t("editProfile")}</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Avatar Edit */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full gradient-border p-1">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center text-3xl font-bold">
                        {editData.fullName?.[0] || "U"}
                      </div>
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-bg flex items-center justify-center shadow-lg">
                      <Camera className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    {t("fullName")}
                  </label>
                  <Input
                    value={editData.fullName}
                    onChange={(e) =>
                      setEditData({ ...editData, fullName: e.target.value })
                    }
                    className="h-11 rounded-xl bg-muted/50 border-border/50 focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    {t("username")}
                  </label>
                  <Input
                    value={editData.username}
                    onChange={(e) =>
                      setEditData({ ...editData, username: e.target.value })
                    }
                    className="h-11 rounded-xl bg-muted/50 border-border/50 focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    {t("bio")}
                  </label>
                  <textarea
                    value={editData.bio}
                    onChange={(e) =>
                      setEditData({ ...editData, bio: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 rounded-xl"
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    className="flex-1 rounded-xl gradient-bg hover:opacity-90"
                  >
                    {t("save2")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "../context/LanguageContext";
import Link from "next/link";
import { 
  ArrowLeft, 
  Globe, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Palette, 
  Laptop,
  Eye,
  EyeOff,
  Volume2,
  Languages,
  Settings as SettingsIcon,
  CheckCircle,
  ChevronRight,
  Download,
  Key,
  Users,
  Database
} from "lucide-react";

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");

  const isDark = useMemo(() => {
    const current = resolvedTheme || theme;
    return current === "dark";
  }, [resolvedTheme, theme]);

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "language", label: "Language", icon: Languages },
  ];

  const settingsOptions = {
    general: [
      {
        icon: Database,
        title: "Data Usage",
        description: "Manage cache and storage",
        value: "1.2 GB used",
        action: () => {}
      },
      {
        icon: Download,
        title: "Download Quality",
        description: "Set default download quality",
        value: "1080p",
        action: () => {}
      },
      {
        icon: Key,
        title: "Security",
        description: "Two-factor authentication",
        value: "Disabled",
        action: () => {}
      }
    ],
    appearance: [
      {
        icon: Sun,
        title: "Light Mode",
        description: "Switch to light theme",
        value: "Light",
        action: () => setTheme("light"),
        active: !isDark
      },
      {
        icon: Moon,
        title: "Dark Mode",
        description: "Switch to dark theme",
        value: "Dark",
        action: () => setTheme("dark"),
        active: isDark
      },
      {
        icon: Laptop,
        title: "System Default",
        description: "Use system theme",
        value: "System",
        action: () => setTheme("system"),
        active: theme === "system"
      }
    ],
    language: [
      {
        icon: Globe,
        title: "नेपाली (Nepali)",
        description: "नेपाली भाषा",
        value: "ne",
        action: () => setLanguage("ne"),
        active: language === "ne"
      },
      {
        icon: Globe,
        title: "English",
        description: "English language",
        value: "en",
        action: () => setLanguage("en"),
        active: language === "en"
      }
    ],
    notifications: [
      {
        icon: Bell,
        title: "Push Notifications",
        description: "Receive push notifications",
        value: "Enabled",
        toggle: true
      },
      {
        icon: Volume2,
        title: "Sound Effects",
        description: "Play sound for notifications",
        value: "Enabled",
        toggle: true
      },
      {
        icon: Eye,
        title: "Show Previews",
        description: "Show message previews",
        value: "Disabled",
        toggle: true
      }
    ],
    privacy: [
      {
        icon: EyeOff,
        title: "Private Account",
        description: "Make account private",
        value: "Public",
        toggle: true
      },
      {
        icon: Users,
        title: "Who Can Message",
        description: "Control who can message you",
        value: "Everyone",
        action: () => {}
      },
      {
        icon: Shield,
        title: "Data Sharing",
        description: "Control data sharing options",
        value: "Limited",
        action: () => {}
      }
    ]
  };

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
                  <SettingsIcon className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  Settings
                </h1>
              </div>
              <p className="text-sm text-gray-400">
                Customize your experience
              </p>
            </div>

            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-pink-500" />
                Settings Menu
              </h3>
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/30"
                        : "hover:bg-muted/50 border border-transparent"
                    }`}
                  >
                    <tab.icon className={`w-5 h-5 ${
                      activeTab === tab.id ? "text-pink-500" : "text-muted-foreground"
                    }`} />
                    <span className="font-medium">{tab.label}</span>
                    {activeTab === tab.id && (
                      <ChevronRight className="w-4 h-4 ml-auto text-pink-500" />
                    )}
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                  Quick Stats
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Storage Used</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
                      style={{ width: '45%' }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Theme</span>
                    <span className="font-medium">{isDark ? "Dark" : "Light"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Language</span>
                    <span className="font-medium">
                      {language === "ne" ? "नेपाली" : "English"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Settings Area */}
          <div className="lg:col-span-3">
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">
                    {tabs.find(t => t.id === activeTab)?.label} Settings
                  </h2>
                  <p className="text-muted-foreground">
                    Customize your {tabs.find(t => t.id === activeTab)?.label?.toLowerCase()} preferences
                  </p>
                </div>

                <div className="space-y-4">
                  {(settingsOptions[activeTab as keyof typeof settingsOptions] || []).map((option, index) => {
                    const isActive = "active" in option && option.active;
                    const hasToggle = "toggle" in option && option.toggle;
                    const hasAction = "action" in option && typeof option.action === "function";

                    return (
                      <div
                        key={index}
                        className="group p-6 rounded-xl bg-muted/20 hover:bg-muted/30 border border-border/50 hover:border-pink-500/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${
                              isActive
                                ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20"
                                : "bg-muted/50"
                            }`}>
                              <option.icon className={`w-6 h-6 ${
                                isActive ? "text-pink-500" : "text-muted-foreground"
                              }`} />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">{option.title}</h3>
                              <p className="text-sm text-muted-foreground">{option.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">{option.value}</span>
                            
                            {hasToggle ? (
                              <button className="relative w-12 h-6 rounded-full bg-muted border border-border transition-all duration-300">
                                <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                                  option.value === "Enabled"
                                    ? "left-7 bg-gradient-to-r from-pink-500 to-purple-600"
                                    : "left-1 bg-muted-foreground"
                                }`} />
                              </button>
                            ) : hasAction ? (
                              <button
                                onClick={option.action}
                                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                              >
                                {isActive ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                )}
                              </button>
                            ) : (
                              <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Theme Preview */}
                {activeTab === "appearance" && (
                  <div className="mt-8 p-6 rounded-xl bg-muted/20 border border-border/50">
                    <h3 className="font-semibold mb-4">Theme Preview</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className={`p-4 rounded-xl border-2 transition-all ${
                        !isDark ? "border-pink-500 bg-white text-black" : "border-border bg-background"
                      }`}>
                        <div className="h-32 rounded-lg bg-gradient-to-br from-gray-100 to-gray-300 mb-4" />
                        <div className="space-y-2">
                          <div className="h-3 rounded-full bg-gray-200" />
                          <div className="h-3 rounded-full bg-gray-200 w-3/4" />
                        </div>
                        <p className="text-center mt-4 text-sm font-medium">Light Mode</p>
                      </div>
                      <div className={`p-4 rounded-xl border-2 transition-all ${
                        isDark ? "border-pink-500 bg-gray-950 text-white" : "border-border bg-background"
                      }`}>
                        <div className="h-32 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 mb-4" />
                        <div className="space-y-2">
                          <div className="h-3 rounded-full bg-gray-700" />
                          <div className="h-3 rounded-full bg-gray-700 w-3/4" />
                        </div>
                        <p className="text-center mt-4 text-sm font-medium">Dark Mode</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Language Preview */}
                {activeTab === "language" && (
                  <div className="mt-8 p-6 rounded-xl bg-muted/20 border border-border/50">
                    <h3 className="font-semibold mb-4">Language Preview</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className={`p-4 rounded-xl border-2 transition-all ${
                        language === "en" ? "border-pink-500" : "border-border"
                      }`}>
                        <h4 className="font-semibold mb-2">English</h4>
                        <p className="text-sm text-muted-foreground">
                          Welcome to our platform. This is how English text will appear.
                        </p>
                      </div>
                      <div className={`p-4 rounded-xl border-2 transition-all ${
                        language === "ne" ? "border-pink-500" : "border-border"
                      }`}>
                        <h4 className="font-semibold mb-2">नेपाली</h4>
                        <p className="text-sm text-muted-foreground">
                          हाम्रो प्लेटफर्ममा स्वागत छ। नेपाली पाठ यसरी देखिनेछ।
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <button className="px-6 py-3 rounded-xl border border-border hover:border-border/80 transition-colors">
                Reset to Default
              </button>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity font-semibold">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
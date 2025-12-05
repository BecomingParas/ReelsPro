"use client";

import {
  Home,
  Compass,
  Users,
  Tv,
  MessageSquare,
  Bell,
  Upload,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: Home, label: "होम", href: "/" },
  { icon: Compass, label: "अन्वेषण", href: "/explore" },
  { icon: Users, label: "मित्रहरू", href: "/friends" },
  { icon: Tv, label: "LIVE", href: "/live", badge: "NEW" },
  { icon: MessageSquare, label: "सन्देश", href: "/messages", badge: 3 },
  { icon: Bell, label: "सूचना", href: "/activity" },
  { icon: Upload, label: "अपलोड", href: "/upload" },
  { icon: User, label: "प्रोफाइल", href: "/profile" },
];

const followingAccounts = [
  { username: "@sarala_shrestha", name: "सरला श्रेष्ठ", live: true },
  { username: "@basantashrestha", name: "बसन्त श्रेष्ठ", live: false },
  { username: "@maya_ehu", name: "माया एहु", live: true },
  { username: "@kamal_sharif", name: "कमल शरिफ", live: false },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-gray-800 bg-black/50 backdrop-blur-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
            <span className="text-xl font-bold">RN</span>
          </div>
          <h1 className="text-2xl font-bold gradient-text">
            Reels<span className="text-white">Nepal</span>
          </h1>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-white border-l-4 border-pink-500"
                    : "hover:bg-white/5 text-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon
                    className={`w-5 h-5 ${isActive ? "text-pink-500" : ""}`}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      typeof item.badge === "number"
                        ? "bg-pink-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Following Accounts */}
        <div className="mt-8">
          <h3 className="px-4 text-sm font-semibold text-gray-400 mb-3">
            फलोइंग खाताहरू
          </h3>
          <div className="space-y-2">
            {followingAccounts.map((account) => (
              <div
                key={account.username}
                className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-black" />
                    </div>
                    {account.live && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{account.name}</p>
                    <p className="text-xs text-gray-400">{account.username}</p>
                  </div>
                </div>
                {account.live && (
                  <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded-full">
                    LIVE
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Discover Tags */}
        <div className="mt-8">
          <h3 className="px-4 text-sm font-semibold text-gray-400 mb-3">
            खोज्नुहोस्
          </h3>
          <div className="flex flex-wrap gap-2 px-4">
            {[
              "#नेपाली",
              "#देशभक्ति",
              "#नाच",
              "#गीत",
              "#कमेडी",
              "#ट्रेन्डिङ",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 rounded-full text-sm hover:bg-white/10 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600" />
            <div>
              <p className="font-medium">तपाईंको खाता</p>
              <p className="text-xs text-gray-400">@nepali_user</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

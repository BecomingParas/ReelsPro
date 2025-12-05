"use client";

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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const followingAccounts = [
  { username: "@sarala_shrestha", name: "सरला श्रेष्ठ", live: true },
  { username: "@basantashrestha", name: "बसन्त श्रेष्ठ", live: false },
  { username: "@maya_ehu", name: "माया एहु", live: true },
  { username: "@kamal_sharif", name: "कमल शरिफ", live: false },
];

export default function Sidebar() {
  const pathname = usePathname(); // This replaces useLocation()
  const { t } = useLanguage();

  const menuItems = [
    { icon: Home, label: t("home") || "Home", href: "/" },
    { icon: Compass, label: t("explore") || "Explore", href: "/explore" },
    { icon: Users, label: t("friends") || "Friends", href: "/friends" },
    { icon: Tv, label: t("live") || "Live", href: "/live", badge: "NEW" },
    {
      icon: MessageSquare,
      label: t("messages") || "Messages",
      href: "/messages",
      count: 3,
    },
    {
      icon: Bell,
      label: t("notifications") || "Notifications",
      href: "/notifications",
    },
    { icon: Upload, label: t("upload") || "Upload", href: "/upload" },
    { icon: User, label: t("profile") || "Profile", href: "/profile" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-16 border-r border-border/50 bg-sidebar/50 backdrop-blur-sm">
      {/* Main Menu */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        <div className="space-y-1 stagger-children">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive
                    ? "gradient-bg text-primary-foreground shadow-lg glow-sm"
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      !isActive && "group-hover:scale-110"
                    )}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-live text-primary-foreground animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.count && (
                  <span className="w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full bg-primary text-primary-foreground">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-border/50" />

        {/* Following Section */}
        <div>
          <h3 className="px-4 mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {t("following") || "Following"}
          </h3>
          <div className="space-y-1">
            {followingAccounts.map((account) => (
              <Link
                key={account.username}
                href={`/user/${account.username.replace("@", "")}`}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-muted/50 transition-all duration-200 group"
              >
                <div className="relative">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold",
                      account.live
                        ? "gradient-border animate-pulse-glow"
                        : "bg-muted"
                    )}
                  >
                    <span className="gradient-text">{account.name[0]}</span>
                  </div>
                  {account.live && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-live rounded-full border-2 border-sidebar flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {account.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {account.username}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-all text-muted-foreground hover:text-foreground"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">{t("settings") || "Settings"}</span>
        </Link>
      </div>
    </aside>
  );
}

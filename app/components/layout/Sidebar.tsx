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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type SidebarUser = {
  id: string;
  name: string;
  username: string;
  avatar?: string;
};

export default function Sidebar() {
  const pathname = usePathname(); // This replaces useLocation()
  const { t } = useLanguage();
  const { data: session, status } = useSession();
  const [usersList, setUsersList] = useState<SidebarUser[]>([]);

  const selfId = session?.user?.id;
  const fallbackInitial = useMemo(() => {
    const v = (session?.user?.name || session?.user?.email || "U").trim();
    return v.slice(0, 1).toUpperCase();
  }, [session?.user?.email, session?.user?.name]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const mapped: SidebarUser[] = Array.isArray(data)
          ? data.map((u: any) => ({
              id: String(u._id ?? u.id),
              name: String(u.name || "User"),
              username: String(u.username || "user"),
              avatar: u.avatar ? String(u.avatar) : undefined,
            }))
          : [];

        const filtered = selfId
          ? mapped.filter((u) => u.id !== String(selfId))
          : mapped;

        if (!cancelled) setUsersList(filtered);
      } catch {
        // ignore
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [selfId]);

  const menuItems = [
    { id: 'home', icon: Home, label: t("home") || "Home", href: "/" },
    { id: 'explore', icon: Compass, label: t("explore") || "Explore", href: "/explore" },
    { id: 'friends', icon: Users, label: t("friends") || "Friends", href: "/" }, // TODO: Create friends page
    { id: 'live', icon: Tv, label: t("live") || "Live", href: "/", badge: "NEW" }, // TODO: Create live page
    {
      id: 'messages',
      icon: MessageSquare,
      label: t("messages") || "Messages",
      href: "/", // TODO: Create messages page
      count: 3,
    },
    {
      id: 'notifications',
      icon: Bell,
      label: t("notifications") || "Notifications",
      href: "/", // TODO: Create notifications page
    },
    { id: 'upload', icon: Upload, label: t("upload") || "Upload", href: "/upload" },
    { id: 'profile', icon: User, label: t("profile") || "Profile", href: "/profile" },
    { id: 'settings', icon: Settings, label: t("settings") || "Settings", href: "/settings" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-full border-r border-border/50 bg-sidebar/50 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 p-4 border-b border-border/50">
          <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
            <span className="text-lg font-bold">RN</span>
          </div>
          <h1 className="text-xl font-bold gradient-text hidden md:block">
            ReelsNepal
          </h1>
        </Link>

      {/* Main Menu */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        <div className="space-y-1 stagger-children">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
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

        <div>
          <h3 className="px-4 mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {t("users") || "Users"}
          </h3>
          <div className="space-y-1">
            {usersList.map((u) => (
              <div
                key={u.id}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-muted/50 transition-all duration-200 group"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={u.avatar || ""} alt={u.name} />
                  <AvatarFallback>{u.name?.slice(0, 1)?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {u.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    @{u.username}
                  </p>
                </div>
              </div>
            ))}

            {usersList.length === 0 ? (
              <div className="px-4 py-2 text-xs text-muted-foreground">
                No users found
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </aside>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { cn } from "@/app/lib/utils";
import { Home, Compass, Users, Tv, MessageSquare, Bell, Upload, User, Settings, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type SidebarUser = { id: string; name: string; username: string; avatar?: string };

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { data: session } = useSession();
  const [usersList, setUsersList] = useState<SidebarUser[]>([]);
  const selfId = session?.user?.id;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/users", { cache: "no-store" }).then(async (res) => {
      if (!res.ok) return;
      const data = await res.json();
      const mapped = Array.isArray(data) ? data.map((u: any) => ({ id: String(u._id ?? u.id), name: String(u.name || "User"), username: String(u.username || "user"), avatar: u.avatar ? String(u.avatar) : undefined })) : [];
      if (!cancelled) setUsersList(selfId ? mapped.filter((u: SidebarUser) => u.id !== String(selfId)) : mapped);
    }).catch(() => undefined);
    return () => { cancelled = true; };
  }, [selfId]);

  const menuItems = [
    { id: "home", icon: Home, label: t("home") || "Home", href: "/" },
    { id: "explore", icon: Compass, label: t("explore") || "Explore", href: "/explore" },
    { id: "friends", icon: Users, label: t("friends") || "Friends", href: "/" },
    { id: "live", icon: Tv, label: t("live") || "Live", href: "/", badge: "NEW" },
    { id: "messages", icon: MessageSquare, label: t("messages") || "Messages", href: "/", count: 3 },
    { id: "notifications", icon: Bell, label: t("notifications") || "Notifications", href: "/" },
    { id: "upload", icon: Upload, label: t("upload") || "Upload", href: "/upload" },
    { id: "profile", icon: User, label: t("profile") || "Profile", href: "/profile" },
    { id: "settings", icon: Settings, label: t("settings") || "Settings", href: "/settings" },
  ];

  return (
    <aside className="glass hidden w-64 shrink-0 flex-col border-y-0 border-l-0 md:flex">
      <Link href="/" className="flex items-center gap-3 border-b border-border/70 px-6 py-5">
        <span className="gradient-bg flex size-10 items-center justify-center rounded-2xl text-sm font-black text-primary-foreground shadow-lg">RN</span>
        <span className="text-lg font-bold tracking-tight">Reels<span className="gradient-text">Nepal</span></span>
      </Link>
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[.22em] text-muted-foreground">Discover</p>
        <div className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = item.href !== "/" ? pathname.startsWith(item.href) : pathname === "/";
            return <Link key={item.id} href={item.href} className={cn("group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-colors", active ? "bg-primary/15 text-foreground shadow-[inset_3px_0_0_hsl(var(--primary))]" : "text-muted-foreground hover:bg-muted/70 hover:text-foreground")}>
              <span className="flex items-center gap-3"><Icon className={cn("size-5", active && "text-primary")} />{item.label}</span>
              {item.badge ? <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[9px] font-bold text-accent">{item.badge}</span> : item.count ? <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">{item.count}</span> : null}
            </Link>;
          })}
        </div>
        <div className="my-6 h-px bg-border/70" />
        <div className="flex items-center justify-between px-3 pb-3"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-muted-foreground">Creators</p><Sparkles className="size-3 text-secondary" /></div>
        <div className="flex flex-col gap-1">
          {usersList.slice(0, 5).map((u) => <div key={u.id} className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-muted/70"><Avatar className="size-8"><AvatarImage src={u.avatar || ""} alt={u.name} /><AvatarFallback>{u.name.slice(0, 1).toUpperCase()}</AvatarFallback></Avatar><div className="min-w-0"><p className="truncate text-xs font-semibold">{u.name}</p><p className="truncate text-[11px] text-muted-foreground">@{u.username}</p></div></div>)}
          {!usersList.length && <p className="px-3 text-xs text-muted-foreground">Find people to follow</p>}
        </div>
      </nav>
      <div className="border-t border-border/70 p-4"><Link href="/upload" className="gradient-bg flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-primary-foreground glow-sm"><Upload className="size-4" />Create a reel</Link></div>
    </aside>
  );
}

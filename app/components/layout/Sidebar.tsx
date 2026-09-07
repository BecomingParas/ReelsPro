"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { cn } from "@/app/lib/utils";
import { Home, Compass, Users, Tv, MessageSquare, Bell, Upload, User, Settings, Sparkles, ArrowUpRight } from "lucide-react";
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
    { id: "live", icon: Tv, label: t("live") || "Live", href: "/", badge: "LIVE" },
    { id: "messages", icon: MessageSquare, label: t("messages") || "Messages", href: "/", count: 3 },
    { id: "notifications", icon: Bell, label: t("notifications") || "Notifications", href: "/" },
  ];
  const libraryItems = [
    { id: "upload", icon: Upload, label: t("upload") || "Upload", href: "/upload" },
    { id: "profile", icon: User, label: t("profile") || "Profile", href: "/profile" },
    { id: "settings", icon: Settings, label: t("settings") || "Settings", href: "/settings" },
  ];

  const renderItem = (item: typeof menuItems[number], index: number) => {
    const Icon = item.icon;
    const active = item.id === "home" ? pathname === "/" : item.href !== "/" && pathname.startsWith(item.href);
    return (
      <motion.div key={item.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.035, duration: 0.35 }}>
        <Link href={item.href} aria-current={active ? "page" : undefined} className={cn("group relative flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
          <span className="flex items-center gap-3"><Icon className="size-[18px]" />{item.label}</span>
          {item.badge ? <span className={cn("rounded-sm px-1.5 py-0.5 text-[9px] font-black tracking-wider", active ? "bg-primary-foreground/15" : "bg-primary/15 text-primary")}>{item.badge}</span> : item.count ? <span className={cn("flex size-5 items-center justify-center rounded-md text-[10px]", active ? "bg-primary-foreground/15" : "bg-secondary text-secondary-foreground")}>{item.count}</span> : null}
        </Link>
      </motion.div>
    );
  };

  return (
    <aside className="glass hidden w-[17.5rem] shrink-0 flex-col border-y-0 border-l-0 md:flex">
      <Link href="/" className="motion-sheen flex items-center gap-3 border-b border-border/70 px-6 py-5">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_c7sybnc7sybnc7sy-mouWb4mB74FemqGXGwxwE3kaVZUU9v.jpg" alt="ReelsNepal" className="size-11 rounded-xl object-cover object-center" />
        <span className="text-lg font-black tracking-tight">reels<span className="text-secondary">Nepal</span></span>
      </Link>
      <nav className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6">
        <p className="px-3 pb-3 text-[10px] font-black uppercase tracking-[.2em] text-muted-foreground">Main menu</p>
        <div className="flex flex-col gap-1">{menuItems.map(renderItem)}</div>
        <div className="my-6 h-px bg-border/70" />
        <div className="flex items-center justify-between px-3 pb-3"><p className="text-[10px] font-black uppercase tracking-[.2em] text-muted-foreground">Your space</p><Sparkles className="size-3 text-secondary" /></div>
        <div className="flex flex-col gap-1">{libraryItems.map((item, index) => renderItem(item, index + menuItems.length))}</div>
        <div className="my-6 h-px bg-border/70" />
        <div className="flex items-center justify-between px-3 pb-3"><p className="text-[10px] font-black uppercase tracking-[.2em] text-muted-foreground">Creators</p><ArrowUpRight className="size-3 text-muted-foreground" /></div>
        <div className="flex flex-col gap-1">{usersList.slice(0, 4).map((u) => <div key={u.id} className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted"><Avatar className="size-8"><AvatarImage src={u.avatar || ""} alt={u.name} /><AvatarFallback>{u.name.slice(0, 1).toUpperCase()}</AvatarFallback></Avatar><div className="min-w-0"><p className="truncate text-xs font-semibold">{u.name}</p><p className="truncate text-[11px] text-muted-foreground">@{u.username}</p></div></div>)}{!usersList.length && <p className="px-3 text-xs text-muted-foreground">Find people to follow</p>}</div>
      </nav>
      <div className="border-t border-border/70 p-4"><Link href="/upload" className="group flex items-center justify-between rounded-lg bg-secondary px-4 py-3 text-sm font-black text-secondary-foreground transition-transform hover:-translate-y-0.5"><span className="flex items-center gap-2"><Upload className="size-4" />Create a reel</span><ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link></div>
    </aside>
  );
}

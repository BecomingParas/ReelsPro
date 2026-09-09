"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { cn } from "@/app/lib/utils";
import { Home, Compass, Users, Tv, MessageSquare, Bell, PanelLeftClose, PanelLeftOpen, Search, Film } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "home", icon: Home, label: "For You", href: "/" },
    { id: "explore", icon: Compass, label: t("explore") || "Explore", href: "/explore" },
    { id: "following", icon: Users, label: "Following", href: "/" },
    { id: "friends", icon: Users, label: t("friends") || "Friends", href: "/" },
    { id: "dramas", icon: Film, label: "Short dramas", href: "/" },
    { id: "live", icon: Tv, label: t("live") || "LIVE", href: "/", badge: "LIVE" },
    { id: "messages", icon: MessageSquare, label: t("messages") || "Messages", href: "/", count: 3 },
    { id: "notifications", icon: Bell, label: t("notifications") || "Activity", href: "/" },
  ];

  const renderItem = (item: typeof menuItems[number]) => {
    const Icon = item.icon;
    const active = item.id === "home" ? pathname === "/" : item.href !== "/" && pathname.startsWith(item.href);
    return (
      <motion.div key={item.id} initial={false}>
        <Link href={item.href} aria-current={active ? "page" : undefined} title={collapsed ? item.label : undefined} className={cn("group relative flex items-center justify-between rounded-md px-3 py-3 text-[15px] font-semibold transition-colors", collapsed && "justify-center px-2", active ? "bg-muted text-foreground" : "text-foreground/80 hover:bg-muted/70 hover:text-foreground")}>
          <span className="flex items-center gap-3"><Icon className="size-[18px]" />{!collapsed && item.label}</span>
          {item.badge ? <span className={cn("rounded-sm px-1.5 py-0.5 text-[9px] font-black tracking-wider", active ? "bg-primary-foreground/15" : "bg-primary/15 text-primary")}>{item.badge}</span> : item.count ? <span className={cn("flex size-5 items-center justify-center rounded-md text-[10px]", active ? "bg-primary-foreground/15" : "bg-secondary text-secondary-foreground")}>{item.count}</span> : null}
        </Link>
      </motion.div>
    );
  };

  return (
    <aside className={cn("glass hidden shrink-0 flex-col border-y-0 border-l-0 transition-[width] duration-300 md:flex", collapsed ? "w-[5rem]" : "w-[17.5rem]")}>
      <div className={cn("relative flex items-center border-b border-border/70 px-4 py-5", collapsed ? "justify-center" : "gap-3 px-6")}>
        <Link href="/" className="motion-sheen flex min-w-0 items-center gap-3" aria-label="ReelsNepal home">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_c7sybnc7sybnc7sy-mouWb4mB74FemqGXGwxwE3kaVZUU9v.jpg" alt="ReelsNepal" className="size-11 shrink-0 rounded-xl object-cover object-center" />
          {!collapsed && <span className="text-lg font-black tracking-tight">reels<span className="text-secondary">Nepal</span></span>}
        </Link>
        {!collapsed && <button type="button" onClick={() => setCollapsed(true)} aria-label="Collapse sidebar" title="Collapse sidebar" className="absolute right-3 top-7 flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <PanelLeftClose className="size-4" />
        </button>}
      </div>
      <nav className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-5">
        {!collapsed && <div className="mb-5 flex items-center gap-3 rounded-md bg-muted px-3 py-2.5 text-sm text-muted-foreground"><Search className="size-5" /><span>Search</span></div>}
        <div className="flex flex-col gap-1">{menuItems.map(renderItem)}</div>

      </nav>
      {!collapsed && <div className="border-t border-border/70 px-4 py-4 text-xs font-semibold leading-6 text-muted-foreground"><p>Company</p><p>Program</p><p>Terms & Policies</p><p>© 2026 ReelsNepal</p></div>}
      {collapsed && <div className="mt-auto flex justify-center border-t border-border/70 p-3"><button type="button" onClick={() => setCollapsed(false)} aria-label="Expand sidebar" title="Expand sidebar" className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><PanelLeftOpen className="size-4" /></button></div>}
    </aside>
  );
}

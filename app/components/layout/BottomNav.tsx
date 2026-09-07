"use client";
import { useLanguage } from "@/app/context/LanguageContext";
import { cn } from "@/app/lib/utils";
import { Home, Compass, Plus, User, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname(); const { t } = useLanguage();
  const items = [{ id: "home", icon: Home, label: t("home") || "Home", href: "/" }, { id: "explore", icon: Compass, label: t("explore") || "Explore", href: "/explore" }, { id: "upload", icon: Plus, label: t("upload") || "Create", href: "/upload", create: true }, { id: "notifications", icon: Bell, label: t("notifications") || "Alerts", href: "/" }, { id: "profile", icon: User, label: t("profile") || "Profile", href: "/profile" }];
  return <nav className="glass safe-bottom fixed bottom-0 left-0 right-0 z-50 border-x-0 border-b-0 md:hidden"><div className="flex h-16 items-center justify-around px-2">{items.map((item) => { const Icon = item.icon; const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href); return <Link key={item.id} href={item.href} className={cn("flex min-w-14 flex-col items-center gap-1 text-[10px] font-medium", active ? "text-primary" : "text-muted-foreground")}><span className={cn("flex size-9 items-center justify-center rounded-xl", item.create ? "gradient-bg -mt-7 size-14 rounded-2xl text-primary-foreground shadow-lg glow-sm" : active && "bg-primary/15")}><Icon className={cn(item.create ? "size-6" : "size-5")} /></span>{!item.create && <span>{item.label}</span>}</Link>; })}</div></nav>;
}

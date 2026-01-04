"use client";
import { useLanguage } from "@/app/context/LanguageContext";
import { cn } from "@/app/lib/utils";
import { Home, Compass, PlusCircle, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', icon: Home, label: t("home"), href: "/" },
    { id: 'explore', icon: Compass, label: t("explore"), href: "/explore" },
    { id: 'upload', icon: PlusCircle, label: t("upload"), href: "/upload", isUpload: true },
    { id: 'messages', icon: MessageSquare, label: t("messages"), href: "/" }, // TODO: Create messages page
    { id: 'profile', icon: User, label: t("profile"), href: "/profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-border/50 z-50 animate-slide-up">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.isUpload) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 h-full -mt-4"
              >
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center shadow-lg glow hover:scale-110 transition-transform duration-200">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <item.icon
                  className={cn(
                    "w-6 h-6 transition-transform duration-200",
                    isActive && "scale-110"
                  )}
                />
                {item.href === "/messages" && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] mt-1 transition-all duration-200",
                  isActive && "font-semibold"
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 gradient-bg rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

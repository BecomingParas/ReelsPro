"use client";
import { useLanguage } from "@/app/context/LanguageContext";
import { cn } from "@/app/lib/utils";
import { Home, Compass, PlusCircle, User, Bell, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { data: session } = useSession();
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const navItems = [
    { 
      id: 'home', 
      icon: Home, 
      label: t("home") || "Home", 
      href: "/",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    },
    { 
      id: 'explore', 
      icon: Compass, 
      label: t("explore") || "Explore", 
      href: "/explore",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    { 
      id: 'upload', 
      icon: PlusCircle, 
      label: t("upload") || "Upload", 
      href: "/upload", 
      isUpload: true,
      color: "text-white",
      bgColor: "bg-gradient-to-r from-pink-500 to-purple-600"
    },
    { 
      id: 'notifications', 
      icon: Bell, 
      label: t("notifications") || "Notifications", 
      href: "/notifications",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      badge: 3
    },
    { 
      id: 'profile', 
      icon: User, 
      label: t("profile") || "Profile", 
      href: "/profile",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
  ];

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-gray-800/50">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            const isHovered = activeHover === item.id;

            if (item.isUpload) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex flex-col items-center justify-center flex-1 h-full -mt-8 relative group"
                  onMouseEnter={() => setActiveHover(item.id)}
                  onMouseLeave={() => setActiveHover(null)}
                >
                  {/* Upload Button */}
                  <div className="relative">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-110",
                      item.bgColor,
                      isHovered && "animate-pulse"
                    )}>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Icon className={cn(
                        "w-6 h-6 relative z-10 transition-all duration-300",
                        item.color,
                        isHovered && "scale-125"
                      )} />
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
                    
                    {/* Sparkles */}
                    {isHovered && (
                      <>
                        <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-500 animate-pulse" />
                        <Sparkles className="absolute -top-2 -left-2 w-4 h-4 text-yellow-500 animate-pulse delay-150" />
                        <Sparkles className="absolute -bottom-2 -right-2 w-4 h-4 text-yellow-500 animate-pulse delay-300" />
                        <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-yellow-500 animate-pulse delay-450" />
                      </>
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={cn(
                    "absolute -bottom-6 text-[10px] font-medium transition-all duration-300 opacity-0 group-hover:opacity-100",
                    item.color
                  )}>
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 group",
                  isActive ? item.color : "text-gray-400"
                )}
                onMouseEnter={() => setActiveHover(item.id)}
                onMouseLeave={() => setActiveHover(null)}
              >
                <div className="relative">
                  {/* Icon Container */}
                  <div className={cn(
                    "p-2.5 rounded-xl transition-all duration-300",
                    isActive ? item.bgColor : "group-hover:bg-gray-800/50",
                    isHovered && "scale-110"
                  )}>
                    <Icon className={cn(
                      "w-5 h-5 transition-all duration-300",
                      isActive && "scale-110"
                    )} />
                  </div>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full" />
                  )}
                  
                  {/* Notification Badge */}
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-black flex items-center justify-center">
                      <span className="text-[10px] font-bold">{item.badge}</span>
                    </div>
                  )}
                  
                  {/* Profile Indicator */}
                  {item.id === 'profile' && session && (
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-green-500 border border-black" />
                  )}
                </div>
                
                {/* Label */}
                <span className={cn(
                  "text-[10px] mt-1 transition-all duration-300",
                  isActive ? "font-semibold opacity-100" : "opacity-70 group-hover:opacity-100"
                )}>
                  {item.label}
                </span>
                
                {/* Hover Effect */}
                <div className={cn(
                  "absolute inset-0 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 -z-10",
                  isActive ? item.bgColor : "bg-gray-800/30"
                )} />
              </Link>
            );
          })}
        </div>
        
        {/* Top Gradient Border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
      </nav>

      {/* Bottom Spacer for Content */}
      <div className="md:hidden h-16" />
    </>
  );
}
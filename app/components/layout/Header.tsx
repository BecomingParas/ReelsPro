"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useLanguage } from "@/app/context/LanguageContext";
import { Search, Film, Bell, Upload } from "lucide-react";
import Link from "next/link";
import LanguageToggle from "../LanguageToggle";
import { Button } from "../ui/button";

export default function Header() {
  const { t } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center group-hover:glow transition-all duration-300">
            <Film className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold hidden sm:block">
            <span className="gradient-text">नेपाली</span>
            <span className="text-foreground"> Reels</span>
          </span>
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder={t("search")}
              className="w-full h-10 pl-11 pr-4 rounded-full bg-muted/50 border border-border/50 focus:border-primary/50 focus:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground text-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full hover:bg-muted"
          >
            <Search className="w-5 h-5" />
          </Button>

          <Link href="/upload">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-muted relative group"
            >
              <Upload className="w-5 h-5 group-hover:text-primary transition-colors" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-muted relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <div className="w-9 h-9 rounded-full gradient-border p-0.5 cursor-pointer hover:glow-sm transition-all">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-xs font-bold">
                    {user?.fullName?.[0] || "U"}
                  </div>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hidden sm:flex text-muted-foreground hover:text-foreground"
              >
                {t("logout")}
              </Button>
            </div>
          ) : (
            <Link href="/auth">
              <Button className="gradient-bg hover:opacity-90 transition-opacity rounded-full px-5 hidden sm:flex">
                {t("login")}
              </Button>
            </Link>
          )}

          {/* Mobile avatar when not authenticated */}
          {!isAuthenticated && (
            <Link href="/auth" className="sm:hidden">
              <div className="w-8 h-8 rounded-full gradient-border overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xs font-bold">
                  ?
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

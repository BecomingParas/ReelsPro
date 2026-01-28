"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Search, Plus, Bell } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function TopBar() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  const displayName = session?.user?.name || session?.user?.email || "";
  const fallbackInitial = (session?.user?.name || session?.user?.email || "U")
    .trim()
    .slice(0, 1)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 h-16 glass border-b border-border/50">
      <div className="h-16 flex items-center justify-between px-4 md:px-6">
    

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder={t("search") || "खोज्नुहोस्..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-background/60 border border-border/60 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
            />
            {searchQuery && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Create Button */}
          <button
            onClick={() => router.push("/upload")}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">
              {t("create") || "सिर्जना गर्नुहोस्"}
            </span>
          </button>

          {/* Upload Button for mobile */}
          <button
            onClick={() => router.push("/upload")}
            className="md:hidden p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>

          {/* User Menu */}
          {status !== "loading" && !session ? (
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/" })}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              {t("login")}
            </button>
          ) : null}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded-full gradient-border">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session?.user?.avatar || ""}
                    alt={session?.user?.name || "User"}
                  />
                  <AvatarFallback>{fallbackInitial}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {session ? (
                <>
                  <DropdownMenuLabel className="flex flex-col">
                    <span className="text-sm font-semibold truncate">
                      {displayName}
                    </span>
                    {session?.user?.username ? (
                      <span className="text-xs text-muted-foreground truncate">
                        @{session.user.username}
                      </span>
                    ) : null}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">{t("profile")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">{t("settings")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    {t("logout")}
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>{t("settings")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings">{t("settings")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signIn(undefined, { callbackUrl: "/" })}>
                    {t("login")}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

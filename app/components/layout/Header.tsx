"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Search, Plus, Bell, X } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function TopBar() {
  const { t } = useLanguage(); const [searchQuery, setSearchQuery] = useState(""); const router = useRouter(); const { data: session, status } = useSession();
  const displayName = session?.user?.name || session?.user?.email || "";
  const fallbackInitial = (displayName || "U").trim().slice(0, 1).toUpperCase();
  const submitSearch = (e: React.FormEvent) => { e.preventDefault(); if (searchQuery.trim()) router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`); };
  return <header className="glass sticky top-0 z-40 flex h-16 items-center justify-between border-x-0 border-t-0 px-4 md:px-8">
    <div className="md:hidden"><Link href="/" className="flex items-center gap-2 text-base font-bold"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_c7sybnc7sybnc7sy-mouWb4mB74FemqGXGwxwE3kaVZUU9v.jpg" alt="ReelsNepal" className="size-8 rounded-lg object-cover" /><span>reels<span className="gradient-text">Nepal</span></span></Link></div>
    <form onSubmit={submitSearch} className="relative hidden max-w-xl flex-1 md:block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search creators, sounds, or topics" className="h-10 w-full rounded-xl border border-border/70 bg-background/60 pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />{searchQuery && <button type="button" aria-label="Clear search" onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><X className="size-4" /></button>}</form>
    <div className="flex items-center gap-2"><button aria-label="Create reel" onClick={() => router.push("/upload")} className="gradient-bg hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-primary-foreground md:flex"><Plus className="size-4" />{t("create") || "Create"}</button><button aria-label="Notifications" className="relative rounded-xl p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground"><Bell className="size-5" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-accent" /></button>{status !== "loading" && !session && <button onClick={() => signIn(undefined, { callbackUrl: "/" })} className="hidden rounded-xl bg-muted px-3 py-2 text-sm font-semibold md:block">{t("login") || "Log in"}</button>}<DropdownMenu><DropdownMenuTrigger asChild><button aria-label="Open profile menu" className="rounded-full ring-2 ring-primary/30"><Avatar className="size-9"><AvatarImage src={session?.user?.avatar || ""} alt={displayName || "User"} /><AvatarFallback>{fallbackInitial}</AvatarFallback></Avatar></button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-56">{session ? <><DropdownMenuLabel>{displayName}</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem asChild><Link href="/profile">{t("profile") || "Profile"}</Link></DropdownMenuItem><DropdownMenuItem asChild><Link href="/settings">{t("settings") || "Settings"}</Link></DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>{t("logout") || "Log out"}</DropdownMenuItem></> : <DropdownMenuItem onClick={() => signIn(undefined, { callbackUrl: "/" })}>{t("login") || "Log in"}</DropdownMenuItem>}</DropdownMenuContent></DropdownMenu></div>
  </header>;
}

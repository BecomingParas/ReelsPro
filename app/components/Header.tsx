// components/Header.tsx (updated to match TikTok-like top nav, integrated with existing auth)
"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, Search, PlusSquare, Film, LogOut } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <div className="navbar bg-black/80 backdrop-blur-md sticky top-0 z-40 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Film className="text-red-500" size={28} />
          <span className="font-bold text-xl">नेपाली Reels</span>
        </Link>
        <div className="flex items-center gap-4">
          <Search className="cursor-pointer" size={24} />
          {session ? (
            <>
              <Link href="/upload">
                <PlusSquare size={24} />
              </Link>
              <User size={24} />
              <button onClick={handleSignOut}>
                <LogOut size={24} />
              </button>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}

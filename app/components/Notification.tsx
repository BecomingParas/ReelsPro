"use client";
import Link from "next/link";
import { Home } from "lucide-react";
export default function Header() {
  return (
    <div className=" navbar bg-base-300 sticky top-0 z-40">
      <div className=" container mx-auto">
        <div className="flex-1 px-2 lg:flex-none">
          <Link>
            <Home className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

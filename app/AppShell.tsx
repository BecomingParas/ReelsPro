"use client";

import { ReactNode } from "react";
import Providers from "./components/Providers";
import { LanguageProvider } from "./context/LanguageContext";
import Sidebar from "./components/layout/Sidebar";
import BottomNav from "./components/layout/BottomNav";
import TopBar from "./components/layout/Header";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <LanguageProvider>
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="flex h-screen relative z-10">
          <Sidebar />

          <div className="flex-1 min-w-0 flex flex-col transition-all duration-300">
            <TopBar />
            <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
          </div>

          <BottomNav />
        </div>
      </LanguageProvider>
    </Providers>
  );
}

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
        <div className="min-h-screen bg-background">
          <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -left-32 top-16 size-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -right-40 bottom-0 size-[28rem] rounded-full bg-secondary/5 blur-3xl" />
          </div>
          <div className="relative z-10 flex min-h-screen">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <TopBar />
              <main className="min-w-0 flex-1 overflow-y-auto pb-20 md:pb-0">{children}</main>
            </div>
            <BottomNav />
          </div>
        </div>
      </LanguageProvider>
    </Providers>
  );
}

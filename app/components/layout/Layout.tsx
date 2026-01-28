"use client";
import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../Header";
import BottomNav from "./BottomNav";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pages where we might want to hide sidebar or modify layout
  const hideSidebarPages = ["/auth", "/login", "/register", "/setup"];
  const fullWidthPages = ["/auth", "/login", "/register", "/setup", "/upload", "/live"];
  
  const shouldHideSidebar = hideSidebarPages.includes(pathname);
  const shouldBeFullWidth = fullWidthPages.includes(pathname);
  const showBottomNav = !shouldHideSidebar && isMobile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
      </div>

      {/* Header - Always show except on auth pages */}
      {!shouldHideSidebar && <Header />}

      {/* Sidebar - Hide on auth pages and mobile */}
      {!shouldHideSidebar && !isMobile && (
        <div className={`fixed left-0 top-0 h-screen z-30 transition-all duration-300 ${
          sidebarCollapsed ? "w-0" : "w-72"
        }`}>
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <main className={`
        relative z-10 transition-all duration-300
        ${shouldHideSidebar ? "" : "pt-16"}
        ${!shouldHideSidebar && !isMobile ? "md:pl-72" : ""}
        ${shouldBeFullWidth ? "" : "container mx-auto"}
        ${showBottomNav ? "pb-16" : ""}
        ${pathname === "/upload" ? "px-0" : "px-4 md:px-6"}
      `}>
        {/* Content Container with Glass Effect */}
        <div className={`
          min-h-[calc(100vh-4rem)] 
          ${pathname === "/upload" || pathname === "/live" ? "" : "rounded-t-2xl md:rounded-2xl"}
          ${shouldHideSidebar ? "" : "bg-gradient-to-br from-gray-900/30 via-black/30 to-gray-900/30 backdrop-blur-sm"}
          ${shouldHideSidebar ? "" : "border border-gray-800/30"}
          overflow-hidden
        `}>
          {children}
        </div>
      </main>

      {/* Bottom Navigation - Only on mobile for specific pages */}
      {showBottomNav && <BottomNav />}

      {/* Scroll to Top Button */}
      {pathname !== "/" && !shouldHideSidebar && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40 p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity shadow-2xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Loading Indicator for Route Changes */}
      {/* <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 z-50 animate-pulse" /> */}
    </div>
  );
}
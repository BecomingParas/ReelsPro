"use client";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "../Header";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className="pt-16 pb-20 md:pb-0 md:pl-64">{children}</main>
      <BottomNav />
    </div>
  );
}

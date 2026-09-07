import "./globals.css";
import type { ReactNode } from "react";
import AppShell from "./AppShell";

export const metadata = {
  title: "ReelsNepal — Stories in motion",
  description: "Discover and share short videos from Nepal and beyond.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ne" dir="ltr" suppressHydrationWarning className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

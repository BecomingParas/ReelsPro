import "./globals.css";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import AppShell from "./AppShell";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ne" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${inter.className} antialiased overflow-hidden bg-background text-foreground`}
        style={{
          fontFamily: "'Noto Sans Nepali', 'Poppins', sans-serif",
        }}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

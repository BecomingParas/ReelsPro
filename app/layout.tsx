// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";

// Providers
import Providers from "./components/Providers";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./components/Notification";
import { LanguageProvider } from "./context/LanguageContext";

// Layout Components
import Sidebar from "./components/layout/Sidebar";
import BottomNav from "./components/layout/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ReelsNepal - नेपाली TikTok",
  description: "नेपाली छोटो भिडियो प्लेटफर्म | Nepali Reels & Short Videos",
  keywords: "nepali reels, tiktok nepal, nepali video, नेपाली रील्स",
  authors: [{ name: "ReelsNepal Team" }],
  openGraph: {
    title: "ReelsNepal - नेपाली TikTok",
    description: "नेपाली भाषामा छोटो भिडियो हेर्नुहोस् र बनाउनुहोस्",
    type: "website",
    locale: "ne_NP",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ne" dir="ltr">
      <head>{/* Preload Nepali Font - Optional but recommended */}</head>

      <body
        className={`${inter.className} bg-black text-white antialiased`}
        style={{ fontFamily: "'Noto Sans Nepali', 'Poppins', sans-serif" }}
      >
        {/* All Providers in correct order */}
        <AuthProvider>
          <Providers>
            <LanguageProvider>
              <NotificationProvider>
                <div className="flex min-h-screen">
                  {/* Desktop Sidebar - Hidden on mobile */}
                  <Sidebar />

                  {/* Main Content Area */}
                  <main className="flex-1 pb-16 md:pb-0 md:ml-64">
                    {/* Optional max width for large screens */}
                    <div className="max-w-5xl mx-auto w-full">{children}</div>
                  </main>

                  {/* Mobile Bottom Navigation */}
                  <BottomNav />
                </div>
              </NotificationProvider>
            </LanguageProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}

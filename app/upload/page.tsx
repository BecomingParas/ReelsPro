"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import VideoUploadForm from "../components/VideoUploadForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-3 text-white hover:text-pink-500 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="text-lg font-semibold">फिर्ता जानुहोस्</span>
            </Link>

            <div className="text-center">
              <h1 className="text-2xl font-bold gradient-text">भिडियो अपलोड</h1>
              <p className="text-gray-400 text-sm">
                तपाईंको सिर्जनालाई संसारसंग साझा गर्नुहोस्
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="font-medium">{session?.user?.name}</p>
                <p className="text-sm text-gray-400">
                  @{session?.user?.email?.split("@")[0]}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Form */}
      <div className="py-8 animate-fade-in">
        <VideoUploadForm />
      </div>

      {/* Tips Section */}
      <div className="max-w-2xl mx-auto px-4 pb-12">
        <div className="bg-gray-900/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            अपलोड टिप्स
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-pink-500 rounded-full mt-2" />
              <span>
                उच्च गुणस्तरको भिडियो अपलोड गर्नुहोस् (1080p भन्दा माथि)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
              <span>आकर्षक शीर्षक र विवरण लेख्नुहोस्</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <span>सम्बन्धित ट्यागहरू थप्न नबिर्सनुहोस्</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <span>
                प्रविधि सम्बन्धी सहयोगको लागि हामीलाई सम्पर्क गर्नुहोस्
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

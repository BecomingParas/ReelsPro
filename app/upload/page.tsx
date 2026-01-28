"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import VideoUploadForm from "../components/VideoUploadForm";
import { ArrowLeft, Upload, Zap, Globe, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-border rounded-full animate-pulse" />
          <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-500/5 dark:from-pink-500/10 dark:via-purple-500/10 dark:to-cyan-500/10 animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 animate-pulse" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="group flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-pink-500/20 transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="font-medium">Back to Home</p>
                <p className="text-xs text-muted-foreground/70">Return to dashboard</p>
              </div>
            </Link>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                  <Upload className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  Upload Video
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Share your creativity with the world
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold">{session?.user?.name}</p>
                <p className="text-sm text-muted-foreground">
                  @{session?.user?.email?.split("@")[0]}
                </p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <span className="font-bold text-lg">
                      {session?.user?.name?.[0] || "U"}
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-background" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upload Form */}
          <div className="lg:col-span-2">
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      New Video Upload
                    </h2>
                    <p className="text-muted-foreground">
                      Upload and share your creative video content
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <span className="text-sm font-medium">Premium Upload</span>
                  </div>
                </div>
                <VideoUploadForm />
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Tips */}
          <div className="space-y-6">
            {/* Upload Stats */}
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Upload Stats</h3>
                <div className="p-2 rounded-lg bg-muted">
                  <Zap className="w-4 h-4 text-yellow-500" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Storage Used</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
                      style={{ width: "45%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Upload Speed</span>
                    <span className="font-medium">Fast</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                      style={{ width: "85%" }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-muted/40">
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">Videos</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-muted/40">
                      <p className="text-2xl font-bold">1.2K</p>
                      <p className="text-sm text-muted-foreground">Views</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Quick Tips</h3>
                <div className="p-2 rounded-lg bg-muted">
                  <Globe className="w-4 h-4 text-blue-500" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: "",
                    title: "Video Quality",
                    desc: "Upload 1080p or higher for best results",
                  },
                  {
                    icon: "",
                    title: "Engaging Content",
                    desc: "Write compelling titles and descriptions",
                  },
                  {
                    icon: "",
                    title: "Tags",
                    desc: "Add relevant tags for better discovery",
                  },
                  {
                    icon: "",
                    title: "Audio Quality",
                    desc: "Ensure clear audio in your videos",
                  },
                ].map((tip, index) => (
                  <div
                    key={index}
                    className="group p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-all duration-300 border border-border/50 hover:border-pink-500/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{tip.icon}</div>
                      <div>
                        <p className="font-medium mb-1">{tip.title}</p>
                        <p className="text-sm text-muted-foreground">{tip.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-gradient-to-br from-card/80 to-background/60 rounded-2xl border border-border/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Secure Upload</h3>
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Shield className="w-4 h-4 text-green-500" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Your content is protected with end-to-end encryption
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Encrypted Transfer</span>
                <span className="mx-2">•</span>
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Private Storage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="container mx-auto px-6 py-6">
        <div className="text-center text-sm text-muted-foreground/80">
          <p>
            By uploading, you agree to our{" "}
            <a
              href="#"
              className="text-pink-500 hover:text-pink-400 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-pink-500 hover:text-pink-400 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
          <p className="mt-2">
            Need help?{" "}
            <a
              href="#"
              className="text-cyan-500 hover:text-cyan-400 transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
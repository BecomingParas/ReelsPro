"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowLeft, 
  Github, 
  Facebook, 
  Twitter, 
  Smartphone,
  CheckCircle2,
  User,
  Sparkles
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      showNotification(result.error, "error");
      setIsLoading(false);
    } else {
      showNotification("Login successful! Welcome back!", "success");
      router.push("/");
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-gray-900/50 group-hover:bg-pink-500/20 transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="font-medium">Back to Home</p>
                <p className="text-xs text-gray-500">Explore without login</p>
              </div>
            </Link>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                  <User className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
              </div>
              <p className="text-sm text-gray-400">
                Sign in to continue your journey
              </p>
            </div>

            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
            <div className="p-8">
              {/* Welcome Message */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-pink-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                <p className="text-gray-400">
                  Sign in to access your videos and connect with creators
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={() => handleSocialLogin("github")}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                  <span>Continue with GitHub</span>
                </button>
                
                <button
                  onClick={() => handleSocialLogin("facebook")}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all duration-300"
                >
                  <Facebook className="w-5 h-5 text-blue-500" />
                  <span>Continue with Facebook</span>
                </button>

                <button
                  onClick={() => handleSocialLogin("twitter")}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all duration-300"
                >
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <span>Continue with Twitter</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900/50 text-gray-400">Or continue with email</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block">
                    <span className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </span>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block">
                      <span className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Password
                      </span>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="Enter your password"
                          className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-700 bg-gray-800 text-pink-500 focus:ring-pink-500 focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-400">Remember me</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-pink-500 hover:text-pink-400 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative group"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-pink-500/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Sign In
                        </>
                      )}
                    </span>
                  </button>
              </form>

              {/* Mobile Login Option */}
              <div className="mt-8 p-4 rounded-xl bg-gray-900/30 border border-gray-800/50">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="w-5 h-5 text-cyan-500" />
                  <span className="font-medium">Mobile Login Available</span>
                </div>
                <p className="text-sm text-gray-400">
                  Use your mobile number to sign in quickly
                </p>
                <Link
                  href="/mobile-login"
                  className="inline-flex items-center gap-2 text-sm text-cyan-500 hover:text-cyan-400 transition-colors mt-2"
                >
                  Login with mobile
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>

              {/* Register Link */}
              <div className="text-center mt-8 pt-6 border-t border-gray-800">
                <p className="text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-pink-500 hover:text-pink-400 font-semibold transition-colors"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
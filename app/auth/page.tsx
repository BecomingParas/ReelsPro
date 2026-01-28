"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Film,
  Mail,
  Lock,
  User,
  AtSign,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Facebook,
  Twitter,
  Github,
  Smartphone,
  Globe,
  Camera,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Crown,
  Bell,
  MessageCircle,
  Heart
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { cn } from "../lib/utils";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { t } = useLanguage();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    username: "",
  });

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    // Calculate password strength
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success(t("loginSuccess") || "Login successful!");
          router.push("/");
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords don't match");
          setIsLoading(false);
          return;
        }

        // Registration logic here
        toast.success(t("signupSuccess") || "Registration successful!");
        setTimeout(() => {
          setIsLogin(true);
          setFormData({
            email: formData.email,
            password: "",
            confirmPassword: "",
            fullName: "",
            username: "",
          });
        }, 2000);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500"
  ];
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  const benefits = [
    { icon: Camera, text: "Unlimited video uploads" },
    { icon: Users, text: "Join a community of creators" },
    { icon: TrendingUp, text: "Analytics and insights" },
    { icon: Crown, text: "Premium features" },
    { icon: Bell, text: "Personalized notifications" },
    { icon: MessageCircle, text: "Direct messaging" },
    { icon: Heart, text: "Like and save content" },
    { icon: Globe, text: "Global reach" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
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
                <p className="text-xs text-muted-foreground/70">Explore without login</p>
              </div>
            </Link>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                  <User className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  {isLogin ? "Welcome Back" : "Join Our Community"}
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Sign in to continue your journey" : "Start your creative journey today"}
              </p>
            </div>

            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Benefits (only for signup) */}
          {!isLogin && (
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-pink-500" />
                  <h2 className="text-xl font-bold">Why Join Us?</h2>
                </div>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/20 border border-border/50">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-600/10">
                          <Icon className="w-5 h-5 text-pink-500" />
                        </div>
                        <p className="text-sm">{benefit.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-br from-card/80 to-background/60 rounded-2xl border border-border/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-500" />
                  <h3 className="font-semibold">Your Data is Safe</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  We use industry-standard encryption to protect your personal information and content.
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>256-bit Encryption</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>GDPR Compliant</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-600/10 border border-pink-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold">Quick Start Guide</h3>
                </div>
                <p className="text-sm text-foreground/80 mb-3">
                  Get started in 3 easy steps:
                </p>
                <ol className="text-sm text-muted-foreground space-y-2 ml-4">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-xs">
                      1
                    </div>
                    <span>Create your account</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-xs">
                      2
                    </div>
                    <span>Upload your first video</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-xs">
                      3
                    </div>
                    <span>Engage with the community</span>
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* Center Column - Auth Form */}
          <div className={`${isLogin ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
            <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
              <div className="p-8">
                <div className="max-w-md mx-auto">
                  {/* Logo and Welcome */}
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4">
                      <Film className="w-10 h-10 text-pink-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      {isLogin ? "Welcome Back!" : "Create Your Account"}
                    </h2>
                    <p className="text-muted-foreground">
                      {isLogin 
                        ? "Sign in to access your videos and connect with creators"
                        : "Join thousands of creators sharing their stories"
                      }
                    </p>
                  </div>

                  {/* Tab Switcher */}
                  <div className="flex bg-muted/30 rounded-full p-1 mb-8">
                    <button
                      onClick={() => setIsLogin(true)}
                      className={cn(
                        "flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300",
                        isLogin
                          ? "bg-gradient-to-r from-pink-500 to-purple-600"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setIsLogin(false)}
                      className={cn(
                        "flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300",
                        !isLogin
                          ? "bg-gradient-to-r from-pink-500 to-purple-600"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Social Login */}
                  <div className="space-y-3 mb-8">
                    <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-muted/40 hover:bg-muted/60 border border-border/50 transition-all duration-300">
                      <Github className="w-5 h-5" />
                      <span>Continue with GitHub</span>
                    </button>
                    
                    <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-muted/40 hover:bg-muted/60 border border-border/50 transition-all duration-300">
                      <Facebook className="w-5 h-5 text-blue-500" />
                      <span>Continue with Facebook</span>
                    </button>

                    <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-muted/40 hover:bg-muted/60 border border-border/50 transition-all duration-300">
                      <Twitter className="w-5 h-5 text-blue-400" />
                      <span>Continue with Twitter</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-card/50 text-muted-foreground">Or continue with email</span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <>
                        {/* Full Name */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                              type="text"
                              placeholder="Enter your full name"
                              value={formData.fullName}
                              onChange={(e) =>
                                setFormData({ ...formData, fullName: e.target.value })
                              }
                              className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/60 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                              required={!isLogin}
                            />
                          </div>
                        </div>

                        {/* Username */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Username</label>
                          <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                              type="text"
                              placeholder="Choose a username"
                              value={formData.username}
                              onChange={(e) =>
                                setFormData({ ...formData, username: e.target.value })
                              }
                              className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/60 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                              required={!isLogin}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/60 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                          className="w-full pl-12 pr-12 py-3 rounded-xl bg-background/60 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      {/* Password Strength Meter */}
                      {formData.password && !isLogin && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Password strength:</span>
                            <span className={`font-medium ${
                              passwordStrength >= 4 ? "text-green-500" :
                              passwordStrength >= 3 ? "text-blue-500" :
                              passwordStrength >= 2 ? "text-yellow-500" : "text-red-500"
                            }`}>
                              {strengthLabels[passwordStrength]}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden flex">
                            {[0, 1, 2, 3, 4].map((index) => (
                              <div
                                key={index}
                                className={`flex-1 h-full transition-all duration-300 ${
                                  index < passwordStrength ? passwordStrengthColors[index] : "bg-muted"
                                } ${index > 0 ? "border-l border-background" : ""}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    {!isLogin && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              setFormData({ ...formData, confirmPassword: e.target.value })
                            }
                            className="w-full pl-12 pr-12 py-3 rounded-xl bg-background/60 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            required={!isLogin}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    )}
                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded border-border bg-background text-primary focus:ring-primary focus:ring-offset-0"
                        />
                        <span className="text-sm text-muted-foreground">Remember me</span>
                      </label>
                      {isLogin && (
                        <button
                          type="button"
                          className="text-sm text-pink-500 hover:text-pink-400 transition-colors"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative group"
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-pink-500/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {isLogin ? "Signing in..." : "Creating Account..."}
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            {isLogin ? "Sign In" : "Create Account"}
                          </>
                        )}
                      </span>
                    </button>
                  </form>

                  {/* Mobile Login Option */}
                  <div className="mt-8 p-4 rounded-xl bg-muted/20 border border-border/50">
                    <div className="flex items-center gap-3 mb-3">
                      <Smartphone className="w-5 h-5 text-cyan-500" />
                      <span className="font-medium">Mobile Login Available</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Use your mobile number to sign in quickly
                    </p>
                    <button className="inline-flex items-center gap-2 text-sm text-cyan-500 hover:text-cyan-400 transition-colors mt-2">
                      Login with mobile
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </div>

                  {/* Switch Mode */}
                  <div className="text-center mt-8 pt-6 border-t border-border">
                    <p className="text-muted-foreground">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                      <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-pink-500 hover:text-pink-400 font-semibold transition-colors"
                      >
                        {isLogin ? "Sign up here" : "Sign in here"}
                      </button>
                    </p>
                  </div>

                  {/* Terms */}
                  <div className="text-center mt-6">
                    <p className="text-xs text-muted-foreground/80">
                      By signing in, you agree to our{" "}
                      <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  CheckCircle2,
  Sparkles,
  Shield,
  Smartphone,
  Calendar
} from "lucide-react";
import { useNotification } from "../components/Notification";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthdate: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      showNotification("Please agree to terms and conditions", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    if (formData.password.length < 8) {
      showNotification("Password must be at least 8 characters", "error");
      return;
    }

    setIsLoading(true);

    try {
      // Mock API call - replace with actual registration
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      showNotification("Registration successful! Please login.", "success");
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
    } catch {
      showNotification("Registration failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

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
              href="/auth"
              className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-gray-900/50 group-hover:bg-pink-500/20 transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="font-medium">Back to Login</p>
                <p className="text-xs text-gray-500">Already have an account?</p>
              </div>
            </Link>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                  <User className="w-5 h-5" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  Join Our Community
                </h1>
              </div>
              <p className="text-sm text-gray-400">
                Start your creative journey today
              </p>
            </div>

            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Benefits */}
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-pink-500" />
                  <h2 className="text-xl font-bold">Why Join Us?</h2>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      icon: "🎬",
                      title: "Unlimited Video Uploads",
                      description: "Share as many videos as you want"
                    },
                    {
                      icon: "🔒",
                      title: "Secure Platform",
                      description: "End-to-end encryption for your content"
                    },
                    {
                      icon: "📈",
                      title: "Analytics Dashboard",
                      description: "Track your video performance"
                    },
                    {
                      icon: "👥",
                      title: "Community",
                      description: "Connect with creators worldwide"
                    },
                    {
                      icon: "💎",
                      title: "Premium Features",
                      description: "Access exclusive tools and filters"
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-gray-900/30 border border-gray-800/30">
                      <div className="text-2xl">{benefit.icon}</div>
                      <div>
                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-sm text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-500" />
                  <h3 className="font-semibold">Your Data is Safe</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  We use industry-standard encryption to protect your personal information and content.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
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
            </div>

            {/* Right Column - Registration Form */}
            <div>
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
                <div className="p-8">
                  <h2 className="text-xl font-bold mb-6">Create Your Account</h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block">
                        <span className="text-sm font-medium mb-2">Full Name</span>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
                          />
                        </div>
                      </label>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block">
                        <span className="text-sm font-medium mb-2">Email Address</span>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
                          />
                        </div>
                      </label>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="block">
                        <span className="text-sm font-medium mb-2">Phone Number (Optional)</span>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 234 567 8900"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
                          />
                        </div>
                      </label>
                    </div>

                    {/* Birthdate */}
                    <div className="space-y-2">
                      <label className="block">
                        <span className="text-sm font-medium mb-2">Date of Birth</span>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="date"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
                          />
                        </div>
                      </label>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label className="block">
                        <span className="text-sm font-medium mb-2">Password</span>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Create a strong password"
                            className="w-full pl-10 pr-12 py-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
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
                      </label>
                      
                      {/* Password Strength Meter */}
                      {formData.password && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Password strength:</span>
                            <span className={`font-medium ${
                              passwordStrength() >= 4 ? "text-green-500" :
                              passwordStrength() >= 3 ? "text-blue-500" :
                              passwordStrength() >= 2 ? "text-yellow-500" : "text-red-500"
                            }`}>
                              {strengthLabels[passwordStrength()]}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden flex">
                            {[0, 1, 2, 3, 4].map((index) => (
                              <div
                                key={index}
                                className={`flex-1 h-full transition-all duration-300 ${
                                  index < passwordStrength() ? strengthColors[index] : "bg-gray-800"
                                } ${index > 0 ? "border-l border-gray-900" : ""}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label className="block">
                        <span className="text-sm font-medium mb-2">Confirm Password</span>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="Confirm your password"
                            className="w-full pl-10 pr-12 py-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </label>
                    </div>

                    {/* Terms Agreement */}
                    <div className="space-y-4 pt-4">
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          className="mt-1 rounded border-gray-700 bg-gray-800 text-pink-500 focus:ring-pink-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-gray-400">
                          I agree to the{" "}
                          <Link href="/terms" className="text-pink-500 hover:text-pink-400 transition-colors">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-pink-500 hover:text-pink-400 transition-colors">
                            Privacy Policy
                          </Link>
                          . I understand that my data will be processed in accordance with these policies.
                        </span>
                      </label>

                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          className="mt-1 rounded border-gray-700 bg-gray-800 text-pink-500 focus:ring-pink-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-gray-400">
                          Subscribe to our newsletter for updates, tips, and exclusive offers.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative group mt-6"
                    >
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-pink-500/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            Create Account
                          </>
                        )}
                      </span>
                    </button>
                  </form>

                  {/* Login Link */}
                  <div className="text-center mt-6 pt-6 border-t border-gray-800">
                    <p className="text-gray-400">
                      Already have an account?{" "}
                      <Link
                        href="/auth"
                        className="text-pink-500 hover:text-pink-400 font-semibold transition-colors"
                      >
                        Sign in here
                      </Link>
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
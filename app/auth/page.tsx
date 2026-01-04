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
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { cn } from "../lib/utils";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useLanguage();
    const { login, signup } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        username: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                const success = await login(formData.email, formData.password);
                if (success) {
                    toast.success(t("loginSuccess"));
                    router.push("/");
                }
            } else {
                if (formData.password !== formData.confirmPassword) {
                    toast.error("Passwords don't match");
                    setIsLoading(false);
                    return;
                }
                const success = await signup({
                    email: formData.email,
                    password: formData.password,
                    fullName: formData.fullName,
                    username: formData.username,
                });
                if (success) {
                    toast.success(t("signupSuccess"));
                    router.push("/");
                }
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float" />
                <div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float"
                    style={{ animationDelay: "1s" }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            </div>

            {/* Back Button */}
            <button
                onClick={() => router.push("/")}
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-muted/50 backdrop-blur-sm flex items-center justify-center hover:bg-muted transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Auth Card */}
            <div className="w-full max-w-md relative z-10 animate-scale-in">
                <div className="glass-card rounded-3xl p-8 shadow-2xl">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-4 glow animate-pulse-glow">
                            <Film className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold gradient-text">नेपाली Reels</h1>
                        <p className="text-muted-foreground mt-2">
                            {isLogin ? t("welcomeBack") : t("createAccount")}
                        </p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex bg-muted/50 rounded-full p-1 mb-6">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={cn(
                                "flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                isLogin
                                    ? "gradient-bg text-primary-foreground shadow-lg"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {t("login")}
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={cn(
                                "flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                !isLogin
                                    ? "gradient-bg text-primary-foreground shadow-lg"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {t("signup")}
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        type="text"
                                        placeholder={t("fullName")}
                                        value={formData.fullName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, fullName: e.target.value })
                                        }
                                        className="pl-12 h-12 rounded-xl bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                                        required={!isLogin}
                                    />
                                </div>
                                <div className="relative group">
                                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        type="text"
                                        placeholder={t("username")}
                                        value={formData.username}
                                        onChange={(e) =>
                                            setFormData({ ...formData, username: e.target.value })
                                        }
                                        className="pl-12 h-12 rounded-xl bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                                        required={!isLogin}
                                    />
                                </div>
                            </>
                        )}

                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                type="email"
                                placeholder={t("email")}
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="pl-12 h-12 rounded-xl bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                                required
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder={t("password")}
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                className="pl-12 pr-12 h-12 rounded-xl bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {!isLogin && (
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t("confirmPassword")}
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    className="pl-12 h-12 rounded-xl bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        {isLogin && (
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="text-sm text-primary hover:underline"
                                >
                                    {t("forgotPassword")}
                                </button>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 rounded-xl gradient-bg hover:opacity-90 text-primary-foreground font-semibold text-base transition-all duration-300 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            ) : isLogin ? (
                                t("login")
                            ) : (
                                t("signup")
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-sm text-muted-foreground">
                            {t("orContinueWith")}
                        </span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            className="h-12 rounded-xl border-border/50 hover:bg-muted/50"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            className="h-12 rounded-xl border-border/50 hover:bg-muted/50"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </Button>
                    </div>

                    {/* Switch Mode */}
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        {isLogin ? t("noAccount") : t("hasAccount")}{" "}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary font-medium hover:underline"
                        >
                            {isLogin ? t("signup") : t("login")}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

"use client";

import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/AuthContext";

function ProfileContent() {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">कृपया लगइन गर्नुहोस्</h2>
                    <a
                        href="/auth"
                        className="px-6 py-3 rounded-xl gradient-bg text-white font-semibold"
                    >
                        लगइन गर्नुहोस्
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full p-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="glass-card rounded-3xl p-8 mb-6">
                    <div className="flex items-start gap-6">
                        <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center text-3xl font-bold">
                            {user?.fullName?.[0] || "U"}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-1">{user?.fullName}</h1>
                            <p className="text-muted-foreground mb-4">@{user?.username}</p>
                            <p className="text-sm mb-6">{user?.bio || "कुनै परिचय छैन"}</p>
                            <div className="flex gap-6">
                                <div>
                                    <div className="text-2xl font-bold">{user?.followers || 0}</div>
                                    <div className="text-sm text-muted-foreground">फलोअर्स</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{user?.following || 0}</div>
                                    <div className="text-sm text-muted-foreground">फलोइङ</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{user?.likes || 0}</div>
                                    <div className="text-sm text-muted-foreground">लाइक्स</div>
                                </div>
                            </div>
                        </div>
                        <button className="px-6 py-2 rounded-xl border border-border hover:bg-muted/50 transition-colors">
                            प्रोफाइल सम्पादन
                        </button>
                    </div>
                </div>

                {/* Videos Grid */}
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="aspect-[9/16] rounded-xl bg-muted animate-pulse"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <>
            <Helmet>
                <title>Profile - नेपाली Reels</title>
                <meta name="description" content="तपाईंको प्रोफाइल" />
            </Helmet>
            <Layout>
                <Suspense fallback={<div>Loading...</div>}>
                    <ProfileContent />
                </Suspense>
            </Layout>
        </>
    );
}

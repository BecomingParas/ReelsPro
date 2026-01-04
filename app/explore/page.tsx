"use client";

import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "../components/layout/Layout";

// Placeholder for Explore page content
function ExploreContent() {
    return (
        <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
            <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center">
                    <span className="text-3xl">🔍</span>
                </div>
                <h2 className="text-2xl font-bold gradient-text mb-2">
                    अन्वेषण गर्नुहोस्
                </h2>
                <p className="text-muted-foreground">
                    नयाँ भिडियोहरू र क्रिएटर्स पत्ता लगाउनुहोस्
                </p>
            </div>
        </div>
    );
}

export default function ExplorePage() {
    return (
        <>
            <Helmet>
                <title>Explore - नेपाली Reels</title>
                <meta
                    name="description"
                    content="नयाँ भिडियो र क्रिएटर्स खोज्नुहोस्"
                />
            </Helmet>
            <Layout>
                <Suspense fallback={<div>Loading...</div>}>
                    <ExploreContent />
                </Suspense>
            </Layout>
        </>
    );
}

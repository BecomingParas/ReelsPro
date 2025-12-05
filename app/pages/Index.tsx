"use client";
import { Helmet } from "react-helmet-async";
import Layout from "../components/layout/Layout";
import VideoFeed from "../components/video/VideoFeed";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>नेपाली Reels - Short Videos from Nepal</title>
        <meta
          name="description"
          content="नेपालको सबैभन्दा राम्रो छोटो भिडियो प्लेटफर्म। नेपाली भिडियो हेर्नुहोस् र आफ्नो प्रतिभा साझा गर्नुहोस्।"
        />
      </Helmet>
      <Layout>
        <VideoFeed />
      </Layout>
    </>
  );
};

export default Index;

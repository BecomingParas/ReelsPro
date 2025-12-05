"use client";
import { Search, TrendingUp, Hash, Users, Layout } from "lucide-react";
import { cn } from "../lib/utils";

const trendingTags = [
  { tag: "nepali", count: "2.4M", trending: true },
  { tag: "mountains", count: "1.8M" },
  { tag: "momo", count: "956K", trending: true },
  { tag: "kathmandu", count: "845K" },
  { tag: "dance", count: "723K", trending: true },
  { tag: "comedy", count: "612K" },
  { tag: "music", count: "534K" },
  { tag: "travel", count: "489K" },
];

const categories = [
  { icon: "🎵", name: "संगीत", color: "from-pink-500 to-rose-500" },
  { icon: "💃", name: "नृत्य", color: "from-purple-500 to-indigo-500" },
  { icon: "😂", name: "कमेडी", color: "from-yellow-500 to-orange-500" },
  { icon: "🍜", name: "खाना", color: "from-green-500 to-emerald-500" },
  { icon: "🏔️", name: "यात्रा", color: "from-blue-500 to-cyan-500" },
  { icon: "📚", name: "शिक्षा", color: "from-violet-500 to-purple-500" },
];

const featuredCreators = [
  {
    name: "सरला श्रेष्ठ",
    username: "@sarala",
    followers: "125K",
    verified: true,
  },
  {
    name: "राजेश गुरुङ",
    username: "@rajesh",
    followers: "98K",
    verified: true,
  },
  { name: "माया तामाङ", username: "@maya", followers: "76K" },
  { name: "विकास थापा", username: "@bikas", followers: "54K" },
];

export default function ExplorePage() {
  return (
    <Layout>
      <div className="min-h-screen p-4 md:p-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Search Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="gradient-text">अन्वेषण</span> गर्नुहोस्
            </h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="भिडियो, ह्यासट्याग, वा प्रयोगकर्ता खोज्नुहोस्..."
                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Categories */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 gradient-bg rounded-full" />
              श्रेणीहरू
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 stagger-children">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all hover:-translate-y-1"
                >
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl group-hover:scale-110 transition-transform",
                      cat.color
                    )}
                  >
                    {cat.icon}
                  </div>
                  <span className="text-sm font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Trending Tags */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              ट्रेन्डिङ ह्यासट्यागहरू
            </h2>
            <div className="space-y-2 stagger-children">
              {trendingTags.map((item, index) => (
                <button
                  key={item.tag}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground group-hover:gradient-bg group-hover:text-primary-foreground transition-all">
                      {index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{item.tag}</span>
                      {item.trending && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full gradient-bg text-primary-foreground">
                          HOT
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.count} भिडियो
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Featured Creators */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              लोकप्रिय क्रिएटरहरू
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
              {featuredCreators.map((creator) => (
                <button
                  key={creator.username}
                  className="flex flex-col items-center p-5 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all hover:-translate-y-1 group"
                >
                  <div className="w-16 h-16 rounded-full gradient-border p-0.5 mb-3 group-hover:animate-pulse-glow">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-xl font-bold">
                      {creator.name[0]}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-semibold text-sm">
                      {creator.name}
                    </span>
                    {creator.verified && (
                      <span className="w-4 h-4 rounded-full gradient-bg flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground mb-2">
                    {creator.username}
                  </span>
                  <span className="text-xs font-medium text-primary">
                    {creator.followers} फलोअर्स
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

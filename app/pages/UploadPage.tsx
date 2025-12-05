"use client";
import { useState } from "react";
import { Upload, X, Tag, Music, MapPin, Film, Sparkles } from "lucide-react";
import Layout from "../components/layout/Layout";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>(["नेपाली", "भिडियो"]);
  const [tagInput, setTagInput] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Layout>
      <div className="min-h-screen p-4 md:p-6 pb-24">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="gradient-text">भिडियो</span> अपलोड
            </h1>
            <p className="text-muted-foreground">
              आफ्नो क्रिएटिभ भिडियो संसारसँग साझा गर्नुहोस्
            </p>
          </div>

          {/* Upload Area */}
          <div
            className={cn(
              "relative mb-8 p-8 rounded-3xl border-2 border-dashed transition-all duration-300 animate-fade-in",
              dragActive
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50 hover:bg-card/50"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center">
                  <Film className="w-10 h-10 text-primary-foreground" />
                </div>
                <p className="font-semibold mb-2">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedFile(null)}
                  className="rounded-full"
                >
                  <X className="w-4 h-4 mr-2" />
                  हटाउनुहोस्
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center group-hover:gradient-bg transition-colors">
                  <Upload className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="font-semibold mb-2">
                  भिडियो यहाँ ड्र्याग गर्नुहोस्
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  वा ब्राउज गर्न क्लिक गर्नुहोस्
                </p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload">
                  <Button
                    asChild
                    className="rounded-full gradient-bg hover:opacity-90"
                  >
                    <span>
                      <Sparkles className="w-4 h-4 mr-2" />
                      फाइल छान्नुहोस्
                    </span>
                  </Button>
                </label>
                <p className="text-xs text-muted-foreground mt-4">
                  MP4, MOV, AVI • अधिकतम 100MB • 9:16 ratio recommended
                </p>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-6 stagger-children">
            {/* Title */}
            <div className="animate-fade-in">
              <label className="block text-sm font-medium mb-2">शीर्षक</label>
              <input
                type="text"
                placeholder="आकर्षक शीर्षक लेख्नुहोस्..."
                className="w-full h-12 px-4 rounded-xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">विवरण</label>
              <textarea
                rows={3}
                placeholder="भिडियोको बारेमा केही लेख्नुहोस्..."
                className="w-full p-4 rounded-xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                ट्यागहरू
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm flex items-center gap-2"
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  placeholder="नयाँ ट्याग थप्नुहोस्..."
                  className="flex-1 h-10 px-4 rounded-xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
                <Button
                  onClick={addTag}
                  variant="outline"
                  className="rounded-xl"
                >
                  थप्नुहोस्
                </Button>
              </div>
            </div>

            {/* Music */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Music className="w-4 h-4" />
                संगीत
              </label>
              <input
                type="text"
                placeholder="गीत वा कलाकारको नाम..."
                className="w-full h-12 px-4 rounded-xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                स्थान
              </label>
              <input
                type="text"
                placeholder="कहाँ फिल्माइयो?"
                className="w-full h-12 px-4 rounded-xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Submit */}
            <Button
              className="w-full h-14 rounded-2xl gradient-bg hover:opacity-90 text-lg font-semibold"
              disabled={!selectedFile}
            >
              <Upload className="w-5 h-5 mr-2" />
              अपलोड गर्नुहोस्
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

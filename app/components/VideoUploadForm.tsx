"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { 
  Loader2, 
  Upload, 
  X, 
  Tag, 
  Music, 
  MapPin, 
  Eye, 
  Globe, 
  Lock,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { useNotification } from "./Notification";
import { apiClient } from "@/lib/api-client";
import FileUpload from "./FileUpload";
import { useSession } from "next-auth/react";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  tags: string[];
  location: string;
  music: string;
}

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [tags, setTags] = useState<string[]>(["Tutorial", "Gaming"]);
  const [tagInput, setTagInput] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "private" | "unlisted">("public");
  const { showNotification } = useNotification();
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      tags: [],
      location: "",
      music: "",
    },
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    const anyResp = response as any;
    const uploadedUrl: string = anyResp.url || anyResp.fileUrl || response.filePath;

    setValue("videoUrl", uploadedUrl);
    setValue(
      "thumbnailUrl",
      response.thumbnailUrl || anyResp.thumbnailUrl || uploadedUrl
    );
    showNotification("Video uploaded successfully!", "success");
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      setValue("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue("tags", newTags);
  };

  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo({
        ...data,
        user: {
          _id: session?.user?.id || "",
          name: session?.user?.name || "User",
          username: session?.user?.email?.split("@")[0] || "user",
          avatar: session?.user?.image || "/default-avatar.png",
        },
      });
      showNotification("Video published successfully!", "success");

      // Reset form
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setValue("tags", []);
      setValue("location", "");
      setValue("music", "");
      setTags(["Tutorial", "Gaming"]);
      setUploadProgress(0);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* File Upload Section */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Video
          </span>
          <p className="text-muted-foreground text-sm mb-4">
            Drag and drop your video file or click to browse
          </p>
        </label>
        
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-pink-500 transition-all duration-300 cursor-pointer group bg-muted/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-12 h-12 text-pink-500" />
            </div>
            <p className="text-xl font-semibold mb-2">Select Video File</p>
            <p className="text-muted-foreground mb-4">
              Support: MP4, MOV, AVI • Max: 500MB
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted hover:bg-muted/80 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Browse Files</span>
            </div>
          </div>
        </div>
        
        <FileUpload
          fileType="video"
          onSuccess={handleUploadSuccess}
          onProgress={setUploadProgress}
          ref={fileInputRef}
        />

        {uploadProgress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Upload Progress</span>
              <span className="font-medium">{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Title Input */}
      <div className="space-y-3">
        <label className="block">
          <span className="text-lg font-semibold mb-2">Video Title</span>
          <input
            type="text"
            className={`w-full px-4 py-3 rounded-xl bg-background/60 border ${
              errors.title ? "border-red-500/50" : "border-border/50"
            } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
            placeholder="Enter an engaging title for your video..."
            {...register("title", { required: "Title is required" })}
          />
        </label>
        {errors.title && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.title.message}</span>
          </div>
        )}
      </div>

      {/* Description Input */}
      <div className="space-y-3">
        <label className="block">
          <span className="text-lg font-semibold mb-2">Description</span>
          <textarea
            className={`w-full px-4 py-3 rounded-xl bg-background/60 border ${
              errors.description ? "border-red-500/50" : "border-border/50"
            } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[120px]`}
            placeholder="Describe your video content..."
            {...register("description", { required: "Description is required" })}
          />
        </label>
        {errors.description && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.description.message}</span>
          </div>
        )}
      </div>

      {/* Tags Input */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Tags
          </span>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-full flex items-center gap-2 border border-pink-500/20"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-red-400 transition-colors"
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
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag(tagInput))
              }
              className="flex-1 px-4 py-2 rounded-xl bg-background/60 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Add a tag..."
            />
            <button
              type="button"
              onClick={() => addTag(tagInput)}
              className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors border border-border/50"
            >
              Add
            </button>
          </div>
        </label>
      </div>

      {/* Privacy Settings */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-lg font-semibold mb-2">Privacy Settings</span>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "public", icon: Globe, label: "Public", desc: "Anyone can view" },
              { value: "unlisted", icon: Eye, label: "Unlisted", desc: "Only with link" },
              { value: "private", icon: Lock, label: "Private", desc: "Only you" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPrivacy(option.value as any)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  privacy === option.value
                    ? "border-pink-500 bg-pink-500/10"
                    : "border-border/50 bg-muted/20 hover:bg-muted/30"
                }`}
              >
                <option.icon className={`w-5 h-5 mb-2 ${
                  privacy === option.value ? "text-pink-500" : "text-muted-foreground"
                }`} />
                <p className="font-medium">{option.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{option.desc}</p>
              </button>
            ))}
          </div>
        </label>
      </div>

      {/* Music & Location */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block">
            <span className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Music className="w-5 h-5" />
              Music Credit
            </span>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Add music credit..."
              {...register("music")}
            />
          </label>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-lg font-semibold mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </span>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Add location..."
              {...register("location")}
            />
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={loading || uploadProgress < 100}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative group"
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-pink-500/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center justify-center gap-3">
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Publishing Video...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Publish Video
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
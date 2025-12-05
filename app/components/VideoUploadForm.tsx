"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, Upload, X, Tag, Music, MapPin } from "lucide-react";
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
  const [tags, setTags] = useState<string[]>(["नेपाली", "भिडियो"]);
  const [tagInput, setTagInput] = useState("");
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
    setValue("videoUrl", response.filePath);
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
    showNotification("भिडियो अपलोड सफल!", "success");
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
      showNotification("कृपया पहिले भिडियो अपलोड गर्नुहोस्", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo({
        ...data,
        user: {
          _id: session?.user?.id || "",
          name: session?.user?.name || "नेपाली प्रयोगकर्ता",
          username: session?.user?.email?.split("@")[0] || "nepali_user",
          avatar: session?.user?.image || "/default-avatar.png",
        },
      });
      showNotification("भिडियो प्रकाशित सफल!", "success");

      // Reset form
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setValue("tags", []);
      setValue("location", "");
      setValue("music", "");
      setTags(["नेपाली", "भिडियो"]);
      setUploadProgress(0);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "भिडियो प्रकाशन असफल",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">नयाँ भिडियो अपलोड</h2>
            <p className="text-gray-400">
              तपाईंको सिर्जनात्मक भिडियो साझा गर्नुहोस्
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* File Upload */}
          <div className="form-control">
            <label className="label">
              <span className="text-lg font-semibold">
                भिडियो अपलोड गर्नुहोस्
              </span>
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-700 rounded-2xl p-12 text-center hover:border-pink-500 transition-colors cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-10 h-10 text-pink-500" />
              </div>
              <p className="text-lg font-medium mb-2">भिडियो छनोट गर्नुहोस्</p>
              <p className="text-gray-400 text-sm">
                MP4, MOV, AVI, अधिकतम 100MB
              </p>
            </div>
            <FileUpload
              fileType="video"
              onSuccess={handleUploadSuccess}
              onProgress={setUploadProgress}
              ref={fileInputRef}
            />

            {uploadProgress > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>अपलोड प्रगति</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="text-lg font-semibold">शीर्षक</span>
            </label>
            <input
              type="text"
              className={`input input-bordered bg-gray-900 border-gray-700 rounded-xl h-14 text-lg ${
                errors.title ? "input-error" : ""
              }`}
              placeholder="आकर्षक शीर्षक लेख्नुहोस्..."
              {...register("title", { required: "शीर्षक आवश्यक छ" })}
            />
            {errors.title && (
              <span className="text-error text-sm mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="text-lg font-semibold">विवरण</span>
            </label>
            <textarea
              className={`textarea textarea-bordered bg-gray-900 border-gray-700 rounded-xl h-32 text-lg ${
                errors.description ? "textarea-error" : ""
              }`}
              placeholder="तपाईंको भिडियोको बारेमा केहि लेख्नुहोस्..."
              {...register("description", { required: "विवरण आवश्यक छ" })}
            />
            {errors.description && (
              <span className="text-error text-sm mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="form-control">
            <label className="label">
              <span className="text-lg font-semibold flex items-center gap-2">
                <Tag className="w-5 h-5" /> ट्यागहरू
              </span>
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full flex items-center gap-2"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
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
                className="input input-bordered bg-gray-900 border-gray-700 rounded-xl flex-1"
                placeholder="ट्याग थप्नुहोस्..."
              />
              <button
                type="button"
                onClick={() => addTag(tagInput)}
                className="btn btn-outline border-gray-700 hover:border-pink-500"
              >
                थप्नुहोस्
              </button>
            </div>
          </div>

          {/* Music & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold flex items-center gap-2">
                  <Music className="w-5 h-5" /> साङ्गीत
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-gray-900 border-gray-700 rounded-xl h-14"
                placeholder="साङ्गीत थप्नुहोस्..."
                {...register("music")}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> स्थान
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-gray-900 border-gray-700 rounded-xl h-14"
                placeholder="स्थान थप्नुहोस्..."
                {...register("location")}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-block h-16 text-lg font-bold rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 border-0 hover:opacity-90 transition-all duration-300"
            disabled={loading || uploadProgress < 100}
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                प्रकाशन हुदैछ...
              </>
            ) : (
              "भिडियो प्रकाशित गर्नुहोस्"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
